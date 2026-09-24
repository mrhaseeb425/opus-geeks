export default function NotFound() {
  return (
    <div className="page-hero">
      <section className="page-header not-found">
        <div className="frame">
          <p className="section-eyebrow">404</p>
          <h1>We couldn&apos;t find that page</h1>
          <p className="page-header-subtitle">
            The link may be out of date. Go back home or browse our case
            studies.
          </p>
          <div className="not-found-actions">
            <a className="btn-gradient" href="/">
              Back to home
            </a>
            <a className="btn-secondary" href="/portfolio">
              See case studies
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
