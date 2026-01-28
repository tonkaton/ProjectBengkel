import { MapPin, Phone, Clock } from 'lucide-react';
import { Container } from '../layout';
import { Card, Button } from '../ui';
import { COMPANY } from '../../constants';

/**
 * Contact info card component
 */
function ContactCard({ icon: Icon, title, children, emoji }) {
  return (
    <Card variant="solid" className="p-5 sm:p-6 hover:shadow-2xl">
      <div className="flex items-start space-x-3 mb-3">
        {Icon ? (
          <div className="bg-gray-700 p-2.5 rounded-lg flex-shrink-0">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        ) : (
          <div className="text-2xl sm:text-3xl">{emoji}</div>
        )}
        <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
      </div>
      {children}
    </Card>
  );
}

/**
 * Contact section component
 */
export default function Contact() {
  return (
    <section id="contact" className="min-h-screen bg-black py-8 sm:py-12 px-4">
      <Container size="sm">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-gray-300 text-base sm:text-lg">
            Kami siap melayani kebutuhan servis motor Anda
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {/* Address Card */}
          <ContactCard icon={MapPin} title="Alamat Bengkel">
            <p className="text-gray-200 text-sm sm:text-base">{COMPANY.address}</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Mudah diakses dari berbagai area Jakarta
            </p>
          </ContactCard>

          {/* Phone Card */}
          <ContactCard icon={Phone} title="Telepon">
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="text-gray-200 text-base sm:text-lg font-semibold hover:text-yellow-400 transition-colors block"
            >
              {COMPANY.phone}
            </a>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Hubungi kami untuk konsultasi gratis
            </p>
          </ContactCard>

          {/* Operating Hours Card */}
          <ContactCard icon={Clock} title="Jam Operasional">
            <p className="text-gray-200 text-sm sm:text-base">
              {COMPANY.operationalHours.weekday}
            </p>
            <p className="text-gray-200 text-sm sm:text-base">
              {COMPANY.operationalHours.weekend}
            </p>
          </ContactCard>

          {/* Professional Service Card */}
          <ContactCard emoji="🏍️" title="Layanan Profesional">
            <p className="text-gray-300 text-sm sm:text-base">
              Servis cepat, berkualitas, dan terpercaya
            </p>
          </ContactCard>
        </div>

        {/* CTA Section */}
        <Card
          variant="solid"
          className="p-8 sm:p-10 text-center shadow-2xl"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Butuh Bantuan Segera?
          </h3>
          <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8">
            Tim kami siap membantu Anda dengan layanan servis motor terbaik
          </p>

         <a href={`https://wa.me/${COMPANY.whatsapp}?text=Halo%20saya%20ingin%20bertanya%20tentang%20servis%20motor`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 shadow-xl"><Phone className="w-5 h-5 mr-2" />
         Hubungi via WhatsApp
        </a>
        
        </Card>
      </Container>
    </section>
  );
}
