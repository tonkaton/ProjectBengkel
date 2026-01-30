import React, { useState } from 'react';
import { MessageSquare, X, Wrench, Calendar, ChevronRight } from 'lucide-react';
import { formatDate } from '../../utils/formatters'; 

const ServiceAssistant = ({ maintenanceData, onViewDetail }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Kalo ga ada data maintenance, widget ga usah muncul
  if (!maintenanceData) return null;

  // Handler biar widget nutup dulu baru pindah halaman
  const handleDetailClick = () => {
    setIsOpen(false);
    if (onViewDetail) onViewDetail();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      
      {/* --- EXPANDED WINDOW (CHAT BUBBLE) --- */}
      <div 
        className={`
          transition-all duration-300 origin-bottom-right transform
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'}
          w-[90vw] md:w-[350px] bg-zinc-900 border border-zinc-700 shadow-2xl rounded-2xl overflow-hidden
        `}
      >
        {/* Header Widget */}
        <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 p-4 border-b border-zinc-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-yellow-500 flex items-center justify-center shadow-lg">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-800 rounded-full"></span>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Sintink Bot</h4>
              <p className="text-xs text-zinc-400">Reminder Servis</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="p-4 bg-zinc-950/50 space-y-4 max-h-[60vh] overflow-y-auto">
          
          {/* Bubble Percakapan */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center">
               <Wrench className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none text-sm text-zinc-300 shadow-sm border border-zinc-700/50">
              <p>Halo boss! 👋 Jangan lupa ya, motor kesayangan lu ada jadwal bentar lagi.</p>
            </div>
          </div>

          {/* Card Detail Servis */}
          <div className="ml-11 bg-zinc-900 border border-yellow-500/30 rounded-xl p-4 relative overflow-hidden group">
             {/* Glow Effect */}
             <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-500/10 blur-xl rounded-full"></div>
             
             <div className="relative z-10">
                <h5 className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-2">Upcoming Schedule</h5>
                
                <h3 className="text-white font-bold text-lg mb-1">{maintenanceData.motor_name}</h3>
                <p className="text-zinc-400 text-xs mb-3 flex items-center gap-1">
                   <Wrench className="w-3 h-3" />
                   {maintenanceData.note || 'General Checkup'}
                </p>

                <div className="bg-zinc-950/80 rounded-lg p-3 border border-zinc-800 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-zinc-500" />
                      <span className="text-zinc-200 font-mono font-bold">
                        {formatDate(maintenanceData.next_service)}
                      </span>
                   </div>
                </div>
             </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
             <button 
                onClick={handleDetailClick}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs py-2 px-4 rounded-full flex items-center gap-1 transition-colors"
             >
                Lihat Detail <ChevronRight className="w-3 h-3" />
             </button>
          </div>
          
        </div>
      </div>

      {/* --- LAUNCHER BUTTON --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative group flex items-center justify-center w-14 h-14 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300 border-2 border-zinc-800
          ${isOpen ? 'bg-zinc-800 rotate-90' : 'bg-gradient-to-br from-red-600 to-yellow-500 hover:scale-110 rotate-0'}
        `}
      >
        {/* Icon Toggle */}
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 text-white fill-white/20" />
            {/* Notification Dot */}
            <span className="absolute top-0 right-0 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500 border-2 border-zinc-900"></span>
            </span>
          </>
        )}
      </button>

    </div>
  );
};

export default ServiceAssistant;