import { cache } from "react";

/**
 * Reviews data layer.
 *
 * Mock today. Live version reads GET /v1/admin/reviews. Types mirror the
 * planned `ReviewResource` so the swap stays local here.
 */

export type ReviewStatus = "pending" | "approved" | "rejected";

export type Review = {
  id: number;
  productName: string;
  productSlug: string;
  authorName: string;
  authorEmail: string;
  rating: number;
  title: string;
  body: string;
  submittedOn: string;
  status: ReviewStatus;
};

const REVIEWS: readonly Review[] = [
  {
    id: 1,
    productName: "Monolith Chair",
    productSlug: "monolith-chair",
    authorName: "Eloise Marchetti",
    authorEmail: "eloise@studio-marchetti.it",
    rating: 5,
    title: "A study in restraint",
    body: "Sits in the foyer like it has always been there. The concrete reads warmer than the photographs suggest.",
    submittedOn: "May 12, 2026",
    status: "approved",
  },
  {
    id: 2,
    productName: "Vestige Table",
    productSlug: "vestige-table",
    authorName: "Henri Volk",
    authorEmail: "h.volk@volk-architecture.de",
    rating: 4,
    title: "Heavier than expected",
    body: "Stunning piece, but installation took three hours longer than the white-glove team estimated.",
    submittedOn: "May 09, 2026",
    status: "pending",
  },
  {
    id: 3,
    productName: "Cemento Lamp",
    productSlug: "cemento-lamp",
    authorName: "Julian Abernathy",
    authorEmail: "curator@architect-atelier.com",
    rating: 5,
    title: "Quiet light",
    body: "Casts a remarkably soft pool against the bedroom wall.",
    submittedOn: "April 30, 2026",
    status: "approved",
  },
  {
    id: 4,
    productName: "Slat Screen",
    productSlug: "slat-screen",
    authorName: "Anonymous",
    authorEmail: "spam@example.com",
    rating: 1,
    title: "asdf",
    body: "Buy crypto now!!!",
    submittedOn: "May 14, 2026",
    status: "rejected",
  },
];

export const getReviews = cache(async (): Promise<Review[]> => {
  return REVIEWS.slice();
});
