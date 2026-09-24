import Icon from "./Icon";
import { NAV_ITEMS, SERVICES, CONTACT, SOCIALS, TAGLINE } from "../data/site";

export default function Footer({ activeNav, setActiveNav, cta }) {
  const year = new Date().getFullYear();

  const goTo = (label) => (event) => {
    event.preventDefault();
    setActiveNav(label);
  };

  return (
    <footer className="site-footer">
      {/* The page's closing call to action, merged into the top of the
          footer — there is no separate floating CTA card any more. */}
      {cta && (
        <div className="frame footer-cta">
          <div>
            <h2>{cta.title}</h2>
            <p>{cta.text}</p>
          </div>
          <a
            className="btn-gradient"
            href={cta.href}
            onClick={cta.nav ? goTo(cta.nav) : undefined}
          >
            {cta.label} <Icon name="arrowRight" className="icon-sm" />
          </a>
        </div>
      )}

      <div className="frame footer-grid">
        <div className="footer-brand">
          <a className="brand footer-logo" href="/" onClick={goTo("Home")}>
            <span className="brand-copy">
              <span className="brand-primary">OPUS</span>
              <span className="brand-secondary">GEEKS</span>
            </span>
          </a>
          <p className="footer-tagline">{TAGLINE}</p>
          <div className="footer-socials">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.name}
                className="footer-social-link"
              >
                <Icon name={social.icon} />
              </a>
            ))}
          </div>
        </div>

        <nav className="footer-col" aria-label="Quick links">
          <h2 className="footer-heading">Quick Links</h2>
          <ul className="footer-link-list">
            {[...NAV_ITEMS, { label: "Careers", path: "/careers" }].map(
              (item) => (
                <li key={item.label}>
                  <a
                    href={item.path}
                    onClick={goTo(item.label)}
                    aria-current={activeNav === item.label ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Services">
          <h2 className="footer-heading">Services</h2>
          <ul className="footer-link-list">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <a
                  href={`/services/${service.slug}`}
                  onClick={goTo(service.name)}
                  aria-current={activeNav === service.name ? "page" : undefined}
                >
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h2 className="footer-heading">Get in Touch</h2>
          <ul className="footer-contact-list">
            <li>
              <Icon name="mail" />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <Icon name="phone" />
              <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>
            </li>
            {CONTACT.offices.map((office) => (
              <li key={office.label}>
                <Icon name="pin" />
                <span>
                  <strong>{office.label}</strong>
                  <br />
                  {office.address}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="frame footer-bottom-inner">
          <p>© {year} Opus Geeks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
