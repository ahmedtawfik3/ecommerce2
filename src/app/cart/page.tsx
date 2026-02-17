"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showCheckout, setShowCheckout] = useState(false);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    async function fetchCartProducts() {
      if (!items.length) return;

      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/products?limit=1000");
        const data = await res.json();
        const cartProducts = data.data.filter((p: any) => items.includes(String(p._id)));
        setProducts(cartProducts);
      } catch {
        setProducts([]);
      }
    }
    fetchCartProducts();
  }, [items]);

  const handleIncrease = (id: string) =>
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));

  const handleDecrease = (id: string) =>
    setQuantities((prev) => ({ ...prev, [id]: prev[id] > 1 ? prev[id] - 1 : 1 }));

  const totalPrice = products.reduce((total, product) => {
    const qty = quantities[product._id] || 1;
    return total + product.price * qty;
  }, 0);

  const handleCheckout = async () => {
    if (!address || !city || !phone) {
      toast.error("Please fill all fields");
      return;
    }

    if (paymentMethod === "cash") {
      toast.success("Your payment has been processed successfully 💸");
      clearCart();
      router.push("/");
    } else {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: products.map((p) => ({ name: p.title, price: p.price, quantity: quantities[p._id] || 1 })),
        }),
      });
      const data = await res.json();
      window.location.href = data.url;
    }
  };

  if (!products.length)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-500">Your cart is empty 🛒</h2>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Shopping Cart</h1>

      <div className="space-y-6">
        {products.map((product) => {
          const qty = quantities[product._id] || 1;
          return (
            <div key={product._id} className="flex flex-col sm:flex-row justify-between items-center gap-6 p-4 rounded-3xl shadow-md hover:shadow-lg transition bg-white">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-28 h-28 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{product.title}</h3>
                  <p className="text-indigo-600 font-bold mt-1">{product.price} EGP</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <button
                  onClick={() => handleDecrease(product._id)}
                  className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="w-6 text-center font-medium">{qty}</span>
                <button
                  onClick={() => handleIncrease(product._id)}
                  className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                >
                  +
                </button>

                <button
                  onClick={() => {
                    removeItem(product._id);
                    toast.error("Removed from cart ❌");
                  }}
                  className="text-red-500 hover:underline font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-6 rounded-3xl shadow-md">
        <span className="text-xl sm:text-2xl font-semibold text-gray-900">Total: {totalPrice} EGP</span>
        <button
          onClick={() => setShowCheckout(true)}
          className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition transform active:scale-95"
        >
          Proceed to Checkout
        </button>
      </div>

 
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md space-y-6 shadow-lg animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Shipping Address</h2>

            <input
              type="text"
              placeholder="Address"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              type="text"
              placeholder="City"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="flex justify-between mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                  className="accent-indigo-600"
                />
                Pay Cash
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={paymentMethod === "visa"}
                  onChange={() => setPaymentMethod("visa")}
                  className="accent-indigo-600"
                />
                Pay Visa
              </label>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition transform active:scale-95"
            >
              Confirm Order
            </button>

            <button
              onClick={() => setShowCheckout(false)}
              className="w-full text-red-500 font-medium hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
