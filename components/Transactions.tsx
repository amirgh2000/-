
import React, { useContext, useState } from 'react';
import { AppContext } from '../AppContext';
import { TransactionType } from '../types';
import type { Transaction } from '../types';
import { ArrowDownLeft, ArrowUpRight, Plus, Minus, Send } from 'lucide-react';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="mb-8 text-right">
    <h1 className="text-4xl font-bold text-white">{title}</h1>
    <p className="text-lg text-gray-400 mt-1">{subtitle}</p>
  </div>
);

const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
        case TransactionType.BUY:
            return <Plus className="w-5 h-5 text-green-400" />;
        case TransactionType.SELL:
            return <Minus className="w-5 h-5 text-red-400" />;
        case TransactionType.DEPOSIT:
            return <ArrowDownLeft className="w-5 h-5 text-blue-400" />;
        case TransactionType.WITHDRAWAL:
            return <ArrowUpRight className="w-5 h-5 text-yellow-400" />;
        case TransactionType.TRANSFER:
            return <Send className="w-5 h-5 text-purple-400" />;
        default:
            return null;
    }
};

const getStatusBadge = (status: 'Completed' | 'Pending' | 'Failed') => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
    switch (status) {
        case 'Completed':
            return <span className={`${baseClasses} bg-green-500/20 text-green-300`}>تکمیل شده</span>;
        case 'Pending':
            return <span className={`${baseClasses} bg-yellow-500/20 text-yellow-300`}>در حال انتظار</span>;
        case 'Failed':
            return <span className={`${baseClasses} bg-red-500/20 text-red-300`}>ناموفق</span>;
        default:
            return null;
    }
};

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
    <tr className="border-b border-gray-700/50 hover:bg-gray-700/30">
        <td className="p-4 flex items-center justify-end">
            <div>
                <p className="font-bold text-white text-right">{transaction.type}</p>
                <p className="text-sm text-gray-400 text-right">{new Date(transaction.date).toLocaleDateString('fa-IR')}</p>
            </div>
             <div className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full mr-3">
                {getTransactionIcon(transaction.type)}
            </div>
        </td>
        <td className="p-4 text-right text-white">{transaction.asset}</td>
        <td className="p-4 text-left font-mono text-white" dir="ltr">
            {transaction.amount.toFixed(4)} {transaction.asset}
        </td>
        <td className="p-4 text-left font-mono text-white" dir="ltr">
            ${transaction.valueUSD.toLocaleString()}
        </td>
        <td className="p-4 text-center">{getStatusBadge(transaction.status)}</td>
        <td className="p-4 text-sm text-gray-400 text-right">
            {transaction.from && transaction.to ? `از ${transaction.from} به ${transaction.to}` : (transaction.from || transaction.to)}
        </td>
    </tr>
);

const Transactions: React.FC = () => {
    const { transactions } = useContext(AppContext);
    const [filter, setFilter] = useState<string>('همه');
    
    const translatedFilter = (f: string) => {
        if(f === 'All') return 'همه';
        return f;
    }

    const filteredTransactions = transactions.filter(t => filter === 'همه' || t.type === filter);
    const filters = ['همه', ...Object.values(TransactionType)];

    return (
        <div className="animate-fade-in">
            <PageHeader title="تراکنش‌ها" subtitle="تاریخچه کامل تراکنش‌های خود را مرور کنید." />
            
            <div className="flex space-x-2 space-x-reverse mb-6">
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                            filter === f ? 'bg-indigo-600 text-white' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                        }`}
                    >
                        {translatedFilter(f)}
                    </button>
                ))}
            </div>

            <div className="bg-gray-800/50 rounded-2xl border border-gray-700/60 shadow-lg overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-gray-700/50">
                            <tr>
                                <th className="p-4 font-semibold text-gray-300">نوع</th>
                                <th className="p-4 font-semibold text-gray-300">دارایی</th>
                                <th className="p-4 font-semibold text-gray-300 text-left">مقدار</th>
                                <th className="p-4 font-semibold text-gray-300 text-left">ارزش (دلار)</th>
                                <th className="p-4 font-semibold text-gray-300 text-center">وضعیت</th>
                                <th className="p-4 font-semibold text-gray-300">جزئیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map(transaction => <TransactionRow key={transaction.id} transaction={transaction} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
