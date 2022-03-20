import Grid from '@mui/material/Grid';
import Details from './components/Details/Details';
import Main from './components/Main/Main';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={5}
        alignItems='center'
        justify='center'
        style={{ height: '100vh', display: 'flex', justifyContent: 'space-evenly' }}
      >
        <Grid item xs={12} sm={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Details title='Income' />
        </Grid>
        <Grid item xs={12} sm={3} sx={{ mt: '20px', pb: '5%', maxWidth: { xs: 350, sm: 1.0 } }}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: { xs: 'block', sm: 'none' }, maxWidth: { xs: 350, sm: 1.0 } }}>
          <Details title='Income' />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ pb: '150px', display: { xs: 'block', sm: 'none' }, maxWidth: { xs: 350, sm: 1.0 } }}>
          <Details title='Expense' />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: { xs: 'none', sm: 'block' }} }>
          <Details title='Expense' />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton
          size='80px'
          captureKey=' '
          placement='bottom'
        />
        <ErrorPanel />
      </PushToTalkButtonContainer>
    </ThemeProvider>
  );
}

export default App;
