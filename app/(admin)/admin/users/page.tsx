import Link from "next/link";
import { LuListFilter, LuDownload, LuPlus, LuPencil, LuTrash2 } from "react-icons/lu";
import AdminPageHeader from "@/app/_components/AdminPageHeader";
import { formatPrice } from "@/app/_lib/format";
import { getAdminUsers, type UserRole, type UserStatus } from "@/app/_lib/users";

const ROLE_BADGE: Record<UserRole, string> = {
  admin: "bg-primary-container text-white",
  customer: "bg-surface-container-highest text-on-surface-variant",
};

const STATUS_BADGE: Record<UserStatus, string> = {
  active: "bg-tertiary-fixed text-on-tertiary-fixed",
  suspended: "bg-error-container text-error",
};

/**
 * Admin users table — CSR, auth + role gated (CLAUDE.md). Reads the admin
 * users endpoint later; currently the mock register.
 */
export default async function AdminUsersPage() {
  const users = await getAdminUsers();

  return (
    <div>
      <AdminPageHeader eyebrow="System / Identity" title="User Register">
        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-surface-container-low px-4 py-2.5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-high"
        >
          <LuListFilter className="text-base" />
          Filters
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-surface-container-low px-4 py-2.5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-high"
        >
          <LuDownload className="text-base" />
          Export
        </button>
        <Link
          href="/admin/users/new"
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
        >
          <LuPlus className="text-base" />
          Add User
        </Link>
      </AdminPageHeader>

      <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/20 font-label text-[10px] uppercase tracking-widest text-secondary">
                <th className="px-6 py-4 font-bold">Name</th>
                <th className="px-6 py-4 font-bold">Email</th>
                <th className="px-6 py-4 font-bold">Role</th>
                <th className="px-6 py-4 font-bold">Joined</th>
                <th className="px-6 py-4 font-bold">Orders</th>
                <th className="px-6 py-4 font-bold">Spent</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body text-sm">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="group border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low"
                >
                  <td className="px-6 py-4">
                    <p className="font-headline font-bold text-primary">
                      {user.firstName} {user.lastName}
                    </p>
                    {user.phone ? (
                      <p className="font-mono text-[10px] tracking-wider text-secondary">
                        {user.phone}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-6 py-4 text-on-surface">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 font-label text-[10px] font-bold uppercase tracking-wider ${ROLE_BADGE[user.role]}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary">{user.joinedOn}</td>
                  <td className="px-6 py-4 text-on-surface">{user.orderCount}</td>
                  <td className="px-6 py-4 font-semibold text-primary">
                    {formatPrice(user.totalSpent)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 font-label text-[10px] font-bold uppercase tracking-wider ${STATUS_BADGE[user.status]}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        aria-label={`Edit ${user.firstName} ${user.lastName}`}
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-secondary hover:bg-surface-container-high hover:text-primary"
                      >
                        <LuPencil className="text-sm" />
                      </Link>
                      <button
                        type="button"
                        aria-label={`Delete ${user.firstName} ${user.lastName}`}
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-secondary hover:bg-error-container hover:text-error"
                      >
                        <LuTrash2 className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-outline-variant/20 px-6 py-4 font-label text-[11px] uppercase tracking-widest text-secondary">
          <span>
            Showing 1 - {users.length} of {users.length} items
          </span>
        </div>
      </div>
    </div>
  );
}
