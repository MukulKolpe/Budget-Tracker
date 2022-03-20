import { useContext } from 'react';
import { TrackerContext } from '../contexts/TrackerContext';

import { incomeCategories, expenseCategories, resetCategories } from '../constants/categories';

const useTransactions = (title) => {
    resetCategories();
    const { transactions } = useContext(TrackerContext);
    const categoryTransactions = transactions.filter(transaction => transaction.type === title);
    const total = categoryTransactions.reduce((acc, currVal) => acc + Number(currVal.amount), 0);
    const categories = title === 'Income' ? incomeCategories : expenseCategories;

    categoryTransactions.forEach(transaction => {
        const category = categories.find(c => c.type === transaction.category);
        if (category) {
            category.amount = transaction.amount;
        }
    });

    const filteredCategories = categories.filter(category => category.amount > 0);

    const chartData = {
        labels: filteredCategories.map(category => category.type),
        datasets: [{
            data: filteredCategories.map(category => category.amount),
            backgroundColor: filteredCategories.map(category => category.color)
        }],
        hoverOffset: 4
    };

    return { total, chartData };
}

export default useTransactions;
