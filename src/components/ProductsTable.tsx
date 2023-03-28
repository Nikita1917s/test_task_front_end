import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAction, useAppSelector } from "../hooks/useTypesStore";
import { IProduct } from "../models/IProduct";

interface ProductsTableProps {
  searchQuery: string;
}

const ProductsTable: FC<ProductsTableProps> = ({ searchQuery }) => {
  const { products, cart } = useAppSelector((state) => state.products);
  const { productsAddCart, productsRemoveCart, productsRemoveProducts } =
    useAction();

  //Set columns and it's logic
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "Title" },
    { field: "description", headerName: "Description", minWidth: 200 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 150,
    },
    {
      field: "thumbnail",
      headerName: "Image",
      renderCell: (params) => {
        return <Avatar src={params.row.thumbnail} />;
      },
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 250,
      renderCell: (params) => {
        const isFav = cart.find(({ id }) => id === params.row.id);

        return (
          <>
            {!isFav ? (
              <Button
                variant="outlined"
                color="success"
                onClick={() => productsAddCart(params.row)}
              >
                Add to cart
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="error"
                onClick={() => productsRemoveCart(params.row.id)}
              >
                Remove from cart
              </Button>
            )}
            <Tooltip title="Delete product">
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => productsRemoveProducts(params.row.id)}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const filterData = (query: string, data: IProduct[]) => {
    if (!query) {
      return data;
    } else {
      return data.filter(
        (d) =>
          d.title.toLowerCase().includes(query) ||
          d.category.toLowerCase().includes(query)
      );
    }
  };

  //Filterd data
  const dataFiltered = filterData(searchQuery, products || []);

  return (
    <div style={{ height: 400 }}>
      <DataGrid
        rows={dataFiltered}
        columns={columns}
        autoPageSize={true}
        checkboxSelection
      />
    </div>
  );
};

export default ProductsTable;
