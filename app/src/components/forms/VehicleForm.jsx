import React from 'react';
import { Input, Select, Button } from '../ui';

const VehicleForm = ({ form, onChange, onSubmit, onCancel, customers, isAdmin }) => {
  const customerOptions = customers?.map((c) => ({
    value: c.id,
    label: c.name,
  })) || [];

  return (
    <div className="space-y-4">
      {isAdmin && (
        <Select
          label="Pemilik Motor"
          value={form.customerId || ''}
          onChange={(e) => onChange('customerId', e.target.value)}
          options={customerOptions}
          placeholder="Pilih Pelanggan"
        />
      )}
      <Input
        label="Merek"
        value={form.brand || ''}
        onChange={(e) => onChange('brand', e.target.value)}
      />
      <Input
        label="Model"
        value={form.model || ''}
        onChange={(e) => onChange('model', e.target.value)}
      />
      <Input
        label="Plat Nomor"
        value={form.plate || ''}
        onChange={(e) => onChange('plate', e.target.value)}
      />
      <Input
        label="Tahun"
        type="number"
        value={form.year || ''}
        onChange={(e) => onChange('year', e.target.value)}
      />
      <Input
        label="Warna"
        value={form.color || ''}
        onChange={(e) => onChange('color', e.target.value)}
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

export default VehicleForm;
