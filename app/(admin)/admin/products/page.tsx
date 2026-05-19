import Image from "next/image";
import Link from "next/link";
import { LuListFilter, LuDownload, LuPlus, LuEye, LuPencil, LuTrash2 } from "react-icons/lu";
import AdminPageHeader from "../../../_components/AdminPageHeader";
import { formatPrice } from "../../../_lib/format";
import { getProducts, CATEGORY_FACETS } from "../../../_lib/products";

/**
 * Admin products table — CSR, auth + role gated (CLAUDE.md). Reads the
 * admin products endpoint later; currently the mock catalog.
 */
export default async function AdminProductsPage() {
  const products = await getProducts();
  const categoryLabel = new Map(
    CATEGORY_FACETS.map((f) => [f.value, f.label]),
  );

  return (
    <div>
      <AdminPageHeader eyebrow="System / Inventory" title="Master Collection">
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
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-label text-[11px] font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-70"
        >
          <LuPlus className="text-base" />
          Add Product
        </Link>
      </AdminPageHeader>

      <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/20 font-label text-[10px] uppercase tracking-widest text-secondary">
                <th className="px-6 py-4 font-bold">Product</th>
                <th className="px-6 py-4 font-bold">Category</th>
                <th className="px-6 py-4 font-bold">Price</th>
                <th className="px-6 py-4 font-bold">Stock</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body text-sm">
              {products.map((product) => (
                <tr
                  key={product.slug}
                  className="group border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-sm bg-surface-container">
                        <Image
                          src={product.image}
                          alt={product.alt}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-headline font-bold text-primary">
                          {product.name}
                        </p>
                        <p className="font-label text-[10px] uppercase tracking-wider text-secondary">
                          {product.series}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface">
                    {categoryLabel.get(product.category) ?? product.category}
                  </td>
                  <td className="px-6 py-4 font-semibold text-primary">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4 text-secondary">
                    {product.inStock ? "In stock" : "Out of stock"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 font-label text-[10px] font-bold uppercase tracking-wider ${
                        product.inStock
                          ? "bg-tertiary-fixed text-on-tertiary-fixed"
                          : "bg-surface-container-highest text-on-surface-variant"
                      }`}
                    >
                      {product.inStock ? "Active" : "Archived"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Link
                        href={`/products/${product.slug}`}
                        aria-label={`View ${product.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-secondary hover:bg-surface-container-high hover:text-primary"
                      >
                        <LuEye className="text-sm" />
                      </Link>
                      <Link
                        href={`/admin/products/${product.slug}/edit`}
                        aria-label={`Edit ${product.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-secondary hover:bg-surface-container-high hover:text-primary"
                      >
                        <LuPencil className="text-sm" />
                      </Link>
                      <button
                        type="button"
                        aria-label={`Delete ${product.name}`}
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
            Showing 1 - {products.length} of {products.length} items
          </span>
        </div>
      </div>
    </div>
  );
}
