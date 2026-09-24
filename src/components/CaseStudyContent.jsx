import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { pexelsUrl, SIZES } from "../lib/images";
import Photo from "./Photo";
import Icon from "./Icon";

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

export function TechBadge({ tech }) {
  return (
    <span className="tech-badge">
      <Icon name={TECH_ICONS[tech] || "layers"} className="tech-badge-icon" />
      {tech}
    </span>
  );
}

// `images` are photo objects from data/photos.js.
export function Gallery({ title, images }) {
  const [index, setIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const current = images[index];

  // Capture-phase so Escape closes the lightbox before the drawer sees it.
  useEffect(() => {
    if (!isLightboxOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      event.stopImmediatePropagation();
      setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isLightboxOpen]);

  const step = (delta) =>
    setIndex((value) => (value + delta + images.length) % images.length);

  return (
    <div className="case-study-gallery">
      <div className="case-study-gallery-main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            className="case-study-gallery-frame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Photo
              photo={current}
              width={900}
              ratio={16 / 10}
              sizes={SIZES.gallery}
              className="case-study-gallery-image"
            />
          </motion.div>
        </AnimatePresence>
        <button
          type="button"
          className="gallery-expand"
          onClick={() => setIsLightboxOpen(true)}
        >
          <Icon name="expand" />
          <span>View full size</span>
        </button>
        {images.length > 1 && (
          <>
            <button
              type="button"
              className="gallery-control gallery-prev"
              onClick={() => step(-1)}
              aria-label="Previous image"
            >
              <Icon name="arrowLeft" />
            </button>
            <button
              type="button"
              className="gallery-control gallery-next"
              onClick={() => step(1)}
              aria-label="Next image"
            >
              <Icon name="arrowRight" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div
          className="case-study-thumbnails"
          aria-label={`${title} images`}
          role="group"
        >
          {images.map((image, imageIndex) => (
            <button
              type="button"
              aria-pressed={imageIndex === index}
              className={`case-study-thumbnail ${imageIndex === index ? "is-active" : ""}`}
              key={image.id}
              onClick={() => setIndex(imageIndex)}
              aria-label={`Show image ${imageIndex + 1}: ${image.alt}`}
            >
              <Photo
                photo={image}
                alt=""
                width={200}
                ratio={16 / 10}
                sizes={SIZES.thumbnail}
              />
            </button>
          ))}
        </div>
      )}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="case-study-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close full-size image"
              autoFocus
            >
              <Icon name="plus" />
            </button>
            <img
              src={pexelsUrl(current.id, 2000, 1250, "webp")}
              alt={current.alt}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Gallery + challenge/solution/outcomes/stack, shared by the portfolio
// preview drawer and the full /portfolio/:slug page. `titleAs` lets the page
// use an h1 while the drawer uses an h2.
export default function CaseStudyContent({
  project,
  titleAs: Title = "h2",
  titleId,
}) {
  return (
    <>
      <Gallery
        title={project.title}
        images={[project.image, ...project.gallery]}
      />
      <div className="case-study-content">
        <p className="case-study-kicker">
          <span className="tag-pill">{project.category}</span>
          <span>{project.industry}</span>
        </p>
        <Title id={titleId} className="case-study-title">
          {project.title}
        </Title>
        <p className="case-study-lede">{project.outcome}</p>

        <dl className="case-study-metric">
          <dt>Headline result</dt>
          <dd>{project.metric}</dd>
        </dl>

        <div className="case-study-sections">
          <section>
            <h3>The challenge</h3>
            <p>{project.challenge}</p>
          </section>
          <section>
            <h3>Our solution</h3>
            <p>{project.solution}</p>
          </section>
          <section className="case-study-outcomes">
            <h3>Key outcomes</h3>
            <ul>
              {project.results.map((result) => (
                <li key={result}>
                  <Icon name="check" className="outcome-check" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="tech-architecture-card">
            <h3>Tech architecture</h3>
            <p>{project.architecture}</p>
            <div className="portfolio-card-tags">
              {project.stack.map((tech) => (
                <TechBadge tech={tech} key={tech} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
