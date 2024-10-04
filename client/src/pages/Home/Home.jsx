import { useCallback, useEffect, useRef, useState } from "react";
import { fetchAllCategories, fetchAllProducts } from "../../api/apiCalls";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import HandelRemoteLayout from "../../components/HandelRemoteOutput";
import Card from "../../components/Card";

export default function Home(props) {
  const [categories, setCategories] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState(null);
  const [laoding, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [error, setError] = useState(null);
  const pages = useRef(0);

  const nextPage = () => {
    if (currentPage < pages.current) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevState) => prevState - 1);
    }
  };
  const clearFilterOptions = () => {
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
  };
  const loadCategories = useCallback(async () => {
    try {
      const res = await fetchAllCategories();

      setCategories(res.data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchAllProducts(
        activeCategory,
        currentPage,
        searchQuery,
        minPrice,
        maxPrice,
        sortField,
        sortOrder
      );
      pages.current = res.pages;
      setProducts(res.data);
    } catch (e) {
      console.error(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [
    activeCategory,
    currentPage,
    searchQuery,
    minPrice,
    maxPrice,
    sortField,
    sortOrder,
  ]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <main className="mt-5">
      <div className="container mx-auto">
        <FiterBar
          {...{
            sortField,
            setSortField,
            sortOrder,
            setSortOrder,
            searchQuery,
            setSearchQuery,
            minPrice,
            setMinPrice,
            maxPrice,
            setMaxPrice,
            clearFilterOptions,
          }}
        />
        <div className="flex">
          <div className="w-1/4 shadow bg-white rounded-md">
            {categories ? (
              <Categories
                {...{ categories, activeCategory, setActiveCategory }}
              />
            ) : (
              <>loading ....</>
            )}
          </div>
          <div className="w-3/4 flex flex-wrap">
            <HandelRemoteLayout>
              <HandelRemoteLayout.Pending isPending={laoding} />
              <HandelRemoteLayout.Rejected isRejected={error} />
              <HandelRemoteLayout.Empty
                isEmpty={!error && products?.length === 0}
              />
              <HandelRemoteLayout.Fullfilled
                isFullfilled={products && products?.length > 0}
              >
                <>
                  {products && (
                    <>
                      <Products {...{ products }} />
                      <Pagination
                        {...{
                          currentPage,
                          pages: pages.current,
                          nextPage,
                          prevPage,
                        }}
                      />
                    </>
                  )}
                </>
              </HandelRemoteLayout.Fullfilled>
            </HandelRemoteLayout>
          </div>
        </div>
      </div>
    </main>
  );
}

const Categories = ({ setActiveCategory, activeCategory, categories }) => {
  return (
    <ul className="space-y-1">
      <li>
        <div
          onClick={() => setActiveCategory("all")}
          className={`block rounded-lg  px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-700 ${
            activeCategory === "all" && "bg-gray-100 text-gray-700"
          }`}
        >
          All
        </div>
      </li>
      {categories.map((category) => {
        return (
          <li key={category._id}>
            <div
              onClick={() => setActiveCategory(category._id)}
              className={`block rounded-lg  px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-700 ${
                activeCategory === category._id && "bg-gray-100 text-gray-700"
              }`}
            >
              {category.title}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const Products = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <Card product={product} />
      ))}
    </>
  );
};

const Pagination = ({ currentPage, pages, nextPage, prevPage }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          onClick={prevPage}
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <p className="text-xs text-gray-900">
          {currentPage}
          <span className="mx-0.25">/</span>
          {pages}
        </p>

        <button
          onClick={nextPage}
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const FiterBar = ({
  searchQuery,
  setSearchQuery,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  clearFilterOptions,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <Stack
      direction={"row"}
      gap={1}
      alignItems="center"
      className="rounded-md border border-gray-300 p-2 mb-5"
    >
      {/* search */}

      <Paper
        //class="open .MuiPaper-elevation"
        component="form"
        // style
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 200,
        }}
      >
        {/* ()=> <div><input */}
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search by title...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Paper>
      {/* price */}
      <TextField
        label="Min Price"
        variant="outlined"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        sx={{ minWidth: 120 }}
      />
      <TextField
        label="Maz Price"
        variant="outlined"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        sx={{ minWidth: 120 }}
      />
      {/* sort field select */}
      <FormControl>
        <InputLabel id="demo-simple-select-label">Sortt By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortField}
          label="Sort By"
          onChange={(e) => setSortField(e.target.value)}
        >
          <MenuItem value={"title"}>Title</MenuItem>
          <MenuItem value={"price"}>Price</MenuItem>
          <MenuItem value={"stock"}>Stock</MenuItem>
        </Select>
      </FormControl>
      <Button
        onClick={() =>
          setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        }
      >
        {sortOrder === "asc" ? " ASC" : "DESC"}{" "}
      </Button>
      <Button
        type="button"
        onClick={clearFilterOptions}
        variant="outlined"
        color="secondary"
      >
        Clear
      </Button>
      {/* sort order */}
    </Stack>
  );
};
