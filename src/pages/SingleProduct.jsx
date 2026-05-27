import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { add } from "../features/cartSlice";
import { ProductCard } from "../components/ProductCard";
import { toast } from "react-toastify";
import { fetchProducts } from "../features/admin/adminSlice";

export const SingleProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.admin);

  // FETCH PRODUCTS ON REFRESH
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // FIND PRODUCT
  const product = products.find((item) => item._id === id);

  // STATES
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // UPDATE WHEN PRODUCT CHANGES
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0] || "");
      setSelectedSize(product.sizes?.[0] || "");
      setSelectedColor(product.colors?.[0] || "");

      // SCROLL TOP
      window.scrollTo(0, 0);
    }
  }, [product]);

  // RELATED PRODUCTS
  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return products
      .filter(
        (item) =>
          item.category === product.category && item._id !== product._id,
      )
      .slice(0, 4);
  }, [products, product]);

  // LOADING
  if (loading && products.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold">Loading...</h2>
      </div>
    );
  }

  // PRODUCT NOT FOUND
  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold">Product Not Found</h2>
      </div>
    );
  }

  // ADD TO CART
  const handleAddToCart = () => {
    if (!selectedSize) {
      return toast.error("Please select size");
    }

    if (!selectedColor) {
      return toast.error("Please select color");
    }

    dispatch(
      add({
        ...product,
        id: `${product._id}-${selectedSize}-${selectedColor}`,
        productId: product._id,
        selectedSize,
        selectedColor,
      }),
    );

    toast.success("Added To Cart");
  };

  // BUY NOW
  const handleBuyNow = () => {
    handleAddToCart();

    navigate("/cart");
  };

  return (
    <div className="bg-white px-4 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* PRODUCT SECTION */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div>
            {/* MAIN IMAGE */}
            <div className="overflow-hidden rounded-3xl bg-gray-100">
              <img
                src={selectedImage}
                alt={product.title}
                className="h-[500px] w-full object-contain"
              />
            </div>

            {/* THUMBNAILS */}
            <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
              {product.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`overflow-hidden rounded-2xl border-2 transition ${
                    selectedImage === img ? "border-black" : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    className="h-24 w-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            {/* BRAND */}
            <p className="text-sm uppercase tracking-widest text-gray-500">
              {product.brand}
            </p>

            {/* TITLE */}
            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* PRICE */}
            <p className="mt-5 text-3xl font-semibold text-black">
              ৳{product.price}
            </p>

            {/* STOCK */}
            <div className="mt-5">
              {product.stock > 0 ? (
                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
                  Out of Stock
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8">
              <h3 className="mb-3 text-lg font-semibold">Description</h3>

              <p className="leading-7 text-gray-600">{product.description}</p>
            </div>

            {/* SIZE */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold">Select Size</h3>

              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-xl border px-5 py-3 font-medium transition ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* COLORS */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold">Select Color</h3>

              <div className="flex flex-wrap gap-3">
                {product.colors?.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-xl border px-5 py-3 font-medium transition ${
                      selectedColor === color
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleAddToCart}
                className="flex-1 rounded-2xl bg-black px-6 py-4 text-lg font-semibold text-white transition hover:opacity-90"
              >
                Add To Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 rounded-2xl border border-black bg-white px-6 py-4 text-lg font-semibold text-black transition hover:bg-black hover:text-white"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-24">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Related Products</h2>
          </div>

          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item._id}
                  id={item._id}
                  item={item}
                  title={item.title}
                  price={item.price}
                  image={item.images?.[0]}
                  hoverImage={item.images?.[1]}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No Related Products Found</p>
          )}
        </div>
      </div>
    </div>
  );
};
