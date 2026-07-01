import { MapPin, Phone, Clock, Bike, MessageCircle } from 'lucide-react';
import { Container } from '../layout';
import { COMPANY } from '../../constants';

function ContactCard({ icon: Icon, chip, title, children }) {
  return (
    <div className="rounded-4xl border border-line bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-soft-lg">
      <div className="mb-3 flex items-center gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${chip} shadow-soft-sm`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
      </div>
      {children}
    </div>
  );
}

/**
 * Contact section — Soft UI (tint cream)
 */
export default function Contact() {
  return (
    <section id="contact" className="bg-tintCream px-4 py-24">
      <Container size="sm">
        <div className="mb-12 text-center">
          <span className="eyebrow">Hubungi kami</span>
          <h2 className="mt-3 font-display text-5xl tracking-wide text-ink md:text-6xl">
            KONTAK &amp; <span className="text-accent">LOKASI</span>
          </h2>
          <p className="mt-4 text-ink2">Kami siap melayani kebutuhan servis motor Anda.</p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <ContactCard icon={MapPin} chip="bg-blue-100 text-blue-600" title="Alamat bengkel">
            <p className="text-sm text-ink2">{COMPANY.address}</p>
            <p className="mt-1 text-xs text-muted">Mudah diakses dari berbagai area.</p>
          </ContactCard>

          <ContactCard icon={Phone} chip="bg-emerald-100 text-emerald-600" title="Telepon">
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="block font-mono text-lg font-semibold text-ink transition hover:text-accent"
            >
              {COMPANY.phone}
            </a>
            <p className="mt-1 text-xs text-muted">Hubungi kami untuk konsultasi gratis.</p>
          </ContactCard>

          <ContactCard icon={Clock} chip="bg-amber-100 text-amber-600" title="Jam operasional">
            <p className="text-sm text-ink2">{COMPANY.operationalHours.weekday}</p>
            <p className="text-sm text-ink2">{COMPANY.operationalHours.weekend}</p>
          </ContactCard>

          <ContactCard icon={Bike} chip="bg-red-100 text-red-600" title="Layanan profesional">
            <p className="text-sm text-ink2">Servis cepat, berkualitas, dan terpercaya.</p>
          </ContactCard>
        </div>

        <div className="rounded-4xl border border-line bg-card p-8 text-center shadow-soft-lg sm:p-10">
          <h3 className="font-display text-3xl tracking-wide text-ink">BUTUH BANTUAN SEGERA?</h3>
          <p className="mx-auto mt-3 max-w-md text-ink2">
            Tim kami siap membantu Anda dengan layanan servis motor terbaik.
          </p>
          <a
            href={`https://wa.me/${COMPANY.whatsapp}?text=Halo%20saya%20ingin%20bertanya%20tentang%20servis%20motor`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ok px-9 py-3.5 font-semibold text-white shadow-[0_10px_24px_rgba(59,167,118,0.35)] transition hover:brightness-95 active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" />
            Hubungi via WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
