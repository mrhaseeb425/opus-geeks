import Icon from "../components/Icon";
import Magnetic from "../components/Magnetic";
import Reveal from "../components/Reveal";

const services = [
  {
    name: "SEO",
    badge: "Organic growth",
    summary:
      "Increase your online visibility and attract more organic traffic to your website through technical audits, on-page optimization, local SEO, and authoritative backlink growth.",
    bullets: [
      "Technical SEO audits and site health optimization",
      "On-page and off-page optimization for better rankings",
      "Backlink acquisition, local SEO, and keyword implementation",
    ],
    image:
      "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Market Research",
    badge: "Data-backed strategy",
    summary:
      "Understand your audience, study competitors, and uncover high-value opportunities using qualitative and quantitative research methods that inform smarter decisions.",
    bullets: [
      "Audience demographics and customer behavior insights",
      "Competitor benchmarking and market opportunity mapping",
      "Surveys, focus groups, analytics, and actionable strategy reports",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Content Marketing",
    badge: "Engagement + conversion",
    summary:
      "Build a content engine that educates buyers, increases brand trust, and turns attention into measurable pipeline with strategic distribution and SEO support.",
    bullets: [
      "Content strategy, editorial planning, and performance tracking",
      "Blogs, infographics, videos, and conversion-focused creative",
      "SEO optimization and distribution to scale reach and conversions",
    ],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Digital Advertising",
    badge: "Precision targeting",
    summary:
      "Launch high-performing paid campaigns across search, social, display, and video channels with audience precision and ROI-driven measurement.",
    bullets: [
      "Highly targeted Search, Social, Display, and Video campaigns",
      "Ad creative development and conversion-first messaging",
      "Performance tracking, attribution, and ROI optimization",
    ],
    image:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Affiliate Marketing",
    badge: "Revenue channels",
    summary:
      "Tap into trusted partner networks to amplify reach and revenue with commission structures, partner recruitment, and performance reporting at scale.",
    bullets: [
      "Affiliate partner recruitment and onboarding",
      "Commission management tools and revenue tracking dashboards",
      "Ongoing optimization for sustainable growth and conversion lift",
    ],
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "SMM",
    badge: "Social performance",
    summary:
      "Streamline your social media marketing with centralized scheduling, engagement monitoring, smart collaboration, and advanced reporting capabilities.",
    bullets: [
      "Centralized social dashboard for publishing and coordination",
      "Monitoring engagement, mentions, and team collaboration",
      "Advanced analytics reporting to improve content impact",
    ],
    image:
      "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&w=1200&q=80",
  },
];

const serviceStats = [
  { value: "25B+", label: "Keywords Database" },
  { value: "100M+", label: "Backlinks" },
  { value: "123+", label: "Geo Databases" },
  { value: "119+", label: "Technical Audit Checks" },
];

export default function Services({ setActiveNav }) {
  const goTo = (label) => (event) => {
    event.preventDefault();
    setActiveNav?.(label);
  };

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="frame relative z-10">
          <div className="max-w-4xl mx-auto pt-20 pb-14 text-center md:pt-28 md:pb-18">
            <Reveal
              as="div"
              className="mb-6 inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-sky-200"
            >
              Digital growth partners
            </Reveal>
            <Reveal
              as="h1"
              className="text-4xl font-black tracking-[-0.06em] text-white md:text-6xl"
            >
              Our Services
            </Reveal>
            <Reveal
              as="p"
              className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-xl"
            >
              Comprehensive Digital Marketing &amp; Optimization Solutions to
              Scale Your Business.
            </Reveal>
            <Reveal
              as="div"
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Magnetic>
                <a
                  href="#contact"
                  onClick={goTo("Contact Us")}
                  className="btn-gradient"
                >
                  Start Now
                </a>
              </Magnetic>
              <a
                href="#contact"
                onClick={goTo("Contact Us")}
                className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/60 px-6 py-3.5 text-sm font-bold text-slate-100 transition hover:border-sky-400/50 hover:text-white"
              >
                Contact Us
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section -mt-2 pb-8">
        <div className="frame">
          <div className="services-grid">
            {services.map((service, index) => (
              <Reveal
                as="article"
                key={service.name}
                className="service-card glass-panel"
                delay={index * 0.06}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="service-icon-badge">
                    <Icon
                      name={
                        service.name === "SEO"
                          ? "chart"
                          : service.name === "Market Research"
                            ? "layers"
                            : service.name === "Content Marketing"
                              ? "pen"
                              : service.name === "Digital Advertising"
                                ? "rocket"
                                : service.name === "Affiliate Marketing"
                                  ? "briefcase"
                                  : "users"
                      }
                    />
                  </span>
                  <span className="service-badge">{service.badge}</span>
                </div>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
                <ul className="service-list">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>
                      <Icon name="check" className="icon-sm" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="frame">
          <div className="metrics-grid">
            {serviceStats.map((stat) => (
              <div key={stat.label} className="metric-card">
                <div className="metric-value">{stat.value}</div>
                <div className="metric-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="frame">
          <Reveal as="div" className="section-head">
            <p className="section-eyebrow">Core service modules</p>
            <h2 className="section-title text-slate-900">
              Marketing systems built to scale smarter growth
            </h2>
          </Reveal>

          {services.map((service, index) => (
            <Reveal
              as="div"
              key={service.name}
              className={`service-feature ${index % 2 === 1 ? "reverse" : ""}`}
              delay={index * 0.08}
            >
              <div className="service-feature-media">
                <img src={service.image} alt={service.name} />
                {/* AI generation placeholder prompts: "A clean modern desk setup with a sleek laptop displaying dynamic SEO metrics, keyword ranking charts, and technical website audit graphs. Professional studio lighting, photorealistic, 8k." */}
              </div>
              <div className="service-feature-copy">
                <span className="service-badge service-badge-solid">
                  {service.badge}
                </span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
                <ul>
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    onClick={goTo("Contact Us")}
                    className="btn-gradient"
                  >
                    Start Now
                  </a>
                  <a
                    href="#contact"
                    onClick={goTo("Contact Us")}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-bold text-slate-900 transition hover:border-sky-500 hover:text-sky-700"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section cta-banner">
        <div className="frame cta-banner-inner">
          <div>
            <h2>Need a custom growth strategy?</h2>
            <p>
              Tell us your goals and we&apos;ll define the right mix of digital
              channels, optimization, and performance reporting to grow your
              pipeline.
            </p>
          </div>
          <Magnetic>
            <a
              href="#contact"
              onClick={goTo("Contact Us")}
              className="btn-gradient"
            >
              Start Now <Icon name="arrowRight" className="icon-sm" />
            </a>
          </Magnetic>
        </div>
      </section>
    </div>
  );
}
