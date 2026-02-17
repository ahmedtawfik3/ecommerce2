"use client";

import { useEffect, useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { items, addItem, removeItem } = useWishlist();
  const cart = useCart();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
      const data = await res.json();
      setProducts(data.data);
    }
    fetchProducts();
  }, []);

  const wishlistProducts = products.filter((p) => items.includes(p._id));

  if (!wishlistProducts.length)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">
          Your wishlist is empty ❤️
        </h2>
        <p className="text-gray-500">
          Looks like you haven't added anything yet.
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlistProducts.map((product) => (
          <div
            key={product._id}
            className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className="overflow-hidden">
              <Image
                src={product.imageCover}
                alt={product.title}
                width={400}
                height={400}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 min-h-[56px]">
                {product.title}
              </h3>

              <p className="text-xl font-bold text-indigo-600 mt-2 mb-6">
                {product.price} EGP
              </p>

              <div className="mt-auto flex items-center gap-3">
                <button
                  onClick={() => {
                    cart.addItem(product._id);
                    removeItem(product._id);
                    toast.success("Added to cart 🛒");
                  }}
                  className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-medium hover:bg-indigo-700 active:scale-95 transition-all duration-200"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => {
                    removeItem(product._id);
                    toast.error("Removed from wishlist ❌");
                  }}
                  className="px-4 py-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
