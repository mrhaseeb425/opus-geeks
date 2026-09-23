import { useState } from "react";
import Icon from "../components/Icon";
import Magnetic from "../components/Magnetic";
import Reveal from "../components/Reveal";
import { staggerDelay } from "../lib/stagger";

const FAQ_ITEMS = [
  {
    question: "What services does Opus Geeks offer?",
    answer:
      "We offer end-to-end app development, web development, UX/UI design, and game development — covering everything from strategy and prototyping to engineering and launch support.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on scope. A focused MVP can take 6-10 weeks, while larger platforms typically run 3-6 months. We'll give you a realistic timeline after understanding your requirements.",
  },
  {
    question: "Do you work with startups or only established companies?",
    answer:
      "Both. We work with early-stage startups building their first product and enterprises modernizing existing platforms, across fintech, healthcare, retail, and real estate.",
  },
  {
    question: "What does your process look like?",
    answer:
      "Every engagement moves through four stages: Branding, Prototype, Development, and Launch — so you always know what's happening next and can give feedback before we build.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes. We offer ongoing maintenance, monitoring, and feature development after launch so your product keeps improving instead of stalling.",
  },
  {
    question: "How do we get started?",
    answer:
      "Reach out through the Contact page with a bit about your project. We'll schedule a call, understand your goals, and follow up with next steps and a proposal.",
  },
];

export default function FAQs({ setActiveNav }) {
  const [openIndex, setOpenIndex] = useState(0);

  const goTo = (label) => (event) => {
    event.preventDefault();
    setActiveNav?.(label);
  };

  return (
    <div className="page-hero faq-page">
      <section className="page-header faq-page-header">
        <Reveal as="div" className="frame">
          <p className="faq-eyebrow">FAQs</p>
          <h1 className="faq-title">Frequently asked questions</h1>
          <p className="page-header-subtitle">
            Answers to what clients most often ask before starting a project.
          </p>
        </Reveal>
      </section>

      <section className="section faq-section">
        <div className="frame faq-frame">
          <div className="faq-list">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = index === openIndex;
              return (
                <Reveal
                  as="div"
                  className={`faq-item ${isOpen ? "is-open" : ""}`}
                  key={item.question}
                  delay={staggerDelay(index, 0.06)}
                >
                  <button
                    className="faq-question outline-none focus:outline-none focus:ring-0 focus-visible:outline-none"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <Icon
                      name="chevronDown"
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-600" : "text-slate-400"}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="faq-answer outline-none ring-0 border-none select-none focus:outline-none">
                      {item.answer}
                    </p>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section cta-banner faq-cta-section">
        <Reveal as="div" className="frame cta-banner-inner">
          <div>
            <h2>Still have questions?</h2>
            <p>We're happy to walk through the details on a quick call.</p>
          </div>
          <Magnetic>
            <a
              className="faq-cta-button"
              href="#contact"
              onClick={goTo("Contact Us")}
            >
              Contact us <Icon name="arrowRight" className="icon-sm" />
            </a>
          </Magnetic>
        </Reveal>
      </section>
    </div>
  );
}
