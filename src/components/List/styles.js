import { Avatar } from '@mui/material'
import { styled } from '@mui/material/styles';
import { red, green } from '@mui/material/colors';

export const StyledIncomeAvatar = styled(Avatar)(({ theme }) => ({
    color: '#fff',
    backgroundColor: green[500],
}));

export const StyledExpenseAvatar = styled(Avatar)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
}));
