"use client";

import React, { useState } from "react";
import { Product } from "@/services/products";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist } = useWishlist();
  const { user } = useAuth();
  const router = useRouter();

  const [addedCart, setAddedCart] = useState(false);
  const [addedWishlist, setAddedWishlist] = useState(false);

  const imageUrl =
    product.imageCover
      ? product.imageCover.startsWith("http")
        ? product.imageCover
        : `https://ecommerce.routemisr.com${product.imageCover}`
      : product.images && product.images.length > 0
      ? product.images[0].startsWith("http")
        ? product.images[0]
        : `https://ecommerce.routemisr.com${product.images[0]}`
      : "https://via.placeholder.com/300x300?text=No+Image";

  const handleAddToCart = async () => {
    if (!user) return router.push(`/auth/login?redirect=/products/${product._id}`);
    await addToCart(product._id);
    setAddedCart(true);
  };

  const handleAddToWishlist = async () => {
    if (!user) return router.push(`/auth/login?redirect=/products/${product._id}`);
    await addToWishlist(product._id);
    setAddedWishlist(true);
  };

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      <a href={`/products/${product._id}`} className="block">
        <div className="overflow-hidden">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-gray-800 line-clamp-2 min-h-[48px]">
            {product.title}
          </h3>

          <p className="text-xl font-bold text-green-700">
            ${product.price}
          </p>
        </div>
      </a>

      <div className="px-4 pb-4 mt-auto flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={addedCart}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            addedCart
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
          }`}
        >
          {addedCart ? "Added 🛒" : "Add to Cart"}
        </button>

        <button
          onClick={handleAddToWishlist}
          disabled={addedWishlist}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            addedWishlist
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-pink-500 text-white hover:bg-pink-600 active:scale-95"
          }`}
        >
          {addedWishlist ? "Added 💖" : "Wishlist"}
        </button>
      </div>
    </div>
  );
}
