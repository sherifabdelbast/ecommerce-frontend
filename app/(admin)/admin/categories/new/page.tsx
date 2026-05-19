import CategoryForm from "../../../../_components/CategoryForm";
import { getCategories } from "../../../../_lib/categories";

export default async function NewCategoryPage() {
  const categories = await getCategories();
  const parents = categories.map((c) => ({ id: c.id, name: c.name }));

  return (
    <CategoryForm
      heading="Add Category"
      subtitle="Create a new taxonomy entry for the catalogue."
      submitLabel="Create Category"
      parents={parents}
    />
  );
}
