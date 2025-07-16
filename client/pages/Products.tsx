import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [categories, setCategories] = useState([]);

useEffect(() => {
  axios
    .get(`${API_URL}/api/products`)
    .then((res) => {
      const data = res.data || [];
      setProducts(data);
      const unique = Array.from(
        new Set(data.map((p) => p.category).filter(Boolean))
      );
      setCategories(["All", ...unique]);
    })
    .catch((err) => {
      console.error("❌ Failed to fetch products:", err.message || err);
    });
}, []);


  const filtered =
    filteredCategory === "All"
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === filteredCategory.toLowerCase()
        );

  return (
    <>
      <Header />

      {/* 🔹 Banner Section */}
      <section className="w-full">
        <img
          src="/slider/home.jpeg"
          alt="Products Banner"
          className="w-full h-[320px] object-cover"
        />
      </section>

      <section className="our-products px-4 py-16 bg-gray-50 min-h-screen">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-800 tracking-tight">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 mt-3 mx-auto text-center">
  Explore our certified pharmaceutical solutions manufactured with precision and global standards.
</p>

        </div>

        {/* 🔹 Scrollable Category Filter (Fixed with outer wrapper) */}
        <div className="w-full overflow-hidden">
          <div
            className="flex lg:flex-wrap justify-start lg:justify-center gap-3 mb-12 overflow-x-auto lg:overflow-visible whitespace-nowrap px-4 scrollbar-hide"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilteredCategory(cat)}
                className={`min-w-max px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm ${
                  filteredCategory === cat
                    ? "bg-blue-700 text-white"
                    : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 🔹 Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-20">
            No products found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
            {filtered.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-800 mb-1">
                    {item.name}
                  </h3>

                  {/* Optional description or category below */}
                  {/* <p className="text-sm text-gray-600 mb-1">{item.description}</p> */}

                  <button
                    onClick={() => (window.location.href = `/product/${item._id}`)}
                    className="mt-3 w-full px-4 py-2 text-sm text-white bg-orange-500 rounded hover:bg-orange-600"
                  >
                    View Product →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default OurProducts;
