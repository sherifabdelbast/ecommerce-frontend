import { notFound } from "next/navigation";
import ProductForm from "../../../../../_components/ProductForm";
import { getProductBySlug, getAllProductSlugs } from "../../../../../_lib/products";

type RouteParams = { id: string };

/** Pre-render every known product (keyed by slug). */
export function generateStaticParams(): RouteParams[] {
  return getAllProductSlugs().map((id) => ({ id }));
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { id } = await params;
  const product = await getProductBySlug(id);
  if (!product) notFound();

  return (
    <ProductForm
      heading="Edit Product"
      subtitle={`Update the details of ${product.name}.`}
      submitLabel="Save Changes"
      product={product}
    />
  );
}
