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

const sizesList = ["XS", "S", "M", "L", "XL", "XXL"];

const genders = ["Men", "Women", "Kid"];

export const Products = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([
    "Hoodie",
    "T-Shirt",
    "Pants",
    "Shoes",
    "Accessories",
  ]);

  const [newCategory, setNewCategory] = useState("");

  const { products, loading, error } = useSelector((state) => state.admin);

  const [showModal, setShowModal] = useState(false);

  const [editId, setEditId] = useState(null);

  const [previewImages, setPreviewImages] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "",
    gender: "",
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
      gender: "",
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

  // ADD NEW CATEGORY
  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      return toast.error("Category name is required");
    }

    // CHECK DUPLICATE
    const exists = categories.find(
      (cat) => cat.toLowerCase() === newCategory.toLowerCase(),
    );

    if (exists) {
      return toast.error("Category already exists");
    }

    setCategories([...categories, newCategory]);

    toast.success("Category added");

    setNewCategory("");
  };

  const handleEdit = (product) => {
    setEditId(product._id);

    setFormData({
      title: product.title,
      brand: product.brand,
      category: product.category,
      gender: product.gender,
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

  // AUTO GENERATE CATEGORIES FROM PRODUCTS
  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [
        ...new Set(products.map((item) => item.category)),
      ].filter(Boolean);

      setCategories((prev) => {
        const merged = [...new Set([...prev, ...uniqueCategories])];

        return merged;
      });
    }
  }, [products]);

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

    const filesWithPreview = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData({
      ...formData,
      images: filesWithPreview,
    });

    setPreviewImages(filesWithPreview);
  };

  // MOVE IMAGE LEFT
  const moveImageLeft = (index) => {
    if (index === 0) return;

    const updatedImages = [...previewImages];

    [updatedImages[index - 1], updatedImages[index]] = [
      updatedImages[index],
      updatedImages[index - 1],
    ];

    setPreviewImages(updatedImages);
  };

  // MOVE IMAGE RIGHT
  const moveImageRight = (index) => {
    if (index === previewImages.length - 1) return;

    const updatedImages = [...previewImages];

    [updatedImages[index + 1], updatedImages[index]] = [
      updatedImages[index],
      updatedImages[index + 1],
    ];

    setPreviewImages(updatedImages);
  };

  // REMOVE IMAGE
  const removeImage = (index) => {
    const updatedImages = previewImages.filter((_, i) => i !== index);

    setPreviewImages(updatedImages);

    // REMOVE FROM FORM DATA ALSO
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  //SET MAIN IMAGE
  const setMainImage = (index) => {
    const updatedImages = [...previewImages];

    const selectedImage = updatedImages[index];

    updatedImages.splice(index, 1);

    updatedImages.unshift(selectedImage);

    setPreviewImages(updatedImages);
  };

  // ADD PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadedImages = [];

      // UPLOAD IMAGES IN CURRENT ORDER
      for (const imageObj of previewImages) {
        // OLD IMAGE (already uploaded)
        if (typeof imageObj === "string") {
          uploadedImages.push(imageObj);
        }

        // NEW IMAGE
        else {
          const url = await uploadImage(imageObj.file);

          uploadedImages.push(url);
        }
      }

      const productData = {
        title: formData.title,
        brand: formData.brand,
        category: formData.category,
        gender: formData.gender,
        price: formData.price,
        stock: formData.stock,
        description: formData.description,

        sizes: formData.sizes,

        colors: formData.colors
          .split(",")
          .map((color) => color.trim().toUpperCase()),

        // FIRST IMAGE WILL BE MAIN IMAGE
        images: uploadedImages,
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
                className="grid gap-6 md:grid-cols-2"
              >
                {/* TITLE */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Product Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    placeholder="Enter product title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-black focus:bg-white focus:outline-none"
                  />
                </div>

                {/* BRAND */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Brand
                  </label>

                  <input
                    type="text"
                    name="brand"
                    placeholder="Nike, Zara, H&M..."
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-black focus:bg-white focus:outline-none"
                  />
                </div>

                {/* CATEGORY */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Product Category
                  </label>

                  <div className="grid gap-3 md:grid-cols-3">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-black focus:bg-white focus:outline-none"
                    >
                      <option value="">Select Category</option>

                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      placeholder="Create New Category"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-black focus:bg-white focus:outline-none"
                    />

                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="rounded-2xl bg-black px-5 py-3 font-medium text-white transition hover:opacity-90"
                    >
                      Add Category
                    </button>
                  </div>
                </div>

                {/* GENDER */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-black focus:bg-white focus:outline-none"
                  >
                    <option value="">Select Gender</option>

                    {genders.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>

                {/* PRICE */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    placeholder="$ USD"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-black focus:bg-white focus:outline-none"
                  />
                </div>

                {/* STOCK */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Stock
                  </label>

                  <input
                    type="number"
                    name="stock"
                    placeholder="Available stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-black focus:bg-white focus:outline-none"
                  />
                </div>

                {/* COLORS */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Colors
                  </label>

                  <input
                    type="text"
                    name="colors"
                    placeholder="Black, White, Blue"
                    value={formData.colors}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-black focus:bg-white focus:outline-none"
                  />
                </div>

                {/* SIZES */}
                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Available Sizes
                  </label>

                  <div className="flex flex-wrap gap-3">
                    {sizesList.map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`rounded-xl border px-5 py-2 text-sm font-medium transition ${
                          formData.sizes.includes(size)
                            ? "border-black bg-black text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* IMAGES */}
                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Upload Images
                  </label>

                  <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 p-6">
                    <input
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      className="w-full cursor-pointer"
                    />

                    <p className="mt-2 text-sm text-gray-500">
                      Upload multiple product images
                    </p>
                  </div>

                  {/* Preview Image */}

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {previewImages.map((image, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm"
                      >
                        <img
                          src={image.preview || image}
                          alt="preview"
                          className="h-32 w-full rounded-xl object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => setMainImage(index)}
                          className={`mt-2 w-full rounded-lg px-3 py-2 text-sm font-medium ${
                            index === 0
                              ? "bg-green-600 text-white"
                              : "bg-black text-white"
                          }`}
                        >
                          {index === 0 ? "Main Image" : "Set as Main"}
                        </button>

                        <div className="mt-3 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => moveImageLeft(index)}
                            className="flex-1 rounded-lg bg-gray-100 px-2 py-1 text-sm"
                          >
                            ←
                          </button>

                          <button
                            type="button"
                            onClick={() => moveImageRight(index)}
                            className="flex-1 rounded-lg bg-gray-100 px-2 py-1 text-sm"
                          >
                            →
                          </button>

                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="flex-1 rounded-lg bg-red-100 px-2 py-1 text-sm text-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Product Description
                  </label>

                  <textarea
                    rows="5"
                    name="description"
                    placeholder="Write detailed product description..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-black focus:bg-white focus:outline-none"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="md:col-span-2 rounded-2xl bg-black px-5 py-4 text-lg font-semibold text-white transition hover:opacity-90"
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
