import { useState, useEffect } from 'react';
import { Container } from '../layout';
import { Card } from '../ui';
import { Wrench, Droplets, Disc, Settings, Sparkles, Zap, Gauge } from 'lucide-react'; 

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
function ServiceCard({ service }) {
  const getIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('oli')) return <Droplets className="w-10 h-10 text-yellow-500" />;
    if (lower.includes('ban')) return <Disc className="w-10 h-10 text-yellow-500" />;
    if (lower.includes('rem')) return <Disc className="w-10 h-10 text-red-500" />;
    if (lower.includes('servis') || lower.includes('tune')) return <Wrench className="w-10 h-10 text-blue-500" />;
    if (lower.includes('cuci')) return <Sparkles className="w-10 h-10 text-cyan-400" />;
    if (lower.includes('cvt')) return <Settings className="w-10 h-10 text-orange-500" />;
    if (lower.includes('aki') || lower.includes('listrik')) return <Zap className="w-10 h-10 text-yellow-400" />;
    return <Gauge className="w-10 h-10 text-gray-400" />;
  };

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(num);
  };

  return (
    <Card className="p-8 group hover:border-yellow-500/50 transition-all duration-300 bg-zinc-900 border-zinc-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 blur-3xl rounded-full -translate-y-12 translate-x-12 group-hover:bg-yellow-500/20 transition-all duration-500"></div>

      <div className="mb-6 p-3 bg-zinc-950/50 rounded-xl w-fit border border-zinc-800 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/50">
        {getIcon(service.name)}
      </div>

      <h3 className="text-xl font-bold text-white mb-2 leading-tight">{service.name}</h3>
      
      <p className="text-yellow-400 font-mono font-bold text-lg mb-4">
        {formatRupiah(service.price)}
      </p>

      <div className="pt-4 border-t border-zinc-800 flex items-center gap-2 text-zinc-500 text-xs font-medium">
        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
        Estimasi: {service.duration || '60 menit'}
      </div>
    </Card>
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
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: Gagal ambil data`);
      }
      
      const result = await response.json();
      
      if (Array.isArray(result.data)) {
        setServices(result.data);
      } else if (Array.isArray(result)) {
        setServices(result);
      } else {
        setServices([]);
      }

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
    <section id="services" className="bg-black py-24 px-4 border-t border-zinc-900">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Layanan Bengkel <span className="text-yellow-500">Resmi</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Daftar harga transparan dan estimasi waktu pengerjaan yang akurat langsung dari sistem kami.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : error ? (
          <div className="text-center bg-red-900/10 border border-red-900/30 p-8 rounded-xl max-w-lg mx-auto">
            <p className="text-red-400 mb-4 font-medium">Gagal memuat layanan server lokal.</p>
            <p className="text-zinc-600 text-sm mb-6 font-mono bg-black/30 p-2 rounded">{error}</p>
            <button 
                onClick={fetchServices}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-red-900/20"
            >
                Coba Lagi
            </button>
          </div>
        ) : services.length === 0 ? (
           <div className="text-center py-16 bg-zinc-900/30 border border-zinc-800 rounded-2xl">
              <p className="text-zinc-500">Belum ada layanan yang tersedia di database.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id || index}
                service={service}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}