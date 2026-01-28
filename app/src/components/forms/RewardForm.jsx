import React from 'react';
import { Input, TextArea, Button } from '../ui';

const RewardForm = ({ form, onChange, onSubmit, onCancel, isEditing }) => {
  return (
    <div className="space-y-4">
      <Input
        label="Nama Reward"
        value={form.name || ''}
        onChange={(e) => onChange('name', e.target.value)}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Poin Dibutuhkan"
          type="number"
          value={form.points_needed || ''}
          onChange={(e) => onChange('points_needed', e.target.value)}
        />
        <Input
          label="Stok"
          type="number"
          value={form.stock || ''}
          onChange={(e) => onChange('stock', e.target.value)}
        />
      </div>
      <TextArea
        label="Deskripsi"
        value={form.description || ''}
        onChange={(e) => onChange('description', e.target.value)}
        rows={3}
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

export default RewardForm;
