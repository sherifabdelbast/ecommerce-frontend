import Link from "next/link";
import { LuListFilter, LuDownload, LuPlus, LuEye, LuPencil, LuTrash2, LuExternalLink } from "react-icons/lu";
import AdminPageHeader from "../../../_components/AdminPageHeader";
import { getBrands, getBrandProducts } from "../../../_lib/brands";

/**
 * Admin brands table — CSR, auth + role gated (CLAUDE.md). Reads the
 * admin brands endpoint later; currently the mock index.
 */
export default async function AdminBrandsPage() {
  const brands = await getBrands();

  // Product counts per brand — independent reads, fan out in parallel.
  const counts = await Promise.all(
    brands.map((b) => getBrandProducts(b.slug).then((p) => p.length)),
  );

  return (
    <div>
      <AdminPageHeader eyebrow="System / Maisons" title="Brand Register">
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
          href="/admin/brands/new"
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
        >
          <LuPlus className="text-base" />
          Add Brand
        </Link>
      </AdminPageHeader>

      <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/20 font-label text-[10px] uppercase tracking-widest text-secondary">
                <th className="px-6 py-4 font-bold">Brand</th>
                <th className="px-6 py-4 font-bold">Discipline</th>
                <th className="px-6 py-4 font-bold">Founded</th>
                <th className="px-6 py-4 font-bold">Products</th>
                <th className="px-6 py-4 font-bold">Website</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body text-sm">
              {brands.map((brand, i) => (
                <tr
                  key={brand.id}
                  className="group border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low"
                >
                  <td className="px-6 py-4">
                    <p className="font-headline font-bold text-primary">
                      {brand.name}
                    </p>
                    <p className="font-mono text-[10px] tracking-wider text-secondary">
                      {brand.slug}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-on-surface">
                    {brand.discipline}
                  </td>
                  <td className="px-6 py-4 text-secondary">{brand.founded}</td>
                  <td className="px-6 py-4 font-semibold text-primary">
                    {counts[i]}
                  </td>
                  <td className="px-6 py-4">
                    {brand.website ? (
                      <a
                        href={brand.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-on-tertiary-container hover:text-primary"
                      >
                        <LuExternalLink className="text-xs" />
                        Visit
                      </a>
                    ) : (
                      <span className="text-outline-variant">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 font-label text-[10px] font-bold uppercase tracking-wider ${
                        brand.status === "active"
                          ? "bg-tertiary-fixed text-on-tertiary-fixed"
                          : "bg-surface-container-highest text-on-surface-variant"
                      }`}
                    >
                      {brand.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Link
                        href={`/brands/${brand.slug}`}
                        aria-label={`View ${brand.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-secondary hover:bg-surface-container-high hover:text-primary"
                      >
                        <LuEye className="text-sm" />
                      </Link>
                      <Link
                        href={`/admin/brands/${brand.slug}/edit`}
                        aria-label={`Edit ${brand.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-secondary hover:bg-surface-container-high hover:text-primary"
                      >
                        <LuPencil className="text-sm" />
                      </Link>
                      <button
                        type="button"
                        aria-label={`Delete ${brand.name}`}
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
            Showing 1 - {brands.length} of {brands.length} items
          </span>
        </div>
      </div>
    </div>
  );
}
