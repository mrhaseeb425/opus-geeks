import { useState } from "react";
import { authorInitials, headingId, POSTS } from "../data/posts";
import { scrollToId } from "../lib/smoothScroll";
import Icon from "./Icon";
import Photo from "./Photo";
import { Initials } from "./Testimonial";

export function AuthorMeta({ post, featured = false }) {
  return (
    <div className={`blog-author-meta ${featured ? "is-featured" : ""}`}>
      <Initials
        text={authorInitials(post.author)}
        className="blog-author-avatar"
      />
      <div>
        <strong>{post.author}</strong>
        <span>
          <time>{post.date}</time> <span aria-hidden="true">·</span>{" "}
          {post.readTime}
        </span>
      </div>
    </div>
  );
}

// The article itself, shared by the blog preview drawer and the full
// /blog/:slug page. In-article links scroll programmatically so they never
// add a #hash history entry (which would drop the drawer's route state).
export default function ArticleContent({
  post,
  titleAs: Title = "h2",
  titleId,
  inDrawer = false,
  onOpenRelated,
}) {
  const [copied, setCopied] = useState(false);
  // Keep the outline sequential: h1 page -> h2 sections, h2 drawer -> h3.
  const Section = Title === "h1" ? "h2" : "h3";
  const toc = post.body
    .filter((block) => block.type === "h2")
    .map((block) => block.text);
  const related = post.related
    .map((slug) => POSTS.find((item) => item.slug === slug))
    .filter(Boolean);

  const jumpTo = (id) => (event) => {
    event.preventDefault();
    if (inDrawer) {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      scrollToId(id);
    }
  };

  const copyArticleLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/blog/${post.slug}`,
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <div className="article-hero">
        <Photo
          photo={post.cover}
          width={980}
          ratio={21 / 9}
          sizes="(max-width: 1020px) calc(100vw - 40px), 980px"
          priority={!inDrawer}
          className="article-hero-visual"
        />
      </div>
      <div className="article-body">
        <span className="blog-category-badge">{post.category}</span>
        <Title id={titleId} className="article-title">
          {post.title}
        </Title>
        <p className="article-lede">{post.excerpt}</p>
        <AuthorMeta post={post} featured />

        <div className={`article-layout ${inDrawer ? "is-single" : ""}`}>
          {!inDrawer && toc.length > 0 && (
            <nav className="blog-toc" aria-label="On this page">
              <span>On this page</span>
              {toc.map((item) => (
                <a
                  href={`#${headingId(item)}`}
                  key={item}
                  onClick={jumpTo(headingId(item))}
                >
                  {item}
                </a>
              ))}
            </nav>
          )}
          <div className="blog-rich-copy">
            {post.body.map((block) =>
              block.type === "h2" ? (
                <Section id={headingId(block.text)} key={block.text}>
                  {block.text}
                </Section>
              ) : (
                <p key={block.text}>{block.text}</p>
              ),
            )}
          </div>
        </div>

        <div className="blog-author-bio">
          <Initials
            text={authorInitials(post.author)}
            className="blog-author-avatar"
          />
          <div>
            <strong>Written by {post.author}</strong>
            <p>
              {post.authorRole} at Opus Geeks.
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <section
            className="blog-related"
            aria-labelledby={`related-${post.slug}`}
          >
            <Section id={`related-${post.slug}`}>Keep reading</Section>
            <div>
              {related.map((item) => (
                <a
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  onClick={(event) => {
                    if (!onOpenRelated) return;
                    event.preventDefault();
                    onOpenRelated(item);
                  }}
                >
                  {item.title}
                  <Icon name="arrowRight" className="icon-sm" />
                </a>
              ))}
            </div>
          </section>
        )}

        <footer className="blog-drawer-footer">
          <span>
            <Icon name="clock" className="icon-sm" /> {post.readTime}
          </span>
          <button type="button" onClick={copyArticleLink}>
            <Icon name="link" className="icon-sm" />
            <span aria-live="polite">
              {copied ? "Link copied" : "Copy article link"}
            </span>
          </button>
        </footer>
      </div>
    </>
  );
}
