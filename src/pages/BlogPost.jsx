import ArticleContent from "../components/ArticleContent";
import Icon from "../components/Icon";

// Full, shareable article page at /blog/:slug.
export default function BlogPost({ post }) {
  return (
    <div className="page-hero detail-page blog-post-page">
      <div className="frame detail-frame">
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <a href="/blog">
            <Icon name="arrowLeft" className="icon-sm" /> All articles
          </a>
        </nav>
        <article className="article-page">
          <ArticleContent post={post} titleAs="h1" />
        </article>
      </div>
    </div>
  );
}
