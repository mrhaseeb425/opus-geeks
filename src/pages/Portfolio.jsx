import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CaseStudyContent from "../components/CaseStudyContent";
import Drawer from "../components/Drawer";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { Initials, StarRating } from "../components/Testimonial";
import {
  findProject,
  PROJECT_FILTERS,
  PROJECTS,
  splitResult,
} from "../data/projects";
import { TESTIMONIALS, testimonialByline } from "../data/site";
import { statValue } from "../data/stats";
import Photo from "../components/Photo";
import { navigate } from "../lib/router";
import { rowNumber } from "../lib/rows";
import { staggerDelay } from "../lib/stagger";

// Cards show the 2 most important technologies; the rest live in the case
// study.
const CARD_STACK_LIMIT = 2;
const WORK_SIZES = "(max-width: 860px) calc(100vw - 36px), 600px";

// One entry in the staggered editorial grid: a large image, then number,
// title, one-line summary, tags and the key result metric.
function ProjectCard({ project, index, onOpen }) {
  const [hasImageError, setHasImageError] = useState(false);
  const href = `/portfolio/${project.slug}`;
  const metric = splitResult(project.metric);

  return (
    <Reveal
      as="article"
      className="ed-work-item"
      delay={staggerDelay(index)}
      disabled={index < 2}
    >
      <a
        className="ed-work-link"
        href={href}
        onClick={(event) => {
          event.preventDefault();
          onOpen(project);
        }}
      >
        <div className="ed-work-media">
          {hasImageError ? (
            <span className="portfolio-image-fallback">
              Preview unavailable
            </span>
          ) : (
            // The photo's blurred preview shows while it loads.
            <Photo
              photo={project.image}
              width={600}
              ratio={4 / 3}
              sizes={WORK_SIZES}
              priority={index === 0}
              loading={index < 2 ? "eager" : "lazy"}
              onError={() => setHasImageError(true)}
            />
          )}
          <span className="ed-work-industry">{project.industry}</span>
        </div>

        <div className="ed-work-body">
          <span className="ed-work-num" aria-hidden="true">
            {rowNumber(index)}
          </span>
          <div>
            <h3 className="ed-work-title">{project.title}</h3>
            <p className="ed-work-summary">{project.summary}</p>
            <div className="ed-work-tags">
              <span className="ed-tag is-accent">{project.category}</span>
              {project.stack.slice(0, CARD_STACK_LIMIT).map((tech) => (
                <span className="ed-tag" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <p className="ed-work-result">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </p>
        </div>
      </a>
    </Reveal>
  );
}

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const testimonial = TESTIMONIALS[index];
  const byline = testimonialByline(testimonial);
  const step = (delta) =>
    setIndex(
      (value) => (value + delta + TESTIMONIALS.length) % TESTIMONIALS.length,
    );

  return (
    <section
      className="portfolio-testimonials"
      aria-labelledby="portfolio-testimonial-title"
    >
      <div className="section-head portfolio-testimonial-head">
        <div>
          <p className="ed-eyebrow">Client perspective</p>
          <h2 className="section-title" id="portfolio-testimonial-title">
            In our clients&apos; words
          </h2>
        </div>
        <div className="carousel-controls">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous testimonial"
          >
            <Icon name="arrowLeft" />
          </button>
          <span className="carousel-count" aria-hidden="true">
            {index + 1} / {TESTIMONIALS.length}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next testimonial"
          >
            <Icon name="arrowRight" />
          </button>
        </div>
      </div>
      <div aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={index}
            className="portfolio-testimonial-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icon name="quote" className="testimonial-quote-icon" />
            <StarRating value={testimonial.rating} />
            <blockquote>{testimonial.quote}</blockquote>
            <figcaption>
              <Initials text={testimonial.companyMark} className="is-on-dark" />
              <span className="testimonial-client-info">
                <strong>{byline.primary}</strong>
                <span>{byline.secondary}</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function Portfolio({ previewSlug, setActiveNav }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const searchInputRef = useRef(null);
  const previewProject = previewSlug ? findProject(previewSlug) : null;

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      const matchesFilter =
        activeFilter === "All" || project.category === activeFilter;
      const searchable = [
        project.title,
        project.industry,
        project.category,
        project.summary,
        ...project.stack,
      ]
        .join(" ")
        .toLowerCase();
      return (
        matchesFilter &&
        (!normalizedQuery || searchable.includes(normalizedQuery))
      );
    });
  }, [activeFilter, query]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // The preview gets its own shareable URL; the list stays underneath.
  const openProject = (project) =>
    navigate(`/portfolio/${project.slug}`, {
      replace: Boolean(previewSlug),
      state: { modalOf: "/portfolio" },
    });

  const closePreview = useCallback(() => {
    if (window.history.state?.modalOf) window.history.back();
    else navigate("/portfolio", { replace: true });
  }, []);

  const resetFilters = () => {
    setQuery("");
    setActiveFilter("All");
  };

  const goTo = (label) => (event) => {
    event.preventDefault();
    setActiveNav?.(label);
  };

  return (
    <div className="page-hero portfolio-page">
      <PageHeader
        eyebrow="Portfolio"
        title="Products we&rsquo;ve designed, built and launched"
        subtitle="Case studies from fintech, healthcare, retail, real estate and games, each with the result it delivered."
      >
        <p className="ed-page-head-meta">
          <span>
            <b>{statValue("projects")}</b> projects delivered
          </span>
          <span>
            <b>{statValue("clients")}</b> happy clients
          </span>
        </p>
      </PageHeader>

      <section className="section section-tight portfolio-section">
        <div className="frame">
          <div className="portfolio-controls">
            <label className="portfolio-search">
              <Icon name="search" className="icon-sm" />
              <span className="sr-only">Search projects</span>
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search projects, stacks, or industries"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <kbd aria-hidden="true">Ctrl K</kbd>
              {query && (
                <button
                  type="button"
                  className="portfolio-search-clear"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <Icon name="plus" className="icon-sm" />
                </button>
              )}
            </label>
            <div
              className="portfolio-filters"
              role="group"
              aria-label="Filter projects by category"
            >
              {PROJECT_FILTERS.map((filter) => (
                <button
                  type="button"
                  aria-pressed={activeFilter === filter}
                  className={`portfolio-filter ${activeFilter === filter ? "is-active" : ""}`}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="portfolio-results-meta" aria-live="polite">
            <span>
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1 ? "project" : "projects"}
            </span>
            {(query || activeFilter !== "All") && (
              <button type="button" onClick={resetFilters}>
                Reset filters
              </button>
            )}
          </div>

          {filteredProjects.length > 0 ? (
            <div className="ed-work">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                  onOpen={openProject}
                />
              ))}
            </div>
          ) : (
            <div className="portfolio-empty-state">
              <Icon name="search" className="empty-state-icon" />
              <h3>No projects found</h3>
              <p>
                Try a broader keyword or reset the filters to see every project.
              </p>
              <button type="button" onClick={resetFilters}>
                Reset filters
              </button>
            </div>
          )}

          <TestimonialCarousel />
        </div>
      </section>

      {/* The closing CTA opens the footer now (data/cta.js). */}

      <AnimatePresence>
        {previewProject && (
          <Drawer
            key={previewProject.slug}
            labelledBy="case-study-preview-title"
            onClose={closePreview}
            className="drawer-case-study"
            closeLabel="Close case study preview"
            footer={
              <>
                <a
                  className="btn-gradient"
                  href={`/portfolio/${previewProject.slug}`}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(`/portfolio/${previewProject.slug}`, {
                      replace: true,
                    });
                  }}
                >
                  Read full case study{" "}
                  <Icon name="arrowRight" className="icon-sm" />
                </a>
                {previewProject.liveUrl ? (
                  <a
                    className="btn-secondary"
                    href={previewProject.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Live preview <Icon name="external" className="icon-sm" />
                  </a>
                ) : (
                  <a
                    className="btn-secondary"
                    href="/contact"
                    onClick={goTo("Contact Us")}
                  >
                    Book a free 30-min call
                  </a>
                )}
              </>
            }
          >
            <CaseStudyContent
              project={previewProject}
              titleId="case-study-preview-title"
            />
          </Drawer>
        )}
      </AnimatePresence>
    </div>
  );
}
