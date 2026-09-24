import { Gallery, TechBadge } from "../components/CaseStudyContent";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";
import { PROJECTS, splitResult } from "../data/projects";
import Photo from "../components/Photo";
import { staggerDelay } from "../lib/stagger";

// Full, shareable case study page at /portfolio/:slug, structured as
// Challenge → Solution → Results → Tech stack → Screenshots → Next project.
export default function CaseStudy({ project }) {
  const index = PROJECTS.findIndex((item) => item.slug === project.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const results = project.results.map(splitResult);

  return (
    <div className="page-hero detail-page case-study-page">
      <div className="frame detail-frame">
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <a href="/portfolio">
            <Icon name="arrowLeft" className="icon-sm" /> All projects
          </a>
        </nav>

        <header className="cs-header">
          <p className="case-study-kicker">
            <span className="tag-pill">{project.category}</span>
            <span>{project.industry}</span>
          </p>
          <h1 className="case-study-title">{project.title}</h1>
          <p className="case-study-lede">{project.outcome}</p>
        </header>

        <figure className="cs-cover">
          <Photo
            photo={project.image}
            width={980}
            ratio={16 / 9}
            sizes="(max-width: 1020px) calc(100vw - 40px), 980px"
            priority
          />
        </figure>

        <div className="cs-story">
          <Reveal
            as="section"
            className="cs-block"
            aria-labelledby="cs-challenge"
          >
            <span className="cs-step">01</span>
            <h2 id="cs-challenge">The challenge</h2>
            <p>{project.challenge}</p>
          </Reveal>
          <Reveal
            as="section"
            className="cs-block"
            aria-labelledby="cs-solution"
            delay={0.05}
          >
            <span className="cs-step">02</span>
            <h2 id="cs-solution">Our solution</h2>
            <p>{project.solution}</p>
          </Reveal>
        </div>

        <section className="cs-results" aria-labelledby="cs-results-title">
          <h2 id="cs-results-title">
            <span className="cs-step">03</span> Results
          </h2>
          <ul>
            {results.map((result, resultIndex) => (
              <Reveal
                as="li"
                key={result.label}
                delay={staggerDelay(resultIndex)}
              >
                {result.value && <strong>{result.value}</strong>}
                <span>{result.label}</span>
              </Reveal>
            ))}
          </ul>
        </section>

        <Reveal
          as="section"
          className="cs-block cs-stack"
          aria-labelledby="cs-stack"
        >
          <span className="cs-step">04</span>
          <h2 id="cs-stack">Tech stack</h2>
          <p>{project.architecture}</p>
          <div className="portfolio-card-tags">
            {project.stack.map((tech) => (
              <TechBadge tech={tech} key={tech} />
            ))}
          </div>
        </Reveal>

        <section className="cs-gallery" aria-labelledby="cs-gallery-title">
          <h2 id="cs-gallery-title">
            <span className="cs-step">05</span> Product in use
          </h2>
          <Gallery title={project.title} images={project.gallery} />
        </section>

        {project.liveUrl && (
          <div className="detail-actions">
            <a
              className="btn-secondary"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Live preview <Icon name="external" className="icon-sm" />
            </a>
          </div>
        )}

        <a className="cs-next" href={`/portfolio/${next.slug}`}>
          <span className="cs-next-copy">
            <span className="ed-eyebrow">Next project</span>
            <strong>{next.title}</strong>
            <span>{next.summary}</span>
          </span>
          <span className="cs-next-image">
            <Photo
              photo={next.image}
              alt=""
              width={320}
              ratio={16 / 10}
              sizes="(max-width: 700px) 100vw, 320px"
            />
          </span>
          <Icon name="arrowRight" className="cs-next-arrow" />
        </a>
      </div>

      {/* The closing CTA opens the footer now (data/cta.js). */}
    </div>
  );
}
