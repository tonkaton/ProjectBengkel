import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Plus, Trash2, Save, FileText, Package } from 'lucide-react';
import { formatRupiah } from '../../utils/formatters';

const ProposalForm = ({ onClose }) => {
  const { customers, vehicles, addProposal } = useData();
  
  // State Header Proposal
  const [formData, setFormData] = useState({
    UserId: '',
    VehicleId: '',
    title: '',
    admin_note: ''
  });

  // State Dynamic Items
  const [items, setItems] = useState([
    { description: '', type: 'Part', price: 0, qty: 1 }
  ]);

  const [loading, setLoading] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  // Filter Kendaraan
  useEffect(() => {
    if (formData.UserId) {
      const userVehicles = vehicles.filter(v => v.UserId === parseInt(formData.UserId));
      setFilteredVehicles(userVehicles);
      setFormData(prev => ({ ...prev, VehicleId: '' }));
    } else {
      setFilteredVehicles([]);
    }
  }, [formData.UserId, vehicles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', type: 'Part', price: 0, qty: 1 }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  const grandTotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.UserId || !formData.VehicleId || !formData.title) {
      alert("Mohon lengkapi data Customer, Kendaraan, dan Judul.");
      setLoading(false);
      return;
    }

    const payload = {
      ...formData,
      UserId: parseInt(formData.UserId),
      VehicleId: parseInt(formData.VehicleId),
      items: items.map(item => ({
        ...item,
        price: parseInt(item.price),
        qty: parseInt(item.qty)
      }))
    };

    const result = await addProposal(payload);
    setLoading(false);

    if (result.success) {
      onClose();
    } else {
      alert(result.message);
    }
  };

  // Custom Input Style biar pendek (Compact)
  const compactInputClass = "w-full bg-zinc-900 border border-zinc-700 text-white text-xs px-2 py-1.5 rounded focus:border-blue-500 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-zinc-200">
      
      {/* SECTION 1: HEADER INFO (Compact) */}
      <div className="bg-zinc-800/50 p-3 rounded-lg border border-zinc-700 space-y-3">
        <div className="flex items-center gap-2 border-b border-zinc-700 pb-2">
           <FileText className="text-blue-400" size={16} />
           <h3 className="font-bold text-white text-sm">Informasi Project</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Pelanggan */}
          <div>
            <label className="block text-[10px] font-medium text-zinc-400 mb-1">Pelanggan</label>
            <Select
              name="UserId"
              value={formData.UserId}
              onChange={handleChange}
              options={customers.map(c => ({ value: c.id, label: c.name }))}
              placeholder="Pilih Pelanggan"
              required
              className={`${compactInputClass} h-8 py-0`} // Force height
            />
          </div>

          {/* Kendaraan */}
          <div>
            <label className="block text-[10px] font-medium text-zinc-400 mb-1">Kendaraan</label>
            <Select
              name="VehicleId"
              value={formData.VehicleId}
              onChange={handleChange}
              options={filteredVehicles.map(v => ({ value: v.id, label: `${v.brand} - ${v.plate}` }))}
              placeholder={formData.UserId ? "Pilih Motor" : "Pilih Pelanggan..."}
              disabled={!formData.UserId}
              required
              className={`${compactInputClass} h-8 py-0`}
            />
          </div>

          {/* Judul */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-medium text-zinc-400 mb-1">Judul Project</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Contoh: Paket Bore Up Mio 150cc"
              required
              className={compactInputClass}
            />
          </div>

          {/* Catatan */}
          <div className="md:col-span-2">
            <input
              name="admin_note"
              value={formData.admin_note}
              onChange={handleChange}
              className={compactInputClass}
              placeholder="Catatan internal (opsional)..."
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: ITEMS (Compact Grid) */}
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-semibold text-zinc-300 text-sm flex items-center gap-1.5">
            <Package size={14} className="text-yellow-500" />
            Rincian Item
          </h3>
        </div>

        <div className="bg-zinc-900/50 rounded-lg border border-zinc-700 overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-zinc-800 border-b border-zinc-700 text-[10px] font-bold text-zinc-500 uppercase">
            <div className="col-span-6">Nama Item</div>
            <div className="col-span-2">Tipe</div>
            <div className="col-span-4 text-right">Harga & Qty</div>
          </div>

          {/* Rows */}
          <div className="max-h-64 overflow-y-auto custom-scrollbar p-1 space-y-1">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-center bg-zinc-800 p-1.5 rounded border border-zinc-700/50 hover:border-zinc-600 group">
                
                {/* Deskripsi */}
                <div className="col-span-6">
                  <input
                    className="w-full bg-transparent text-zinc-200 text-xs placeholder-zinc-600 focus:outline-none focus:text-white"
                    placeholder="Nama barang..."
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    required
                  />
                </div>

                {/* Tipe */}
                <div className="col-span-2">
                   <select
                      className={`w-full appearance-none bg-transparent text-[10px] font-medium focus:outline-none cursor-pointer ${
                        item.type === 'Part' ? 'text-orange-400' : 'text-blue-400'
                      }`}
                      value={item.type}
                      onChange={(e) => handleItemChange(index, 'type', e.target.value)}
                    >
                      <option value="Part" className="bg-zinc-800">📦 Barang</option>
                      <option value="Service" className="bg-zinc-800">🔧 Jasa</option>
                    </select>
                </div>

                {/* Harga & Qty */}
                <div className="col-span-4 flex items-center gap-1 justify-end">
                  <input
                    type="number"
                    className="w-20 bg-zinc-900 text-zinc-200 text-xs px-1.5 py-1 rounded border border-zinc-700 text-right focus:border-blue-500 focus:outline-none"
                    placeholder="0"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    min="0"
                  />
                  <span className="text-zinc-600 text-[10px]">x</span>
                  <input
                    type="number"
                    className="w-10 bg-zinc-900 text-zinc-200 text-xs px-1 py-1 rounded border border-zinc-700 text-center focus:border-blue-500 focus:outline-none"
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                    min="1"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-1 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                    disabled={items.length === 1}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            
            {/* Add Button */}
            <button
              type="button"
              onClick={addItem}
              className="w-full py-1.5 mt-1 border border-dashed border-zinc-700 rounded text-zinc-500 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-1 text-xs"
            >
              <Plus size={12} /> Tambah Item
            </button>
          </div>
        </div>

        {/* Footer Total & Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-700">
           <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">Total:</span>
              <span className="text-lg font-bold text-blue-400">
                {formatRupiah(grandTotal)}
              </span>
           </div>
           
           <div className="flex gap-2">
             <Button variant="secondary" onClick={onClose} size="sm" type="button" className="h-8 text-xs border-zinc-600 text-zinc-300">
               Batal
             </Button>
             <Button type="submit" isLoading={loading} size="sm" icon={Save} className="h-8 text-xs bg-blue-600 hover:bg-blue-500">
               Simpan
             </Button>
           </div>
        </div>
      </div>
    </form>
  );
};

export default ProposalForm;