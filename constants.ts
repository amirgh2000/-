
import { Portfolio, Transaction, TransactionType, Wallet } from './types';

const btcIcon = `data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0iI0Y3OTMxQSI+PHBhdGggZD0iTTE4LjM5MyAxMC4wODljLjI1LS40NzUuMzgyLS45NzUuMzgxLTEuNDc1LS4wMDEtLjU4MS0uMTg4LTEuMTM4LS41MDItMS42MDctLjMxMy0uNDY5LS43NDQtLjg0NC0xLjI0NC0xLjA5NC0uNS0uMjUtMS4wNTYtLjM1Ni0xLjYyNS0uMzI1aC0xLjk1VjIuODc1SDExLjVsLjAwMSA0LjcxOVY4LjVoLTF2LTUuNjI1SDguNzV2NS42MjVoMVY4LjVoLTJWNC4yNWgtMS43NXY0LjI1SDQuMjV2MS43NWgxdjcuNWgtMXYxLjc1aDEuNzV2NC4yNWgxLjc1di00LjI1aDF2NC4yNWgxLjc1di00LjI1aDEuMTg4Yy41NTYuMDA3IDEuMTEzLS4xMDQgMS42MzgtLS4zNDQuNTI1LS4yMzggMS4wMDYtLjYwNiAxLjM5My0xLjA3NS4zODgtLjQ2OS42NzQtMS4wMjYuODIxLTEuNjI1LjE0Ny0uNi4xNDctMS4yMzEtLjAwMS0xLjgzOHptLTIuMjYgNS4xNDRjLS4yMy4yNS0uNTEyLjQzOC0uODI1LjU0NC0uMzEzLjEwNi0uNjM3LjEzOC0uOTUuMTMySDkuNzV2LTIuODc1aDMuNjg4YzEuNDg4IDAgMi4zODcgMS4wMjUgMi4zODcgMi4xOTkgMCAuNTY5LS4yMjUgMS4wODgtLS42OTEgMS40NTYuMDA1LS4wMDQuMDA1LS4wMDUtLjAwNSAwem0uNTc2LTMuOTg4Yy0uMjE5LjIzMS0uNDguNDEtLjc2Mi41MTItLjI4Mi4xMDMtLjU3NS4xMy0uODc1LjEySDkuNzV2LTIuNjI1aDMuMjYyYzEuMzg4IDAgMi4yMDcgLjg4OCAyLjIwNyAxLjkzOCAwIC41NTYtLjI1IDEuMDM3LS42NjIgMS4zNjkuMDAyIDAgLjAwNSAwIC4wMDYtLjAwMXoiLz48L3N2Zz4=`;
const ethIcon = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDMuMDU1IDYuMTYzIDExLjk5IDEyIDE1Ljk0bDguOTk3LTkuMDU3TDE4LjE1MyA4LjA0IDEyIDExLjk5IDEyIDMuMDU1Wm0wIDEzLjk4My01LjkyNi0zLjgxMyAxMS44NSAwTDEyIDE3LjAzOFptLTYuMTYzLTUuMDU2TDEyIDIxLjAzN2w2LjE2NC05LjA1NS02LjE2NCAzLjk2OVoiIGZpbGw9IiM2MjdiQUIiLz48L3N2Zz4=`;
const usdtIcon = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJzNC40NzcgMTAgMTAgMTAgMTAtNC40NzcgMTAtMTBTMTcuNTIzIDIgMTIgMlpNNi41MDQgOS4yMjloMTAuOTkyVjYuODU0SDYuNTA0djIuMzc1em01LjQ5OCAxMC4xMDdoLTIuNXYtOS41NTRoMi41djkuNTU0em01LjE0Mi0xMS43MDNoLTMuNzk1VjYuODU0aDguNjY4djIuMzc1aC00Ljg3M3Y5LjU1NGgtMy42NDJ2LTguNzI3eiIgZmlsbD0iIzUwQUY5RSkvPjwvc3ZnPg==`;

export const mockPortfolio: Portfolio = {
    totalValueUSD: 105420.55,
    change24h: 2.5,
    assets: [
        {
            id: 'btc',
            name: 'Bitcoin',
            symbol: 'BTC',
            balance: 1.5,
            valueUSD: 97500.00,
            priceUSD: 65000.00,
            change24h: 3.2,
            type: 'crypto',
            iconUrl: btcIcon,
        },
        {
            id: 'eth',
            name: 'Ethereum',
            symbol: 'ETH',
            balance: 10,
            valueUSD: 35000.00,
            priceUSD: 3500.00,
            change24h: 1.8,
            type: 'crypto',
            iconUrl: ethIcon,
        },
        {
            id: 'usd',
            name: 'US Dollar',
            symbol: 'USD',
            balance: 20000.00,
            valueUSD: 20000.00,
            priceUSD: 1.00,
            change24h: 0,
            type: 'fiat',
        },
        {
            id: 'usdt',
            name: 'Tether',
            symbol: 'USDT',
            balance: 10420.55,
            valueUSD: 10420.55,
            priceUSD: 1.00,
            change24h: -0.1,
            type: 'crypto',
            iconUrl: usdtIcon,
        },
    ]
};

export const mockWallets: Wallet[] = [
    {
        id: 'w1',
        name: 'Binance',
        type: 'exchange',
        totalValueUSD: 85250.00,
        assets: [
            { symbol: 'BTC', balance: 1.25, valueUSD: 81250.00 },
            { symbol: 'USDT', balance: 4000.00, valueUSD: 4000.00 },
        ]
    },
    {
        id: 'w2',
        name: 'Ledger Nano X',
        type: 'hardware',
        totalValueUSD: 51670.55,
        assets: [
            { symbol: 'BTC', balance: 0.25, valueUSD: 16250.00 },
            { symbol: 'ETH', balance: 10, valueUSD: 35000.00 },
            { symbol: 'USDT', balance: 420.55, valueUSD: 420.55 },
        ]
    },
    {
        id: 'w3',
        name: 'Bank of America',
        type: 'fiat_account',
        totalValueUSD: 20000.00,
        assets: [
            { symbol: 'USD', balance: 20000.00, valueUSD: 20000.00 },
        ]
    }
];

export const mockTransactions: Transaction[] = [
    {
        id: 't1',
        date: '2023-10-26T10:00:00Z',
        type: TransactionType.BUY,
        asset: 'BTC',
        amount: 0.1,
        valueUSD: 6500,
        status: 'Completed',
        from: 'USD',
        to: 'Binance'
    },
    {
        id: 't2',
        date: '2023-10-25T14:30:00Z',
        type: TransactionType.DEPOSIT,
        asset: 'USD',
        amount: 10000,
        valueUSD: 10000,
        status: 'Completed',
        to: 'Bank of America'
    },
    {
        id: 't3',
        date: '2023-10-24T09:15:00Z',
        type: TransactionType.WITHDRAWAL,
        asset: 'ETH',
        amount: 1,
        valueUSD: 3500,
        status: 'Pending',
        from: 'Ledger Nano X',
        to: 'External Address'
    },
    {
        id: 't4',
        date: '2023-10-23T18:45:00Z',
        type: TransactionType.SELL,
        asset: 'BTC',
        amount: 0.05,
        valueUSD: 3250,
        status: 'Completed',
        from: 'Binance',
        to: 'USDT'
    },
    {
        id: 't5',
        date: '2023-10-22T11:00:00Z',
        type: TransactionType.TRANSFER,
        asset: 'BTC',
        amount: 0.2,
        valueUSD: 13000,
        status: 'Completed',
        from: 'Binance',
        to: 'Ledger Nano X',
        fee: 0.0001
    }
];
