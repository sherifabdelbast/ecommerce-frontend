import ProductForm from "../../../../_components/ProductForm";

export default function NewProductPage() {
  return (
    <ProductForm
      heading="Add Product"
      subtitle="Create a new object in the master collection."
      submitLabel="Create Product"
    />
  );
}
