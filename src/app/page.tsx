import Link from "next/link";

export default function HomePage() {
  return (
    <div>

      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-28">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-md">
            Discover Amazing Products
          </h1>
          <p className="text-lg opacity-90 mb-8">
            Best deals, best brands, best prices.
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full shadow hover:shadow-lg hover:scale-105 transition transform duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>


      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-xl mb-3">🚚 Free Shipping</h3>
            <p className="text-gray-500">On all orders over $50</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-xl mb-3">🔒 Secure Payment</h3>
            <p className="text-gray-500">100% secure payment</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-xl mb-3">💬 24/7 Support</h3>
            <p className="text-gray-500">Dedicated support team</p>
          </div>

        </div>
      </section>
    </div>
  );
}
