import React from "react";

// --- Robust asset base resolver -------------------------------------------
function ensureSlash(s) {
  return s.endsWith("/") ? s : s + "/";
}

function resolveBaseUrl() {
  try {
    if (typeof import.meta !== "undefined" && import.meta && import.meta.env) {
      const b = import.meta.env.BASE_URL;
      if (typeof b === "string" && b.length > 0) return ensureSlash(b);
    }
  } catch (_) {}

  if (typeof window !== "undefined" && window.location) {
    const path = window.location.pathname || "/";
    const parts = path.split("/").filter(Boolean);
    if (parts.length > 0) return `/${parts[0]}/`;
  }

  return "/";
}

function baseFromPathname(pathname) {
  const parts = (pathname || "/").split("/").filter(Boolean);
  return parts.length > 0 ? `/${parts[0]}/` : "/";
}

export default function App() {
  const base = resolveBaseUrl();

  // local assets resolved against the current deployment base
  const chickenSrc = `${base}chicken.jpg`;
  const imgs = {
    globalProblem:            `${base}global-problem.png`,
    enhancedOrganic:          `${base}enhanced-organic.png`,
    renewableFuel:            `${base}renewable-fuel.png`,
    syntheticFertilizerDecarb:`${base}synthetic-fertilizer-decarbonization.png`,
    multipleFarm:             `${base}multiple-farm-opportunities.png`,
  };

  const tests = [
    { name: "root", pathname: "/", expected: "/" },
    { name: "gh-pages repo root", pathname: "/N2bio/", expected: "/N2bio/" },
    { name: "gh-pages file", pathname: "/N2bio/index.html", expected: "/N2bio/" },
    { name: "nested path", pathname: "/foo/bar", expected: "/foo/" },
    { name: "repo no trailing slash", pathname: "/N2bio", expected: "/N2bio/" },
    { name: "empty string", pathname: "", expected: "/" },
    { name: "null coerced", pathname: /** @type {any} */ (null), expected: "/" },
    { name: "double slashes", pathname: "//N2bio//index.html", expected: "/N2bio/" },
  ];
  const testResults = tests.map((t) => {
    const got = baseFromPathname(t.pathname);
    return { ...t, got, pass: got === t.expected };
  });

  return (
    <div className="min-h-screen w-full bg-[#5b57a3] text-white font-sans flex flex-col">
      {/* HEADER */}
      <header className="bg-[#5b57a3] border-b border-white/20">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <nav className="flex items-center gap-8 text-sm">
            <a href="https://www.radomcorp.com/" className="hover:text-orange-400">Home</a>
            <a
              href="https://www.radomcorp.com/plasma-source-products"
              className="hover:text-orange-400"
            >
              Plasma Source Products ▾
            </a>
            <a
              href="https://www.radomcorp.com/applications"
              className="text-orange-400 font-medium"
            >
              Applications
            </a>
            <a
              href="https://www.radominstruments.com/"
              className="hover:text-orange-400"
            >
              Radom Instruments
            </a>
          </nav>
          <a
            href="https://www.radomcorp.com/request-form"
            className="px-4 py-2 rounded-lg bg-white text-[#5b57a3] font-semibold hover:bg-gray-100"
          >
            Contact Us
          </a>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-grow">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">Nitrogen Fixation</h1>
              <p className="mt-6 text-lg text-white/90 max-w-xl">
                Plasma nitrification uses high-energy plasma to fix atmospheric nitrogen into reactive nitrogen species,
                enabling localized nitric acid or nitrate production for on-site fertilizer.
              </p>
              <div className="mt-8 flex gap-4">
                <a
                  href="#overview"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-orange-500 font-semibold shadow hover:opacity-95"
                >
                  Watch N2Bio Overview
                </a>
              </div>
            </div>

            {/* Single Chicken Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/10">
                <img
                  src={chickenSrc}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1526662092594-e98c1e356d6b?q=80&w=1600&auto=format&fit=crop";
                  }}
                  alt="Free-range chickens on a farm"
                  className="w-full h-96 object-cover brightness-110 saturate-110"
                />
              </div>
              <p className="mt-3 text-sm text-white/80">
                What do chickens and high-temperature plasma have in common? The future of farming.
              </p>
            </div>
          </div>
        </section>

        {/* DIAGRAMS / IMAGES */}
        <section id="diagrams" className="mx-auto max-w-7xl px-6 py-20 border-t border-white/10">
          /*<h2 className="text-4xl font-semibold">The global problem and solution explained with illustrations</h2>*/
          <div className="mt-10 space-y-16">
            {/* Global Problem */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <img
                src={imgs.globalProblem}
                alt="Global Problem flow diagram"
                className="rounded-2xl border border-white/10 w-full"
              />
              <div>
                <h3 className="text-3xl font-bold">The Problem We are Facing Today</h3>
                <p className="mt-4 text-white/90">
                  Agriculture fertilizer production emit X tons of greenhouse gasses, such as CO2, Methane and Ammonia gas, which also contribute to poor air quality in agricultural communities. They are produced in large centralized plants where their prices fluctuate with global fuel costs, resulting in food price instability. Organic alternatives are typically less effective, and the processing and transport of the animal waste also result in fine particulate pollution.
                </p>
                <a href={imgs.globalProblem} className="inline-block mt-6 px-4 py-2 bg-indigo-500 rounded-lg">
                  Open Diagram
                </a>
              </div>
            </div>

            {/* Enhanced Organic Fertilizer Production */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-3xl font-bold">Solution: Modular Plasma Based Fertilizer Production</h3>
                <p className="mt-4 text-white/90">
                  Unit Plasma fertilizer production systems installed at farms can generate fertilizer on demand by converting atmospheric nitrogen into Nitric acid. Mixing Nitric acid with manure not only caputures additional nitrogen, but it prevents ammonia gas emissions.  
                </p>
                <a href={imgs.enhancedOrganic} className="inline-block mt-6 px-4 py-2 bg-indigo-500 rounded-lg">
                  Open Diagram
                </a>
              </div>
              <img
                src={imgs.enhancedOrganic}
                alt="Enhanced Organic Fertilizer Production diagram"
                className="rounded-2xl border border-white/10 w-full order-1 lg:order-2"
              />
            </div>

            {/* Renewable Fuel Production */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <img
                src={imgs.renewableFuel}
                alt="Renewable Fuel Production diagram"
                className="rounded-2xl border border-white/10 w-full"
              />
              <div>
                <h3 className="text-3xl font-bold">Solution: Renewable Fuel Production</h3>
                <p className="mt-4 text-white/90">
                  Couple digesters with plasma to upgrade biogas and fuel pathways.
                </p>
                <a href={imgs.renewableFuel} className="inline-block mt-6 px-4 py-2 bg-indigo-500 rounded-lg">
                  Open Diagram
                </a>
              </div>
            </div>

            {/* Synthetic Fertilizer Industry Decarbonization */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-3xl font-bold">Solution: Synthetic Fertilizer Industry Decarbonization</h3>
                <p className="mt-4 text-white/90">
                  Hybridize existing plants with green nitrogen modules.
                </p>
                <a href={imgs.syntheticFertilizerDecarb} className="inline-block mt-6 px-4 py-2 bg-indigo-500 rounded-lg">
                  Open Diagram
                </a>
              </div>
              <img
                src={imgs.syntheticFertilizerDecarb}
                alt="Synthetic Fertilizer Industry Decarbonization diagram"
                className="rounded-2xl border border-white/10 w-full order-1 lg:order-2"
              />
            </div>

            {/* Multiple Farm Application Opportunities */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <img
                src={imgs.multipleFarm}
                alt="Multiple Farm Application Opportunities diagram"
                className="rounded-2xl border border-white/10 w-full"
              />
              <div>
                <h3 className="text-3xl font-bold">Multiple Farm Application Opportunities</h3>
                <p className="mt-4 text-white/90">
                  A landscape of routes to value across fuels, fertilizer, and materials.
                </p>
                <a href={imgs.multipleFarm} className="inline-block mt-6 px-4 py-2 bg-indigo-500 rounded-lg">
                  Open Diagram
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TECHNOLOGY */}
        <section id="technology" className="mx-auto max-w-7xl px-6 py-20 border-t border-white/10">
          <h2 className="text-4xl font-semibold">Technology</h2>
          <p className="mt-6 text-lg text-white/90">
            Our nitrogen fixation technology is built on Cerawave™ microwave plasma torches, which replace
            conventional copper inductors with high-purity ceramic rings to achieve exceptional efficiency
            and durability. Operating at 915 MHz with 100 kW magnetrons, the torches generate stable,
            near-atmospheric plasma inside a quartz chamber, enabling the direct conversion of nitrogen
            and oxygen into nitric oxide and ultimately nitric acid. This closed-loop system consumes
            only air, water, a small amount of argon, and electricity—eliminating the need for high-pressure,
            catalyst-driven methods like Haber-Bosch and Ostwald. By coupling high plasma efficiency with
            integrated heat recovery, the platform not only produces nitric acid for fertilizer applications
            but also supplies usable process heat, creating a scalable, sustainable alternative to conventional
            fertilizer production.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="mx-auto max-w-7xl px-6 py-20 border-t border-white/10">
          <h2 className="text-4xl font-semibold">How it works</h2>
          <ol className="mt-6 grid md:grid-cols-2 gap-6 list-decimal list-inside text-lg text-white/90">
            <li className="rounded-xl border border-white/10 bg-white/10 p-4">
              Radom plasma makes <strong>Nitric Acid</strong> from air, water, and electricity on the farm.
            </li>
            <li className="rounded-xl border border-white/10 bg-white/10 p-4">
              Heat from the plasma torch is recycled to release <strong>ammonia</strong> from digester water.
            </li>
            <li className="rounded-xl border border-white/10 bg-white/10 p-4">
              <strong>Nitric Acid</strong> and <strong>Ammonia</strong> are combined to make fertilizer.
            </li>
            <li className="rounded-xl border border-white/10 bg-white/10 p-4">
              Clean water is recycled back to the digester.
            </li>
          </ol>
        </section>

        {/* BENEFITS */}
        <section id="applications" className="border-t border-b border-white/10 py-20 px-6">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-4xl font-semibold">Benefits</h2>
            <div className="mt-10 grid md:grid-cols-2 gap-8 text-lg">
              <div className="rounded-xl border border-white/10 bg-white/10 p-6">
                <h3 className="font-semibold">Reduced Emissions &amp; Costs</h3>
                <p className="mt-2 text-white/80">
                  Reduced emissions, transportation costs, and fertilizer price fluctuations.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 p-6">
                <h3 className="font-semibold">Water Reuse &amp; Lower Emissions</h3>
                <p className="mt-2 text-white/80">Water is reused and ammonia greenhouse emissions are eliminated.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 p-6">
                <h3 className="font-semibold">Organic Fertilizer Revenue</h3>
                <p className="mt-2 text-white/80">Organic nitrogen-rich fertilizer becomes a source of revenue.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 p-6">
                <h3 className="font-semibold">Anaerobic Digesters Enabled</h3>
                <p className="mt-2 text-white/80">Makes anaerobic digesters in poultry farms possible and economical.</p>
              </div>
            </div>
          </div>
        </section>

        {/* OVERVIEW (updated to your pitch video) */}
        <section id="overview" className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-semibold">Let's talk about N2bio</h2>
          <div className="mt-6 aspect-video max-w-5xl mx-auto rounded-xl overflow-hidden border border-white/10">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/t1R0xygjFOQ"
              title="N2Bio Pitch"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>

        {/* DEMO VIDEO */}
        <section id="demo" className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-semibold">Demo of Pilot Plant</h2>
          <div className="mt-6 aspect-video max-w-5xl mx-auto rounded-xl overflow-hidden border border-white/10">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/4OhJHVxUD5k"
              title="Pilot Plant Demo"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>

        {/* DEV DIAGNOSTICS */}
        <section className="mx-auto max-w-7xl px-6 pb-8">
          <details className="mt-4 text-xs text-white/80">
            <summary>Dev diagnostics: base URL + tests</summary>
            <div className="mt-2">
              Detected base: <code>{base}</code>
            </div>
            <table className="mt-2 w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-1 pr-4">name</th>
                  <th className="py-1 pr-4">pathname</th>
                  <th className="py-1 pr-4">expected</th>
                  <th className="py-1 pr-4">got</th>
                  <th className="py-1 pr-4">pass</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((t) => (
                  <tr key={t.name} className="border-b border-white/10">
                    <td className="py-1 pr-4">{t.name}</td>
                    <td className="py-1 pr-4">
                      <code>{String(t.pathname)}</code>
                    </td>
                    <td className="py-1 pr-4">
                      <code>{t.expected}</code>
                    </td>
                    <td className="py-1 pr-4">
                      <code>{t.got}</code>
                    </td>
                    <td className="py-1 pr-4">{t.pass ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#5b57a3] border-t border-white/20 py-16 px-6 text-sm">
        <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-12">
          <div>
            <div className="mt-4 text-white/90 space-y-2 text-sm">
              <p>
                <strong>Address:</strong>
                <br />
                N27W23676 Paul Rd, Pewaukee, WI 53072, USA
              </p>
              <p>
                <strong>Contact:</strong>
                <br />
                1-855-PLASMA-0 (1-855-752-7620)
                <br />
                inquiries@radomcorp.com
              </p>
            </div>
            {/* Social links */}
            <div className="mt-4 flex gap-4 text-xl">
              <a
                href="https://www.radomcorp.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                title="Website — radomcorp.com"
              >
                🌐
              </a>
              <a
                href="https://www.instagram.com/egrushnikova/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                📷
              </a>
              <a
                href="https://x.com/RadomCorpPlasma"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                title="X (Twitter)"
              >
                ✖
              </a>
              <a
                href="https://www.linkedin.com/company/radom-corp-high-power"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                in
              </a>
              <a
                href="https://www.youtube.com/@RadomCorporation"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube"
              >
                ▶
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Plasma Source Products</h3>
            <ul className="space-y-2 text-white/90">
              <li>
                <a href="https://www.radomcorp.com/products/mira-altair">
                  1.5 kW Altair &amp; Mira
                </a>
              </li>
              <li>
                <a href="https://www.radomcorp.com/products/polaris">
                  10 kW Polaris
                </a>
              </li>
              <li>
                <a href="https://www.radomcorp.com/products/sirius">
                  100 kW Sirius
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-white/90">
              <li>
                <a href="https://www.radomcorp.com/applications">Applications</a>
              </li>
              <li>
                <a href="https://www.radominstruments.com/">Radom Instruments</a>
              </li>
              <li>
                <a href="https://www.radomcorp.com/request-form">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-7xl mt-10 border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between text-xs text-white/70">
          <p>© {new Date().getFullYear()} Radom Corp. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
