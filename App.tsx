
import React, { useState, useCallback } from 'react';
import Dashboard from './components/Dashboard';
import Wallets from './components/Wallets';
import Transactions from './components/Transactions';
import Reports from './components/Reports';
import { AIPortfolioAdvisor } from './components/AIPortfolioAdvisor';
import { mockPortfolio, mockTransactions, mockWallets } from './constants';
import type { Portfolio, Transaction, Wallet } from './types';
import { AppContext } from './AppContext';
import { LogIn, Bot, WalletCards, Activity, BarChart, LogOut, Settings } from 'lucide-react';

type NavItem = 'داشبورد' | 'کیف پول‌ها' | 'تراکنش‌ها' | 'گزارش‌ها' | 'مشاور هوش مصنوعی';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [activeNav, setActiveNav] = useState<NavItem>('داشبورد');
    const [portfolio, setPortfolio] = useState<Portfolio>(mockPortfolio);
    const [wallets, setWallets] = useState<Wallet[]>(mockWallets);
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

    const handleLogin = () => {
        // In a real app, this would involve API calls, JWT, etc.
        setIsAuthenticated(true);
        setActiveNav('داشبورد');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    const renderContent = () => {
        switch (activeNav) {
            case 'داشبورد':
                return <Dashboard />;
            case 'کیف پول‌ها':
                return <Wallets />;
            case 'تراکنش‌ها':
                return <Transactions />;
            case 'گزارش‌ها':
                return <Reports />;
            case 'مشاور هوش مصنوعی':
                return <AIPortfolioAdvisor />;
            default:
                return <Dashboard />;
        }
    };
    
    if (!isAuthenticated) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    const navItems: { name: NavItem; icon: React.ReactNode }[] = [
        { name: 'داشبورد', icon: <BarChart className="w-5 h-5" /> },
        { name: 'کیف پول‌ها', icon: <WalletCards className="w-5 h-5" /> },
        { name: 'تراکنش‌ها', icon: <Activity className="w-5 h-5" /> },
        { name: 'گزارش‌ها', icon: <BarChart className="w-5 h-5" /> },
        { name: 'مشاور هوش مصنوعی', icon: <Bot className="w-5 h-5" /> },
    ];

    return (
        <AppContext.Provider value={{ portfolio, wallets, transactions }}>
            <div className="flex h-screen bg-gray-900 text-gray-100 font-sans" dir="rtl">
                <main className="flex-1 p-6 lg:p-10 overflow-y-auto bg-gray-800/50">
                    {renderContent()}
                </main>
                <aside className="w-64 bg-gray-900/80 backdrop-blur-sm border-r border-gray-700/50 flex flex-col">
                    <div className="flex items-center justify-center h-20 border-b border-gray-700/50">
                        <WalletCards className="w-8 h-8 text-indigo-400" />
                        <h1 className="text-2xl font-bold mr-2 text-white">Zenith</h1>
                    </div>
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setActiveNav(item.name)}
                                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                    activeNav === item.name
                                        ? 'bg-indigo-600 text-white shadow-lg'
                                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                                }`}
                            >
                                {item.icon}
                                <span className="mr-4">{item.name}</span>
                            </button>
                        ))}
                    </nav>
                    <div className="px-4 py-4 border-t border-gray-700/50">
                        <button className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors duration-200">
                           <Settings className="w-5 h-5" />
                           <span className="mr-4">تنظیمات</span>
                        </button>
                         <button onClick={handleLogout} className="w-full flex items-center mt-2 px-4 py-3 text-sm font-medium rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors duration-200">
                           <LogOut className="w-5 h-5" />
                           <span className="mr-4">خروج</span>
                        </button>
                    </div>
                </aside>
            </div>
        </AppContext.Provider>
    );
};


const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-900 p-4" dir="rtl">
            <div className="w-full max-w-md mx-auto bg-gray-800/50 border border-gray-700 rounded-2xl shadow-2xl shadow-indigo-500/10 p-8 text-center backdrop-blur-sm">
                <div className="flex justify-center mb-6">
                    <WalletCards className="w-12 h-12 text-indigo-400" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">به Zenith خوش آمدید</h1>
                <p className="text-gray-400 mb-8">داشبورد یکپارچه ارز دیجیتال و فیات شما.</p>
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="آدرس ایمیل"
                        defaultValue="demo@zenith.app"
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-right"
                    />
                    <input
                        type="password"
                        placeholder="رمز عبور"
                        defaultValue="demopassword"
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-right"
                    />
                </div>
                <button
                    onClick={onLogin}
                    className="w-full mt-8 flex items-center justify-center px-4 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300"
                >
                    <LogIn className="w-5 h-5 ml-2" />
                    ورود امن
                </button>
                <p className="text-sm text-gray-500 mt-6">
                    حساب کاربری ندارید؟ <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">ثبت نام</a>
                </p>
            </div>
        </div>
    );
};

export default App;
