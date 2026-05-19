import { notFound } from "next/navigation";
import BrandForm from "../../../../../_components/BrandForm";
import { getBrandBySlug } from "../../../../../_lib/brands";

type RouteParams = { brandId: string };

// Auth + role gated admin route (CLAUDE.md → CSR) — rendered on demand,
// never prerendered into static HTML at build time.
export default async function EditBrandPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { brandId } = await params;
  const brand = await getBrandBySlug(brandId);
  if (!brand) notFound();

  return (
    <BrandForm
      heading="Edit Brand"
      subtitle={`Update the details of ${brand.name}.`}
      submitLabel="Save Changes"
      brand={brand}
    />
  );
}
