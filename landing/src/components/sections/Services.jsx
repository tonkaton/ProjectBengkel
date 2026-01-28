import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, SectionTitle } from '../layout';
import { Card, LoadingSection } from '../ui';
import { API_URL, ANIMATION } from '../../constants';
import { formatCurrency, getServiceIcon } from '../../utils';

/**
 * Service card component
 */
function ServiceCard({ service, index }) {
  return (
    <Card
      animate
      hoverScale
      delay={index * 0.1}
      className="p-8 group"
    >
      <div className="text-yellow-400 mb-4 group-hover:rotate-12 transition-transform duration-300">
        {getServiceIcon(service.name)}
      </div>
      <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
      <p className="text-gray-300 text-sm mb-1">
        {formatCurrency(service.price)}
      </p>
      <p className="text-gray-400 text-xs italic">
        Durasi Estimasi: {service.duration} Menit
      </p>
    </Card>
  );
}

/**
 * Services section component
 */
export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/services`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        
        const result = await response.json();
        setServices(result.data || []);
      } catch (err) {
        console.error('Gagal mengambil data layanan:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section
      id="services"
      className="bg-gradient-to-b from-gray-900 to-black text-white py-24 px-6 md:px-12"
    >
      <Container className="text-center">
        <SectionTitle
          title="Layanan Kami 🔧"
          subtitle="Daftar layanan resmi dari database Sintink Garage."
        />

        {loading ? (
          <LoadingSection text="Menghubungkan ke database..." />
        ) : error ? (
          <div className="text-center text-red-400 py-8">
            Gagal memuat layanan. Silakan coba lagi nanti.
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id || index}
                service={service}
                index={index}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
