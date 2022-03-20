import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const TrackerContext = createContext();

export const TrackerContextProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(JSON.parse(localStorage.getItem('transactions')) || []);

    const balance = !transactions.length ? 0 : transactions.reduce((acc, currVal) => (
        currVal.type === 'Expense' ? acc - Number(currVal.amount) : acc + Number(currVal.amount)
    ), 0);

    localStorage.setItem('transactions', JSON.stringify(transactions));

    const addTransaction = (type, category, amount, date) => {
        setTransactions(transactions =>
            [...transactions, { id: uuidv4(), type, category, amount, date }]
        );
    }
    
    const deleteTransaction = (id) => {
        setTransactions(transactions =>
            transactions.filter(transaction => transaction.id !== id)
        );
    }

    return (
        <TrackerContext.Provider value={{ transactions, balance, addTransaction, deleteTransaction }}>
            { children }
        </TrackerContext.Provider>
    )
}
