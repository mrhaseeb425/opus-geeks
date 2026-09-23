import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "../components/Icon";
import Magnetic from "../components/Magnetic";
import Reveal from "../components/Reveal";
import { TESTIMONIALS } from "../data/site";
import { staggerDelay } from "../lib/stagger";

// Placeholder case studies grouped by the industries Opus Geeks specializes
// in. Swap the image, title, and description for real project details/links
// as case studies become available.
const PROJECTS = [
  {
    title: "Mobile Banking App",
    industry: "Fintech",
    category: "Mobile Apps",
    tags: ["Fintech", "Mobile Apps"],
    stack: ["React Native", "Node.js", "AWS"],
    metric: "40% faster onboarding",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A secure mobile banking experience with real-time transfers, budgeting tools, and biometric login.",
    outcome:
      "A calmer, faster way for 250k+ customers to manage money every day.",
    gallery: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    ],
    challenge:
      "Customers had to navigate five disconnected flows to check balances, move money, and understand their spending.",
    solution:
      "We designed a single, confidence-building mobile flow around glanceable balances, contextual guidance, and biometric shortcuts.",
    results: ["250k+ active customers", "4.8/5 app store rating"],
    architecture:
      "React Native client, Node.js API services, event-driven AWS infrastructure, and encrypted financial data at rest.",
    liveUrl: "https://opusgeeks.com",
  },
  {
    title: "Patient Care Portal",
    industry: "Healthcare",
    category: "Web Apps",
    tags: ["Healthcare", "Web Apps"],
    stack: ["React", "Node.js", "AWS"],
    metric: "2.4x more bookings",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A HIPAA-aware portal connecting patients and providers for scheduling, records, and telehealth visits.",
    outcome:
      "Patients find care in fewer steps while teams spend less time on administration.",
    gallery: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    ],
    challenge:
      "Care teams were losing time to phone calls, manual scheduling, and scattered patient information.",
    solution:
      "We created one accessible portal for appointments, records, secure messaging, and telehealth preparation.",
    results: [
      "2.4x more bookings",
      "38% fewer support calls",
      "92% task completion rate",
    ],
    architecture:
      "React frontend, Node.js services, role-based access controls, and AWS infrastructure designed around privacy-first workflows.",
    liveUrl: "https://opusgeeks.com",
  },
  {
    title: "E-Commerce Platform",
    industry: "Retail",
    category: "SaaS",
    tags: ["Retail", "SaaS"],
    stack: ["Next.js", "Prisma", "AWS"],
    metric: "100k+ monthly users",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A headless storefront with fast checkout, inventory sync, and a companion app for loyalty customers.",
    outcome:
      "A conversion-focused commerce engine ready for the next stage of growth.",
    gallery: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    ],
    challenge:
      "The legacy storefront was slow to iterate and made inventory, checkout, and loyalty data difficult to connect.",
    solution:
      "We separated the experience layer from commerce operations so each team could ship faster without sacrificing consistency.",
    results: [
      "100k+ monthly users",
      "28% higher checkout completion",
      "2.1s average load time",
    ],
    architecture:
      "Next.js storefront, Prisma data layer, composable commerce APIs, and AWS edge delivery.",
    liveUrl: "https://opusgeeks.com",
  },
  {
    title: "Property Listings Platform",
    industry: "Real Estate",
    category: "Web Apps",
    tags: ["Real Estate", "Web Apps"],
    stack: ["React", "Laravel", "PostgreSQL"],
    metric: "60% less admin time",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A listings and CRM platform helping agencies manage inventory, tours, and lead follow-up in one place.",
    outcome:
      "One source of truth for property teams, from first inquiry to signed lease.",
    gallery: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    ],
    challenge:
      "Property teams were updating listings in multiple tools and losing valuable leads between inquiry and follow-up.",
    solution:
      "We unified inventory, tours, and CRM activity into a workspace built for quick scanning and decisive action.",
    results: [
      "60% less admin time",
      "3x faster lead response",
      "18k listings managed",
    ],
    architecture:
      "React dashboard, Laravel services, PostgreSQL search, and modular integrations for listing syndication.",
    liveUrl: "https://opusgeeks.com",
  },
  {
    title: "VR Training Simulator",
    industry: "Game Development",
    category: "UI/UX Design",
    tags: ["Training", "UI/UX Design"],
    stack: ["Unity", "Figma", "AWS"],
    metric: "3x faster training",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    summary:
      "An immersive VR simulation used to onboard and train staff faster than traditional classroom methods.",
    outcome:
      "A memorable learning environment that turns complex procedures into confident action.",
    gallery: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    ],
    challenge:
      "Classroom training was expensive to repeat and left teams underprepared for high-pressure real-world scenarios.",
    solution:
      "We translated complex procedures into guided, repeatable VR scenarios with clear feedback at every step.",
    results: [
      "3x faster training",
      "94% learner confidence",
      "35% lower training cost",
    ],
    architecture:
      "Unity runtime, Figma interaction system, spatial audio design, and AWS telemetry for progress reporting.",
    liveUrl: "https://opusgeeks.com",
  },
  {
    title: "Brand Design System",
    industry: "Retail",
    category: "UI/UX Design",
    tags: ["Retail", "UI/UX Design"],
    stack: ["Figma", "React", "TypeScript"],
    metric: "30% faster launches",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A full identity and component library giving a fast-growing retail brand a consistent look everywhere.",
    outcome:
      "A flexible design language that keeps every new touchpoint unmistakably on-brand.",
    gallery: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    ],
    challenge:
      "A growing product team was shipping inconsistent experiences across web, mobile, campaigns, and retail touchpoints.",
    solution:
      "We created a practical design language with reusable primitives, clear guidance, and an adoption path for engineers.",
    results: [
      "30% faster launches",
      "120+ components",
      "1 shared product language",
    ],
    architecture:
      "Figma variables, documented React components, TypeScript tokens, and a contribution model for evolving the system.",
    liveUrl: "https://opusgeeks.com",
  },
];

