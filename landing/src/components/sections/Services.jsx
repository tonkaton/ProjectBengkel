import { useState, useEffect } from 'react';
import { Container } from '../layout';
import { Wrench, Droplets, Disc, Settings, Sparkles, Zap, Gauge } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getIconMeta(name) {
  const lower = (name || '').toLowerCase();
  if (lower.includes('oli')) return { Icon: Droplets, cls: 'bg-amber-100 text-amber-600' };
  if (lower.includes('ban')) return { Icon: Disc, cls: 'bg-blue-100 text-blue-600' };
  if (lower.includes('rem')) return { Icon: Disc, cls: 'bg-red-100 text-red-600' };
  if (lower.includes('servis') || lower.includes('tune')) return { Icon: Wrench, cls: 'bg-indigo-100 text-indigo-600' };
  if (lower.includes('cuci')) return { Icon: Sparkles, cls: 'bg-cyan-100 text-cyan-600' };
  if (lower.includes('cvt')) return { Icon: Settings, cls: 'bg-orange-100 text-orange-600' };
  if (lower.includes('aki') || lower.includes('listrik')) return { Icon: Zap, cls: 'bg-yellow-100 text-yellow-600' };
  return { Icon: Gauge, cls: 'bg-slate-200 text-slate-600' };
}

const formatRupiah = (num) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);

function ServiceCard({ service }) {
  const { Icon, cls } = getIconMeta(service.name);

  return (
    <div className="group rounded-4xl border border-white/70 bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-soft-lg">
      <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${cls} shadow-soft-sm transition-transform duration-300 group-hover:-translate-y-0.5`}>
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="text-lg font-semibold leading-tight text-ink">{service.name}</h3>

      <p className="mt-2 font-mono text-lg font-semibold text-accent">
        {formatRupiah(service.price)}
      </p>

      <div className="mt-5 flex items-center gap-2 border-t border-black/5 pt-4 text-xs font-medium text-muted">
        <span className="h-2 w-2 rounded-full bg-ok" />
        Estimasi: {service.duration || '60 menit'}
      </div>
    </div>
  );
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/services`);
      if (!response.ok) throw new Error(`Error ${response.status}: Gagal ambil data`);
      const result = await response.json();
      if (Array.isArray(result.data)) setServices(result.data);
      else if (Array.isArray(result)) setServices(result);
      else setServices([]);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <section id="services" className="bg-tintBlue px-4 py-24">
      <Container>
        <div className="mb-16 text-center">
          <span className="eyebrow">Daftar layanan</span>
          <h2 className="mt-3 font-display text-5xl tracking-wide text-ink md:text-6xl">
            LAYANAN <span className="text-accent">BENGKEL</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Daftar harga transparan dan estimasi waktu pengerjaan yang akurat langsung dari
            sistem kami.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-accent" />
          </div>
        ) : error ? (
          <div className="mx-auto max-w-lg rounded-4xl border border-white/70 bg-card p-8 text-center shadow-soft">
            <p className="mb-4 font-medium text-accent">Gagal memuat layanan dari server.</p>
            <p className="mb-6 rounded-xl bg-base p-2 font-mono text-sm text-muted shadow-soft-in-sm">{error}</p>
            <button
              onClick={fetchServices}
              className="rounded-full bg-accent px-6 py-2.5 font-semibold text-white shadow-[0_8px_18px_rgba(224,70,59,0.35)] transition hover:bg-accentDark active:scale-[0.98]"
            >
              Coba lagi
            </button>
          </div>
        ) : services.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-4xl border border-white/70 bg-card p-10 text-center shadow-soft">
            <p className="text-muted">Belum ada layanan yang tersedia di database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard key={service.id || index} service={service} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
