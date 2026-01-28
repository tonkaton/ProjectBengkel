import React from 'react';
import { Input, Button } from '../ui';

const ServiceForm = ({ form, onChange, onSubmit, onCancel, isEditing }) => {
  return (
    <div className="space-y-4">
      <Input
        label="Nama Layanan"
        value={form.name || ''}
        onChange={(e) => onChange('name', e.target.value)}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Harga"
          type="number"
          value={form.price || ''}
          onChange={(e) => onChange('price', e.target.value)}
        />
        <Input
          label="Poin"
          type="number"
          value={form.points || ''}
          onChange={(e) => onChange('points', e.target.value)}
        />
      </div>
      <Input
        label="Durasi"
        value={form.duration || ''}
        onChange={(e) => onChange('duration', e.target.value)}
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

export default ServiceForm;
