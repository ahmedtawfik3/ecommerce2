import Link from "next/link";
import { getCategories } from "@/services/categories";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
        Explore Categories
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((cat: any) => (
          <Link
            key={cat._id}
            href={`/categories/${cat._id}`}
            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5 text-center">
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

