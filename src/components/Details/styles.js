import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';

export const StyledIncomeCard = styled(Card)(({ theme }) => ({
    borderBottom: theme.income.borderBottom,
}));

export const StyledExpenseCard = styled(Card)(({ theme }) => ({
    borderBottom: theme.expense.borderBottom,
}));
