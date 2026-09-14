import Icon from "../components/Icon";

// Placeholder case studies grouped by the industries Opus Geeks specializes
// in. Swap the image, title, and description for real project details/links
// as case studies become available.
const PROJECTS = [
  {
    title: "Mobile Banking App",
    industry: "Fintech",
    tags: ["App Development", "UX/UI Design"],
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80",
    summary:
      "A secure mobile banking experience with real-time transfers, budgeting tools, and biometric login.",
  },
  {
    title: "Patient Care Portal",
    industry: "Healthcare",
    tags: ["Web Development", "UX/UI Design"],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
    summary:
      "A HIPAA-aware portal connecting patients and providers for scheduling, records, and telehealth visits.",
  },
  {
    title: "E-Commerce Platform",
    industry: "Retail",
    tags: ["Web Development", "App Development"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
    summary:
      "A headless storefront with fast checkout, inventory sync, and a companion app for loyalty customers.",
  },
  {
    title: "Property Listings Platform",
    industry: "Real Estate",
    tags: ["Web Development"],
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
    summary:
      "A listings and CRM platform helping agencies manage inventory, tours, and lead follow-up in one place.",
  },
  {
    title: "VR Training Simulator",
    industry: "Game Development",
    tags: ["Game Development"],
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=900&q=80",
    summary:
      "An immersive VR simulation used to onboard and train staff faster than traditional classroom methods.",
  },
  {
    title: "Brand Design System",
    industry: "Retail",
    tags: ["UX/UI Design"],
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=80",
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
        <div className="frame">
          <p className="section-eyebrow">Portfolio</p>
          <h1>Work we're proud to have shipped</h1>
          <p className="page-header-subtitle">
            A look at the products, platforms, and experiences we've built
            across fintech, healthcare, retail, real estate, and gaming.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="frame">
          <div className="grid-3 portfolio-grid">
            {PROJECTS.map((project) => (
              <article className="portfolio-card" key={project.title}>
                <div
                  className="portfolio-card-image"
                  style={{ backgroundImage: `url(${project.image})` }}
                >
                  <span className="portfolio-card-industry">
                    {project.industry}
                  </span>
                </div>
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-banner">
        <div className="frame cta-banner-inner">
          <div>
            <h2>Have a project in mind?</h2>
            <p>Let's talk about what you're building and how we can help.</p>
          </div>
          <a className="btn-gradient" href="#contact" onClick={goTo("Contact Us")}>
            Start a project <Icon name="arrowRight" className="icon-sm" />
          </a>
        </div>
      </section>
    </div>
  );
}
