import NavBar from "../_components/NavBar";
import Hero from "../_components/Hero";
import FeaturedObjects from "../_components/FeaturedObjects";
import ShopByAtmosphere from "../_components/ShopByAtmosphere";
import EditorialNote from "../_components/EditorialNote";
import Newsletter from "../_components/Newsletter";
import Footer from "../_components/Footer";

export const revalidate = 3600;

export default function Page() {
  return (
    <>
      <NavBar />
      <main className="pt-20">
        <Hero />
        <FeaturedObjects />
        <ShopByAtmosphere />
        <EditorialNote />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
