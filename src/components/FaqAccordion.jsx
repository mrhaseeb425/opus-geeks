import { useState } from "react";
import { staggerDelay } from "../lib/stagger";
import { rowNumber } from "../lib/rows";
import Icon from "./Icon";
import Reveal from "./Reveal";

// Single-open accordion shared by the FAQs page and the Home FAQ preview.
// Laid out as numbered rows (number, question, chevron, hairline divider) to
// match the rest of the site; open/close still animates the answer's height
// (styles in type.css + editorial.css).
// `idPrefix` keeps ids unique if two lists ever render on one page.
export default function FaqAccordion({ items, idPrefix = "faq" }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list ed-rows">
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        const questionId = `${idPrefix}-question-${index}`;
        const answerId = `${idPrefix}-answer-${index}`;
        return (
          <Reveal
            as="div"
            className={`faq-item ${isOpen ? "is-open" : ""}`}
            key={item.question}
            delay={staggerDelay(index, 0.06)}
          >
            <button
              type="button"
              className="faq-question"
              id={questionId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              aria-controls={answerId}
            >
              <span className="ed-row-num" aria-hidden="true">
                {rowNumber(index)}
              </span>
              <span>{item.question}</span>
              <Icon
                name="chevronDown"
                className={`faq-chevron ${isOpen ? "is-open" : ""}`}
              />
            </button>
            {/* Always rendered so height can animate (0fr -> 1fr grid row);
                the clip layer hides overflow, so the answer never paints over
                the next question. Collapsed answers are inert. */}
            <div
              className="faq-answer-wrap"
              id={answerId}
              role="region"
              aria-labelledby={questionId}
              aria-hidden={!isOpen}
              inert={!isOpen}
            >
              <div className="faq-answer-clip">
                <p className="faq-answer">{item.answer}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
