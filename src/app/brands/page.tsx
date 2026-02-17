import Link from "next/link";
import { getBrands } from "@/services/brands";

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
        Explore Brands
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {brands.map((brand: any) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center"
          >
            <div className="w-full h-32 flex items-center justify-center overflow-hidden">
              <img
                src={brand.image}
                alt={brand.name}
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
              {brand.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
