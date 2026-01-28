import React, { useState, useEffect } from 'react';
import { Input, Select, Button } from '../ui';

const MaintenanceForm = ({
  form,
  onChange,
  onSubmit,
  onCancel,
  customers,
  vehicles,
}) => {
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  // Filter vehicles based on selected customer
  useEffect(() => {
    if (form.customerId) {
      const customerVehicles = vehicles.filter(
        (v) => v.UserId === Number(form.customerId)
      );
      setFilteredVehicles(customerVehicles);
    } else {
      setFilteredVehicles([]);
    }
  }, [form.customerId, vehicles]);

  const customerOptions = customers.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const vehicleOptions = filteredVehicles.map((v) => ({
    value: v.id,
    label: `${v.brand} ${v.model} (${v.plate})`,
  }));

  return (
    <div className="space-y-4">
      <Select
        label="Pelanggan"
        value={form.customerId || ''}
        onChange={(e) => {
          onChange('customerId', e.target.value);
          onChange('vehicleId', ''); // Reset vehicle when customer changes
        }}
        options={customerOptions}
        placeholder="Pilih Pelanggan"
      />
      <Select
        label="Motor"
        value={form.vehicleId || ''}
        onChange={(e) => onChange('vehicleId', e.target.value)}
        options={vehicleOptions}
        placeholder={form.customerId ? 'Pilih Motor' : 'Pilih pelanggan terlebih dahulu'}
        disabled={!form.customerId}
      />
      <Input
        label="Nama Maintenance"
        value={form.note || ''}
        onChange={(e) => onChange('note', e.target.value)}
        placeholder="Contoh: Ganti Oli Rutin"
      />
      <Input
        label="Jadwal (DD/MM/YYYY)"
        type="date"
        value={form.next_service || ''}
        onChange={(e) => onChange('next_service', e.target.value)}
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

export default MaintenanceForm;
