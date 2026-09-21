import Icon from "../components/Icon";
import Magnetic from "../components/Magnetic";
import Reveal from "../components/Reveal";
import { staggerDelay } from "../lib/stagger";
import { SERVICES, PROCESS_STEPS } from "../data/site";

export default function Services({ serviceName, setActiveNav }) {
  const activeService = SERVICES.find((s) => s.name === serviceName);

  const goTo = (label) => (event) => {
    event.preventDefault();
    setActiveNav?.(label);
  };

  return (
    <div className="page-hero">
      <section className="page-header">
        <Reveal as="div" className="frame">
          <p className="section-eyebrow">Services</p>
          <h1>
            {activeService ? activeService.name : "What we build"}
          </h1>
          <p className="page-header-subtitle">
            {activeService
              ? activeService.summary
              : "Full-cycle product teams for app development, web platforms, interface design, and games — pick a service to see how we work."}
          </p>
        </Reveal>
      </section>

      <section className="section">
        <div className="frame">
          <div className="services-detail-grid">
            {SERVICES.map((service, index) => (
              <Reveal
                as="article"
                key={service.name}
                id={service.hash}
                className={`card-glass service-detail-card ${
                  activeService?.name === service.name ? "is-active" : ""
                }`}
                delay={staggerDelay(index)}
              >
                <span className="card-icon-badge">
                  <Icon name={service.icon} />
                </span>
                <h2>{service.name}</h2>
                <p>{service.summary}</p>
                <ul className="check-list">
                  {service.highlights.map((point) => (
                    <li key={point}>
                      <Icon name="check" className="icon-sm" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <a
                  className="card-link"
                  href="#contact"
                  onClick={goTo("Contact Us")}
                >
                  Discuss this service{" "}
                  <Icon name="arrowRight" className="icon-sm" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="frame">
          <Reveal as="div" className="section-head">
            <p className="section-eyebrow">How it comes together</p>
            <h2 className="section-title">Our delivery process</h2>
          </Reveal>
          <div className="process-rail">
            {PROCESS_STEPS.map((step, index) => (
              <Reveal
                as="div"
                className="process-step"
                key={step.name}
                delay={staggerDelay(index)}
              >
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-banner">
        <Reveal as="div" className="frame cta-banner-inner">
          <div>
            <h2>Not sure which service fits?</h2>
            <p>Tell us what you're trying to build and we'll point you in the right direction.</p>
          </div>
          <Magnetic>
            <a className="btn-gradient" href="#contact" onClick={goTo("Contact Us")}>
              Talk to the team <Icon name="arrowRight" className="icon-sm" />
            </a>
          </Magnetic>
        </Reveal>
      </section>
    </div>
  );
}
