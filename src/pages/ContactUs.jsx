import { useEffect, useId, useRef, useState } from "react";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";
import ScopeEstimator from "../components/ScopeEstimator";
import { CONTACT, SERVICES, SOCIALS } from "../data/site";

const INITIAL_FORM = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  message: "",
};
const SERVICE_OPTIONS = [...SERVICES.map((s) => s.name), "Something else"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Every message is specific about what is wrong and how to fix it, and each
// one is tied to its field with aria-describedby below.
function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Enter your full name.";
  if (!form.email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(form.email.trim()))
    errors.email = "Enter a valid email address, like jane@company.com.";
  if (!form.service) errors.service = "Choose the service you need.";
  if (!form.message.trim())
    errors.message = "Tell us a little about your project.";
  else if (form.message.trim().length < 20)
    errors.message = "Add a bit more detail — at least 20 characters.";
  return errors;
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p className="ed-field-error" id={id}>
      <Icon name="minus" className="icon-sm" aria-hidden="true" />
      {message}
    </p>
  );
}

function ServiceSelect({ value, onChange, invalid, describedBy }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const listId = useId();

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
    <div className={`ed-select ${isOpen ? "is-open" : ""}`} ref={selectRef}>
      <button
        type="button"
        id="service"
        className="ed-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => event.key === "Escape" && setIsOpen(false)}
      >
        <span className={value ? "" : "is-placeholder"}>
          {value || "Select a service"}
        </span>
        <span className="ed-select-caret" aria-hidden="true" />
      </button>
      {isOpen && (
        <div
          className="ed-select-options"
          id={listId}
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
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitted
  const formRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the person starts fixing it.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      setStatus("idle");
      formRef.current?.querySelector(`#${firstInvalid}`)?.focus();
      return;
    }

    // TODO(integration): no backend is wired up yet — this simply confirms
    // receipt in the UI. Replace with a real submit (API route, Formspree,
    // EmailJS, etc.) before launch so messages actually reach the team.
    setStatus("submitted");
    setForm(INITIAL_FORM);
  };

  const errorId = (field) => (errors[field] ? `${field}-error` : undefined);

  // The estimator writes its summary into the form, then puts the cursor at
  // the end of the message so you carry straight on typing.
  const applyEstimate = ({ service, message }) => {
    setForm((prev) => ({ ...prev, service, message }));
    setErrors((prev) => ({ ...prev, service: undefined, message: undefined }));
    const field = formRef.current?.querySelector("#message");
    if (field) {
      field.focus();
      field.setSelectionRange(message.length, message.length);
      field.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  };

  return (
    <div className="page-hero contact-page">
      <PageHeader
        eyebrow="Contact us"
        title="Tell us about your project"
        subtitle="Share a few details and we&rsquo;ll reply within one business day with questions and next steps."
      />

      {/* Scope builder: shape the project, get an indicative timeline, and
          drop the summary straight into the form below. */}
      <section
        className="section section-tight estimator-section"
        aria-labelledby="estimator-title"
      >
        <div className="frame">
          <div className="estimator-head">
            <p className="ed-eyebrow">Plan your project</p>
            <h2 id="estimator-title">Shape the brief in 30 seconds</h2>
            <p className="section-subtitle">
              Tell us roughly what you need and see how long work like it
              usually takes. No email required.
            </p>
          </div>
          <ScopeEstimator onApply={applyEstimate} />
        </div>
      </section>

      <section className="section section-tight">
        <div className="frame ed-contact">
          {/* Details, offices and what happens after you send. */}
          <div className="ed-contact-details">
            <div className="ed-contact-block">
              <h2>Contact details</h2>
              <ul className="ed-contact-list">
                <li>
                  <span className="ed-contact-label">Email</span>
                  <a
                    className="ed-contact-value"
                    href={`mailto:${CONTACT.email}`}
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <span className="ed-contact-label">Phone</span>
                  <a
                    className="ed-contact-value"
                    href={`tel:${CONTACT.phoneHref}`}
                  >
                    {CONTACT.phone}
                  </a>
                </li>
                {CONTACT.offices.map((office) => (
                  <li key={office.label}>
                    <span className="ed-contact-label">{office.label}</span>
                    <span className="ed-contact-detail">{office.address}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ed-contact-block">
              <h2>Book a 30-min call</h2>
              <div className="ed-booking">
                <p>
                  Prefer to talk? Pick a time to walk through your project,
                  timeline and budget with our team.
                </p>
                <a
                  className="btn-secondary"
                  href={
                    CONTACT.calendlyUrl ??
                    `mailto:${CONTACT.email}?subject=${encodeURIComponent(
                      "30-minute call request",
                    )}`
                  }
                  {...(CONTACT.calendlyUrl
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                >
                  {CONTACT.calendlyUrl ? "Pick a time" : "Request a call time"}
                  <Icon
                    name={CONTACT.calendlyUrl ? "external" : "arrowRight"}
                    className="icon-sm"
                  />
                </a>
              </div>
            </div>

            {/* Mirrors the FAQs ("How do we get started?") and the
                one-business-day reply promise above. */}
            <div className="ed-contact-block">
              <h2>What happens next</h2>
              <ol className="ed-next-steps">
                <li>
                  <span>We read your brief and reply by email.</span>
                </li>
                <li>
                  <span>A short call to understand your goals.</span>
                </li>
                <li>
                  <span>
                    You receive a proposal with scope and next steps.
                  </span>
                </li>
              </ol>
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

          {/* Minimal underline form. Labels stay visible at all times. */}
          {/* A plain <form>: it holds the ref used to focus the first
              invalid field, and a form should never fade in. */}
          <form
            className="ed-form"
            onSubmit={handleSubmit}
            noValidate
            ref={formRef}
            aria-label="Project enquiry"
          >
            <div className={`ed-field ${errors.name ? "has-error" : ""}`}>
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errorId("name")}
              />
              <FieldError id="name-error" message={errors.name} />
            </div>

            <div className={`ed-field ${errors.email ? "has-error" : ""}`}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@company.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errorId("email")}
              />
              <FieldError id="email-error" message={errors.email} />
            </div>

            <div className="ed-field">
              <label htmlFor="company">Company <span className="ed-optional">(optional)</span></label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                value={form.company}
                onChange={handleChange}
                placeholder="Acme Inc."
              />
            </div>

            <div className={`ed-field ${errors.service ? "has-error" : ""}`}>
              <span className="ed-field-label" id="service-label">
                Service you need
              </span>
              <ServiceSelect
                value={form.service}
                onChange={handleChange}
                invalid={Boolean(errors.service)}
                describedBy={
                  `service-label${errors.service ? " service-error" : ""}`
                }
              />
              <FieldError id="service-error" message={errors.service} />
            </div>

            <div className="ed-field">
              <label htmlFor="budget">
                Budget range <span className="ed-optional">(optional)</span>
              </label>
              <input
                id="budget"
                name="budget"
                type="text"
                value={form.budget}
                onChange={handleChange}
                placeholder="Roughly what you have in mind"
              />
            </div>

            <div className={`ed-field ${errors.message ? "has-error" : ""}`}>
              <label htmlFor="message">Project details</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                placeholder="What are you building, and who is it for?"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errorId("message")}
              />
              <FieldError id="message-error" message={errors.message} />
            </div>

            <div className="ed-form-footer">
              <button className="btn-gradient" type="submit">
                Send project details{" "}
                <Icon name="arrowRight" className="icon-sm" />
              </button>
              <p className="ed-form-note">We reply within one business day.</p>
            </div>

            {status === "submitted" && (
              <p className="ed-form-success" role="status">
                <Icon name="check" className="icon-sm" aria-hidden="true" />
                Thanks, your details are in. Watch your inbox for our reply.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
