import Icon from "../components/Icon";

// Placeholder articles for the blog grid — replace with real posts as they're
// published. Keeping the structure here makes it a drop-in swap later.
const POSTS = [
  {
    title: "Choosing Between Native and Cross-Platform for Your Next App",
    category: "App Development",
    readTime: "6 min read",
    excerpt:
      "A practical breakdown of when React Native or Flutter make sense — and when native still wins.",
  },
  {
    title: "Designing Fintech Interfaces People Actually Trust",
    category: "UX/UI Design",
    readTime: "5 min read",
    excerpt:
      "How clarity, feedback, and restraint build user confidence in financial products.",
  },
  {
    title: "What HIPAA-Aware Software Actually Requires",
    category: "Healthcare",
    readTime: "7 min read",
    excerpt:
      "The engineering and process decisions that keep healthcare platforms compliant from day one.",
  },
  {
    title: "Shipping an MVP Without Cutting the Wrong Corners",
    category: "Product Strategy",
    readTime: "4 min read",
    excerpt:
      "Where to move fast, and where cutting corners quietly turns into technical debt.",
  },
  {
    title: "Why Design Systems Pay for Themselves",
    category: "UX/UI Design",
    readTime: "5 min read",
    excerpt:
      "A reusable component library isn't overhead — it's what lets a small team ship like a big one.",
  },
  {
    title: "Building Retail Platforms That Survive Traffic Spikes",
    category: "Web Development",
    readTime: "6 min read",
    excerpt:
      "Architecture lessons from launching e-commerce platforms that had to hold up on launch day.",
  },
];

export default function Blogs() {
  const [featured, ...rest] = POSTS;

  return (
    <div className="page-hero">
      <section className="page-header">
        <div className="frame">
          <p className="section-eyebrow">Blogs & Insights</p>
          <h1>Notes from the studio</h1>
          <p className="page-header-subtitle">
            Thinking on product strategy, design, and engineering from the
            team building it every day.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="frame">
          <article className="card-glass featured-post">
            <span className="tag-pill">{featured.category}</span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <span className="post-meta">
              <Icon name="clock" className="icon-sm" />
              {featured.readTime}
            </span>
          </article>

          <div className="grid-3 blog-grid">
            {rest.map((post) => (
              <article className="card-glass blog-card" key={post.title}>
                <span className="tag-pill">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="post-meta">
                  <Icon name="clock" className="icon-sm" />
                  {post.readTime}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
