import Icon from "../components/Icon";
import CountUp from "../components/CountUp";
import Magnetic from "../components/Magnetic";
import Reveal from "../components/Reveal";
import { staggerDelay } from "../lib/stagger";
import { STATS, TAGLINE } from "../data/site";

const VALUES = [
  {
    icon: "shield",
    title: "Reliability first",
    detail:
      "We build for industries where things breaking isn't an option — fintech, healthcare, and beyond.",
  },
  {
    icon: "users",
    title: "Real partnership",
    detail:
      "We work as an extension of your team, communicating early and often instead of disappearing between milestones.",
  },
  {
    icon: "clock",
    title: "Momentum",
    detail:
      "A clear four-stage process keeps every engagement moving from first call to launch day.",
  },
  {
    icon: "award",
    title: "Craft",
    detail:
      "Design and engineering held to the same bar — we sweat the details other teams skip.",
  },
];

const TEAM = [
  { role: "Product Strategy", icon: "layers" },
  { role: "UX/UI Design", icon: "pen" },
  { role: "App Engineering", icon: "code" },
  { role: "Web Engineering", icon: "browser" },
  { role: "Game Development", icon: "gamepad" },
  { role: "Quality & Delivery", icon: "check" },
];

export default function About({ setActiveNav }) {
  const goTo = (label) => (event) => {
    event.preventDefault();
    setActiveNav?.(label);
  };

  return (
    <div className="page-hero">
      <section className="page-header">
        <Reveal as="div" className="frame">
          <p className="section-eyebrow">About Opus Geeks</p>
          <h1>A dedicated team of designers, developers, and builders</h1>
          <p className="page-header-subtitle">{TAGLINE}</p>
        </Reveal>
      </section>

      <section className="section">
        <div className="frame about-story-grid">
          <Reveal as="div" variant="fade">
            <p className="section-eyebrow">Our story</p>
            <h2 className="section-title">
              Helping teams navigate technology, from Karachi to Florida
            </h2>
            <p className="about-copy">
              Opus Geeks started with a simple idea: startups and enterprises
              alike deserve a technology partner that treats their product
              like its own. With teams in Karachi, Pakistan and headquarters
              in Pembroke Pines, Florida, we've grown into a full-cycle studio
              covering strategy, design, and engineering.
            </p>
            <p className="about-copy">
              We work across fintech, healthcare, retail, and real estate —
              industries where reliability, compliance, and user trust
              genuinely matter — helping our clients stay ahead of the curve
              instead of playing catch-up.
            </p>
          </Reveal>

          <div className="stats-grid about-stats-grid">
            {STATS.map((stat, index) => (
              <Reveal
                as="div"
                className="stat-card"
                key={stat.label}
                delay={staggerDelay(index)}
              >
                <Icon name={stat.icon} className="stat-icon" />
                <span className="stat-value">
                  <CountUp value={stat.value} />
                </span>
                <span className="stat-label">{stat.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="frame">
          <Reveal as="div" className="section-head">
            <p className="section-eyebrow">What we value</p>
            <h2 className="section-title">The principles behind every build</h2>
          </Reveal>
          <div className="grid-4 values-grid">
            {VALUES.map((value, index) => (
              <Reveal
                as="div"
                className="card-glass value-card"
                key={value.title}
                delay={staggerDelay(index)}
              >
                <span className="card-icon-badge">
                  <Icon name={value.icon} />
                </span>
                <h3>{value.title}</h3>
                <p>{value.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="frame">
          <Reveal as="div" className="section-head">
            <p className="section-eyebrow">Our team</p>
            <h2 className="section-title">Disciplines under one roof</h2>
            <p className="section-subtitle">
              Every project draws on a cross-functional team so nothing gets
              lost between design and engineering handoffs.
            </p>
          </Reveal>
          <div className="grid-3 team-grid">
            {TEAM.map((member, index) => (
              <Reveal
                as="div"
                className="team-card"
                key={member.role}
                delay={staggerDelay(index)}
              >
                <span className="card-icon-badge">
                  <Icon name={member.icon} />
                </span>
                <h3>{member.role}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-banner">
        <Reveal as="div" className="frame cta-banner-inner">
          <div>
            <h2>Want to work with us?</h2>
            <p>We'd love to hear about what you're building.</p>
          </div>
          <Magnetic>
            <a className="btn-gradient" href="#contact" onClick={goTo("Contact Us")}>
              Get in touch <Icon name="arrowRight" className="icon-sm" />
            </a>
          </Magnetic>
        </Reveal>
      </section>
    </div>
  );
}
