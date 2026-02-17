import { notFound } from "next/navigation";
import { getBrandById } from "@/services/brands";
import { getProductsByBrand } from "@/services/products";
import ProductCard from "@/components/ProductCard";

export default async function BrandDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const brand = await getBrandById(id);
  if (!brand) return notFound();

  const products = await getProductsByBrand(id);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        {brand.name}
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">
          No products found for this brand.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
