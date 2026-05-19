import UserForm from "@/app/_components/UserForm";

export default function NewUserPage() {
  return (
    <UserForm
      heading="Add User"
      subtitle="Register a new account in the system."
      submitLabel="Create User"
    />
  );
}
