
import { GoogleGenAI, Type } from "@google/genai";
import type { Portfolio } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development. In a real environment, the API_KEY should be set.
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const rebalancingResponseSchema = {
    type: Type.OBJECT,
    properties: {
        reasoning: {
            type: Type.STRING,
            description: "توضیح دقیقی برای پیشنهادهای توازن مجدد، با در نظر گرفتن شرایط بازار و پروفایل ریسک متوسط کاربر."
        },
        suggestions: {
            type: Type.ARRAY,
            description: "لیستی از پیشنهادهای عملی برای توازن مجدد.",
            items: {
                type: Type.OBJECT,
                properties: {
                    action: { type: Type.STRING, description: "مثال: 'خرید'، 'فروش'، 'نگهداری'" },
                    asset: { type: Type.STRING, description: "نماد دارایی، مثال: 'BTC'" },
                    percentage: { type: Type.NUMBER, description: "درصد تخصیص جدید پیشنهادی پورتفوی برای این دارایی." },
                    rationale: { type: Type.STRING, description: "دلیل مختصری برای این اقدام خاص." },
                },
                required: ["action", "asset", "percentage", "rationale"]
            },
        },
    },
    required: ["reasoning", "suggestions"]
};


export const getAIRebalancingSuggestions = async (portfolio: Portfolio) => {
    if (!API_KEY) {
        throw new Error("API key is not configured.");
    }

    const portfolioSummary = portfolio.assets.map(asset => 
        `${asset.symbol}: ${asset.balance.toFixed(4)} (به ارزش ${asset.valueUSD.toFixed(2)} دلار)`
    ).join(', ');

    const prompt = `
        شما یک هوش مصنوعی مشاور مالی در سطح جهانی و متخصص در مدیریت پورتفوی ارزهای دیجیتال و فیات هستید.
        پورتفوی فعلی من شامل این موارد است: ${portfolioSummary}.
        ارزش کل پورتفوی ${portfolio.totalValueUSD.toFixed(2)} دلار است.
        میزان ریسک‌پذیری من 'متوسط' است.

        این پورتفوی را تحلیل کرده و پیشنهادهای عملی برای توازن مجدد آن به منظور بهینه‌سازی برای رشد بلندمدت و مدیریت ریسک ارائه دهید.
        روندهای فعلی (فرضی) بازار را در نظر بگیرید که در آن بیت‌کوین نشانه‌های صعودی قوی دارد، اتریوم با کاربرد بالا پایدار است و آلت‌کوین‌ها نوسانی هستند.
        یک استدلال دقیق برای استراتژی کلی خود و سپس لیستی از پیشنهادهای مشخص و عملی ارائه دهید.
        پاسخ خود را دقیقاً به صورت یک شیء JSON مطابق با اسکیمای ارائه شده قالب‌بندی کنید. هیچ‌گونه قالب‌بندی مارک‌داون مانند \`\`\`json اضافه نکنید.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: rebalancingResponseSchema,
                temperature: 0.5,
            }
        });
        
        const text = response.text.trim();
        // The Gemini API with responseSchema should return a clean JSON string.
        return JSON.parse(text);
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("دریافت پیشنهادهای هوش مصنوعی ناموفق بود. لطفاً کلید API و اتصال شبکه خود را بررسی کنید.");
    }
};

export type AIRebalancingResponse = {
    reasoning: string;
    suggestions: {
        action: string;
        asset: string;
        percentage: number;
        rationale: string;
    }[];
};
