// Scope estimator options (components/ScopeEstimator.jsx).
//
// IMPORTANT: every range below is taken from copy already published on this
// site, not invented. The week ranges come from the FAQ answer "How long does
// a typical project take?" (data/faqs.js): a focused MVP is 6–10 weeks and
// larger platforms run 3 to 6 months. The stage names come from PROCESS_STEPS
// (data/site.js).
//
// TODO(content): confirm these ranges with delivery before launch, and adjust
// `weeks` here if the real numbers differ. Nothing else needs to change.

export const STAGES = [
  {
    id: "mvp",
    label: "A first version",
    detail: "A focused MVP that proves the idea with real users.",
    weeks: [6, 10],
  },
  {
    id: "growing",
    label: "A growing product",
    detail: "An existing product that needs new features or a rebuild.",
    weeks: [10, 16],
  },
  {
    id: "platform",
    label: "A larger platform",
    detail: "Multiple roles, integrations and long-running operations.",
    weeks: [13, 26],
  },
];

export const DESIGN_OPTIONS = [
  {
    id: "with-design",
    label: "Design and build",
    detail: "We research, prototype and test before engineering starts.",
    extraWeeks: [2, 3],
  },
  {
    id: "build-only",
    label: "Build from our designs",
    detail: "You already have designs or a design system we can build to.",
    extraWeeks: [0, 0],
  },
];

// A rough allowance for each additional service line running alongside the
// first one. Kept deliberately small: the same team does the work, so a second
// service overlaps rather than doubling the timeline.
export const EXTRA_SERVICE_WEEKS = [1, 2];

export function estimate({ stage, design, serviceCount }) {
  const base = STAGES.find((s) => s.id === stage) ?? STAGES[0];
  const extra = DESIGN_OPTIONS.find((d) => d.id === design) ?? DESIGN_OPTIONS[0];
  const additional = Math.max(0, serviceCount - 1);
  const low = base.weeks[0] + extra.extraWeeks[0] + additional * EXTRA_SERVICE_WEEKS[0];
  const high = base.weeks[1] + extra.extraWeeks[1] + additional * EXTRA_SERVICE_WEEKS[1];
  return { low, high };
}
