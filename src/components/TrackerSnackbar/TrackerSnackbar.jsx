import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const TrackerSnackbar = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity='success'
                    elevation={6}
                    variant='filled'
                >
                    Transaction Successfully Created!
                </Alert>
            </Snackbar>
        </div>
    );
}
 
export default TrackerSnackbar;
