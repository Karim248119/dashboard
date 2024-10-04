import axios from "axios";
import { base_url } from "./config";
const limit = 6;
export const fetchAllProducts = async (
  cat_id,
  currentPage,
  searchQuery,
  minPrice,
  maxPrice,
  sortField,
  sortOrder
) => {
  const cat = cat_id === "all" ? "" : cat_id;
  const res = await axios.get(`${base_url}/products`, {
    params: {
      cat_id: cat,
      page: currentPage,
      limit,
      search: searchQuery,
      search_field: "title",
      min_price: minPrice,
      max_price: maxPrice,
      sort_by: sortField,
      sort_order: sortOrder,
    },
  });

  return res.data;
};

export const fetchAllCategories = async () => {
  const res = await axios.get(`${base_url}/categories`);

  return res.data;
};
