import {
  Home,
  Users,
  Package,
  Gift,
  Calendar,
  DollarSign,
  Clock,
  Bike,
  FileText,
  CalendarDays,
} from 'lucide-react';

export const adminMenuItems = [
  { icon: Home, label: 'Dashboard', tab: 'dashboard' },
  { icon: CalendarDays, label: 'Booking Masuk', tab: 'bookings' },
  { icon: FileText, label: 'Project Custom', tab: 'proposals' },
  { icon: DollarSign, label: 'Transaksi', tab: 'transactions' },
  { icon: Calendar, label: 'Maintenance', tab: 'maintenance' },
  { icon: Package, label: 'Layanan', tab: 'services' },
  { icon: Users, label: 'Pelanggan', tab: 'customers' },
  { icon: Bike, label: 'Kendaraan', tab: 'vehicles' },
  { icon: Gift, label: 'Reward', tab: 'rewards' },
];

export const customerMenuItems = [
  { icon: Home, label: 'Dashboard', tab: 'dashboard' },
  { icon: FileText, label: 'Penawaran', tab: 'proposals' },
  { icon: Bike, label: 'Motor Saya', tab: 'vehicles' },
  { icon: Calendar, label: 'Jadwal Servis', tab: 'schedule' },
  { icon: Gift, label: 'Tukar Reward', tab: 'rewards' },
  { icon: Clock, label: 'Riwayat', tab: 'history' },
];

export const getMenuItems = (userRole) => {
  return userRole === 'admin' ? adminMenuItems : customerMenuItems;
};