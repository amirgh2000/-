
import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="mb-8 text-right">
    <h1 className="text-4xl font-bold text-white">{title}</h1>
    <p className="text-lg text-gray-400 mt-1">{subtitle}</p>
  </div>
);

const tradeHistoryData = [
    { date: 'مهر ۱', buys: 4000, sells: 2400, profit: 1600 },
    { date: 'مهر ۲', buys: 3000, sells: 1398, profit: 1602 },
    { date: 'مهر ۳', buys: 2000, sells: 9800, profit: -7800 },
    { date: 'مهر ۴', buys: 2780, sells: 3908, profit: -1128 },
    { date: 'مهر ۵', buys: 1890, sells: 4800, profit: -2910 },
    { date: 'مهر ۶', buys: 2390, sells: 3800, profit: -1410 },
    { date: 'مهر ۷', buys: 3490, sells: 4300, profit: -810 },
];

const profitLossData = [
    { month: 'فروردین', realized: 1200, unrealized: 2400 },
    { month: 'اردیبهشت', realized: 1500, unrealized: 1398 },
    { month: 'خرداد', realized: -800, unrealized: 9800 },
    { month: 'تیر', realized: 2780, unrealized: 3908 },
    { month: 'مرداد', realized: 1890, unrealized: 4800 },
    { month: 'شهریور', realized: 2390, unrealized: 3800 },
];

const Reports: React.FC = () => {
    const { portfolio } = useContext(AppContext);
    if (!portfolio) return null;
    
    return (
        <div className="animate-fade-in">
            <PageHeader title="گزارش‌ها و تحلیل‌ها" subtitle="عملکرد و تاریخچه معاملات خود را تحلیل کنید." />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/60 shadow-lg text-right">
                    <h3 className="text-xl font-bold text-white mb-4">سود و زیان ماهانه</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={profitLossData}>
                            <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `$${Number(value)/1000}k`} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: '1px solid #4b5563',
                                    borderRadius: '0.75rem',
                                    direction: 'rtl',
                                }}
                            />
                            <Legend />
                            <Bar dataKey="realized" name="سود/زیان محقق شده" fill="#82ca9d" />
                            <Line type="monotone" dataKey="unrealized" name="سود/زیان محقق نشده" stroke="#8884d8" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/60 shadow-lg text-right">
                    <h3 className="text-xl font-bold text-white mb-4">حجم معاملات روزانه (دلار)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={tradeHistoryData}>
                            <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `$${Number(value)/1000}k`} />
                             <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: '1px solid #4b5563',
                                    borderRadius: '0.75rem',
                                    direction: 'rtl',
                                }}
                            />
                            <Legend />
                            <Bar dataKey="buys" name="خریدها" stackId="a" fill="#8884d8" />
                            <Bar dataKey="sells" name="فروش‌ها" stackId="a" fill="#ffc658" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Reports;
