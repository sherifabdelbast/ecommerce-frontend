import ShippingMethodForm from "@/app/_components/ShippingMethodForm";

export default function NewShippingMethodPage() {
  return (
    <ShippingMethodForm
      heading="Add Shipping Method"
      subtitle="Register a new delivery option."
      submitLabel="Create Method"
    />
  );
}
