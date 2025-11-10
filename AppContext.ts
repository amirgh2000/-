
import { createContext } from 'react';
import type { Portfolio, Transaction, Wallet } from './types';

interface IAppContext {
    portfolio: Portfolio | null;
    wallets: Wallet[];
    transactions: Transaction[];
}

export const AppContext = createContext<IAppContext>({
    portfolio: null,
    wallets: [],
    transactions: [],
});
