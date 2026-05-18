function Newsletter() {
  return (
    <section className="border-t border-outline-variant/10 py-20 sm:py-32">
      <div className="mx-auto max-w-screen-md px-6 text-center sm:px-8">
        <h3 className="mb-8 font-headline text-3xl font-light italic text-primary">
          Join the Curation.
        </h3>
        <form className="group relative">
          <label htmlFor="newsletter-email" className="sr-only">
            Your email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            placeholder="Your email address"
            className="w-full rounded-md border border-outline-variant/20 bg-surface-container-highest px-5 py-4 text-center font-body transition-colors placeholder:text-secondary/60 focus:border-primary focus:ring-0"
          />
          <button
            type="submit"
            className="mt-8 font-label text-[10px] uppercase tracking-[0.5em] text-primary transition-opacity hover:opacity-50"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
