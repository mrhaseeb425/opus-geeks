import FaqAccordion from "../components/FaqAccordion";
import PageHeader from "../components/PageHeader";
import { FAQ_ITEMS } from "../data/faqs";

export default function FAQs() {
  return (
    <div className="page-hero faq-page">
      <PageHeader
        eyebrow="FAQs"
        title="Questions about working with us"
        subtitle="Timelines, process and support, answered in plain language before you commit to anything."
      />

      <section className="section section-tight faq-section">
        <div className="frame faq-frame">
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* The closing CTA opens the footer now (data/cta.js). */}
    </div>
  );
}
