import Icon from "../components/Icon";
import NumberedRows from "../components/NumberedRows";
import PageHeader from "../components/PageHeader";
import { SERVICES } from "../data/site";
import Photo from "../components/Photo";
import { SIZES } from "../lib/images";

// Everything on this page comes from SERVICES in data/site.js — the same list
// the navbar, footer, home page and contact form use. Cards are short
// summaries that jump to the one detailed section per service below, so no
// copy is repeated.
export default function Services({ setActiveNav }) {
  const goTo = (label) => (event) => {
    event.preventDefault();
    setActiveNav?.(label);
  };

  return (
    <div className="services-page">
      <PageHeader
        eyebrow="Services"
        title="Apps, web platforms, design and games"
        subtitle="Choose one service or combine them. The same team plans, designs, builds and supports your product."
      >
        <div className="ed-page-head-actions">
          <a
            href="/contact"
            onClick={goTo("Contact Us")}
            className="btn-gradient"
          >
            Get a project estimate <Icon name="arrowRight" className="icon-sm" />
          </a>
          <a
            href="/portfolio"
            onClick={goTo("Portfolio")}
            className="btn-secondary"
          >
            See case studies
          </a>
        </div>
      </PageHeader>

      <section
        className="section section-tight"
        aria-labelledby="services-overview-title"
      >
        <div className="frame">
          <h2 className="sr-only" id="services-overview-title">
            Services overview
          </h2>
          {/* Numbered index of the detailed sections below. */}
          <NumberedRows
            items={SERVICES.map((service) => ({
              key: service.slug,
              title: service.name,
              description: service.card,
              href: `/services/${service.slug}`,
              onClick: goTo(service.name),
              meta: <span className="ed-row-meta">{service.tag}</span>,
            }))}
          />
        </div>
      </section>

      <section
        className="section section-tight services-detail-list"
        aria-label="Service details"
      >
        <div className="frame">
          {SERVICES.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className={`service-detail service-feature ${index % 2 === 1 ? "reverse" : ""}`}
              aria-labelledby={`${service.slug}-title`}
            >
              <div className="service-feature-media">
                <Photo
                  photo={service.detailPhoto}
                  width={600}
                  ratio={3 / 2}
                  sizes={SIZES.serviceFeature}
                />
              </div>
              <div className="service-feature-copy">
                <span className="service-badge service-badge-solid">
                  {service.tag}
                </span>
                <h2 id={`${service.slug}-title`}>{service.name}</h2>
                <p>{service.summary}</p>
                <ul className="service-list">
                  {service.highlights.map((highlight) => (
                    <li key={highlight}>
                      <Icon name="check" className="icon-sm" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="service-feature-actions">
                  <a
                    href="/contact"
                    onClick={goTo("Contact Us")}
                    className="btn-gradient"
                  >
                    Get a project estimate{" "}
                    <Icon name="arrowRight" className="icon-sm" />
                  </a>
                  <a
                    href="/portfolio"
                    onClick={goTo("Portfolio")}
                    className="btn-secondary"
                  >
                    See case studies
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* The closing CTA opens the footer now (data/cta.js). */}
    </div>
  );
}
