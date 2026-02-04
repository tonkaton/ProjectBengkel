import { COMPANY } from '../../constants';
import { getCurrentYear } from '../../utils';

/**
 * Footer component
 */
export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-black via-gray-900 to-gray-800 text-gray-300 text-center py-6 border-t border-gray-700">
      <p className="text-sm tracking-wide">
        © {getCurrentYear()}{' '}
        <span className="text-yellow-400 font-semibold">{COMPANY.name}</span>.
        {' '}Semua hak dilindungi.
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Dibuat oleh{' '}
        <span className="text-red-500 font-semibold">Codiroom</span>.
      </p>
    </footer>
  );
}
