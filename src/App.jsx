import React, { useEffect, useRef, useState } from "react";

// --- Robust asset base resolver -------------------------------------------
function ensureSlash(s) {
  if (typeof s !== "string" || s.length === 0) return "/";
  return s.endsWith("/") ? s : s + "/";
}

function normalizePathname(p) {
  // collapse multiple slashes like //N2bio//index.html -> /N2bio/index.html
  return (p || "/").replace(/\/{2,}/g, "/");
}

function resolveBaseUrl() {
  try {
    if (typeof import.meta !== "undefined" && import.meta && import.meta.env) {
      const b = import.meta.env.BASE_URL;
      if (typeof b === "string" && b.length > 0) return ensureSlash(b);
    }
  } catch {
    // ignore
  }

  if (typeof window !== "undefined" && window.location) {
    const path = normalizePathname(window.location.pathname || "/");
    const parts = path.split("/").filter(Boolean);
    if (parts.length > 0) return `/${parts[0]}/`;
  }

  return "/";
}

function baseFromPathname(pathname) {
  const path = normalizePathname(pathname || "/");
  const parts = path.split("/").filter(Boolean);
  return parts.length > 0 ? `/${parts[0]}/` : "/";
}

// --- simple in-view fade-in helper ----------------------------------------
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ---------- Collapsible section ---------- */
function Collapsible({
  id,
  title,
  defaultOpen = false,
  openLabel = "Hide",
  closedLabel = "Show",
  children,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef(null);
  const [maxH, setMaxH] = useState(0);

  // Measure height for smooth max-height animation
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) setMaxH(el.scrollHeight);
    else setMaxH(0);
  }, [open, children]);

  // Auto-open if navigated directly with hash (e.g., #diagrams or #applications)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === `#${id}`) {
      setOpen(true);
      setTimeout(
        () =>
          document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        0
      );
    }
  }, [id]);

  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-8 border-t border-white/10">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-semibold">{title}</h2>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={`${id}-content`}
          className="shrink-0 px-4 py-2 rounded-lg bg-white text-[#5b57a3] font-semibold hover:bg-gray-100 border border-white/10"
        >
          {open ? openLabel : closedLabel}
        </button>
      </div>

      <div
        id={`${id}-content`}
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{ maxHeight: maxH }}
      >
        <div ref={contentRef} className={open ? "pt-8" : ""}>
          {children}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const base = resolveBaseUrl();

  // local assets resolved against the current deployment base
  const chickenSrc = `${base}chicken.jpg`;
  const imgs = {
    globalProblem:             `${base}global-problem.png`,
    enhancedOrganic:           `${base}enhanced-organic.png`,
    renewableFuel:             `${base}renewable-fuel.png`,
    syntheticFertilizerDecarb: `${base}synthetic-fertilizer-decarbonization.png`,
    multipleFarm:              `${base}multiple-farm-opportunities.png`,
    n2bioFisheye:              `${base}N2bio.png`,
    mdpiThumb:                 `${base}mdpi.png`,
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
                  href="#media"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-orange-500 font-semibold shadow hover:opacity-95"
                >
                  Watch & Read
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

        {/* DIAGRAMS / IMAGES (COLLAPSIBLE) */}
        <Collapsible id="diagrams" title="Diagrams & System Overview" defaultOpen={false} closedLabel="Show diagrams" openLabel="Hide diagrams">
          <div className="mt-2 space-y-16">
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
                <h3 className="text-3xl font-bold">Solution: Plasma Add-On to Biodigester</h3>
                <p className="mt-4 text-white/90">
                  By pairing anaerobic digester plant, which produce biogas, with a Plasma fertilizer production system, the heat from the plasma process can be recycled back into the digester. At the same time, the plasma unit generates nitrogen-enriched fertilizer and recycles water on the farm. Want to learn more about the benefits of this solution? Open the diagram below, which highlights them in detail.
                </p>
                <a href={imgs.renewableFuel} className="inline-block mt-6 px-4 py-2 bg-indigo-500 rounded-lg">
                  Open Diagram
                </a>
              </div>
            </div>
          </div>
        </Collapsible>

        {/* TECHNOLOGY */}
        <section id="technology" className="mx-auto max-w-7xl px-6 py-20 border-t border-white/10">
          <h2 className="text-4xl font-semibold">Technology</h2>
          <p className="mt-6 text-lg text-white/90">
            Our nitrogen fixation technology is built on Cerawave™ microwave plasma torches, which replace
            conventional copper inductors with high-purity ceramic rings to achieve exceptional efficiency
            and durability. Operating at 915 MHz with 100 kW magnetrons, the torches generate stable,
            near-atmospheric plasma, enabling the direct conversion of nitrogen
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
              Heat from the plasma torch is recycled to release <strong>ammonia</strong> from liquid digestate.
            </li>
            <li className="rounded-xl border border-white/10 bg-white/10 p-4">
              <strong>Nitric Acid</strong> and <strong>Ammonia</strong> are combined to make fertilizer.
            </li>
            <li className="rounded-xl border border-white/10 bg-white/10 p-4">
              Clean water is recycled back to the digester.
            </li>
          </ol>
        </section>

        {/* BENEFITS (COLLAPSIBLE) */}
        <Collapsible
          id="applications"
          title="Benefits"
          defaultOpen={false}
          closedLabel="Learn about benefits"
          openLabel="Hide benefits"
        >
          <div className="mt-6 grid md:grid-cols-2 gap-8 text-lg">
            <div className="rounded-xl border border-white/10 bg-white/10 p-6">
              <h3 className="font-semibold">Reduced Emissions &amp; Costs</h3>
              <p className="mt-2 text-white/80">
                Reduced emissions, transportation costs, and fertilizer price fluctuations.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 p-6">
              <h3 className="font-semibold">Water Reuse &amp; Lower Emissions</h3>
              <p className="mt-2 text-white/80">Water is reused and ammonia greenhouse emissions are eliminated, heat from plasma is reused.</p>
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
        </Collapsible>

        {/* FUNNEL DIVIDER */}
        <section aria-hidden="true" className="relative">
          <svg
            viewBox="0 0 1440 220"
            className="w-full h-[160px] md:h-[200px] text-white/10"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 L1440,0 L960,200 C900,220 540,220 480,200 L0,0 Z"
              fill="currentColor"
              opacity="0.35"
            />
          </svg>
        </section>

        {/* WHITE BOX TRANSITION SECTION (includes Request link) */}
        <WhiteBoxTransition imgSrc={imgs.n2bioFisheye} />

        {/* MEDIA ROW: two videos + mdpi paper */}
        <section id="media" className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-semibold mb-8">Watch & Read</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Video 1 */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/t1R0xygjFOQ"
                  title="Let's talk about N2bio"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Let’s talk about N2bio</h3>
                <p className="text-sm text-white/80 mt-1">
                  Overview of the platform and on-farm nitrogen fixation.
                </p>
              </div>
            </div>

            {/* Video 2 */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/4OhJHVxUD5k"
                  title="100 kW Demo of Pilot Plant"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">100 kW Demo of Pilot Plant</h3>
                <p className="text-sm text-white/80 mt-1">
                  Field-scale performance and thermal integration concepts.
                </p>
              </div>
            </div>

            {/* MDPI Paper */}
            <a
              href="https://www.mdpi.com/2504-3129/6/3/51"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl overflow-hidden border border-white/10 bg-white/5 group"
              title="Peer-reviewed manuscript – 100 kW pilot plant"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={imgs.mdpiThumb}
                  alt="MDPI paper cover: High-Power Closed-Loop Pilot System for Nitric Acid Production"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  Peer-reviewed manuscript – 100 kW pilot plant
                </h3>
                <p className="text-sm text-white/80 mt-1">
                  Full paper detailing performance of the closed-loop nitric acid pilot plant.
                </p>
              </div>
            </a>
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
                {tests.map((t) => {
                  const got = baseFromPathname(t.pathname);
                  const pass = got === t.expected;
                  return (
                    <tr key={t.name} className="border-b border-white/10">
                      <td className="py-1 pr-4">{t.name}</td>
                      <td className="py-1 pr-4"><code>{String(t.pathname)}</code></td>
                      <td className="py-1 pr-4"><code>{t.expected}</code></td>
                      <td className="py-1 pr-4"><code>{got}</code></td>
                      <td className="py-1 pr-4">{pass ? "✅" : "❌"}</td>
                    </tr>
                  );
                })}
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
              <a href="https://www.radomcorp.com/" target="_blank" rel="noopener noreferrer" aria-label="Website" title="Website — radomcorp.com">🌐</a>
              <a href="https://www.instagram.com/egrushnikova/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">📷</a>
              <a href="https://x.com/RadomCorpPlasma" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" title="X (Twitter)">✖</a>
              <a href="https://www.linkedin.com/company/radom-corp-high-power" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">in</a>
              <a href="https://www.youtube.com/@RadomCorporation" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube">▶</a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Plasma Source Products</h3>
            <ul className="space-y-2 text-white/90">
              <li><a href="https://www.radomcorp.com/products/mira-altair">1.5 kW Altair &amp; Mira</a></li>
              <li><a href="https://www.radomcorp.com/products/polaris">10 kW Polaris</a></li>
              <li><a href="https://www.radomcorp.com/products/sirius">100 kW Sirius</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-white/90">
              <li><a href="https://www.radomcorp.com/applications">Applications</a></li>
              <li><a href="https://www.radominstruments.com/">Radom Instruments</a></li>
              <li><a href="https://www.radomcorp.com/request-form">Contact Us</a></li>
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

/* ---------- Subcomponents ---------- */

function WhiteBoxTransition({ imgSrc }) {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="white-box" className="mx-auto max-w-7xl px-6 pb-20">
      <div
        ref={ref}
        className={[
          "grid lg:grid-cols-2 gap-10 items-center rounded-2xl",
          "bg-white/5 border border-white/10 p-6 md:p-10",
          "transition-all duration-700",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        ].join(" ")}
      >
        <div>
          <h3 className="text-3xl font-bold">From Vision to Reality</h3>
          <p className="mt-4 text-white/90">
            Now that we’ve explored the problem, the plasma solution, how it works,
            and the benefits—it’s time to see how it all converges.
            We don’t do “black box.” Our <span className="font-semibold">white box</span> is a clear,
            modular system that openly shows how plasma, chemistry, and circular
            design work together on farm. This featured unit is a <strong>10 kW</strong> system
            designed for on-farm deployment.
          </p>
          <p className="mt-4 text-white/90">
            Think of this moment as a funnel: emissions reduction, water reuse,
            organic fertilizer revenue, and digester enablement—<em>all</em> flowing into one
            compact unit you can place in the field.
          </p>

          <div className="mt-6">
            <a
              href="https://www.radomcorp.com/request-form"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#5b57a3] font-semibold hover:bg-gray-100 shadow"
            >
              Request white paper / quote for the 10 kW Box →
            </a>
          </div>
        </div>

        <figure className="rounded-2xl overflow-hidden border border-white/10 bg-black/10">
          <img
            src={imgSrc}
            alt="N2bio white box in cornfield, fisheye perspective"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <figcaption className="sr-only">
            N2bio white box showing a transparent window with plasma torch and an IBC on top.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
