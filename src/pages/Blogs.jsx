import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";
import { staggerDelay } from "../lib/stagger";

const CATEGORIES = [
  "All",
  "App Development",
  "UX/UI Design",
  "Product Strategy",
  "Web Development",
];

const POSTS = [
  {
    title: "Choosing Between Native and Cross-Platform for Your Next App",
    category: "App Development",
    date: "May 14, 2026",
    readTime: "6 min read",
    author: "Ayesha Khan",
    authorRole: "Product Engineer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=85",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=90",
    excerpt:
      "A practical breakdown of when React Native or Flutter make sense, and when native still wins.",
    body: [
      {
        type: "p",
        text: "The best app stack is rarely decided by a framework popularity chart. It is decided by the product's interaction model, the team that will own it, and the performance bar the experience has to clear.",
      },
      { type: "h2", text: "Start with the product constraints" },
      {
        type: "p",
        text: "Cross-platform gives teams a powerful way to share product logic and move quickly across surfaces. Native remains the strongest choice when platform-specific capabilities, animation fidelity, or deep device integration are the product itself.",
      },
      { type: "h2", text: "A decision you can revisit" },
      {
        type: "p",
        text: "The important thing is to make the trade-offs explicit. A well-structured first release can preserve the option to move more native later without throwing away the product foundation.",
      },
    ],
    toc: ["Start with the product constraints", "A decision you can revisit"],
    related: [
      "Designing Fintech Interfaces People Actually Trust",
      "Shipping an MVP Without Cutting the Wrong Corners",
    ],
  },
  {
    title: "Designing Fintech Interfaces People Actually Trust",
    category: "UX/UI Design",
    date: "May 06, 2026",
    readTime: "5 min read",
    author: "Mariam Siddiqui",
    authorRole: "Lead Product Designer",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=85",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=90",
    excerpt:
      "How clarity, feedback, and restraint build user confidence in financial products.",
    body: [
      {
        type: "p",
        text: "Trust is not a decorative layer added after the core product is finished. In financial software, trust is the product experience: every amount, transition, and confirmation needs to make sense.",
      },
      { type: "h2", text: "Make the important moments legible" },
      {
        type: "p",
        text: "Good fintech interfaces reduce uncertainty. They show what changed, what happens next, and how a user can recover before anxiety becomes abandonment.",
      },
      { type: "h2", text: "Restraint is a feature" },
      {
        type: "p",
        text: "Calm hierarchy and consistent language make a system feel dependable. The interface should know when to be quiet so the user's decision can be clear.",
      },
    ],
    toc: ["Make the important moments legible", "Restraint is a feature"],
    related: [
      "Why Design Systems Pay for Themselves",
      "What HIPAA-Aware Software Actually Requires",
    ],
  },
  {
    title: "What HIPAA-Aware Software Actually Requires",
    category: "Web Development",
    date: "Apr 28, 2026",
    readTime: "7 min read",
    author: "Omar Farooq",
    authorRole: "Engineering Lead",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=85",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=90",
    excerpt:
      "The engineering and process decisions that keep healthcare platforms compliant from day one.",
    body: [
      {
        type: "p",
        text: "Healthcare software needs more than a secure login. Privacy has to shape data flows, permissions, observability, vendor choices, and the way teams work together.",
      },
      { type: "h2", text: "Design the boundary first" },
      {
        type: "p",
        text: "The strongest systems make sensitive data boundaries visible in the architecture. Access is intentional, auditable, and limited to the workflow that needs it.",
      },
    ],
    toc: ["Design the boundary first"],
    related: ["Building Retail Platforms That Survive Traffic Spikes"],
  },
  {
    title: "Shipping an MVP Without Cutting the Wrong Corners",
    category: "Product Strategy",
    date: "Apr 18, 2026",
    readTime: "4 min read",
    author: "Hassan Ali",
    authorRole: "Strategy Director",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=85",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=90",
    excerpt:
      "Where to move fast, and where cutting corners quietly turns into technical debt.",
    body: [
      {
        type: "p",
        text: "A focused MVP is not a smaller version of every possible feature. It is the shortest path to learning whether the core promise works for real people.",
      },
      { type: "h2", text: "Protect the learning loop" },
      {
        type: "p",
        text: "Keep quality high around the core workflow, instrument the moments that matter, and defer complexity that does not improve the next decision.",
      },
    ],
    toc: ["Protect the learning loop"],
    related: ["Choosing Between Native and Cross-Platform for Your Next App"],
  },
  {
    title: "Why Design Systems Pay for Themselves",
    category: "UX/UI Design",
    date: "Apr 09, 2026",
    readTime: "5 min read",
    author: "Mariam Siddiqui",
    authorRole: "Lead Product Designer",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=85",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=90",
    excerpt:
      "A reusable component library is not overhead. It is what lets a small team ship like a big one.",
    body: [
      {
        type: "p",
        text: "A design system creates leverage when it makes the right thing easier to repeat. The value is not a library of components; it is shared judgment encoded into the product.",
      },
      { type: "h2", text: "Consistency creates speed" },
      {
        type: "p",
        text: "When patterns are clear, teams spend less time debating basic decisions and more time improving the parts that differentiate the experience.",
      },
    ],
    toc: ["Consistency creates speed"],
    related: ["Designing Fintech Interfaces People Actually Trust"],
  },
  {
    title: "Building Retail Platforms That Survive Traffic Spikes",
    category: "Web Development",
    date: "Mar 27, 2026",
    readTime: "6 min read",
    author: "Omar Farooq",
    authorRole: "Engineering Lead",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=85",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=90",
    excerpt:
      "Architecture lessons from launching e-commerce platforms that had to hold up on launch day.",
    body: [
      {
        type: "p",
        text: "Traffic spikes reveal whether a commerce platform was designed as a system or assembled as a collection of happy paths.",
      },
      { type: "h2", text: "Optimize the critical path" },
      {
        type: "p",
        text: "Caching, queueing, observability, and a resilient checkout path matter more than chasing theoretical scale across every surface.",
      },
    ],
    toc: ["Optimize the critical path"],
    related: ["What HIPAA-Aware Software Actually Requires"],
  },
];

