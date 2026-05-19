import { notFound } from "next/navigation";
import ProductForm from "../../../../../_components/ProductForm";
import { getProductBySlug } from "../../../../../_lib/products";

type RouteParams = { productId: string };

// Auth + role gated admin route (CLAUDE.md → CSR) — rendered on demand,
// never prerendered into static HTML at build time.
export default async function EditProductPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { productId } = await params;
  const product = await getProductBySlug(productId);
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
