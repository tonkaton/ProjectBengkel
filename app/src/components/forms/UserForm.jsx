import React from 'react';
import { Input, Button, Select } from '../ui'; // Pastikan import Select juga (kalau ada di UI folder)

// Tambahin prop 'isEdit' biar form tau lagi mode Edit atau Tambah
const UserForm = ({ form, onChange, onSubmit, onCancel, isEdit = false }) => {
  return (
    <div className="space-y-4">
      <Input
        label="Nama Lengkap"
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
        disabled={isEdit} // Opsional: Biasanya email dikunci pas edit biar gak kacau data uniknya
      />

      {/* 👇 TAMBAHAN: PILIHAN ROLE */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-zinc-400">Role</label>
        {/* Kalau di ui/index.js ada component Select pake itu, kalau ga ada pake <select> biasa class tailwind */}
        <select
          value={form.role || 'user'}
          onChange={(e) => onChange('role', e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-yellow-500"
        >
          <option value="user">User (Pelanggan)</option>
          <option value="admin">Admin (Pengelola)</option>
        </select>
      </div>

      <div className="space-y-1">
        <Input
          label="Password"
          type="password"
          value={form.password || ''}
          onChange={(e) => onChange('password', e.target.value)}
          placeholder={isEdit ? "Kosongkan jika tidak ingin mengubah" : "Minimal 6 karakter"}
        />
        {isEdit && (
          <p className="text-xs text-yellow-500/80 italic">
            * Isi hanya jika ingin mengganti password user ini.
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="secondary" onClick={onCancel} type="button">
          Batal
        </Button>
        <Button onClick={onSubmit} type="button">
          {isEdit ? 'Simpan Perubahan' : 'Tambah User'}
        </Button>
      </div>
    </div>
  );
};

export default UserForm;