import { useEffect, useRef, useState } from "react";
import Icon from "../components/Icon";
import Magnetic from "../components/Magnetic";
import Reveal from "../components/Reveal";
import { CONTACT, SOCIALS } from "../data/site";

const INITIAL_FORM = { name: "", email: "", service: "", message: "" };
const SERVICE_OPTIONS = [
  "App Development",
  "Web Development",
  "UX/UI Design",
  "Game Development",
  "Something else",
];

function ServiceSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const selectedLabel = value || "Select a service";

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!selectRef.current?.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const chooseOption = (option) => {
    onChange({ target: { name: "service", value: option } });
    setIsOpen(false);
  };

  return (
    <div className={`custom-select ${isOpen ? "is-open" : ""}`} ref={selectRef}>
      <button
        type="button"
        id="service"
        className="custom-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="service-options"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={!value ? "is-placeholder" : ""}>{selectedLabel}</span>
        <span className="custom-select-caret" aria-hidden="true" />
      </button>
      {isOpen && (
        <div
          className="custom-select-options"
          id="service-options"
          role="listbox"
          aria-label="Services"
        >
          {SERVICE_OPTIONS.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={value === option}
              className={value === option ? "is-selected" : ""}
              key={option}
              onClick={() => chooseOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ContactUs() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | submitted

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // No backend is wired up yet — this simply confirms receipt in the UI.
    // Replace with a real submit (API route, Formspree, EmailJS, etc.) before
    // launch so messages actually reach the team.
    setStatus("submitted");
    setForm(INITIAL_FORM);
  };

  return (
    <div className="page-hero">
      <section className="page-header">
        <Reveal as="div" className="frame">
          <p className="section-eyebrow">Contact Us</p>
          <h1>Let's build something together</h1>
          <p className="page-header-subtitle">
            Tell us about your project and we'll get back to you within one
            business day.
          </p>
        </Reveal>
      </section>

      <section className="section">
        <div className="frame contact-grid">
          <Reveal
            as="form"
            className="card-glass contact-form"
            onSubmit={handleSubmit}
          >
            <div className="form-row">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
              />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="jane@company.com"
              />
            </div>

            <div className="form-row">
              <label htmlFor="service">Service you're interested in</label>
              <ServiceSelect value={form.service} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label htmlFor="message">Project details</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us a bit about what you're building..."
              />
            </div>

            <Magnetic>
              <button className="btn-gradient" type="submit">
                Send message <Icon name="arrowRight" className="icon-sm" />
              </button>
            </Magnetic>

            {status === "submitted" && (
              <p className="form-success" role="status">
                <Icon name="check" className="icon-sm" />
                Thanks — your message has been noted. We'll follow up by email
                shortly.
              </p>
            )}
          </Reveal>

          <Reveal as="div" className="contact-side" delay={0.12}>
            <div className="card-glass contact-info-card">
              <h3>Contact details</h3>
              <ul className="footer-contact-list contact-info-list">
                <li className="contact-info-item">
                  <span className="contact-info-icon">
                    <Icon name="mail" />
                  </span>
                  <span className="contact-info-copy">
                    <strong className="contact-info-label">Email</strong>
                    <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                  </span>
                </li>
                <li className="contact-info-item">
                  <span className="contact-info-icon">
                    <Icon name="phone" />
                  </span>
                  <span className="contact-info-copy">
                    <strong className="contact-info-label">Phone</strong>
                    <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>
                  </span>
                </li>
                {CONTACT.offices.map((office) => (
                  <li className="contact-info-item" key={office.label}>
                    <span className="contact-info-icon">
                      <Icon name="pin" />
                    </span>
                    <span className="contact-info-copy">
                      <strong className="contact-info-label">
                        {office.label}
                      </strong>
                      <span className="contact-info-detail">
                        {office.address}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="footer-socials contact-socials">
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
          </Reveal>
        </div>
      </section>
    </div>
  );
}
