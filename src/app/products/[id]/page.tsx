"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById, Product } from "@/services/products";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const cart = useCart();
  const wishlist = useWishlist();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        console.error("Details error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (productId) fetchProduct();
  }, [productId]);

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading product...
        </p>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Product not found
        </p>
      </div>
    );

  const imageUrl =
    product.imageCover ||
    (product.images && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/300x300?text=No+Image");

  const handleAddToCart = () => {
    if (!user) return router.push(`/auth/login?redirect=/products/${productId}`);
    cart.addItem(productId);
  };

  const handleAddToWishlist = () => {
    if (!user) return router.push(`/auth/login?redirect=/products/${productId}`);
    wishlist.addItem(productId);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-start">

 
        <div className="bg-gray-50 rounded-3xl p-8 shadow-sm hover:shadow-md transition">
          <div className="relative w-full h-[400px]">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-contain rounded-2xl"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            {product.title}
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-indigo-600">
              ${product.price}
            </span>

            <span className="text-sm text-gray-500">
              ⭐ {product.ratingsAverage || 0} / 5
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>


          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-3 rounded-2xl font-semibold hover:bg-gray-800 transition transform active:scale-95"
            >
              Add to Cart
            </button>

            <button
              onClick={handleAddToWishlist}
              className="flex-1 border border-gray-300 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition"
            >
              Add to Wishlist ♡
            </button>
          </div>

 
          <div className="mt-8 bg-gray-50 p-6 rounded-2xl text-sm text-gray-500 space-y-2">
            <p>🚚 Free delivery available</p>
            <p>🔄 7 Days return policy</p>
            <p>🔒 Secure payment guaranteed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