function AuthorMeta({ post, featured = false }) {
  return (
    <div className={`blog-author-meta ${featured ? "is-featured" : ""}`}>
      <img src={post.avatar} alt="" className="blog-author-avatar" />
      <div>
        <strong>{post.author}</strong>
        <span>
          {post.date} <span aria-hidden="true">·</span> ⏱️ {post.readTime}
        </span>
      </div>
    </div>
  );
}

function BlogVisual({ post, className = "" }) {
  const visualType =
    post.category === "Web Development"
      ? post.title.includes("HIPAA")
        ? "healthcare"
        : "retail"
      : post.category === "Product Strategy"
        ? "strategy"
        : post.category === "UX/UI Design"
          ? "design"
          : "app";

  return (
    <div
      className={`blog-visual blog-visual-${visualType} ${className}`}
      aria-label={`${post.category} software preview`}
    >
      <div className="blog-visual-windowbar">
        <i />
        <i />
        <i />
        <span>
          {visualType === "healthcare"
            ? "care.os / dashboard"
            : visualType === "retail"
              ? "commerce / command center"
              : visualType === "strategy"
                ? "system / architecture"
                : "product / workspace"}
        </span>
      </div>
      {visualType === "healthcare" && (
        <div className="blog-visual-dashboard">
          <div className="visual-sidebar">
            <b>care.os</b>
            <span>Overview</span>
            <span>Patients</span>
            <span>Compliance</span>
          </div>
          <div className="visual-main">
            <small>Good morning, care team</small>
            <strong>Patient operations</strong>
            <div className="visual-stat-row">
              <em>
                <b>98.6%</b>Compliance score
              </em>
              <em>
                <b>1,284</b>Active patients
              </em>
              <em>
                <b>24</b>Open alerts
              </em>
            </div>
            <div className="visual-chart">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      )}
      {visualType === "retail" && (
        <div className="blog-visual-dashboard">
          <div className="visual-sidebar">
            <b>market.io</b>
            <span>Overview</span>
            <span>Orders</span>
            <span>Inventory</span>
          </div>
          <div className="visual-main">
            <small>Revenue this month</small>
            <strong>
              $284,920 <mark>+24.8%</mark>
            </strong>
            <div className="visual-bars">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="visual-pipeline">
              <b>Order pipeline</b>
              <i>
                Paid <strong>248</strong>
              </i>
              <i>
                Processing <strong>84</strong>
              </i>
              <i>
                Shipped <strong>192</strong>
              </i>
            </div>
          </div>
        </div>
      )}
      {visualType === "strategy" && (
        <div className="blog-visual-architecture">
          <span>Client</span>
          <b>API Gateway</b>
          <span>Services</span>
          <b>Data layer</b>
          <span>Insights</span>
          <i className="line line-one" />
          <i className="line line-two" />
          <i className="line line-three" />
        </div>
      )}
      {visualType === "design" && (
        <div className="blog-visual-canvas">
          <div />
          <div />
          <div />
          <span>Design system</span>
          <i />
          <i />
        </div>
      )}
      {visualType === "app" && (
        <div className="blog-visual-mobile">
          <div className="mobile-top">
            <span>9:41</span>
            <b>•••</b>
          </div>
          <small>Available balance</small>
          <strong>$24,860.40</strong>
          <div className="mobile-card" />
          <div className="mobile-row">
            <i />
            <span />
            <i />
          </div>
          <div className="mobile-row">
            <i />
            <span />
            <i />
          </div>
        </div>
      )}
    </div>
  );
}

