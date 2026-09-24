import FaqAccordion from "../components/FaqAccordion";
import Hero from "../components/Hero";
import Icon from "../components/Icon";
import Photo from "../components/Photo";
import NumberedRows from "../components/NumberedRows";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import StatsRow from "../components/StatsRow";
import {
  ClientPhoto,
  CompanyLogo,
  StarRating,
} from "../components/Testimonial";
import { LogoMarquee, RatingSummary, ReviewBadges } from "../components/Trust";
import { staggerDelay } from "../lib/stagger";
import { usePauseOffscreen } from "../lib/usePauseOffscreen";
import { FAQ_PREVIEW } from "../data/faqs";
import {
  SERVICES,
  INDUSTRIES,
  CONTENT,
  PROCESS_STEPS,
  TESTIMONIALS,
  TEAM_PHOTOS,
  TECH_STACK,
  WHY_US,
  testimonialByline,
} from "../data/site";
import { COMPANY, STATS, TEAM_SIZE_LABEL } from "../data/stats";
import { SIZES } from "../lib/images";

export default function Home({ setActiveNav }) {
  const marqueeRef = usePauseOffscreen();
  const teamPhotos = TEAM_PHOTOS.filter((photo) => photo.src);
  const showTeamPhotos = CONTENT.showTeamPhotos && teamPhotos.length > 0;

  const goTo = (label) => (event) => {
    event.preventDefault();
    setActiveNav?.(label);
  };

  return (
    <div className="home-page">
      <div className="home-ambient" aria-hidden="true">
        <span className="ambient-orb orb-1" />
        <span className="ambient-orb orb-2" />
        <span className="ambient-orb orb-3" />
      </div>
      <Hero onNavigate={setActiveNav} />

      <LogoMarquee />

      {/* Stats — the only place these figures appear on Home. */}
      <section className="ed-stats-strip" aria-label="Opus Geeks in numbers">
        <div className="frame">
          <StatsRow stats={STATS} />
        </div>
      </section>

      {/* Services overview */}
      <section className="section" id="services-preview">
        <div className="frame">
          <SectionHead
            eyebrow="What we do"
            title="Apps, platforms and games, built end to end"
            subtitle="Pick one service or combine them. The same team designs, builds and supports your product."
            action={
              <a
                className="btn-secondary"
                href="/services"
                onClick={goTo("Services")}
              >
                Compare all services
              </a>
            }
          />

          {/* Numbered rows, each with its service photo as a thumbnail. */}
          <NumberedRows
            ariaLabel="Services"
            items={SERVICES.map((service) => ({
              key: service.slug,
              title: service.name,
              description: service.card,
              href: `/services/${service.slug}`,
              onClick: goTo(service.name),
              thumb: (
                <Photo
                  photo={service.photo}
                  alt=""
                  width={168}
                  ratio={16 / 10}
                  sizes="84px"
                />
              ),
            }))}
          />
        </div>
      </section>

      {/* Why Opus Geeks */}
      <section
        className="section section-alt why-section"
        aria-labelledby="why-title"
      >
        <div className="frame">
          <SectionHead
            eyebrow="Why Opus Geeks"
            title="What working with us looks like"
            titleId="why-title"
            subtitle="Clear ownership, visible progress and a team that stays after launch."
          />
          <NumberedRows
            items={WHY_US.map((item) => ({
              key: item.title,
              title: item.title,
              description: item.detail,
            }))}
          />
        </div>
      </section>

      {/* Industries */}
      <section className="section">
        <div className="frame">
          <SectionHead
            eyebrow="Industries"
            title="Software for regulated, high-stakes industries"
            subtitle="We know the security, compliance and uptime demands these four sectors bring."
          />

          <div className="grid-4 industries-grid">
            {INDUSTRIES.map((industry, index) => (
              <Reveal
                as="div"
                className="industry-card has-photo"
                key={industry.name}
                delay={staggerDelay(index)}
              >
                <Photo
                  photo={industry.photo}
                  alt=""
                  width={400}
                  ratio={4 / 5}
                  sizes={SIZES.quarterCard}
                  className="industry-card-photo"
                />
                <span className="card-icon-badge">
                  <Icon name={industry.icon} />
                </span>
                <h3>{industry.name}</h3>
                <p>{industry.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="section tech-marquee-section">
        <div className="frame">
          <SectionHead
            eyebrow="Our stack"
            title="The stack behind every build"
            subtitle="Modern, proven technology that keeps your product fast, secure and easy to maintain."
          />
          <ul className="sr-only">
            {TECH_STACK.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>

        <div className="tech-marquee" aria-hidden="true" ref={marqueeRef}>
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
          <SectionHead
            eyebrow="How we work"
            title="Four stages from brief to release"
            subtitle="You review and approve each stage before the next one starts, so there are no late surprises."
          />

          <NumberedRows
            ariaLabel="Our process"
            items={PROCESS_STEPS.map((step) => ({
              key: step.step,
              title: step.name,
              description: step.detail,
            }))}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-alt">
        <div className="frame">
          <SectionHead
            eyebrow="Client feedback"
            title="What clients say about working with us"
          >
            <RatingSummary />
          </SectionHead>

          <div className="grid-3 testimonial-grid">
            {TESTIMONIALS.map((testimonial, index) => {
              const byline = testimonialByline(testimonial);
              return (
                <Reveal
                  as="figure"
                  className="card-glass testimonial-card"
                  key={testimonial.company}
                  delay={staggerDelay(index)}
                >
                  <Icon name="quote" className="testimonial-quote-icon" />
                  <StarRating value={testimonial.rating} />
                  <blockquote>{testimonial.quote}</blockquote>
                  <figcaption>
                    <ClientPhoto
                      photo={testimonial.photo}
                      name={testimonial.author}
                    />
                    <span className="testimonial-byline">
                      <strong>{byline.primary}</strong>
                      <span>{byline.secondary}</span>
                    </span>
                    <CompanyLogo
                      logo={testimonial.logo}
                      company={testimonial.company}
                    />
                  </figcaption>
                </Reveal>
              );
            })}
          </div>

          <ReviewBadges />
        </div>
      </section>

      {/* FAQ preview */}
      <section
        className="section faq-preview-section"
        aria-labelledby="faq-preview-title"
      >
        <div className="frame faq-preview-grid">
          <SectionHead
            layout="stacked"
            eyebrow="FAQs"
            title="Questions we hear before every project"
            titleId="faq-preview-title"
            subtitle="Short answers on timelines, process and support."
            action={
              <a className="btn-secondary" href="/faqs" onClick={goTo("FAQs")}>
                Read all FAQs <Icon name="arrowRight" className="icon-sm" />
              </a>
            }
          />
          <FaqAccordion items={FAQ_PREVIEW} idPrefix="home-faq" />
        </div>
      </section>

      {/* Team & culture — photo grid only with real photos; otherwise a
          clean text-only layout (no stock people presented as our team). */}
      <section
        className={`section section-alt culture-section ${showTeamPhotos ? "" : "is-text-only"}`}
        aria-labelledby="culture-title"
      >
        <div className="frame culture-grid">
          <Reveal as="div" className="culture-copy">
            <p className="ed-eyebrow">Life at Opus Geeks</p>
            <h2 className="section-title" id="culture-title">
              {TEAM_SIZE_LABEL} people in {COMPANY.cities.join(" and ")}
            </h2>
            <p className="section-subtitle">
              Designers, engineers and product leads who share one backlog and
              one standard for quality.
            </p>
            <ul className="culture-facts" aria-label="Team at a glance">
              <li>
                <strong>{TEAM_SIZE_LABEL}</strong> people
              </li>
              <li>
                <strong>{COMPANY.offices}</strong> offices
              </li>
              <li>
                <strong>{SERVICES.length}</strong> service lines
              </li>
            </ul>
            <div className="culture-actions">
              <a className="btn-gradient" href="/about" onClick={goTo("About")}>
                Meet the team <Icon name="arrowRight" className="icon-sm" />
              </a>
              <a className="btn-secondary" href="/careers">
                See open roles
              </a>
            </div>
          </Reveal>
          {/* TODO(content): add real office/team photos to TEAM_PHOTOS
              (data/site.js) and set CONTENT.showTeamPhotos = true. */}
          {showTeamPhotos && (
            <div className="culture-photos">
              {teamPhotos.map((photo, index) => (
                <Reveal
                  as="figure"
                  key={photo.src}
                  className={`culture-photo ${index === 0 ? "is-large" : ""}`}
                  delay={staggerDelay(index)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                  />
                  {photo.caption && <figcaption>{photo.caption}</figcaption>}
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* The closing CTA opens the footer now (data/cta.js). */}
    </div>
  );
}
