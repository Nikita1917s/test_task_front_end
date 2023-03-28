import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Basket from "../pages/Basket";
import Navbar from "../components/Navbar";
import { ROUTE } from "../types/enums";

export const useRoutes = (isAuthenticated: boolean) => {
  const authenticated: RouteObject[] = [
    // We can add these pages later
  ];

  const notAuthenticated: RouteObject[] = [
    {
      path: ROUTE.SHOP,
      element: <Products />,
    },
    //Can be added later
    {
      path: ROUTE.PRODUCT + "/:id",
      element: <ProductDetails />,
    },
    //Can be added later
    {
      path: ROUTE.BASKET,
      element: <Basket />,
    },
    {
      path: ROUTE.OTHER,
      element: <Navigate to={ROUTE.SHOP} />,
    },
  ];

  return createBrowserRouter([
    {
      element: <Navbar />,
      // Saparate pages for loged and not loged users
      children: isAuthenticated
        ? [...authenticated, ...notAuthenticated]
        : notAuthenticated,
    },
  ]);
};