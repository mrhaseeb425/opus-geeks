import { useEffect, useRef } from "react";
import HeroSlider from "../components/HeroSlider";
import Icon from "../components/Icon";
import CountUp from "../components/CountUp";
import {
  SERVICES,
  INDUSTRIES,
  PROCESS_STEPS,
  STATS,
  TESTIMONIALS,
  TECH_STACK,
} from "../data/site";

export default function Home({ setActiveNav }) {
  const pageRef = useRef(null);

  // Drives the soft light in .cursor-glow so the home page feels alive and
  // reacts to the mouse, on top of the always-on floating orb animation.
  useEffect(() => {
    let frame = null;
    const handlePointerMove = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        pageRef.current?.style.setProperty("--cursor-x", `${event.clientX}px`);
        pageRef.current?.style.setProperty("--cursor-y", `${event.clientY}px`);
        frame = null;
      });
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (label) => (event) => {
    event.preventDefault();
    setActiveNav?.(label);
  };

  return (
    <div className="home-page" ref={pageRef}>
      <div className="home-ambient" aria-hidden="true">
        <span className="ambient-orb orb-1" />
        <span className="ambient-orb orb-2" />
        <span className="ambient-orb orb-3" />
        <span className="cursor-glow" />
      </div>
      <HeroSlider />

      {/* Stats strip */}
      <section className="stats-strip">
        <div className="frame stats-grid">
          {STATS.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <Icon name={stat.icon} className="stat-icon" />
              <span className="stat-value">
                <CountUp value={stat.value} />
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services overview */}
      <section className="section" id="services-preview">
        <div className="frame">
          <div className="section-head">
            <p className="section-eyebrow">What we do</p>
            <h2 className="section-title">Services built around your goals</h2>
            <p className="section-subtitle">
              From first sketch to shipped product, our team handles design
              and engineering under one roof.
            </p>
          </div>

          <div className="grid-4 services-grid">
            {SERVICES.map((service) => (
              <a
                href={`#${service.hash}`}
                className="card-glass service-card"
                key={service.name}
                onClick={goTo(service.name)}
              >
                <span className="card-icon-badge">
                  <Icon name={service.icon} />
                </span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
                <span className="card-link">
                  Learn more <Icon name="arrowRight" className="icon-sm" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section section-alt">
        <div className="frame">
          <div className="section-head">
            <p className="section-eyebrow">Who we serve</p>
            <h2 className="section-title">Industries we build for</h2>
            <p className="section-subtitle">
              Deep experience across regulated, high-stakes industries where
              reliability isn't optional.
            </p>
          </div>

          <div className="grid-4 industries-grid">
            {INDUSTRIES.map((industry) => (
              <div className="industry-card" key={industry.name}>
                <span className="card-icon-badge">
                  <Icon name={industry.icon} />
                </span>
                <h3>{industry.name}</h3>
                <p>{industry.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="section tech-marquee-section">
        <div className="frame">
          <div className="section-head">
            <p className="section-eyebrow">Our toolkit</p>
            <h2 className="section-title">Technologies behind the work</h2>
            <p className="section-subtitle">
              The languages, frameworks, and platforms our team reaches for
              on every build.
            </p>
          </div>
        </div>

        <div className="tech-marquee">
          <div className="tech-marquee-track">
            {[...TECH_STACK, ...TECH_STACK].map((tech, index) => (
              <span className="tech-chip" key={`${tech}-${index}`}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="frame">
          <div className="section-head">
            <p className="section-eyebrow">How we work</p>
            <h2 className="section-title">A process built for momentum</h2>
            <p className="section-subtitle">
              Four stages keep every project moving from idea to launch,
              without surprises along the way.
            </p>
          </div>

          <div className="process-rail">
            {PROCESS_STEPS.map((step, index) => (
              <div className="process-step" key={step.name}>
                <div className="process-step-top">
                  <span className="process-number">{step.step}</span>
                  <span className="card-icon-badge process-icon">
                    <Icon name={step.icon} />
                  </span>
                </div>
                <h3>{step.name}</h3>
                <p>{step.detail}</p>
                {index < PROCESS_STEPS.length - 1 && (
                  <span className="process-connector" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-alt">
        <div className="frame">
          <div className="section-head">
            <p className="section-eyebrow">Client feedback</p>
            <h2 className="section-title">Trusted by teams who move fast</h2>
          </div>

          <div className="grid-3 testimonial-grid">
            {TESTIMONIALS.map((testimonial) => (
              <figure className="card-glass testimonial-card" key={testimonial.author}>
                <Icon name="quote" className="testimonial-quote-icon" />
                <div className="testimonial-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon name="star" className="icon-sm" key={i} />
                  ))}
                </div>
                <blockquote>{testimonial.quote}</blockquote>
                <figcaption>
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="section cta-banner">
        <div className="frame cta-banner-inner">
          <div>
            <h2>Ready to build something exceptional?</h2>
            <p>
              Tell us about your project and we'll get back to you within one
              business day.
            </p>
          </div>
          <a className="btn-gradient" href="#contact" onClick={goTo("Contact Us")}>
            Start a project <Icon name="arrowRight" className="icon-sm" />
          </a>
        </div>
      </section>
    </div>
  );
}
