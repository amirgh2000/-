
export interface Asset {
    id: string;
    name: string;
    symbol: string;
    balance: number;
    valueUSD: number;
    priceUSD: number;
    change24h: number;
    type: 'crypto' | 'fiat';
    iconUrl?: string;
}

export interface Portfolio {
    totalValueUSD: number;
    change24h: number;
    assets: Asset[];
}

export interface Wallet {
    id: string;
    name: string;
    type: 'exchange' | 'hardware' | 'fiat_account';
    assets: Pick<Asset, 'symbol' | 'balance' | 'valueUSD'>[];
    totalValueUSD: number;
}

export enum TransactionType {
    DEPOSIT = 'Deposit',
    WITHDRAWAL = 'Withdrawal',
    BUY = 'Buy',
    SELL = 'Sell',
    TRANSFER = 'Transfer'
}

export interface Transaction {
    id: string;
    date: string;
    type: TransactionType;
    asset: string;
    amount: number;
    valueUSD: number;
    status: 'Completed' | 'Pending' | 'Failed';
    from?: string;
    to?: string;
    fee?: number;
}
