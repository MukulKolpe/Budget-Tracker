import { useContext } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Slide } from '@mui/material'
import Delete from '@mui/icons-material/Delete';
import MoneyOff from '@mui/icons-material/MoneyOff';
import { StyledIncomeAvatar, StyledExpenseAvatar } from './styles';
import { TrackerContext } from '../../contexts/TrackerContext'

const List = () => {
    const { transactions, deleteTransaction } = useContext(TrackerContext);

    return (
        <MUIList dense={false} style={{ maxHeight: '150px', overflow: 'auto' }}>
            {transactions.map(transaction => (
                <Slide direction='down' in mountOnEnter unmountOnExit key={transaction.id}>
                    <ListItem>
                        <ListItemAvatar>
                            {transaction.type === 'Income' ? (
                                <StyledIncomeAvatar>
                                    <MoneyOff />
                                </StyledIncomeAvatar>
                            ) : (
                                <StyledExpenseAvatar>
                                    <MoneyOff />
                                </StyledExpenseAvatar>
                            )}
                        </ListItemAvatar>
                        <ListItemText
                            primary={transaction.category}
                            secondary={`₹${transaction.amount} | ${transaction.date}`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge='end' aria-label='delete' onClick={() => deleteTransaction(transaction.id)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}
        </MUIList>
    );
}
 
export default List;