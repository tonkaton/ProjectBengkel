import React from 'react';
import { Input, Select, Button } from '../ui';
import { formatRupiah } from '../../utils/formatters';

const TransactionForm = ({
  form,
  onChange,
  onSubmit,
  onCancel,
  customers,
  services,
}) => {
  const customerOptions = customers.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const serviceOptions = services.map((s) => ({
    value: s.id,
    label: `${s.name} - ${formatRupiah(s.price)} - ${s.points} poin`,
  }));

  const statusOptions = [
    { value: 'Menunggu', label: 'Menunggu' },
    { value: 'Proses', label: 'Proses' },
    { value: 'Selesai', label: 'Selesai' },
  ];

  return (
    <div className="space-y-4">
      <Select
        label="Pelanggan"
        value={form.customerId || ''}
        onChange={(e) => onChange('customerId', e.target.value)}
        options={customerOptions}
        placeholder="Pilih Pelanggan"
      />
      <Select
        label="Layanan"
        value={form.serviceId || ''}
        onChange={(e) => onChange('serviceId', e.target.value)}
        options={serviceOptions}
        placeholder="Pilih Layanan"
      />
      <Select
        label="Status"
        value={form.status || 'Menunggu'}
        onChange={(e) => onChange('status', e.target.value)}
        options={statusOptions}
        placeholder="Pilih Status"
      />
      <Input
        label="Catatan"
        value={form.note || ''}
        onChange={(e) => onChange('note', e.target.value)}
      />
      <div className="flex justify-end space-x-3">
        <Button variant="secondary" onClick={onCancel}>
          Batal
        </Button>
        <Button onClick={onSubmit}>Simpan</Button>
      </div>
    </div>
  );
};

export default TransactionForm;
