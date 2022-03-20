import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    income: {
        borderBottom: '10px solid rgba(0, 255, 0, 0.5)',
    },
    expense: {
        borderBottom: '10px solid rgba(255, 0, 0, 0.7)',
    },
});

export default theme;
