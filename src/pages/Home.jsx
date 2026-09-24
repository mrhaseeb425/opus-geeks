import FaqAccordion from "../components/FaqAccordion";
import Hero from "../components/Hero";
import Icon from "../components/Icon";
import NumberedRows from "../components/NumberedRows";
import Photo from "../components/Photo";
import SectionHead from "../components/SectionHead";
import StatsRow from "../components/StatsRow";
import WorkGrid from "../components/WorkGrid";
import {
  ClientPhoto,
  CompanyLogo,
  StarRating,
} from "../components/Testimonial";
import { LogoMarquee, RatingSummary, ReviewBadges } from "../components/Trust";
import { usePauseOffscreen } from "../lib/usePauseOffscreen";
import { FAQ_PREVIEW } from "../data/faqs";
import { PROJECTS } from "../data/projects";
import {
  SERVICES,
  INDUSTRIES,
  PROCESS_STEPS,
  TESTIMONIALS,
  TECH_STACK,
  WHY_US,
  testimonialByline,
} from "../data/site";
import { COMPANY, STATS, TEAM_SIZE_LABEL } from "../data/stats";
import { navigate } from "../lib/router";
import { SIZES } from "../lib/images";

// Four projects on Home; the rest live on /portfolio.
const FEATURED_WORK = PROJECTS.slice(0, 4);

export default function Home({ setActiveNav }) {
  const marqueeRef = usePauseOffscreen();

  const goTo = (label) => (event) => {
    event.preventDefault();
    setActiveNav?.(label);
  };

  return (
    <div className="home-page">
      <Hero onNavigate={setActiveNav} />

      <LogoMarquee />

      {/* Stats — the only place these figures appear on Home. */}
      <section className="ed-stats-strip" aria-label="Opus Geeks in numbers">
        <div className="frame">
          <StatsRow stats={STATS} />
        </div>
      </section>

      {/* Services */}
      <section className="section" id="services-preview">
        <div className="frame">
          <SectionHead
            eyebrow="What we do"
            title="Four services. One team."
            subtitle="Pick one or combine them. The same people design, build and support your product, so nothing gets lost in handoffs."
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
                  width={176}
                  ratio={16 / 10}
                  sizes="88px"
                />
              ),
            }))}
          />
        </div>
      </section>

      {/* Why us */}
      <section className="section section-alt" aria-labelledby="why-title">
        <div className="frame">
          <SectionHead
            eyebrow="Why Opus Geeks"
            title="Why teams choose us"
            titleId="why-title"
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
      <section className="section" aria-labelledby="industries-title">
        <div className="frame">
          <SectionHead
            eyebrow="Industries"
            title="Built for industries where reliability matters"
            titleId="industries-title"
          />

          {/* Each card opens the portfolio filtered to that industry. */}
          <div className="industries-grid">
            {INDUSTRIES.map((industry) => (
              <a
                className="industry-card has-photo"
                key={industry.name}
                href={`/portfolio?industry=${encodeURIComponent(industry.name)}`}
              >
                <Photo
                  photo={industry.photo}
                  alt=""
                  width={420}
                  ratio={4 / 3}
                  sizes={SIZES.quarterCard}
                  className="industry-card-photo"
                />
                <h3>{industry.name}</h3>
                <p>{industry.detail}</p>
                <span className="industry-card-link">
                  See {industry.name.toLowerCase()} work
                  <Icon name="arrowRight" className="icon-sm" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section
        className="section section-alt"
        aria-labelledby="selected-work-title"
      >
        <div className="frame">
          <SectionHead
            eyebrow="Our work"
            title="Selected projects"
            titleId="selected-work-title"
            action={
              <a
                className="btn-secondary"
                href="/portfolio"
                onClick={goTo("Portfolio")}
              >
                View all projects
                <Icon name="arrowRight" className="icon-sm" />
              </a>
            }
          />
          <WorkGrid
            projects={FEATURED_WORK}
            onOpen={(project) => navigate(`/portfolio/${project.slug}`)}
          />
        </div>
      </section>

      {/* Process */}
      <section className="section" aria-labelledby="process-title">
        <div className="frame">
          <SectionHead
            eyebrow="How we work"
            title="A clear process from day one"
            titleId="process-title"
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

      {/* Tech stack */}
      <section
        className="section section-alt tech-marquee-section"
        aria-labelledby="stack-title"
      >
        <div className="frame">
          <SectionHead
            eyebrow="Technology"
            title="Modern, proven technology"
            titleId="stack-title"
            subtitle="The tools we reach for on most builds, chosen because they keep products fast, secure and easy to maintain."
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

      {/* Testimonials — three cards, all visible, no carousel. */}
      <section className="section" aria-labelledby="testimonials-title">
        <div className="frame">
          <SectionHead
            eyebrow="Client feedback"
            title="What our clients say"
            titleId="testimonials-title"
          >
            <RatingSummary />
          </SectionHead>

          <div className="grid-3 testimonial-grid">
            {TESTIMONIALS.map((testimonial) => {
              const byline = testimonialByline(testimonial);
              return (
                <figure
                  className="card-glass testimonial-card"
                  key={testimonial.company}
                >
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
                </figure>
              );
            })}
          </div>

          <ReviewBadges />
        </div>
      </section>

      {/* Team */}
      <section
        className="section section-alt culture-section"
        aria-labelledby="culture-title"
      >
        <div className="frame">
          <SectionHead
            eyebrow="Our team"
            title={`${TEAM_SIZE_LABEL} people. Two offices. One standard.`}
            titleId="culture-title"
            subtitle={`Designers, engineers and product leads in ${COMPANY.cities[0]} and Pembroke Pines, Florida, working as one team.`}
            action={
              <div className="culture-actions">
                <a
                  className="btn-gradient"
                  href="/about"
                  onClick={goTo("About")}
                >
                  Meet the team
                  <Icon name="arrowRight" className="icon-sm" />
                </a>
                <a className="btn-secondary" href="/careers">
                  See open roles
                </a>
              </div>
            }
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="faq-preview-title">
        <div className="frame">
          <SectionHead
            eyebrow="FAQ"
            title="Questions, answered"
            titleId="faq-preview-title"
            action={
              <a className="btn-secondary" href="/faqs" onClick={goTo("FAQs")}>
                See all FAQs
                <Icon name="arrowRight" className="icon-sm" />
              </a>
            }
          />
          <FaqAccordion items={FAQ_PREVIEW} idPrefix="home-faq" />
        </div>
      </section>

      {/* The closing CTA opens the footer (data/cta.js). */}
    </div>
  );
}
