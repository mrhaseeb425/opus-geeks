import { motion } from "framer-motion";
import Icon from "../components/Icon";
import Magnetic from "../components/Magnetic";
import Reveal from "../components/Reveal";
import { EASE_OUT_EXPO, getVariants } from "../lib/motion";
import { staggerDelay } from "../lib/stagger";

// Placeholder case studies grouped by the industries Opus Geeks specializes
// in. Swap the image, title, and description for real project details/links
// as case studies become available.
const PROJECTS = [
  {
    title: "Mobile Banking App",
    industry: "Fintech",
    tags: ["App Development", "UX/UI Design"],
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=90",
    summary:
      "A secure mobile banking experience with real-time transfers, budgeting tools, and biometric login.",
  },
  {
    title: "Patient Care Portal",
    industry: "Healthcare",
    tags: ["Web Development", "UX/UI Design"],
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=90",
    summary:
      "A HIPAA-aware portal connecting patients and providers for scheduling, records, and telehealth visits.",
  },
  {
    title: "E-Commerce Platform",
    industry: "Retail",
    tags: ["Web Development", "App Development"],
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=90",
    summary:
      "A headless storefront with fast checkout, inventory sync, and a companion app for loyalty customers.",
  },
  {
    title: "Property Listings Platform",
    industry: "Real Estate",
    tags: ["Web Development"],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90",
    summary:
      "A listings and CRM platform helping agencies manage inventory, tours, and lead follow-up in one place.",
  },
  {
    title: "VR Training Simulator",
    industry: "Game Development",
    tags: ["Game Development"],
    image:
      "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?auto=format&fit=crop&w=1200&q=90",
    summary:
      "An immersive VR simulation used to onboard and train staff faster than traditional classroom methods.",
  },
  {
    title: "Brand Design System",
    industry: "Retail",
    tags: ["UX/UI Design"],
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=90",
    summary:
      "A full identity and component library giving a fast-growing retail brand a consistent look everywhere.",
  },
];

export default function Portfolio({ setActiveNav }) {
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
          <p className="page-header-subtitle">
            A look at the products, platforms, and experiences we've built
            across fintech, healthcare, retail, real estate, and gaming.
          </p>
        </Reveal>
      </section>

      <section className="section">
        <div className="frame">
          <div className="grid-3 portfolio-grid">
            {PROJECTS.map((project, index) => (
              <Reveal
                as="article"
                className="portfolio-card"
                key={project.title}
                delay={staggerDelay(index)}
                data-cursor-label="View"
              >
                <motion.div
                  variants={getVariants("clip")}
                  transition={{
                    duration: 0.8,
                    delay: staggerDelay(index) + 0.1,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="portfolio-card-image"
                  style={{ backgroundImage: `url(${project.image})` }}
                >
                  <span className="portfolio-card-industry">
                    {project.industry}
                  </span>
                </motion.div>
                <div className="portfolio-card-body">
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="portfolio-card-tags">
                    {project.tags.map((tag) => (
                      <span className="tag-pill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
