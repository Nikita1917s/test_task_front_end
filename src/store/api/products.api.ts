import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../../models/IProduct";
import { ServerResponse } from "../../models/ServerResponse";
const baseUrl = "https://dummyjson.com";
const productFields = 'id,title,description,price,rating,thumbnail,stock,category';

//Fetch dummy data 

export const productsApi = createApi({
  reducerPath: "products/api",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    fetchAllProduct: build.query<IProduct[], number>({
      query: (limit: number = 10) => ({
        url: `/products`,
        params: {
          //   q: search,
          //   per_page: 10,
          limit,
          //Use only specific fields
          select: productFields
        },
      }),
      transformResponse: (response: ServerResponse<IProduct>) =>
        response.products,
    }),
  }),
});
