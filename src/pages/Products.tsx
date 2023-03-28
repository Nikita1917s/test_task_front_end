import { Box, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import CreateProduct from "../components/modals/CreateProduct";
import ProductsTable from "../components/ProductsTable";
import SearchBar from "../components/SearchBar";
import { useAction } from "../hooks/useTypesStore";
import { IProduct } from "../models/IProduct";
import { productsApi } from "../store/api/products.api";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [productModal, setProductModal] = useState(false);
  
  const handleProductModal = () => setProductModal((prev) => !prev);
  const { productsSetProducts } = useAction();

  const limit = 10;
  const { data, error, isLoading } = productsApi.useFetchAllProductQuery(limit);

  //Replace data ith dummy
  const setDummyData = () => {
    productsSetProducts(data as IProduct[]);
  };

  //Gathered all components in one place
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Button sx={{ ml: 2 }} variant="outlined" onClick={handleProductModal}>
          Add Product
        </Button>
        <Button sx={{ ml: 2 }} variant="outlined" onClick={setDummyData}>
          Replace data with dummy
        </Button>
      </Box>
      {isLoading ? (
        <CircularProgress color="inherit" />
      ) : error ? (
        <div>Dummy Data wasn't fetched</div>
      ) : (
        <ProductsTable searchQuery={searchQuery} />
      )}
      <CreateProduct show={productModal} onHide={handleProductModal} />
    </>
  );
};

export default Products;
