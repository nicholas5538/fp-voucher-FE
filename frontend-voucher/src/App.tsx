import { StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'dayjs/locale/en-gb';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routesConfig from './routesConfig';

const router = createBrowserRouter(routesConfig);
const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
  },
  palette: {
    action: {
      disabledBackground: 'hsl(334, 79%, 48%)',
      disabled: 'hsl(0, 4%, 50%)',
    },
    primary: {
      main: 'hsl(334, 79%, 55%)',
    },
    secondary: {
      main: 'hsl(334, 79%, 48%)',
    },
  },
});
const queryClient = new QueryClient();

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </StyledEngineProvider>
  );
}

export default App;