const FILTERS = ["All", "Web Apps", "Mobile Apps", "UI/UX Design", "SaaS"];

const TECH_ICONS = {
  React: "code",
  "React Native": "code",
  "Node.js": "code",
  Prisma: "database",
  AWS: "cloud",
  Laravel: "code",
  PostgreSQL: "database",
  Figma: "pen",
  Unity: "gamepad",
  TypeScript: "code",
  "Next.js": "browser",
};

function TechBadge({ tech }) {
  return (
    <span className="tech-badge">
      <Icon name={TECH_ICONS[tech] || "layers"} className="tech-badge-icon" />
      {tech}
    </span>
  );
}

function ProjectCard({ project, index, onOpen }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <Reveal
      as="article"
      className="portfolio-card"
      delay={staggerDelay(index)}
      data-cursor-label="Open"
      onClick={() => onOpen(project)}
    >
      <div className="portfolio-card-image group relative aspect-video overflow-hidden rounded-xl">
        {isLoading && !hasImageError && (
          <div
            className="absolute inset-0 z-0 animate-pulse bg-slate-200"
            aria-label="Loading project preview"
          />
        )}

        {hasImageError ? (
          <div className="portfolio-image-fallback absolute inset-0 flex items-center justify-center bg-slate-900 text-sm font-semibold text-white">
            Preview unavailable
          </div>
        ) : (
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasImageError(true);
              setIsLoading(false);
            }}
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 ${isLoading ? "opacity-0" : "opacity-100"}`}
          />
        )}

        <div className="absolute inset-0 z-[2] flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:opacity-100">
          <button
            type="button"
            className="portfolio-card-preview"
            onClick={(event) => {
              event.stopPropagation();
              onOpen(project);
            }}
          >
            View Case Study <Icon name="arrowRight" className="icon-sm" />
          </button>
        </div>

        <span className="portfolio-card-industry">{project.industry}</span>
      </div>

      <div className="portfolio-card-body">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <span className="portfolio-metric">
          <span aria-hidden="true">⚡</span> {project.metric}
        </span>
        <div className="portfolio-card-tags">
          {project.tags.map((tag) => (
            <span className="tag-pill" key={tag}>
              {tag}
            </span>
          ))}
          {project.stack.map((tech) => (
            <TechBadge tech={tech} key={tech} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function Portfolio({ setActiveNav }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const searchInputRef = useRef(null);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      const matchesFilter =
        activeFilter === "All" || project.category === activeFilter;
      const searchableContent = [
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
        (!normalizedQuery || searchableContent.includes(normalizedQuery))
      );
    });
  }, [activeFilter, query]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (isLightboxOpen) setIsLightboxOpen(false);
        else setSelectedProject(null);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
    };
  }, [selectedProject]);

  const openProject = (project) => {
    setSelectedProject(project);
    const initialImage = project.gallery?.[0] ?? project.image;
    setGalleryIndex(0);
    setSelectedImage(initialImage);
    setIsLightboxOpen(false);
  };

  const showPreviousTestimonial = () => {
    setTestimonialIndex(
      (current) => (current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  };

  const showNextTestimonial = () => {
    setTestimonialIndex((current) => (current + 1) % TESTIMONIALS.length);
  };

  const goTo = (label) => (event) => {
    event.preventDefault();
    setActiveNav?.(label);
  };

  return (
    <div className="page-hero">
      <section className="page-header">
        <Reveal as="div" className="frame">
          <p className="section-eyebrow">Portfolio</p>
          <h1>Work we're proud to have shipped</h1>
          <div
            className="portfolio-trust-pills"
            aria-label="Portfolio social proof"
          >
            <span>🚀 50+ Projects Shipped</span>
            <span className="portfolio-trust-divider" aria-hidden="true">
              |
            </span>
            <span>⭐ 4.9/5 Rating</span>
          </div>
          <p className="page-header-subtitle">
            A look at the products, platforms, and experiences we've built
            across fintech, healthcare, retail, real estate, and gaming.
          </p>
        </Reveal>
      </section>

      <section className="section">
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
              <kbd>⌘K</kbd>
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
              role="tablist"
              aria-label="Filter projects by category"
            >
              {FILTERS.map((filter) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === filter}
                  className={`portfolio-filter ${activeFilter === filter ? "is-active" : ""}`}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="portfolio-results-meta">
            <span>{filteredProjects.length} selected projects</span>
            {(query || activeFilter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveFilter("All");
                }}
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid-3 portfolio-grid">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
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
                Try a broader keyword or reset the filters to see the full body
                of work.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveFilter("All");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}

          <section
            className="portfolio-testimonials"
            aria-labelledby="portfolio-testimonial-title"
          >
            <div className="section-head portfolio-testimonial-head">
              <div>
                <p className="section-eyebrow">Client perspective</p>
                <h2 className="section-title" id="portfolio-testimonial-title">
                  The work has a measurable after.
                </h2>
              </div>
              <div className="carousel-controls">
                <button
                  type="button"
                  onClick={showPreviousTestimonial}
                  aria-label="Previous testimonial"
                >
                  <Icon name="arrowLeft" />
                </button>
                <button
                  type="button"
                  onClick={showNextTestimonial}
                  aria-label="Next testimonial"
                >
                  <Icon name="arrowRight" />
                </button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.figure
                key={testimonialIndex}
                className="portfolio-testimonial-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <Icon name="quote" className="testimonial-quote-icon" />
                <blockquote>{TESTIMONIALS[testimonialIndex].quote}</blockquote>
                <figcaption>
                  <img
                    className="testimonial-avatar"
                    src={TESTIMONIALS[testimonialIndex].avatar}
                    alt=""
                  />
                  <div className="testimonial-client-info">
                    <strong>{TESTIMONIALS[testimonialIndex].author}</strong>
                    <span>{TESTIMONIALS[testimonialIndex].role}</span>
                  </div>
                  <span
                    className="testimonial-company-logo"
                    aria-label={TESTIMONIALS[testimonialIndex].company}
                  >
                    {TESTIMONIALS[testimonialIndex].companyMark}
                  </span>
                  <span className="testimonial-company-name">
                    {TESTIMONIALS[testimonialIndex].company}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </section>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="case-study-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.aside
              className="case-study-drawer fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white shadow-2xl flex flex-col h-screen overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-title"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="drawer-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close case study"
              >
                <Icon name="plus" />
              </button>

              <div className="case-study-scroll-area flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-300">
                <div className="case-study-gallery">
                  <div className="case-study-gallery-main">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={
                          selectedImage || selectedProject.gallery[galleryIndex]
                        }
                        className="case-study-gallery-image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        style={{
                          backgroundImage: `url(${selectedImage || selectedProject.gallery[galleryIndex]})`,
                        }}
                      />
                    </AnimatePresence>
                    <button
                      type="button"
                      className="gallery-expand"
                      onClick={() => setIsLightboxOpen(true)}
                      aria-label="Expand image fullscreen"
                    >
                      <Icon name="expand" />
                      <span>Expand Fullscreen</span>
                    </button>
                    <button
                      type="button"
                      className="gallery-control gallery-prev"
                      onClick={() => {
                        const nextIndex =
                          (galleryIndex - 1 + selectedProject.gallery.length) %
                          selectedProject.gallery.length;
                        setGalleryIndex(nextIndex);
                        setSelectedImage(selectedProject.gallery[nextIndex]);
                      }}
                      aria-label="Previous project image"
                    >
                      <Icon name="arrowLeft" />
                    </button>
                    <button
                      type="button"
                      className="gallery-control gallery-next"
                      onClick={() => {
                        const nextIndex =
                          (galleryIndex + 1) % selectedProject.gallery.length;
                        setGalleryIndex(nextIndex);
                        setSelectedImage(selectedProject.gallery[nextIndex]);
                      }}
                      aria-label="Next project image"
                    >
                      <Icon name="arrowRight" />
                    </button>
                  </div>
                  <div
                    className="case-study-thumbnails"
                    role="tablist"
                    aria-label="Project screenshots"
                  >
                    {selectedProject.gallery.map((image, index) => {
                      const isActive =
                        selectedImage === image ||
                        (!selectedImage && galleryIndex === index);

                      return (
                        <button
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          className={
                            isActive
                              ? "case-study-thumbnail is-active"
                              : "case-study-thumbnail"
                          }
                          key={image}
                          onClick={() => {
                            setGalleryIndex(index);
                            setSelectedImage(image);
                          }}
                          style={{ backgroundImage: `url(${image})` }}
                          aria-label={`Show project image ${index + 1}`}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="case-study-content">
                  <p className="section-eyebrow">
                    {selectedProject.category} / {selectedProject.industry}
                  </p>
                  <h2 id="case-study-title">{selectedProject.title}</h2>
                  <p>{selectedProject.outcome}</p>
                  <div className="case-study-sections">
                    <section>
                      <h3>The Challenge</h3>
                      <p>{selectedProject.challenge}</p>
                    </section>
                    <section className="case-study-outcomes">
                      <h3>Key Outcomes &amp; Features</h3>
                      <ul>
                        {selectedProject.results.map((result) => (
                          <li key={result}>
                            <Icon name="check" className="outcome-check" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                    <section>
                      <h3>Our Solution</h3>
                      <p>{selectedProject.solution}</p>
                    </section>
                  </div>
                  <div className="case-study-metric">
                    <span>Impact metric</span>
                    <strong>{selectedProject.metric}</strong>
                  </div>
                  <section className="tech-architecture-card">
                    <h3>Tech Architecture</h3>
                    <p>{selectedProject.architecture}</p>
                    <div className="portfolio-card-tags">
                      {selectedProject.stack.map((tech) => (
                        <TechBadge tech={tech} key={tech} />
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              <div className="drawer-action-bar">
                <a
                  className="drawer-secondary-button"
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Preview <Icon name="external" className="icon-sm" />
                </a>
                <a
                  className="btn-gradient"
                  href="#contact"
                  onClick={goTo("Contact Us")}
                >
                  Book Strategy Call{" "}
                  <Icon name="arrowRight" className="icon-sm" />
                </a>
              </div>
              <AnimatePresence>
                {isLightboxOpen && (
                  <motion.div
                    className="case-study-lightbox"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsLightboxOpen(false)}
                  >
                    <button
                      type="button"
                      className="lightbox-close"
                      onClick={() => setIsLightboxOpen(false)}
                      aria-label="Close fullscreen image"
                    >
                      <Icon name="plus" />
                    </button>
                    <motion.img
                      src={
                        selectedImage || selectedProject.gallery[galleryIndex]
                      }
                      alt={`${selectedProject.title} project preview`}
                      initial={{ scale: 0.96, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={(event) => event.stopPropagation()}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="section cta-banner">
        <Reveal as="div" className="frame cta-banner-inner">
          <div>
            <h2>Have a project in mind?</h2>
            <p>Let's talk about what you're building and how we can help.</p>
          </div>
          <Magnetic>
            <a
              className="btn-gradient"
              href="#contact"
              onClick={goTo("Contact Us")}
            >
              Start a project <Icon name="arrowRight" className="icon-sm" />
            </a>
          </Magnetic>
        </Reveal>
      </section>
    </div>
  );
}
