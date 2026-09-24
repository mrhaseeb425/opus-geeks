import NumberedRows from "../components/NumberedRows";
import PageHeader from "../components/PageHeader";
import Photo from "../components/Photo";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import StatsRow from "../components/StatsRow";
import { PHOTOS } from "../data/photos";
import { STATS, TEAM_SIZE_LABEL } from "../data/stats";
import { SIZES } from "../lib/images";
import { staggerDelay } from "../lib/stagger";

// Rows carry a number rather than an icon badge, so these entries are copy
// only now.
const VALUES = [
  {
    title: "Reliability first",
    detail:
      "We build for fintech and healthcare, where downtime and data errors aren't acceptable.",
  },
  {
    title: "Clear communication",
    detail:
      "You hear from us early and often, not only when a milestone is due.",
  },
  {
    title: "A defined process",
    detail:
      "Four stages with sign-off at each one, so you always know what happens next.",
  },
  {
    title: "Attention to detail",
    detail:
      "Design and engineering are held to the same bar, down to spacing and error states.",
  },
];

const TEAM = [
  {
    role: "Product Strategy",
    detail: "Scoping and roadmaps that turn an idea into a plan we can build.",
  },
  {
    role: "UX/UI Design",
    detail: "Research, prototypes and design systems your users find easy.",
  },
  {
    role: "App Engineering",
    detail: "Native and cross-platform mobile apps, plus the APIs behind them.",
  },
  {
    role: "Web Engineering",
    detail: "Web apps, dashboards and platforms that stay fast as they grow.",
  },
  {
    role: "Game Development",
    detail: "2D and 3D mobile games and VR/AR experiences, concept to release.",
  },
  {
    role: "Quality & Delivery",
    detail: "Testing, release management and post-launch support.",
  },
];

// Generic workspace scenes with no people (credited in CREDITS.md). They are
// never captioned or described as our office or team.
// TODO(content): replace with real photos of the Karachi / Florida offices.
const WORKSPACE_PHOTOS = [
  PHOTOS.aboutDesk,
  PHOTOS.aboutPlanning,
  PHOTOS.aboutNotebook,
];

export default function About() {
  return (
    <div className="page-hero about-page">
      <PageHeader
        eyebrow="About Opus Geeks"
        title="Designers and engineers who ship together"
        subtitle={`We're a ${TEAM_SIZE_LABEL}-person studio building web platforms, mobile apps and games for startups and growing companies.`}
      />

      <section className="section about-section about-story-section">
        <div className="frame about-story-grid">
          <Reveal as="div" variant="fade">
            <p className="ed-eyebrow">Our story</p>
            <h2 className="section-title">Two offices, one product team</h2>
            <p className="about-copy">
              Opus Geeks started with a simple belief: every client deserves a
              partner that treats their product like its own. Today our
              engineers and designers work from Karachi, Pakistan and our
              headquarters in Pembroke Pines, Florida.
            </p>
            <p className="about-copy">
              Most of our work is in fintech, healthcare, retail and real
              estate, where reliability, compliance and user trust decide
              whether a product succeeds.
            </p>
          </Reveal>

          <Reveal as="div" className="about-stats-grid">
            <StatsRow stats={STATS} compact />
          </Reveal>
        </div>
      </section>

      <section
        className="section-tight about-gallery-section"
        aria-label="Workspace photos"
      >
        <div className="frame photo-gallery about-gallery">
          {WORKSPACE_PHOTOS.map((photo, index) => (
            <Reveal
              as="figure"
              className={`photo-tile ${index === 0 ? "is-wide" : ""}`}
              key={photo.id}
              delay={staggerDelay(index)}
            >
              <Photo
                photo={photo}
                priority={index === 0}
                width={index === 0 ? 760 : 400}
                ratio={index === 0 ? 16 / 10 : 4 / 5}
                sizes={
                  index === 0
                    ? "(max-width: 860px) calc(100vw - 36px), 760px"
                    : SIZES.quarterCard
                }
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section-alt about-section about-values-section">
        <div className="frame">
          <SectionHead
            eyebrow="What we value"
            title="What you can expect from us"
            subtitle="Four commitments we hold ourselves to on every project, large or small."
          />
          <NumberedRows
            ariaLabel="What we value"
            items={VALUES.map((value) => ({
              key: value.title,
              title: value.title,
              description: value.detail,
            }))}
          />
        </div>
      </section>

      <section className="section about-section about-team-section">
        <div className="frame">
          <SectionHead
            eyebrow="Our team"
            title="Six disciplines under one roof"
            subtitle="Each project draws on the skills it needs, without handoffs between agencies."
          />
          <NumberedRows
            ariaLabel="Disciplines"
            items={TEAM.map((member) => ({
              key: member.role,
              title: member.role,
              description: member.detail,
            }))}
          />
        </div>
      </section>

      {/* The closing CTA opens the footer now (data/cta.js). */}
    </div>
  );
}
