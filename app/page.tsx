import {
  Droplets,
  Flame,
  Wrench,
  ShieldCheck,
  Phone,
  Clock,
  Star,
  Award,
  Users,
  MapPin,
  CheckCircle2,
  ThermometerSun,
  Pipette,
  Camera,
  Bath,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import VoiceWidget from "@/components/VoiceWidget";

const SERVICES = [
  {
    icon: ThermometerSun,
    title: "Water Heater Repair & Replacement",
    description:
      "Rheem, Bradford White, State Select. Tank or tankless — we diagnose the real problem before recommending a fix.",
  },
  {
    icon: Flame,
    title: "Tankless Water Heater (Rinnai)",
    description:
      "Exclusive Rinnai installers. Endless hot water, lower bills, and a unit that lasts 20+ years when properly maintained.",
  },
  {
    icon: Droplets,
    title: "Leak Repair & Repiping",
    description:
      "Pinhole leaks, slab leaks, corroded lines. We find it, fix it, and make sure it stays fixed.",
  },
  {
    icon: Pipette,
    title: "CPI Dura-Pex Repair",
    description:
      "Homes built 1998–2006 in Union, Lancaster, and York counties — we specialize in replacing this failure-prone piping.",
  },
  {
    icon: Camera,
    title: "Sewer & Camera Inspections",
    description:
      "HD camera inspections to see exactly what is going on underground. No guesswork, no unnecessary digging.",
  },
  {
    icon: Bath,
    title: "Kitchen & Bath Plumbing",
    description:
      "Remodel plumbing done right the first time. We work with your contractor or handle the plumbing scope directly.",
  },
];

const TRUST_POINTS = [
  { icon: Star, label: "4.8 Stars", sublabel: "104 Google Reviews" },
  { icon: Award, label: "BBB A+", sublabel: "Accredited Business" },
  { icon: Clock, label: "Since 1995", sublabel: "30+ Years in Business" },
  { icon: ShieldCheck, label: "Licensed", sublabel: "& Fully Insured" },
];

const SERVICE_AREAS = [
  "South Charlotte",
  "Ballantyne",
  "Matthews",
  "Pineville",
  "Marvin",
  "Mint Hill",
  "Fort Mill, SC",
  "Indian Land, SC",
  "Rock Hill, SC",
];

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="hero-aurora relative min-h-[92vh] flex items-center">
        <div className="aurora-orb" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-body text-xs font-medium tracking-wide text-white/80 uppercase">
                Serving South Charlotte since 1995
              </span>
            </div>

            <h1 className="font-heading text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Your Neighbor&apos;s Plumber{" "}
              <span className="italic text-ember-300">for 30 Years</span>
            </h1>

            <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-white/75 sm:text-xl">
              Brett Eschert and his team have fixed more leaky faucets, busted
              water heaters, and midnight emergencies in South Charlotte than
              anyone. No surprises. No upsells. Just honest plumbing.
            </p>

            {/* Two-path CTA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="tel:7044888177"
                className="group inline-flex items-center gap-3 rounded-full bg-ember px-7 py-4 font-body text-base font-bold text-white shadow-lg shadow-ember/25 transition-all hover:bg-ember-600 hover:shadow-xl hover:shadow-ember/30"
              >
                <Phone className="h-5 w-5" />
                <span>Call (704) 488-8177</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-7 py-4 font-body text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {TRUST_POINTS.map((t) => (
                <div key={t.label} className="trust-badge flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <t.icon className="h-5 w-5 text-ember-300" />
                  </div>
                  <div>
                    <p className="font-heading text-sm font-bold text-white">
                      {t.label}
                    </p>
                    <p className="font-body text-xs text-white/50">{t.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="warm-section relative py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 max-w-xl">
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-widest text-ember">
              What We Do
            </p>
            <h2 className="font-heading text-3xl font-bold text-navy-900 sm:text-4xl lg:text-5xl">
              30 years of fixing{" "}
              <span className="italic text-ember">these exact homes</span>
            </h2>
            <p className="mt-4 font-body text-lg text-navy-500">
              We know the plumbing in Ballantyne subdivisions like the back of
              our hand. CPI Dura-Pex failures, polybutylene repiping, old
              galvanized lines — we have seen it all.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="service-card overflow-hidden rounded-xl border border-navy-100 bg-white p-7"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-ember/10">
                  <s.icon className="h-6 w-6 text-ember" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-navy-900">
                  {s.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-navy-500">
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="font-body text-base text-navy-400">
              Also: toilet &amp; faucet repair, garbage disposals, water main
              replacement, hot water recirculation pumps, and more.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ TRUST & PROOF ═══ */}
      <section className="bg-navy-950 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left — story */}
            <div>
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-widest text-ember-300">
                Family-Owned
              </p>
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                Brett answers the phone.{" "}
                <span className="italic text-ember-300">Not a call center.</span>
              </h2>
              <p className="mt-6 font-body text-lg leading-relaxed text-white/70">
                All Hours Plumbing was started in 1995 by Brett and Tassie
                Eschert right here in South Charlotte. Three decades later,
                Brett still picks up the phone, still runs the estimates, and
                still makes sure every job is done right.
              </p>
              <p className="mt-4 font-body text-lg leading-relaxed text-white/70">
                Our team — Brett, Johnny, and Eric — are the same faces you
                will see every time. No subcontractors. No revolving door.
                Just people who know your neighborhood because they live in it.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "No Upselling",
                  "Transparent Pricing",
                  "Same-Day Emergency",
                  "Free Estimates",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-body text-sm text-white/80"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-ember-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — reviews / proof */}
            <div className="space-y-6">
              {[
                {
                  stars: 5,
                  text: "Brett came out the same day we called. He was honest about what needed to be replaced and what could wait. That kind of integrity is rare.",
                  author: "South Charlotte homeowner",
                },
                {
                  stars: 5,
                  text: "We had a Dura-Pex leak at 6 AM on a Saturday. They were here by 8. Fixed the leak and explained why these pipes fail. No scare tactics, just facts.",
                  author: "Union County homeowner",
                },
                {
                  stars: 5,
                  text: "Have used All Hours three times now for different plumbing issues. Always fair, always on time, always do quality work.",
                  author: "Ballantyne resident",
                },
              ].map((review, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: review.stars }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-ember-400 text-ember-400"
                      />
                    ))}
                  </div>
                  <p className="font-body text-base leading-relaxed text-white/80">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <p className="mt-3 font-body text-sm text-white/40">
                    — {review.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ AI RECEPTIONIST ═══ */}
      <section className="ai-section py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ember/20 bg-ember/5 px-4 py-1.5">
              <MessageCircle className="h-4 w-4 text-ember" />
              <span className="font-body text-sm font-semibold text-ember">
                Available 24/7
              </span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-navy-900 sm:text-4xl lg:text-5xl">
              Need help after hours?{" "}
              <span className="italic text-ember">Talk to our AI receptionist.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-navy-500">
              Pipes do not wait for business hours, and neither do we. Our AI
              voice assistant can take your details, assess urgency, and get
              Brett a callback request — any time, day or night.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Tap the button",
                description:
                  "Hit the orange voice button in the bottom corner of this page.",
              },
              {
                step: "2",
                title: "Describe your issue",
                description:
                  "Tell our AI what is going on — leaking water heater, clogged drain, emergency or not.",
              },
              {
                step: "3",
                title: "Get a callback",
                description:
                  "We will have Brett or one of our techs call you back within minutes.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 font-heading text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-navy-900">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-navy-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="font-body text-sm text-navy-400">
              Prefer to call directly? We are always reachable at{" "}
              <a
                href="tel:7044888177"
                className="font-semibold text-ember hover:underline"
              >
                (704) 488-8177
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CTA / BOOKING ═══ */}
      <section id="contact" className="cta-section-bg py-24 lg:py-32">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Plumbing problem?{" "}
                <span className="italic text-ember-300">
                  Let&apos;s get it sorted.
                </span>
              </h2>
              <p className="mt-6 font-body text-lg text-white/70">
                Whether it is a 2 AM emergency or a weekend project you have
                been putting off, we are here. Same-day service for
                emergencies. Free estimates for everything else.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ember/20">
                    <Phone className="h-6 w-6 text-ember-300" />
                  </div>
                  <div>
                    <p className="font-heading text-lg font-bold text-white">
                      Emergency? Call now.
                    </p>
                    <a
                      href="tel:7044888177"
                      className="font-body text-2xl font-bold text-ember-300 transition-colors hover:text-ember-200"
                    >
                      (704) 488-8177
                    </a>
                    <p className="mt-1 font-body text-sm text-white/50">
                      Active leak, burst pipe, no hot water — call us right now.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Clock className="h-6 w-6 text-white/70" />
                  </div>
                  <div>
                    <p className="font-heading text-lg font-bold text-white">
                      Non-urgent? Get your free quote.
                    </p>
                    <p className="mt-1 font-body text-sm text-white/50">
                      Tap the voice button to talk to our AI assistant and we
                      will have Brett call you back within 10 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Area */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-ember-300" />
                <h3 className="font-heading text-xl font-bold text-white">
                  Service Areas
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {SERVICE_AREAS.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-body text-sm text-white/70"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="font-body text-sm text-white/50">
                  Based at 15105-D John J Delaney Dr., Ste 156, Charlotte, NC
                  28277. We serve a wide radius across the southern Charlotte
                  metro and northern South Carolina.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-navy-100 bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="font-heading text-lg font-bold text-navy-900">
                All Hours Plumbing
              </h4>
              <p className="mt-2 font-body text-sm text-navy-400">
                Family-owned residential plumbing. Serving South Charlotte
                since 1995.
              </p>
            </div>
            <div>
              <h5 className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-navy-300">
                Contact
              </h5>
              <div className="space-y-2 font-body text-sm text-navy-500">
                <p>
                  <a href="tel:7044888177" className="hover:text-ember">
                    (704) 488-8177
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:brett@allhoursplumbinginc.com"
                    className="hover:text-ember"
                  >
                    brett@allhoursplumbinginc.com
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h5 className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-navy-300">
                Services
              </h5>
              <div className="space-y-1.5 font-body text-sm text-navy-500">
                <p>Water Heater Repair</p>
                <p>Tankless Installation</p>
                <p>Leak Repair &amp; Repiping</p>
                <p>CPI Dura-Pex Repair</p>
                <p>Sewer &amp; Camera</p>
              </div>
            </div>
            <div>
              <h5 className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-navy-300">
                Service Areas
              </h5>
              <div className="space-y-1.5 font-body text-sm text-navy-500">
                <p>South Charlotte, NC</p>
                <p>Ballantyne &amp; Matthews</p>
                <p>Fort Mill &amp; Indian Land, SC</p>
                <p>Rock Hill, SC</p>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-navy-100 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="font-body text-xs text-navy-300">
                &copy; {new Date().getFullYear()} All Hours Plumbing, Inc. All
                rights reserved.
              </p>
              <div className="flex items-center gap-4">
                {TRUST_POINTS.map((t) => (
                  <div
                    key={t.label}
                    className="flex items-center gap-1.5 font-body text-xs text-navy-400"
                  >
                    <t.icon className="h-3.5 w-3.5 text-ember/60" />
                    {t.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <VoiceWidget />
    </>
  );
}
