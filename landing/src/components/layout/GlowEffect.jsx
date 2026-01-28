import PropTypes from 'prop-types';
import { cn } from '../../utils';

/**
 * Glow background effects component
 */
export function GlowEffect({ variant = 'hero', className = '' }) {
  const effects = {
    hero: (
      <>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-red-700/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-red-600/30 blur-[120px] rounded-full" />
      </>
    ),
    section: (
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre-v2.png')]" />
    ),
    texture: (
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />
    ),
  };

  return (
    <div className={cn('pointer-events-none', className)}>
      {effects[variant]}
    </div>
  );
}

GlowEffect.propTypes = {
  variant: PropTypes.oneOf(['hero', 'section', 'texture']),
  className: PropTypes.string,
};
