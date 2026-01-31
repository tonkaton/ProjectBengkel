import { motion } from "framer-motion";
import { Button } from "../ui";
import { Container } from "../layout";
import { COMPANY, ANIMATION } from "../../constants";
import botakengineImage from "../../../assets/botakenginespeed.png";

/**
 * About section component
 */
export default function About() {
  return (
    <section
      id="about"
      className="bg-gradient-to-b from-black to-gray-900 text-white py-24 px-6 md:px-12"
    >
      <Container className="grid md:grid-cols-2 gap-12 items-center">
        {/* Workshop Image */}
        <motion.img
          src={botakengineImage}
          alt="botakenginespeed"
          className="rounded-2xl shadow-2xl border border-gray-700 hover:border-yellow-400 hover:scale-105 transition-transform duration-500"
          initial={ANIMATION.fadeInLeft.initial}
          whileInView={ANIMATION.fadeInLeft.whileInView}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* About Text */}
        <motion.div
          initial={ANIMATION.fadeInRight.initial}
          whileInView={ANIMATION.fadeInRight.whileInView}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">
            Tentang Kami <span className="text-red-500"></span>
          </h2>

          <p className="text-gray-300 leading-relaxed mb-5">
            <span className="text-yellow-400 font-semibold">
              {COMPANY.name}
            </span>
          </p>
          <p className="text-gray-300 leading-relaxed mb-5">
            hadir untuk memberikan pelayanan terbaik bagi semua jenis motor.
            Kami menggunakan peralatan modern dan tenaga ahli berpengalaman
            untuk memastikan performa motor Anda selalu optimal di setiap
            perjalanan
          </p>

          <p className="text-gray-300 leading-relaxed mb-8">
            Dengan fokus pada{" "}
            <span className="text-red-500 font-semibold">kualitas</span> dan{" "}
            <span className="text-yellow-400 font-semibold">
              kepuasan pelanggan
            </span>
            , kami percaya setiap motor layak mendapatkan perhatian terbaik.
          </p>

          <Button href="#services" variant="danger" animate>
            Jelajahi Layanan Kami
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
