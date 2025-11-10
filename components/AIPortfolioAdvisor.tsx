
import React, { useState, useContext, useCallback } from 'react';
import { AppContext } from '../AppContext';
import { getAIRebalancingSuggestions } from '../services/geminiService';
import type { AIRebalancingResponse } from '../services/geminiService';
import { Bot, Lightbulb, TrendingUp, TrendingDown, CircleDot, Loader2, AlertTriangle } from 'lucide-react';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="mb-8 text-right">
    <h1 className="text-4xl font-bold text-white flex items-center justify-end">
      {title}
      <Bot className="w-10 h-10 ml-4 text-indigo-400" />
    </h1>
    <p className="text-lg text-gray-400 mt-1">{subtitle}</p>
  </div>
);

const SuggestionCard: React.FC<{ suggestion: AIRebalancingResponse['suggestions'][0] }> = ({ suggestion }) => {
  const getIcon = () => {
    switch(suggestion.action.toUpperCase()) {
      case 'BUY':
      case 'خرید':
         return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'SELL':
      case 'فروش':
        return <TrendingDown className="w-5 h-5 text-red-400" />;
      case 'HOLD':
      case 'نگهداری':
        return <CircleDot className="w-5 h-5 text-yellow-400" />;
      default: return null;
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-start space-x-4 space-x-reverse">
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-700/50 rounded-full">
        {getIcon()}
      </div>
      <div className="text-right">
        <p className="font-bold text-white">
          {suggestion.action} {suggestion.asset}
          <span className="text-sm font-normal text-gray-400 mr-2">(هدف: {suggestion.percentage}%)</span>
        </p>
        <p className="text-sm text-gray-300">{suggestion.rationale}</p>
      </div>
    </div>
  );
};


export const AIPortfolioAdvisor: React.FC = () => {
    const { portfolio } = useContext(AppContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<AIRebalancingResponse | null>(null);
    
    const handleAnalyze = useCallback(async () => {
        if (!portfolio) return;
        setLoading(true);
        setError(null);
        setAnalysis(null);
        try {
            const result = await getAIRebalancingSuggestions(portfolio);
            setAnalysis(result);
        } catch (e: any) {
            setError(e.message || "خطای غیرمنتظره‌ای رخ داد.");
        } finally {
            setLoading(false);
        }
    }, [portfolio]);

    return (
        <div className="animate-fade-in">
            <PageHeader title="مشاور هوش مصنوعی پورتفوی" subtitle="پیشنهادهای هوشمند برای توازن مجدد پورتفوی با قدرت Gemini دریافت کنید." />
            
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/60 shadow-lg text-center">
                <h2 className="text-2xl font-bold text-white mb-4">برای تحلیل مبتنی بر هوش مصنوعی آماده‌اید؟</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                    هوش مصنوعی ما تخصیص دارایی فعلی شما را بر اساس شرایط شبیه‌سازی شده بازار و پروفایل ریسک شما تحلیل کرده و پیشنهادهای عملی برای بهینه‌سازی پورتفوی ارائه می‌دهد.
                </p>
                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-all duration-300"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                            در حال تحلیل...
                        </>
                    ) : (
                        <>
                            <Bot className="w-5 h-5 ml-2" />
                            تحلیل پورتفوی من
                        </>
                    )}
                </button>
            </div>
            
            {error && (
                <div className="mt-8 bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg flex items-center text-right">
                    <AlertTriangle className="w-5 h-5 ml-3" />
                    <div>
                        <p className="font-bold">تحلیل ناموفق بود</p>
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            )}

            {analysis && (
                <div className="mt-8 animate-fade-in text-right">
                    <h2 className="text-3xl font-bold text-white mb-6">تحلیل تکمیل شد</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/60">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-end">
                                استدلال هوش مصنوعی
                                <Lightbulb className="w-6 h-6 mr-3 text-yellow-400" />
                            </h3>
                            <p className="text-gray-300 leading-relaxed">{analysis.reasoning}</p>
                        </div>
                        <div className="lg:col-span-2 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/60">
                             <h3 className="text-xl font-bold text-white mb-4">پیشنهادهای عملی</h3>
                             <div className="space-y-4">
                                {analysis.suggestions.map((s, i) => (
                                    <SuggestionCard key={i} suggestion={s} />
                                ))}
                             </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
