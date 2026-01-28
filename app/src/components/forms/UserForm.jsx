import React from 'react';
import { Input, Button } from '../ui';

const UserForm = ({ form, onChange, onSubmit, onCancel }) => {
  return (
    <div className="space-y-4">
      <Input
        label="Nama"
        value={form.name || ''}
        onChange={(e) => onChange('name', e.target.value)}
        placeholder="Masukkan nama lengkap"
      />
      <Input
        label="Email"
        type="email"
        value={form.email || ''}
        onChange={(e) => onChange('email', e.target.value)}
        placeholder="contoh@email.com"
      />
      <Input
        label="Password"
        type="password"
        value={form.password || ''}
        onChange={(e) => onChange('password', e.target.value)}
        placeholder="Minimal 6 karakter"
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

export default UserForm;
