"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/context/WishlistContext";

export default function Navbar() {
  const auth = useAuth();
  const cart = useCart();
  const wishlist = useWishlist();
  const [showDropdown, setShowDropdown] = useState(false);

  const cartCount = cart.items.length ?? 0;
  const wishlistCount = wishlist.items.length ?? 0;

  return (
   <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">


      <div className="text-2xl font-bold text-indigo-600">
        <Link href="/">ShopMart</Link>
      </div>

      <div className="hidden md:flex gap-8 font-medium text-gray-700">
        <Link href="/products" className="hover:text-indigo-600 transition">
          Products
        </Link>
        <Link href="/categories" className="hover:text-indigo-600 transition">
          Categories
        </Link>
        <Link href="/brands" className="hover:text-indigo-600 transition">
          Brands
        </Link>
      </div>


      <div className="flex items-center gap-4 relative">

        <Link href="/wishlist" className="relative text-2xl hover:text-pink-500 transition">
          💖
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {wishlistCount}
            </span>
          )}
        </Link>


        <Link href="/cart" className="relative text-2xl hover:text-blue-600 transition">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Link>


        <div className="relative">
          {auth.user ? (
            <>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-2xl hover:text-indigo-600 transition"
              >
                👤
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      auth.logout();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              href="/auth/login"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition transform active:scale-95"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
