import Link from "next/link";
import { LuListFilter, LuStar, LuCheck, LuX, LuTrash2 } from "react-icons/lu";
import AdminPageHeader from "@/app/_components/AdminPageHeader";
import { getReviews, type ReviewStatus } from "@/app/_lib/reviews";

const STATUS_BADGE: Record<ReviewStatus, string> = {
  pending: "bg-surface-container-highest text-on-surface-variant",
  approved: "bg-tertiary-fixed text-on-tertiary-fixed",
  rejected: "bg-error-container text-error",
};

/**
 * Admin reviews moderation table — CSR, auth + role gated (CLAUDE.md). Reads
 * the admin reviews endpoint later; currently the mock register.
 */
export default async function AdminReviewsPage() {
  const reviews = await getReviews();

  return (
    <div>
      <AdminPageHeader eyebrow="System / Voice" title="Review Moderation">
        <button
          type="button"
          className="flex items-center gap-2 rounded-md bg-surface-container-low px-4 py-2.5 font-label text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-high"
        >
          <LuListFilter className="text-base" />
          Filters
        </button>
      </AdminPageHeader>

      <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/20 font-label text-[10px] uppercase tracking-widest text-secondary">
                <th className="px-6 py-4 font-bold">Product</th>
                <th className="px-6 py-4 font-bold">Author</th>
                <th className="px-6 py-4 font-bold">Rating</th>
                <th className="px-6 py-4 font-bold">Review</th>
                <th className="px-6 py-4 font-bold">Submitted</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body text-sm">
              {reviews.map((review) => (
                <tr
                  key={review.id}
                  className="group border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/products/${review.productSlug}`}
                      className="font-headline font-bold text-primary hover:underline"
                    >
                      {review.productName}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-on-surface">{review.authorName}</p>
                    <p className="font-mono text-[10px] tracking-wider text-secondary">
                      {review.authorEmail}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-0.5 text-emerald-accent">
                      {Array.from({ length: 5 }, (_, i) => (
                        <LuStar
                          key={i}
                          className={`text-sm ${
                            i < review.rating
                              ? "fill-emerald-accent"
                              : "text-outline-variant"
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-md">
                    <p className="font-semibold text-primary">{review.title}</p>
                    <p className="mt-0.5 text-[11px] text-secondary line-clamp-2">
                      {review.body}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-secondary">{review.submittedOn}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 font-label text-[10px] font-bold uppercase tracking-wider ${STATUS_BADGE[review.status]}`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        type="button"
                        aria-label={`Approve review ${review.id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-secondary hover:bg-tertiary-fixed hover:text-on-tertiary-fixed"
                      >
                        <LuCheck className="text-sm" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Reject review ${review.id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-secondary hover:bg-surface-container-high hover:text-primary"
                      >
                        <LuX className="text-sm" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete review ${review.id}`}
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
            Showing 1 - {reviews.length} of {reviews.length} items
          </span>
        </div>
      </div>
    </div>
  );
}
