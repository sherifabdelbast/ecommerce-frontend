import { notFound } from "next/navigation";
import UserForm from "@/app/_components/UserForm";
import { getAdminUserById } from "@/app/_lib/users";

type RouteParams = { userId: string };

// Auth + role gated admin route (CLAUDE.md → CSR) — rendered on demand,
// never prerendered into static HTML at build time.
export default async function EditUserPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { userId } = await params;
  const user = await getAdminUserById(Number(userId));
  if (!user) notFound();

  return (
    <UserForm
      heading="Edit User"
      subtitle={`Update the details of ${user.firstName} ${user.lastName}.`}
      submitLabel="Save Changes"
      user={user}
    />
  );
}
