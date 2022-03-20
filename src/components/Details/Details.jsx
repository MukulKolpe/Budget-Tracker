import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2';
import useTransactions from '../../hooks/useTransactions';

import { StyledIncomeCard, StyledExpenseCard } from './styles';

const CardBody = ({ title, total, chartData }) => (
    <>
        <CardHeader title={title} align='center' />
        <CardContent>
            <Typography variant='h5' align='center'>
                ₹{total}
            </Typography>
            <Doughnut style={{ maxHeight: '320px' }} data={chartData} />
        </CardContent>
    </>
)

const Details = ({ title }) => {
    const { total, chartData } = useTransactions(title);

    return (
        <>
            {title === "Income" ? (
                <StyledIncomeCard>
                    <CardBody title={title} total={total} chartData={chartData} />
                </StyledIncomeCard>
            ) : (
                <StyledExpenseCard>
                    <CardBody title={title} total={total} chartData={chartData} />
                </StyledExpenseCard>
            )}
        </>
    );
}
 
export default Details;