import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { ROUTE } from "../types/enums";
import { useAppSelector } from "../hooks/useTypesStore";

const Navbar = () => {
  const navigate = useNavigate();
  //Show number of items added to cart
  const { cart } = useAppSelector((state) => state.products);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Button
                sx={{ color: "#fff" }}
                onClick={() => navigate(`${ROUTE.SHOP}`)}
              >
                Products
              </Button>
            </Box>
            <Box>
              <Button
                sx={{ color: "#fff" }}
                onClick={() => navigate(`${ROUTE.BASKET}`)}
              >
                <Badge
                  badgeContent={cart.length}
                  color="error"
                  sx={{ marginRight: 1.5 }}
                >
                  <ShoppingBasketIcon />
                </Badge>
                Basket
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ marginTop: 5, padding: 4 }}>
        <Outlet />
      </Box>
    </>
  );
};
export default Navbar;
