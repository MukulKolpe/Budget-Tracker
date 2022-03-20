import { useContext } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Form from '../Form/Form';
import List from '../List/List';
import { TrackerContext } from '../../contexts/TrackerContext';

const Main = () => {
    const { balance } = useContext(TrackerContext);

    return (
        <Card>
            <CardHeader title='React Budget Calculator' align='center' subheader='Made by CSI-VESIT' />
            <CardContent>
                <Typography align='center' variant='h4'>
                    Total Balance: ₹{balance}
                </Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Form />
            </CardContent>
            <CardContent style={{ paddingTop: 0 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
 
export default Main;