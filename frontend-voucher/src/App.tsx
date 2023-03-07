import { StyledEngineProvider } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routesConfig from './routesConfig';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';

const router = createBrowserRouter(routesConfig);

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </StyledEngineProvider>
  );
}

export default App;
