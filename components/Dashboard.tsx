
import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign } from 'lucide-react';
import type { Asset, Transaction } from '../types';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="mb-8 text-right">
    <h1 className="text-4xl font-bold text-white">{title}</h1>
    <p className="text-lg text-gray-400 mt-1">{subtitle}</p>
  </div>
);

const StatCard: React.FC<{ title: string; value: string; change: number; icon: React.ReactNode }> = ({ title, value, change, icon }) => (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/60 flex flex-col justify-between shadow-lg text-right">
        <div>
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-400">{title}</p>
                {icon}
            </div>
            <p className="text-3xl font-bold text-white" dir="ltr">{value}</p>
        </div>
        <div className={`flex items-center text-sm mt-4 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`} dir="ltr">
            {change >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
            <span>{change.toFixed(2)}% (۲۴س)</span>
        </div>
    </div>
);

const AssetRow: React.FC<{ asset: Asset }> = ({ asset }) => (
    <tr className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
        <td className="p-4 flex items-center justify-end">
             <div>
                <p className="font-bold text-white text-right">{asset.name}</p>
                <p className="text-sm text-gray-400 text-right">{asset.symbol}</p>
            </div>
            {asset.iconUrl && <img src={asset.iconUrl} alt={asset.name} className="w-8 h-8 mr-4 rounded-full" />}
        </td>
        <td className="p-4 text-left font-mono text-white" dir="ltr">${asset.priceUSD.toLocaleString()}</td>
        <td className="p-4 text-left font-mono text-white" dir="ltr">{asset.balance.toLocaleString()}</td>
        <td className="p-4 text-left font-mono text-white" dir="ltr">${asset.valueUSD.toLocaleString()}</td>
        <td className={`p-4 text-left font-medium ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`} dir="ltr">
            {asset.change24h.toFixed(2)}%
        </td>
    </tr>
);


const Dashboard: React.FC = () => {
    const { portfolio, transactions } = useContext(AppContext);

    if (!portfolio) return <div>Loading...</div>;

    const portfolioHistory = [
        { name: '۷ روز پیش', value: portfolio.totalValueUSD * 0.95 },
        { name: '۶ روز پیش', value: portfolio.totalValueUSD * 0.96 },
        { name: '۵ روز پیش', value: portfolio.totalValueUSD * 0.98 },
        { name: '۴ روز پیش', value: portfolio.totalValueUSD * 0.97 },
        { name: '۳ روز پیش', value: portfolio.totalValueUSD * 1.01 },
        { name: '۲ روز پیش', value: portfolio.totalValueUSD * 1.03 },
        { name: 'دیروز', value: portfolio.totalValueUSD * 1.02 },
        { name: 'امروز', value: portfolio.totalValueUSD },
    ];
    
    const allocationData = portfolio.assets.map(a => ({ name: a.symbol, value: a.valueUSD }));

    return (
        <div className="animate-fade-in">
            <PageHeader title="داشبورد" subtitle="خوش آمدید، این نمای کلی پورتفوی شماست." />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="موجودی کل" 
                    value={`$${portfolio.totalValueUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    change={portfolio.change24h}
                    icon={<DollarSign className="w-6 h-6 text-indigo-400" />}
                />
                <StatCard 
                    title="تغییرات ۲۴ ساعته پورتفوی" 
                    value={`$${(portfolio.totalValueUSD * (portfolio.change24h / 100)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    change={portfolio.change24h}
                    icon={<TrendingUp className="w-6 h-6 text-indigo-400" />}
                />
                 <StatCard 
                    title="سود/زیان محقق شده" 
                    value="$5,120.50"
                    change={15.3}
                    icon={<DollarSign className="w-6 h-6 text-indigo-400" />}
                />
                 <StatCard 
                    title="سود/زیان محقق نشده" 
                    value="$12,830.00"
                    change={5.8}
                    icon={<DollarSign className="w-6 h-6 text-indigo-400" />}
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/60 shadow-lg text-right">
                    <h3 className="text-xl font-bold text-white mb-4">تاریخچه پورتفوی (۷ روز)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={portfolioHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                           <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `$${Number(value)/1000}k`} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: '1px solid #4b5563',
                                    borderRadius: '0.75rem'
                                }}
                                labelStyle={{ color: '#d1d5db' }}
                                itemStyle={{ color: '#8884d8' }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} fill="url(#colorUv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/60 shadow-lg text-right">
                     <h3 className="text-xl font-bold text-white mb-4">تخصیص دارایی</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={allocationData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${(percent * 100).toFixed(0)}% ${name}`}
                            >
                                {allocationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: '1px solid #4b5563',
                                    borderRadius: '0.75rem'
                                }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

             <div className="bg-gray-800/50 rounded-2xl border border-gray-700/60 shadow-lg overflow-hidden">
                <h3 className="text-xl font-bold text-white p-6 text-right">دارایی‌های من</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-gray-700/50">
                            <tr>
                                <th className="p-4 font-semibold text-gray-300">دارایی</th>
                                <th className="p-4 font-semibold text-gray-300 text-left">قیمت</th>
                                <th className="p-4 font-semibold text-gray-300 text-left">موجودی</th>
                                <th className="p-4 font-semibold text-gray-300 text-left">ارزش</th>
                                <th className="p-4 font-semibold text-gray-300 text-left">تغییرات ۲۴ ساعته</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolio.assets.map(asset => <AssetRow key={asset.id} asset={asset} />)}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
