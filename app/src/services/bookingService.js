import { api } from './api';

const bookingService = {
  // Ambil semua booking (Admin)
  getAll: (token) => api.get('/bookings', token),

  // Kirim booking (Public/Guest) - Token null
  create: (data) => api.post('/bookings', data, null),

  // Proses booking jadi member (Admin)
  process: (id, data, token) => api.post(`/bookings/${id}/process`, data, token),
};

export default bookingService;