function ImageAuthorBadge({ post }) {
  return (
    <span className="blog-image-author-badge">
      <img src={post.avatar} alt="" />
      {post.author}
      <span>· {post.date}</span>
    </span>
  );
}

function BlogCard({ post, index, onOpen }) {
  return (
    <Reveal
      as="article"
      className="blog-card-premium"
      delay={staggerDelay(index)}
    >
      <button
        type="button"
        className="blog-card-button"
        onClick={() => onOpen(post)}
      >
        <div className="blog-card-image-wrap group aspect-video overflow-hidden rounded-xl">
          <BlogVisual
            post={post}
            className="blog-card-image h-full w-full transition-transform duration-500 group-hover:scale-105"
          />
          <span className="blog-category-badge">{post.category}</span>
          <ImageAuthorBadge post={post} />
        </div>
        <div className="blog-card-copy">
          <h3>{post.title}</h3>
          <p className="line-clamp-2">{post.excerpt}</p>
          <AuthorMeta post={post} />
        </div>
      </button>
    </Reveal>
  );
}

function ArticleDrawer({ post, allPosts, onClose, onOpenRelated }) {
  const drawerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return undefined;
    const handleScroll = () => {
      const range = drawer.scrollHeight - drawer.clientHeight;
      setProgress(range > 0 ? (drawer.scrollTop / range) * 100 : 0);
    };
    drawer.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => drawer.removeEventListener("scroll", handleScroll);
  }, [post]);

  const copyArticleLink = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.div
      className="blog-drawer-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.aside
        className="blog-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-drawer-title"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 260 }}
        onClick={(event) => event.stopPropagation()}
      >
        <span
          className="blog-reading-progress"
          style={{ width: `${progress}%` }}
        />
        <button
          type="button"
          className="blog-drawer-close"
          onClick={onClose}
          aria-label="Close article"
        >
          <Icon name="plus" />
        </button>
        <div className="blog-drawer-hero">
          <BlogVisual post={post} className="blog-drawer-visual" />
          <span className="blog-category-badge">{post.category}</span>
        </div>
        <div className="blog-drawer-body">
          <AuthorMeta post={post} featured />
          <h2 id="blog-drawer-title">{post.title}</h2>
          <p className="blog-drawer-lede">{post.excerpt}</p>
          <div className="blog-tldr">
            <strong>Quick Summary / TL;DR</strong>
            <p>{post.excerpt}</p>
          </div>
          <div className="blog-drawer-layout">
            <nav className="blog-toc" aria-label="Table of contents">
              <span>On this page</span>
              {post.toc.map((item) => (
                <a
                  href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                  key={item}
                >
                  {item}
                </a>
              ))}
            </nav>
            <article className="blog-rich-copy">
              {post.body.map((block) =>
                block.type === "h2" ? (
                  <h3
                    id={block.text.toLowerCase().replaceAll(" ", "-")}
                    key={block.text}
                  >
                    {block.text}
                  </h3>
                ) : (
                  <p key={block.text}>{block.text}</p>
                ),
              )}
            </article>
          </div>
          <div className="blog-author-bio">
            <img src={post.avatar} alt="" className="blog-author-avatar" />
            <div>
              <strong>Written by {post.author}</strong>
              <p>
                {post.authorRole} at Opus Geeks, shaping products that feel
                simple and work hard.
              </p>
            </div>
          </div>
          <section
            className="blog-related"
            aria-labelledby="related-posts-title"
          >
            <h3 id="related-posts-title">Keep reading</h3>
            <div>
              {post.related.map((title) => {
                const related = allPosts.find((item) => item.title === title);
                return related ? (
                  <button
                    type="button"
                    key={title}
                    onClick={() => onOpenRelated(related)}
                  >
                    {title}
                    <Icon name="arrowRight" className="icon-sm" />
                  </button>
                ) : null;
              })}
            </div>
          </section>
          <footer className="blog-drawer-footer">
            <span>
              <Icon name="clock" className="icon-sm" /> {post.readTime}
            </span>
            <button type="button" onClick={copyArticleLink}>
              <Icon name="link" className="icon-sm" />{" "}
              {copied ? "Link Copied" : "Copy Article Link"}
            </button>
          </footer>
        </div>
      </motion.aside>
    </motion.div>
  );
}

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedPost(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!selectedPost) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
    };
  }, [selectedPost]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return POSTS.filter(
      (post) =>
        (activeCategory === "All" || post.category === activeCategory) &&
        (!normalizedQuery ||
          `${post.title} ${post.excerpt} ${post.category}`
            .toLowerCase()
            .includes(normalizedQuery)),
    );
  }, [activeCategory, query]);
  const [featured, ...rest] = filteredPosts;

  return (
    <div className="page-hero">
      <section className="page-header">
        <Reveal as="div" className="frame">
          <p className="section-eyebrow">Blogs &amp; Insights</p>
          <h1>Notes from the studio</h1>
          <p className="page-header-subtitle">
            Thinking on product strategy, design, and engineering from the team
            building it every day.
          </p>
        </Reveal>
      </section>
      <section className="section blog-section">
        <div className="frame">
          <div className="blog-controls">
            <label className="blog-search">
              <Icon name="search" className="icon-sm" />
              <span className="sr-only">Search articles</span>
              <input
                type="search"
                placeholder="Search articles"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <div
              className="blog-filters"
              role="tablist"
              aria-label="Filter articles by category"
            >
              {CATEGORIES.map((category) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category}
                  className={activeCategory === category ? "is-active" : ""}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          {featured ? (
            <>
              <Reveal as="article" className="blog-featured-card">
                <div className="blog-featured-copy">
                  <span className="blog-category-badge">
                    {featured.category}
                  </span>
                  <h2>{featured.title}</h2>
                  <p>{featured.excerpt}</p>
                  <AuthorMeta post={featured} featured />
                  <button
                    type="button"
                    className="blog-read-button"
                    onClick={() => setSelectedPost(featured)}
                  >
                    Read Article <Icon name="arrowRight" className="icon-sm" />
                  </button>
                </div>
                <button
                  type="button"
                  className="blog-featured-image-wrap"
                  onClick={() => setSelectedPost(featured)}
                >
                  <BlogVisual post={featured} className="blog-featured-image" />
                  <ImageAuthorBadge post={featured} />
                </button>
              </Reveal>
              <div className="blog-grid-premium">
                {rest.map((post, index) => (
                  <BlogCard
                    post={post}
                    index={index}
                    onOpen={setSelectedPost}
                    key={post.title}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="blog-empty">
              <Icon name="search" />
              <h2>No articles found</h2>
              <p>Try another keyword or reset the filters.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
      <AnimatePresence>
        {selectedPost && (
          <ArticleDrawer
            post={selectedPost}
            allPosts={POSTS}
            onClose={() => setSelectedPost(null)}
            onOpenRelated={setSelectedPost}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
