import { Wrench, Droplet, Sparkles, ShieldCheck, Cog } from 'lucide-react';

/**
 * Get service icon component based on service name
 * @param {string} name - Service name
 * @param {number} size - Icon size in pixels
 * @returns {JSX.Element} - Lucide icon component
 */
export function getServiceIcon(name, size = 40) {
  const normalizedName = name.toLowerCase();
  
  if (normalizedName.includes('oli')) {
    return <Droplet size={size} />;
  }
  if (normalizedName.includes('servis') || normalizedName.includes('rutin')) {
    return <Wrench size={size} />;
  }
  if (normalizedName.includes('bore') || normalizedName.includes('mesin')) {
    return <Sparkles size={size} />;
  }
  if (normalizedName.includes('cek') || normalizedName.includes('rem')) {
    return <ShieldCheck size={size} />;
  }
  
  return <Cog size={size} />;
}
