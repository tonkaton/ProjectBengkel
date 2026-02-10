import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import Booking from './Booking'

// Mock komponen layout dan UI
vi.mock('../layout', () => ({
  Container: ({ children }) => <div>{children}</div>
}))

vi.mock('../ui', () => ({
  Card: ({ children, className }) => <div className={className}>{children}</div>,
  Button: ({ children, onClick, disabled, className }) => (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  )
}))

describe('Booking Component', () => {
  beforeEach(() => {
    // Mock fetch untuk services
    global.fetch = vi.fn((url) => {
      if (url.includes('/services')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ 
            data: [
              { id: 1, name: 'Servis Ringan', price: 50000 },
              { id: 2, name: 'Servis Berat', price: 150000 },
              { id: 3, name: 'Ganti Oli', price: 75000 }
            ]
          })
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [] })
      })
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  // ========== TEST RENDERING ==========
  
  it('menampilkan judul Booking Servis Online', async () => {
    render(<Booking />)
    const title = await screen.findByText(/booking servis online/i)
    expect(title).toBeInTheDocument()
  })

  it('menampilkan deskripsi booking', () => {
    render(<Booking />)
    expect(screen.getByText(/daftar sekarang, admin kami akan segera memproses jadwal anda/i)).toBeInTheDocument()
  })

  it('menampilkan semua field form input', () => {
    render(<Booking />)
    
    expect(screen.getByPlaceholderText(/nama lengkap/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/no hp \/ whatsapp/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/motor \(contoh: vario 160\)/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/ada keluhan tambahan/i)).toBeInTheDocument()
  })

  it('menampilkan tombol Kirim Booking', () => {
    render(<Booking />)
    expect(screen.getByRole('button', { name: /kirim booking/i })).toBeInTheDocument()
  })

  // ========== TEST FETCH SERVICES ==========

  it('fetch services saat component mount', async () => {
    render(<Booking />)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/services')
      )
    })
  })

  it('menampilkan layanan dari API di dropdown', async () => {
    render(<Booking />)
    
    const select = screen.getByRole('combobox')
    
    await waitFor(() => {
      expect(select).toContainHTML('Servis Ringan - Rp 50.000')
      expect(select).toContainHTML('Servis Berat - Rp 150.000')
      expect(select).toContainHTML('Ganti Oli - Rp 75.000')
    })
  })

  it('menampilkan fallback options jika services kosong', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [] })
      })
    )

    render(<Booking />)
    
    const select = screen.getByRole('combobox')
    
    await waitFor(() => {
      expect(select).toContainHTML('Servis Ringan')
      expect(select).toContainHTML('Servis Berat')
    })
  })

  // ========== TEST FORM INTERACTION ==========

  it('mengupdate state saat user mengetik di input fields', async () => {
    const user = userEvent.setup()
    render(<Booking />)

    const nameInput = screen.getByPlaceholderText(/nama lengkap/i)
    const phoneInput = screen.getByPlaceholderText(/no hp/i)
    const vehicleInput = screen.getByPlaceholderText(/motor/i)

    await user.type(nameInput, 'John Doe')
    await user.type(phoneInput, '08123456789')
    await user.type(vehicleInput, 'Vario 160')

    expect(nameInput).toHaveValue('John Doe')
    expect(phoneInput).toHaveValue('08123456789')
    expect(vehicleInput).toHaveValue('Vario 160')
  })

  it('mengupdate state saat user memilih service', async () => {
    const user = userEvent.setup()
    render(<Booking />)

    const select = screen.getByRole('combobox')
    
    await waitFor(() => {
      expect(select).toContainHTML('Servis Ringan')
    })

    await user.selectOptions(select, 'Servis Ringan')
    expect(select).toHaveValue('Servis Ringan')
  })

  it('mengupdate state saat user mengisi tanggal dan waktu', async () => {
    const user = userEvent.setup()
    const { container } = render(<Booking />)

    // 🔧 FIX: Gunakan container.querySelector
    const dateInput = container.querySelector('input[name="date"]')
    const timeInput = container.querySelector('input[name="time"]')

    if (dateInput) {
      await user.type(dateInput, '2026-02-10')
      expect(dateInput).toHaveValue('2026-02-10')
    }

    if (timeInput) {
      await user.type(timeInput, '10:00')
      expect(timeInput).toHaveValue('10:00')
    }
  })

  // ========== TEST VALIDASI ==========

  it('menampilkan alert jika form tidak lengkap', async () => {
    const user = userEvent.setup()
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    render(<Booking />)

    const submitButton = screen.getByRole('button', { name: /kirim booking/i })
    await user.click(submitButton)

    expect(alertSpy).toHaveBeenCalledWith(
      expect.stringContaining('Mohon lengkapi data booking')
    )
    
    alertSpy.mockRestore()
  })

  // ========== TEST SUBMIT BOOKING ==========

  it('mengirim data booking ke API saat form valid', async () => {
    const user = userEvent.setup()
    
    global.fetch = vi.fn((url) => {
      if (url.includes('/services')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ 
            data: [{ id: 1, name: 'Servis Ringan', price: 50000 }]
          })
        })
      }
      if (url.includes('/bookings')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            data: {
              id: 1,
              booking_queue: '20260210-001',
              booking_date: '2026-02-10'
            }
          })
        })
      }
    })

    const { container } = render(<Booking />)

    // Isi form
    await user.type(screen.getByPlaceholderText(/nama lengkap/i), 'John Doe')
    await user.type(screen.getByPlaceholderText(/no hp/i), '08123456789')
    await user.type(screen.getByPlaceholderText(/motor/i), 'Vario 160')
    
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toContainHTML('Servis Ringan')
    })
    
    await user.selectOptions(screen.getByRole('combobox'), 'Servis Ringan')
    
    // 🔧 FIX: Gunakan container.querySelector
    const dateInput = container.querySelector('input[name="date"]')
    const timeInput = container.querySelector('input[name="time"]')
    
    if (dateInput) await user.type(dateInput, '2026-02-10')
    if (timeInput) await user.type(timeInput, '10:00')

    // Submit
    const submitButton = screen.getByRole('button', { name: /kirim booking/i })
    await user.click(submitButton)

    // Verifikasi API call
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/bookings'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('John Doe')
        })
      )
    })
  })

  it('menampilkan loading state saat submit', async () => {
    const user = userEvent.setup()
    
    // 🔧 FIX: Mock dengan delay yang lebih jelas
    let resolveBooking
    global.fetch = vi.fn((url) => {
      if (url.includes('/services')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ 
            data: [{ id: 1, name: 'Servis Ringan', price: 50000 }]
          })
        })
      }
      if (url.includes('/bookings')) {
        return new Promise(resolve => {
          resolveBooking = resolve
          // Delay 200ms untuk memastikan loading state terlihat
          setTimeout(() => {
            resolve({
              ok: true,
              json: () => Promise.resolve({
                data: { id: 1, booking_queue: '20260210-001' }
              })
            })
          }, 200)
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [] })
      })
    })

    const { container } = render(<Booking />)

    // Isi form LENGKAP (termasuk service & time)
    await user.type(screen.getByPlaceholderText(/nama lengkap/i), 'John')
    await user.type(screen.getByPlaceholderText(/no hp/i), '081234')
    await user.type(screen.getByPlaceholderText(/motor/i), 'Vario')
    
    // Tunggu services load
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toContainHTML('Servis Ringan')
    })
    
    await user.selectOptions(screen.getByRole('combobox'), 'Servis Ringan')
    
    const dateInput = container.querySelector('input[name="date"]')
    const timeInput = container.querySelector('input[name="time"]')
    
    if (dateInput) await user.type(dateInput, '2026-02-10')
    if (timeInput) await user.type(timeInput, '10:00') // 🔥 PENTING: isi time

    const submitButton = screen.getByRole('button', { name: /kirim booking/i })
    await user.click(submitButton)

    // Cek loading text
    expect(await screen.findByText(/sedang memproses/i)).toBeInTheDocument()
  })

  // ========== TEST SUCCESS STATE ==========

  it('menampilkan pesan sukses setelah booking berhasil', async () => {
    const user = userEvent.setup()
    
    global.fetch = vi.fn((url) => {
      if (url.includes('/services')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ 
            data: [{ id: 1, name: 'Servis Ringan', price: 50000 }]
          })
        })
      }
      if (url.includes('/bookings')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            data: {
              id: 1,
              booking_queue: '20260210-001',
              booking_date: '2026-02-10'
            }
          })
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [] })
      })
    })

    const { container } = render(<Booking />)

    // Isi dan submit form LENGKAP
    await user.type(screen.getByPlaceholderText(/nama lengkap/i), 'John')
    await user.type(screen.getByPlaceholderText(/no hp/i), '081234')
    await user.type(screen.getByPlaceholderText(/motor/i), 'Vario')
    
    // Tunggu services load
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toContainHTML('Servis Ringan')
    })
    
    await user.selectOptions(screen.getByRole('combobox'), 'Servis Ringan')
    
    const dateInput = container.querySelector('input[name="date"]')
    const timeInput = container.querySelector('input[name="time"]')
    
    if (dateInput) await user.type(dateInput, '2026-02-10')
    if (timeInput) await user.type(timeInput, '10:00') // 🔥 PENTING

    await user.click(screen.getByRole('button', { name: /kirim booking/i }))

    // Verifikasi success message
    await waitFor(() => {
      expect(screen.getByText(/booking berhasil!/i)).toBeInTheDocument()
      expect(screen.getByText(/20260210-001/)).toBeInTheDocument()
    })
  })

  it('menampilkan tombol Buat Booking Baru setelah sukses', async () => {
    const user = userEvent.setup()
    
    global.fetch = vi.fn((url) => {
      if (url.includes('/services')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ 
            data: [{ id: 1, name: 'Servis Ringan', price: 50000 }]
          })
        })
      }
      if (url.includes('/bookings')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            data: { id: 1, booking_queue: '20260210-001', booking_date: '2026-02-10' }
          })
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [] })
      })
    })

    const { container } = render(<Booking />)

    // Submit booking LENGKAP
    await user.type(screen.getByPlaceholderText(/nama lengkap/i), 'John')
    await user.type(screen.getByPlaceholderText(/no hp/i), '081234')
    await user.type(screen.getByPlaceholderText(/motor/i), 'Vario')
    
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toContainHTML('Servis Ringan')
    })
    
    await user.selectOptions(screen.getByRole('combobox'), 'Servis Ringan')
    
    const dateInput = container.querySelector('input[name="date"]')
    const timeInput = container.querySelector('input[name="time"]')
    
    if (dateInput) await user.type(dateInput, '2026-02-10')
    if (timeInput) await user.type(timeInput, '10:00') // 🔥 PENTING

    await user.click(screen.getByRole('button', { name: /kirim booking/i }))

    // Tunggu success screen
    await waitFor(() => {
      expect(screen.getByText(/booking berhasil!/i)).toBeInTheDocument()
    })

    // Klik tombol buat booking baru
    const newBookingButton = screen.getByRole('button', { name: /buat booking baru/i })
    await user.click(newBookingButton)

    // Form harus muncul lagi
    expect(screen.getByPlaceholderText(/nama lengkap/i)).toBeInTheDocument()
  })

  // ========== TEST ERROR HANDLING ==========

  it('menampilkan alert jika API error', async () => {
    const user = userEvent.setup()
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    global.fetch = vi.fn((url) => {
      if (url.includes('/services')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ 
            data: [{ id: 1, name: 'Servis Ringan', price: 50000 }]
          })
        })
      }
      if (url.includes('/bookings')) {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ message: 'Server error' })
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [] })
      })
    })

    const { container } = render(<Booking />)

    // Isi form LENGKAP dan submit
    await user.type(screen.getByPlaceholderText(/nama lengkap/i), 'John')
    await user.type(screen.getByPlaceholderText(/no hp/i), '081234')
    await user.type(screen.getByPlaceholderText(/motor/i), 'Vario')
    
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toContainHTML('Servis Ringan')
    })
    
    await user.selectOptions(screen.getByRole('combobox'), 'Servis Ringan')
    
    const dateInput = container.querySelector('input[name="date"]')
    const timeInput = container.querySelector('input[name="time"]')
    
    if (dateInput) await user.type(dateInput, '2026-02-10')
    if (timeInput) await user.type(timeInput, '10:00') // 🔥 PENTING

    await user.click(screen.getByRole('button', { name: /kirim booking/i }))

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        expect.stringContaining('Gagal mengirim booking')
      )
    })
    
    alertSpy.mockRestore()
  })

  it('log error jika fetch services gagal', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')))

    render(<Booking />)

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Gagal ambil layanan'),
        expect.any(Error)
      )
    })
    
    consoleErrorSpy.mockRestore()
  })
})