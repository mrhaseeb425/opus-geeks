import { useState } from "react";
import Icon from "../components/Icon";
import { CONTACT, SOCIALS } from "../data/site";

const INITIAL_FORM = { name: "", email: "", service: "", message: "" };

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
        <div className="frame">
          <p className="section-eyebrow">Contact Us</p>
          <h1>Let's build something together</h1>
          <p className="page-header-subtitle">
            Tell us about your project and we'll get back to you within one
            business day.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="frame contact-grid">
          <form className="card-glass contact-form" onSubmit={handleSubmit}>
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
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
              >
                <option value="">Select a service</option>
                <option value="App Development">App Development</option>
                <option value="Web Development">Web Development</option>
                <option value="UX/UI Design">UX/UI Design</option>
                <option value="Game Development">Game Development</option>
                <option value="Other">Something else</option>
              </select>
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

            <button className="btn-gradient" type="submit">
              Send message <Icon name="arrowRight" className="icon-sm" />
            </button>

            {status === "submitted" && (
              <p className="form-success" role="status">
                <Icon name="check" className="icon-sm" />
                Thanks — your message has been noted. We'll follow up by
                email shortly.
              </p>
            )}
          </form>

          <div className="contact-side">
            <div className="card-glass contact-info-card">
              <h3>Contact details</h3>
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
          </div>
        </div>
      </section>
    </div>
  );
}
