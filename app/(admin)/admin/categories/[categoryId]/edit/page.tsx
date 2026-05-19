import { notFound } from "next/navigation";
import CategoryForm from "../../../../../_components/CategoryForm";
import { getCategories, getCategoryBySlug } from "../../../../../_lib/categories";

type RouteParams = { categoryId: string };

// Auth + role gated admin route (CLAUDE.md → CSR) — rendered on demand,
// never prerendered into static HTML at build time.
export default async function EditCategoryPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { categoryId } = await params;

  // Detail lookup and the parents list are independent — fetch in parallel.
  const [category, categories] = await Promise.all([
    getCategoryBySlug(categoryId),
    getCategories(),
  ]);
  if (!category) notFound();

  // Cannot make a category its own parent.
  const parents = categories
    .filter((c) => c.id !== category.id)
    .map((c) => ({ id: c.id, name: c.name }));

  return (
    <CategoryForm
      heading="Edit Category"
      subtitle={`Update the details of ${category.name}.`}
      submitLabel="Save Changes"
      category={category}
      parents={parents}
    />
  );
}
