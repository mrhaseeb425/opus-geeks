import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ArticleContent, { AuthorMeta } from "../components/ArticleContent";
import Drawer from "../components/Drawer";
import Icon from "../components/Icon";
import NumberedRows from "../components/NumberedRows";
import PageHeader from "../components/PageHeader";
import Photo from "../components/Photo";
import { BLOG_CATEGORIES, findPost, POSTS } from "../data/posts";
import { navigate } from "../lib/router";

// Everything after the featured article is a numbered index row: number,
// title, excerpt, category, reading time and an arrow.
const indexRow = (post, onOpen) => ({
  key: post.slug,
  title: post.title,
  description: post.excerpt,
  href: `/blog/${post.slug}`,
  onClick: onOpen(post),
  meta: (
    <span className="ed-row-meta">
      <span className="ed-meta-cat">{post.category}</span>
      <span className="ed-meta-sep" aria-hidden="true">
        ·
      </span>
      <span>{post.readTime}</span>
    </span>
  ),
});

// Posts are static data, so the grid renders complete on first paint — no
// loading skeletons and no layout shift.
export default function Blogs({ previewSlug }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const previewPost = previewSlug ? findPost(previewSlug) : null;
  const drawerScrollRef = useRef(null);

  // Opening a related article inside the drawer starts it from the top.
  useEffect(() => {
    drawerScrollRef.current?.scrollTo({ top: 0 });
  }, [previewSlug]);

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

  // The preview drawer gets the article's real URL; the list stays mounted.
  const openPost = (post) => (event) => {
    event?.preventDefault();
    navigate(`/blog/${post.slug}`, {
      replace: Boolean(previewSlug),
      state: { modalOf: "/blog" },
    });
  };

  const closePreview = useCallback(() => {
    if (window.history.state?.modalOf) window.history.back();
    else navigate("/blog", { replace: true });
  }, []);

  const resetFilters = () => {
    setQuery("");
    setActiveCategory("All");
  };

  return (
    <div className="page-hero">
      <PageHeader
        eyebrow="Blog"
        title="Lessons from building real products"
        subtitle="Practical articles on product strategy, design and engineering, written by the people doing the work."
      />
      <section className="section section-tight blog-section">
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
              role="group"
              aria-label="Filter articles by category"
            >
              {BLOG_CATEGORIES.map((category) => (
                <button
                  type="button"
                  aria-pressed={activeCategory === category}
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
              <article className="blog-featured-card">
                <div className="blog-featured-copy">
                  <span className="blog-category-badge">
                    {featured.category}
                  </span>
                  <h2>{featured.title}</h2>
                  <p>{featured.excerpt}</p>
                  <AuthorMeta post={featured} featured />
                  <a
                    className="blog-read-button"
                    href={`/blog/${featured.slug}`}
                    onClick={openPost(featured)}
                  >
                    Read the article{" "}
                    <Icon name="arrowRight" className="icon-sm" />
                  </a>
                </div>
                <a
                  className="blog-featured-image-wrap"
                  href={`/blog/${featured.slug}`}
                  onClick={openPost(featured)}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Photo
                    photo={featured.cover}
                    alt=""
                    width={640}
                    ratio={4 / 3}
                    sizes="(max-width: 860px) calc(100vw - 36px), 640px"
                    priority
                    className="blog-featured-image"
                  />
                </a>
              </article>
              {rest.length > 0 && (
                <>
                  <div className="ed-index-head">
                    <h2>More articles</h2>
                    <span className="ed-index-count">
                      {rest.length} {rest.length === 1 ? "article" : "articles"}
                    </span>
                  </div>
                  <NumberedRows
                    items={rest.map((post) => indexRow(post, openPost))}
                  />
                </>
              )}
            </>
          ) : (
            <div className="blog-empty">
              <Icon name="search" />
              <h2>No articles found</h2>
              <p>Try another keyword or reset the filters.</p>
              <button type="button" onClick={resetFilters}>
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
      <AnimatePresence>
        {previewPost && (
          <Drawer
            labelledBy="blog-drawer-title"
            onClose={closePreview}
            className="drawer-article"
            closeLabel="Close article preview"
            scrollRef={drawerScrollRef}
            footer={
              <a
                className="btn-gradient"
                href={`/blog/${previewPost.slug}`}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(`/blog/${previewPost.slug}`, { replace: true });
                }}
              >
                Open full article <Icon name="arrowRight" className="icon-sm" />
              </a>
            }
          >
            <ArticleContent
              key={previewPost.slug}
              post={previewPost}
              titleId="blog-drawer-title"
              inDrawer
              onOpenRelated={(post) => openPost(post)()}
            />
          </Drawer>
        )}
      </AnimatePresence>
    </div>
  );
}
