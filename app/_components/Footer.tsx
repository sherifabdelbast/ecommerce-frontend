import { LuBriefcase, LuCreditCard, LuWallet } from "react-icons/lu";

const columns = [
  {
    title: "Navigation",
    links: ["Collections", "Objects", "Atelier", "Editorial"],
  },
  {
    title: "Support",
    links: ["Sustainability", "Shipping & Returns", "Contact", "Privacy Policy"],
  },
  {
    title: "Follow",
    links: ["Instagram", "Pinterest", "Vimeo"],
  },
];

function Footer() {
  return (
    <footer className="w-full bg-primary-container pb-12 pt-24">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-12 px-6 sm:px-8 md:grid-cols-4 lg:px-12">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-6 font-headline text-3xl font-black uppercase tracking-tighter text-white">
            ARCHITECT
          </div>
          <p className="max-w-xs font-body text-sm leading-relaxed text-slate-400">
            Curating a world of quiet authority. Our mission is to provide
            architectural objects that define space through minimal
            intervention.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h4 className="mb-8 font-body text-xs uppercase tracking-widest text-white">
              {column.title}
            </h4>
            <ul className="space-y-4">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-body text-xs uppercase tracking-widest text-slate-400 underline-offset-8 transition-colors hover:text-white hover:underline hover:decoration-tertiary-fixed"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 flex max-w-screen-2xl flex-col items-center justify-between gap-6 px-6 sm:px-8 md:mt-24 md:flex-row lg:px-12">
        <p className="font-body text-xs uppercase tracking-widest text-slate-500">
          © 2026 ARCHITECT CURATIONS. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-8 text-slate-400">
          <LuBriefcase className="text-xl" />
          <LuCreditCard className="text-xl" />
          <LuWallet className="text-xl" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
