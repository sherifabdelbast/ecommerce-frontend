import { cache } from "react";
import { apiFetch, Paginated } from "./api";

export type ReviewStatus = "pending" | "approved" | "rejected";

export type Review = {
  id: number;
  productId: number;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  helpfulCount: number;
  verifiedPurchase: boolean;
  createdAt: string | null;
  status: ReviewStatus;
  orderId: number | null;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  product: { id: number; name: string; slug: string } | null;
};

export const getReviews = cache(async (): Promise<Review[]> => {
  const res = await apiFetch<Paginated<Review>>("/admin/reviews?per_page=100", {
    cache: "no-store",
  });
  return res.data;
});
