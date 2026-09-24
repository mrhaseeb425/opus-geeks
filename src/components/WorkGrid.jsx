import { useState } from "react";
import Photo from "./Photo";
import { rowNumber } from "../lib/rows";
import { splitResult } from "../data/projects";

// The staggered editorial work grid, shared by Home ("Selected projects") and
// the Portfolio page: large image, then number, title, one-line summary, tags
// and the key result metric. The right column sits lower than the left.
const STACK_LIMIT = 2;
const WORK_SIZES = "(max-width: 860px) calc(100vw - 40px), 600px";

export function WorkCard({ project, index, onOpen }) {
  const [hasImageError, setHasImageError] = useState(false);
  const metric = splitResult(project.metric);

  return (
    <article className="ed-work-item">
      <a
        className="ed-work-link"
        href={`/portfolio/${project.slug}`}
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
              {project.stack.slice(0, STACK_LIMIT).map((tech) => (
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
    </article>
  );
}

export default function WorkGrid({ projects, onOpen }) {
  return (
    <div className="ed-work">
      {projects.map((project, index) => (
        <WorkCard
          key={project.slug}
          project={project}
          index={index}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
