import { StyledEngineProvider } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routesConfig from './routesConfig';

const router = createBrowserRouter(routesConfig);

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  );
}

export default App;
