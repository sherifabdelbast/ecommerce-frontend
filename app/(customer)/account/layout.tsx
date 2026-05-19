import NavBar from "../../_components/NavBar";
import Footer from "../../_components/Footer";
import AccountSideNav from "../../_components/AccountSideNav";

/**
 * Account-area layout — shared by all /account/** pages. Fixed top nav, a
 * sticky side navigation, and the page content beside it.
 */
export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="flex flex-col pt-20 md:flex-row">
        <AccountSideNav />
        <main className="min-h-[calc(100vh-5rem)] flex-1">{children}</main>
      </div>
      <Footer />
    </>
  );
}
