import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { ProductCard } from "../components/ProductCard.jsx";

import { fetchProducts } from "../features/product/productSlice";

export const SingleCategory = () => {
  const dispatch = useDispatch();

  const { categoryName } = useParams();

  const { products, loading, error } = useSelector((state) => state.product);

  // FILTER STATES
  const [sortOption, setSortOption] = useState("newest");

  const [priceRange, setPriceRange] = useState(10000);

  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // CATEGORY / GENDER FILTER
  let filteredProducts = [];

  const genders = ["men", "women", "kids", "kid"];

  if (genders.includes(categoryName?.toLowerCase())) {
    filteredProducts = products.filter(
      (product) =>
        product.gender &&
        product.gender.toLowerCase() === categoryName.toLowerCase(),
    );
  } else {
    filteredProducts = products.filter(
      (product) =>
        product.category &&
        product.category.toLowerCase() === categoryName.toLowerCase(),
    );
  }

  // PRICE FILTER
  filteredProducts = filteredProducts.filter(
    (product) => Number(product.price) <= priceRange,
  );

  // BRAND FILTER
  if (selectedBrand) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.brand &&
        product.brand.toLowerCase() === selectedBrand.toLowerCase(),
    );
  }

  // SORTING
  if (sortOption === "low-high") {
    filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (sortOption === "high-low") {
    filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
  }

  if (sortOption === "newest") {
    filteredProducts.sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
    );
  }

  // UNIQUE BRANDS
  const brands = [
    ...new Set(
      filteredProducts.map((product) => product.brand).filter(Boolean),
    ),
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {/* HEADER */}
      <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-3xl font-bold capitalize">
          {categoryName} Collection
        </h2>

        <p className="mt-2 text-gray-500">
          Total Products: {filteredProducts.length}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* SIDEBAR FILTER */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h3 className="mb-5 text-xl font-bold">Filters</h3>

          {/* SORT */}
          <div className="mb-6">
            <label className="mb-2 block font-medium">Sort By</label>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full rounded-2xl border p-3 outline-none"
            >
              <option value="newest">Newest</option>

              <option value="low-high">Price: Low to High</option>

              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          {/* PRICE */}
          <div className="mb-6">
            <label className="mb-2 block font-medium">
              Max Price: ৳{priceRange}
            </label>

            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* BRAND */}
          <div className="mb-6">
            <label className="mb-2 block font-medium">Brand</label>

            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full rounded-2xl border p-3 outline-none"
            >
              <option value="">All Brands</option>

              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* RESET FILTERS */}
          <button
            onClick={() => {
              setSortOption("newest");
              setPriceRange(10000);
              setSelectedBrand("");
            }}
            className="w-full rounded-2xl bg-black py-3 text-white transition hover:opacity-90"
          >
            Reset Filters
          </button>
        </div>

        {/* PRODUCTS */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-semibold">No Products Found</h2>

              <p className="mt-2 text-gray-500">Try changing filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  item={product}
                  title={product.title}
                  price={product.price}
                  image={product.images?.[0]}
                  hoverImage={product.images?.[1] || product.images?.[0]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
