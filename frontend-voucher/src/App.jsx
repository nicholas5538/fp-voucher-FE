import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CartPage from "./pages/Cart";
import FavouritesPage from "./pages/Favourites";

import HomePage from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/Error";

const router =
  createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <RootLayout />
        ),
        errorElement:
          (
            <ErrorPage />
          ),
        children: [
          {
            index: true,
            element:
              (
                <HomePage />
              ),
          }, 
          {
            path: "/favourites",
            element:
              (
                <FavouritesPage />
              ),
          },
          {
            path: "/cart",
            element:
              (
                <CartPage />
              ),
          }
        ],
      }
    ]
  );

function App() {
  return (
    <RouterProvider
      router={
        router
      }
    />
  );
}

export default App;
