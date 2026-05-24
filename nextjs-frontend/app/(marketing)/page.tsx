import HeroCarousel from "@/components/HeroCarousel";




export default function Home() {
  return (
    <>
      <HeroCarousel />

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* How It Works */}
        <section className="grid gap-8 sm:grid-cols-3 text-center">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/30 hover:scale-[1.02] transition-transform duration-300">
            <h3 className="font-semibold text-lg mb-2">
              1. Capture Leads
            </h3>
            <p className="text-gray-600 text-sm">
              Collect lead details through a simple contact form.
            </p>
          </div>

          <div className="bg-accent/40 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/30">
            <h3 className="font-semibold text-lg mb-2">
              2. AI Qualification
            </h3>
            <p className="text-gray-600 text-sm">
              Our AI evaluates intent and recommends next actions.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/30">
            <h3 className="font-semibold text-lg mb-2">
              3. Instant Routing
            </h3>
            <p className="text-gray-600 text-sm">
              High-priority leads are instantly sent to your sales team.
            </p>
          </div>
        </section>

        <section className="mt-24 text-center max-w-3xl mx-auto px-6">
  <h2 className="text-2xl font-heading mb-4">
    Built for Modern Sales Teams
  </h2>
  <p className="text-gray-600">
    Our AI-driven system helps businesses prioritize high-intent leads,
    reduce response time, and close more deals through intelligent automation.
  </p>
</section>
      </main>
    </>
  );
}