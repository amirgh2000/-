
import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import type { Wallet } from '../types';
import { CreditCard, Database, PlusCircle } from 'lucide-react';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="mb-8 flex justify-between items-center text-right">
    <div>
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <p className="text-lg text-gray-400 mt-1">{subtitle}</p>
    </div>
    <button className="flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 transition-colors">
        <PlusCircle className="w-5 h-5 ml-2" />
        افزودن کیف پول
    </button>
  </div>
);


const WalletCard: React.FC<{ wallet: Wallet }> = ({ wallet }) => {
    const getIcon = () => {
        switch (wallet.type) {
            case 'exchange':
                return <Database className="w-6 h-6 text-indigo-400" />;
            case 'hardware':
                 return <div className="w-6 h-6 text-indigo-400 font-bold">H</div>; // Placeholder
            case 'fiat_account':
                return <CreditCard className="w-6 h-6 text-indigo-400" />;
            default:
                return null;
        }
    };

    const getWalletTypeName = (type: Wallet['type']) => {
        switch (type) {
            case 'exchange': return 'صرافی';
            case 'hardware': return 'سخت افزاری';
            case 'fiat_account': return 'حساب فیات';
            default: return type;
        }
    }
    
    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/60 shadow-lg transition-transform hover:scale-105 hover:border-indigo-500/50 text-right">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-xs text-gray-400 capitalize">{getWalletTypeName(wallet.type)}</p>
                    <h3 className="text-xl font-bold text-white">{wallet.name}</h3>
                </div>
                {getIcon()}
            </div>
            <p className="text-3xl font-bold text-white mb-6" dir="ltr">${wallet.totalValueUSD.toLocaleString()}</p>
            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-300">دارایی‌ها:</h4>
                {wallet.assets.slice(0, 3).map(asset => (
                    <div key={asset.symbol} className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">{asset.symbol}</span>
                        <span className="font-mono text-gray-200" dir="ltr">{asset.balance.toLocaleString()}</span>
                    </div>
                ))}
                {wallet.assets.length > 3 && <p className="text-xs text-gray-500 text-center mt-2">... و {wallet.assets.length - 3} مورد دیگر</p>}
            </div>
        </div>
    );
};


const Wallets: React.FC = () => {
    const { wallets } = useContext(AppContext);
    
    return (
        <div className="animate-fade-in">
            <PageHeader title="کیف پول‌ها" subtitle="کیف پول‌ها و حساب‌های متصل خود را مدیریت کنید." />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wallets.map(wallet => (
                    <WalletCard key={wallet.id} wallet={wallet} />
                ))}
            </div>
        </div>
    );
};

export default Wallets;
