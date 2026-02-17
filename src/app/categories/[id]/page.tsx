import { getCategoryById } from "@/services/categories";
import { getProductsByCategory } from "@/services/products";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";

export default async function CategoryDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const category = await getCategoryById(id);

  if (!category) return notFound();

  const products = await getProductsByCategory(id);

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">

      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          {category.name}
        </h1>
        <div className="h-1 w-20 bg-indigo-600 rounded-full"></div>
      </div>

      {products.length === 0 ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <p className="text-lg text-gray-500">
            No products found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

