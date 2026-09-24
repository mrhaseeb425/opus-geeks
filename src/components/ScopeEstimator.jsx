import { useMemo, useState } from "react";
import Icon from "./Icon";
import { PROCESS_STEPS, SERVICES } from "../data/site";
import {
  DESIGN_OPTIONS,
  STAGES,
  estimate,
} from "../data/estimator";

// An interactive scope builder: pick the services, the stage the product is
// at and whether design is included, and get an indicative timeline plus a
// ready-written brief you can drop straight into the enquiry form.
//
// Every figure it shows traces back to copy already published on the site
// (see data/estimator.js) — it never quotes a price, because we do not
// publish one.
export default function ScopeEstimator({ onApply }) {
  const [services, setServices] = useState([SERVICES[0].name]);
  const [stage, setStage] = useState(STAGES[0].id);
  const [design, setDesign] = useState(DESIGN_OPTIONS[0].id);
  const [applied, setApplied] = useState(false);

  const toggleService = (name) => {
    setApplied(false);
    setServices((prev) => {
      if (!prev.includes(name)) return [...prev, name];
      // Keep at least one service selected, so the estimate always matches
      // what the chips show.
      const next = prev.filter((s) => s !== name);
      return next.length ? next : prev;
    });
  };

  const chosen = services.length ? services : [SERVICES[0].name];
  const { low, high } = useMemo(
    () => estimate({ stage, design, serviceCount: chosen.length }),
    [stage, design, chosen.length],
  );

  const stageLabel = STAGES.find((s) => s.id === stage)?.label ?? "";
  const designLabel = DESIGN_OPTIONS.find((d) => d.id === design)?.label ?? "";

  const brief =
    `${stageLabel}. ${designLabel}.\n` +
    `Services: ${chosen.join(", ")}.\n` +
    `Indicative timeline: ${low}–${high} weeks.\n\n` +
    `What we are building: `;

  const apply = () => {
    onApply?.({
      service: chosen.length === 1 ? chosen[0] : "Something else",
      message: brief,
    });
    setApplied(true);
  };

  return (
    <div className="estimator">
      <div className="estimator-controls">
        <fieldset className="estimator-field">
          <legend>What do you need?</legend>
          <p className="estimator-hint">Pick one or more.</p>
          <div className="estimator-chips">
            {SERVICES.map((service) => {
              const on = chosen.includes(service.name);
              return (
                <label
                  key={service.slug}
                  className={`estimator-chip ${on ? "is-on" : ""}`}
                >
                  <input
                    type="checkbox"
                    name="estimator-service"
                    checked={on}
                    onChange={() => toggleService(service.name)}
                  />
                  <span>{service.name}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="estimator-field">
          <legend>Where is the product today?</legend>
          <div className="estimator-options">
            {STAGES.map((option) => (
              <label
                key={option.id}
                className={`estimator-option ${stage === option.id ? "is-on" : ""}`}
              >
                <input
                  type="radio"
                  name="estimator-stage"
                  value={option.id}
                  checked={stage === option.id}
                  onChange={() => {
                    setStage(option.id);
                    setApplied(false);
                  }}
                />
                <span className="estimator-option-copy">
                  <strong>{option.label}</strong>
                  <span>{option.detail}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="estimator-field">
          <legend>Do you need design?</legend>
          <div className="estimator-options">
            {DESIGN_OPTIONS.map((option) => (
              <label
                key={option.id}
                className={`estimator-option ${design === option.id ? "is-on" : ""}`}
              >
                <input
                  type="radio"
                  name="estimator-design"
                  value={option.id}
                  checked={design === option.id}
                  onChange={() => {
                    setDesign(option.id);
                    setApplied(false);
                  }}
                />
                <span className="estimator-option-copy">
                  <strong>{option.label}</strong>
                  <span>{option.detail}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* The result updates live; `aria-live` announces it to screen readers. */}
      <aside className="estimator-result" aria-live="polite">
        <p className="estimator-result-label">Indicative timeline</p>
        <p className="estimator-range">
          <strong>
            {low}&ndash;{high}
          </strong>
          <span>weeks</span>
        </p>
        <p className="estimator-note">
          A guide based on projects like yours, not a quote. You get a real
          timeline after a short call.
        </p>

        <ol className="estimator-stages">
          {PROCESS_STEPS.map((step) => (
            <li key={step.step}>
              <span className="estimator-stage-num">{step.step}</span>
              {step.name}
            </li>
          ))}
        </ol>

        <button type="button" className="btn-gradient" onClick={apply}>
          {applied ? "Added to the form" : "Use this in my enquiry"}
          <Icon
            name={applied ? "check" : "arrowRight"}
            className="icon-sm"
            aria-hidden="true"
          />
        </button>
      </aside>
    </div>
  );
}
