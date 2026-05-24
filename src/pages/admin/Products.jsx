import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../utils/uploadImage.js";

import {
  fetchProducts,
  removeProduct,
  addProduct,
  updateProduct,
} from "../../features/admin/adminSlice";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

const categories = ["Hoodie", "T-Shirt", "Pants", "Shoes", "Accessories"];

const sizesList = ["XS", "S", "M", "L", "XL", "XXL"];

export const Products = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.admin);

  const [showModal, setShowModal] = useState(false);

  const [editId, setEditId] = useState(null);

  const [previewImages, setPreviewImages] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    colors: "",
    description: "",
    sizes: [],
    images: [],
  });

  const resetForm = () => {
    setFormData({
      title: "",
      brand: "",
      category: "",
      price: "",
      stock: "",
      colors: "",
      description: "",
      sizes: [],
      images: [],
    });
    setPreviewImages([]);

    setEditId(null);
  };

  const handleEdit = (product) => {
    setEditId(product._id);

    setFormData({
      title: product.title,
      brand: product.brand,
      category: product.category,
      price: product.price,
      stock: product.stock,
      colors: product.colors.join(", "),
      description: product.description,
      sizes: product.sizes || [],
      images: [],
    });

    // EXISTING IMAGES PREVIEW
    setPreviewImages(product.images || []);

    setShowModal(true);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // MULTIPLE SIZE SELECT
  const handleSizeChange = (size) => {
    const exists = formData.sizes.includes(size);

    if (exists) {
      setFormData({
        ...formData,
        sizes: formData.sizes.filter((s) => s !== size),
      });
    } else {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, size],
      });
    }
  };

  // MULTIPLE IMAGE UPLOAD
  const handleImageChange = (e) => {
    const files = [...e.target.files];

    setFormData({
      ...formData,
      images: files,
    });

    // IMAGE PREVIEW
    const previewUrls = files.map((file) => URL.createObjectURL(file));

    setPreviewImages(previewUrls);
  };

  // ADD PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // UPLOAD IMAGES TO CLOUDINARY
      const imageUrls = [];

      for (const image of formData.images) {
        const url = await uploadImage(image);

        imageUrls.push(url);
      }

      // IF EDITING AND NO NEW IMAGE SELECTED
      const finalImages = imageUrls.length > 0 ? imageUrls : previewImages;

      // PRODUCT DATA
      const productData = {
        title: formData.title,
        brand: formData.brand,
        category: formData.category,
        price: formData.price,
        stock: formData.stock,
        description: formData.description,

        sizes: formData.sizes,

        colors: formData.colors
          .split(",")
          .map((color) => color.trim().toUpperCase()),

        images: finalImages,
      };

      // UPDATE
      if (editId) {
        await dispatch(
          updateProduct({
            id: editId,
            productData,
          }),
        ).unwrap();

        toast.success("Product Updated Successfully");
      }

      // ADD
      else {
        await dispatch(addProduct(productData)).unwrap();

        toast.success("Product Added Successfully");
      }

      setShowModal(false);

      resetForm();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await dispatch(removeProduct(id)).unwrap();

        toast.success("Product Deleted");
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between rounded-3xl bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Product Management
            </h1>

            <p className="mt-2 text-gray-500">Manage your store products</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="rounded-2xl bg-black px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            + Add Product
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          {loading ? (
            <p className="p-6">Loading...</p>
          ) : error ? (
            <p className="p-6 text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="border-b bg-gray-50 text-sm uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Sizes</th>
                    <th className="px-6 py-4">Colors</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.images?.[0]}
                            alt={product.title}
                            className="h-16 w-16 rounded-2xl object-cover"
                          />

                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {product.title}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {product.brand}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">{product.category}</td>

                      <td className="px-6 py-4">${product.price}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            product.stock < 10
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {product.sizes?.map((size) => (
                            <span
                              key={size}
                              className="rounded-lg bg-gray-100 px-2 py-1 text-xs"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {product.colors?.map((color) => (
                            <span
                              key={color}
                              className="rounded-lg bg-gray-100 px-2 py-1 text-xs"
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleEdit(product)}
                            className="rounded-xl bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 cursor-pointer"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(product._id)}
                            className="cursor-pointer rounded-xl bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Popup */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => {
              resetForm();
              setShowModal(false);
            }}
          >
            <div
              className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {editId ? "Edit Product" : "Add New Product"}
                </h2>

                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-2xl cursor-pointer"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid gap-5 md:grid-cols-2"
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Product Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-200 px-4 py-3 outline-none"
                />

                <input
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-200 px-4 py-3 outline-none"
                />

                {/* CATEGORY */}
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-200 px-4 py-3 outline-none"
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  name="price"
                  placeholder="Price ($USD)"
                  value={formData.price}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-200 px-4 py-3 outline-none"
                />

                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-200 px-4 py-3 outline-none"
                />

                <input
                  type="text"
                  name="colors"
                  placeholder="Colors (Black,White)"
                  value={formData.colors}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-200 px-4 py-3 outline-none"
                />

                {/* MULTIPLE SIZE */}
                <div className="md:col-span-2">
                  <p className="mb-3 font-medium">Select Sizes</p>

                  <div className="flex flex-wrap gap-3">
                    {sizesList.map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`rounded-xl border px-4 py-2 ${
                          formData.sizes.includes(size)
                            ? "bg-black text-white"
                            : "bg-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* MULTIPLE IMAGE */}
                <div className="md:col-span-2">
                  <label className="mb-2 block font-medium">
                    Upload Images
                  </label>

                  <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="w-full rounded-2xl border border-gray-200 p-3"
                  />
                  {/* IMAGE PREVIEW */}
                  {previewImages.length > 0 && (
                    <div className="md:col-span-2">
                      <p className="mb-3 font-medium">Preview Images</p>

                      <div className="flex flex-wrap gap-4">
                        {previewImages.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt="preview"
                            className="h-24 w-24 rounded-2xl object-cover border"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <textarea
                  rows="5"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="md:col-span-2 rounded-2xl border border-gray-200 px-4 py-3 outline-none"
                />

                <button
                  type="submit"
                  className="md:col-span-2 rounded-2xl bg-black px-5 py-3 font-semibold text-white"
                >
                  {editId ? "Update Product" : "Add Product"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
