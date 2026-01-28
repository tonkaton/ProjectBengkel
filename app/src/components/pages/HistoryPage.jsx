import React from 'react';
import { Clock } from 'lucide-react';
import { useAuth, useData } from '../../contexts';
import { TransactionRow } from '../common';

const HistoryPage = () => {
  const { currentUser } = useAuth();
  const { transactions } = useData();

  const userTransactions = transactions.filter((t) => t.UserId === currentUser?.id);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white flex items-center">
        <Clock className="w-6 h-6 mr-2 text-blue-400" /> Riwayat Servis
      </h2>
      {userTransactions.length === 0 ? (
        <p className="text-gray-400">Belum ada riwayat servis</p>
      ) : (
        userTransactions.map((t) => <TransactionRow key={t.id} transaction={t} />)
      )}
    </div>
  );
};

export default HistoryPage;
