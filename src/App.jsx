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
  const chickenSrc = `${base}chicken.jpg`;

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
                Plasma-driven nitrogen fixation for decarbonized fertilizer production. Modular, electrified
                systems enable distributed fertilizers generation for poultry and dairy farms, with a minimal
                carbon footprint.
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
                What do chickens and plasma reactors have in common? The future of farming.
              </p>
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

        {/* OVERVIEW */}
        <section id="overview" className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-semibold">Let's talk about N2bio</h2>
          <div className="mt-6 aspect-video max-w-5xl mx-auto rounded-xl overflow-hidden border border-white/10">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/vEa7KJBTRAw"
              title="Let's talk about N2bio"
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
            <div className="mt-4 flex gap-4 text-xl">
              <a href="#" aria-label="Website">🌐</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="X (Twitter)">✖</a>
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="YouTube">▶</a>
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
