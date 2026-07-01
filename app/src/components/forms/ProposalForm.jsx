import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import Button from '../ui/Button';
import Select from '../ui/Select';
import { Plus, Trash2, Save, FileText, Package } from 'lucide-react';
import { formatRupiah } from '../../utils/formatters';

const ProposalForm = ({ onClose }) => {
  const { customers, vehicles, addProposal } = useData();

  const [formData, setFormData] = useState({ UserId: '', VehicleId: '', title: '', admin_note: '' });
  const [items, setItems] = useState([{ description: '', type: 'Part', price: 0, qty: 1 }]);
  const [loading, setLoading] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  useEffect(() => {
    if (formData.UserId) {
      const userVehicles = vehicles.filter((v) => v.UserId === parseInt(formData.UserId));
      setFilteredVehicles(userVehicles);
      setFormData((prev) => ({ ...prev, VehicleId: '' }));
    } else {
      setFilteredVehicles([]);
    }
  }, [formData.UserId, vehicles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { description: '', type: 'Part', price: 0, qty: 1 }]);
  const removeItem = (index) => {
    if (items.length > 1) setItems(items.filter((_, i) => i !== index));
  };

  const grandTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.UserId || !formData.VehicleId || !formData.title) {
      alert('Mohon lengkapi data Customer, Kendaraan, dan Judul.');
      setLoading(false);
      return;
    }
    const payload = {
      ...formData,
      UserId: parseInt(formData.UserId),
      VehicleId: parseInt(formData.VehicleId),
      items: items.map((item) => ({ ...item, price: parseInt(item.price), qty: parseInt(item.qty) })),
    };
    const result = await addProposal(payload);
    setLoading(false);
    if (result.success) onClose();
    else alert(result.message);
  };

  const fieldClass = 'w-full rounded-2xl bg-base px-4 py-3 text-sm text-ink shadow-soft-in outline-none placeholder:text-muted';
  const labelClass = 'mb-1.5 block text-xs font-medium text-ink2';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* SECTION 1: HEADER INFO */}
      <div className="space-y-3 rounded-2xl bg-base p-4 shadow-soft-in-sm">
        <div className="flex items-center gap-2 border-b border-hair pb-2">
          <FileText className="text-blue-500" size={16} />
          <h3 className="text-sm font-semibold text-ink">Informasi Project</h3>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label className={labelClass}>Pelanggan</label>
            <Select
              name="UserId"
              value={formData.UserId}
              onChange={handleChange}
              options={customers.map((c) => ({ value: c.id, label: c.name }))}
              placeholder="Pilih Pelanggan"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Kendaraan</label>
            <Select
              name="VehicleId"
              value={formData.VehicleId}
              onChange={handleChange}
              options={filteredVehicles.map((v) => ({ value: v.id, label: `${v.brand} - ${v.plate}` }))}
              placeholder={formData.UserId ? 'Pilih Motor' : 'Pilih Pelanggan...'}
              disabled={!formData.UserId}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Judul Project</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Contoh: Paket Bore Up Mio 150cc"
              required
              className={fieldClass}
            />
          </div>

          <div className="md:col-span-2">
            <input
              name="admin_note"
              value={formData.admin_note}
              onChange={handleChange}
              className={fieldClass}
              placeholder="Catatan internal (opsional)..."
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: ITEMS */}
      <div className="space-y-2">
        <h3 className="flex items-center gap-1.5 px-1 text-sm font-semibold text-ink2">
          <Package size={14} className="text-amber-500" />
          Rincian Item
        </h3>

        <div className="space-y-2 rounded-2xl bg-base p-3 shadow-soft-in-sm">
          <div className="grid grid-cols-12 gap-2 px-2 text-[10px] font-bold uppercase text-muted">
            <div className="col-span-6">Nama Item</div>
            <div className="col-span-2">Tipe</div>
            <div className="col-span-4 text-right">Harga &amp; Qty</div>
          </div>

          <div className="max-h-64 space-y-2 overflow-y-auto">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 items-center gap-2 rounded-2xl bg-card p-2 shadow-soft-sm">
                <div className="col-span-6">
                  <input
                    className="w-full bg-transparent text-xs text-ink placeholder:text-muted focus:outline-none"
                    placeholder="Nama barang..."
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <select
                    className={`w-full cursor-pointer appearance-none bg-transparent text-[10px] font-semibold focus:outline-none ${
                      item.type === 'Part' ? 'text-orange-600' : 'text-blue-600'
                    }`}
                    value={item.type}
                    onChange={(e) => handleItemChange(index, 'type', e.target.value)}
                  >
                    <option value="Part">📦 Barang</option>
                    <option value="Service">🔧 Jasa</option>
                  </select>
                </div>

                <div className="col-span-4 flex items-center justify-end gap-1">
                  <input
                    type="number"
                    className="w-20 rounded-lg bg-base px-1.5 py-1 text-right text-xs text-ink shadow-soft-in-sm focus:outline-none"
                    placeholder="0"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    min="0"
                  />
                  <span className="text-[10px] text-muted">x</span>
                  <input
                    type="number"
                    className="w-10 rounded-lg bg-base px-1 py-1 text-center text-xs text-ink shadow-soft-in-sm focus:outline-none"
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                    min="1"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    disabled={items.length === 1}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addItem}
              className="flex w-full items-center justify-center gap-1 rounded-2xl border border-dashed border-hair py-2 text-xs text-muted transition-all hover:border-accent/40 hover:text-accent"
            >
              <Plus size={12} /> Tambah Item
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-hair pt-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">Total:</span>
            <span className="font-mono text-lg font-bold text-accent">{formatRupiah(grandTotal)}</span>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" onClick={onClose} size="sm" type="button">
              Batal
            </Button>
            <Button type="submit" isLoading={loading} size="sm" icon={Save}>
              Simpan
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProposalForm;
