import { useContext, useState, useEffect } from 'react'
import { useSpeechContext } from '@speechly/react-client';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { TrackerContext } from '../../contexts/TrackerContext';
import { incomeCategories, expenseCategories } from '../../constants/categories';
import TrackerSnackbar from '../TrackerSnackbar/TrackerSnackbar';

const Form = () => {
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(null);
    const [open, setOpen] = useState(false);

    const { addTransaction } = useContext(TrackerContext);

    const { segment } = useSpeechContext();

    const clearTransaction = () => {
        setType('');
        setCategory('');
        setAmount(0);
        setDate(null);
    }

    const handleTransaction = () => {
        if (Number.isNaN(Number(amount)) || !date.includes('-')) return;
        addTransaction(type, category, amount, date);
        clearTransaction();
        setOpen(true);
    }

    const selectedCategories = type === 'Income' ? incomeCategories : expenseCategories;

    useEffect(() => {
        const handleTransaction = () => {
            if (Number.isNaN(Number(amount)) || !date.includes('-')) return;
            addTransaction(type, category, amount, date);
            clearTransaction();
            setOpen(true);
        }

        if (segment) {
            if (segment.intent.intent === 'add_expense') {
                setType('Expense');
            } else if (segment.intent.intent === 'add_income') {
                setType('Income');
            } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                return handleTransaction();
            } else if (segment.isFinal & segment.intent.intent === 'cancel_transaction') {
                return clearTransaction();
            }

            segment.entities.forEach(entity => {
                const category = `${entity.value.charAt(0)}${entity.value.slice(1).toLowerCase()}`
                switch (entity.type) {
                    case 'amount':
                        setAmount(entity.value);
                        break;
                    case 'category':
                        if (incomeCategories.map(category => category.type).includes(category)) {
                            setCategory(category);
                            setType('Income')
                        } else if (expenseCategories.map(category => category.type).includes(category)) {
                            setCategory(category);
                            setType('Expense')
                        }
                        break;
                    case 'date':
                        setDate(entity.value);
                        break;
                    default:
                        break;
                }
            });

            if (segment.isFinal && type && category && amount && date) {
                handleTransaction();
            }
        }
    }, [addTransaction, segment, amount, category, date, type]);

    return (
        <Grid container spacing={2}>
            <TrackerSnackbar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align='center' variant='subtitle2' gutterBottom>
                    {segment && segment.words.map(word => word.value).join(' ')}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    select
                    label='Type'
                    value={type}
                    onChange={(e) => { setType(e.target.value); setCategory('') }}
                    fullWidth
                >
                    <MenuItem value='Income'>Income</MenuItem>
                    <MenuItem value='Expense'>Expense</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    select
                    label='Category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    fullWidth
                >
                    {selectedCategories.map(category => (
                        <MenuItem
                            key={category.type}
                            value={category.type}
                        >
                            {category.type}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    type='number'
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    label='Amount'
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label='Date'
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue.toISOString().replace(/T.*/,'').split('-').join('-'))
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant='outlined'
                    color='primary'
                    fullWidth
                    style={{ marginTop: '20px' }}
                    onClick={handleTransaction}
                >
                    Create
                </Button>
            </Grid>
        </Grid>
    );
}
 
export default Form;