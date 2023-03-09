import { StyledEngineProvider } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routesConfig from './routesConfig';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const router = createBrowserRouter(routesConfig);
const theme = createTheme({
  palette: {
    action: {
      disabledBackground: 'hsl(334, 79%, 48%)',
      disabled: 'hsl(0, 4%, 50%)',
    },
    secondary: {
      main: 'hsl(334, 79%, 48%)',
    },
  },
});

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </LocalizationProvider>
    </StyledEngineProvider>
  );
}

export default App;
