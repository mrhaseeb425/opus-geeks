import { useEffect, useState } from "react";
import { INDUSTRIES } from "../data/site";
import { TEAM_SIZE_LABEL } from "../data/stats";
import { PRELOADER_DONE_EVENT, isPreloaderDone } from "../lib/preloader";
import Icon from "./Icon";

// The entrance animation plays once per visit, not every time Home remounts.
let hasPlayedIntro = false;

const industryList = (() => {
  const names = INDUSTRIES.map((industry) => industry.name.toLowerCase());
  return `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
})();

const CHART_LINE =
  "M0 96 C28 90 44 70 72 74 S118 96 146 80 S196 44 226 50 S270 30 300 20";

// Laptop + overlapping phone, built in HTML/SVG (no image requests) so it
// follows the theme tokens and never shifts layout. Every label is >= 12px;
// on narrow widths the screens show less content (container queries in
// hero.css) instead of shrinking text.
function DeviceMockup() {
  return (
    <div
      className="hero-devices"
      role="img"
      aria-label="Illustration of a web dashboard on a laptop and a companion mobile app on a phone"
    >
      <div className="hero-laptop" aria-hidden="true">
        <div className="hero-laptop-lid">
          <div className="hero-laptop-screen">
            <aside className="dash-sidebar">
              <span className="dash-brand">O</span>
              <span className="dash-nav is-active">
                <i />
                <b>Overview</b>
              </span>
              <span className="dash-nav">
                <i />
                <b>Projects</b>
              </span>
              <span className="dash-nav">
                <i />
                <b>Releases</b>
              </span>
              <span className="dash-nav">
                <i />
                <b>Team</b>
              </span>
            </aside>
            <div className="dash-main">
              <div className="dash-header">
                <strong>Overview</strong>
                <span className="dash-pill">Last 30 days</span>
              </div>
              <div className="dash-kpis">
                <div className="dash-kpi">
                  <span>Active users</span>
                  <strong>24.9k</strong>
                  <em>+18%</em>
                </div>
                <div className="dash-kpi">
                  <span>Uptime</span>
                  <strong>99.98%</strong>
                  <em>30 days</em>
                </div>
                <div className="dash-kpi dash-kpi-extra">
                  <span>Releases</span>
                  <strong>42</strong>
                  <em>+6 this week</em>
                </div>
              </div>
              <div className="dash-chart">
                <span>Weekly active users</span>
                <svg
                  viewBox="0 0 300 110"
                  width="300"
                  height="110"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="hero-dash-fill"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop offset="0%" className="dash-stop-top" />
                      <stop offset="100%" className="dash-stop-bottom" />
                    </linearGradient>
                  </defs>
                  <path
                    className="dash-area"
                    d={`${CHART_LINE} L300 110 L0 110 Z`}
                    fill="url(#hero-dash-fill)"
                  />
                  <path
                    d={CHART_LINE}
                    className="dash-line"
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-laptop-base" />
      </div>

      <div className="hero-phone" aria-hidden="true">
        <div className="hero-phone-screen">
          <div className="app-status">
            <span>9:41</span>
            <i />
          </div>
          <div className="app-balance">
            <span className="app-label-long">Total balance</span>
            <span className="app-label-short">Balance</span>
            <strong>$12,480</strong>
          </div>
          <div className="app-actions">
            <span>Send</span>
            <span>Top up</span>
          </div>
          <div className="app-list">
            <div className="app-row">
              <i className="is-in" />
              <span>Payroll</span>
              <b>+$2.4k</b>
            </div>
            <div className="app-row">
              <i />
              <span>Hosting</span>
              <b>−$84</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ onNavigate }) {
  // "idle" = no animation (reduced motion or already played this visit),
  // "waiting" = hidden until the preloader lifts, "playing" = animating in.
  const [intro, setIntro] = useState(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return hasPlayedIntro || reduce ? "idle" : "waiting";
  });

  useEffect(() => {
    if (intro !== "waiting") return undefined;
    hasPlayedIntro = true;
    const play = () => setIntro("playing");
    if (isPreloaderDone()) {
      const frame = requestAnimationFrame(play);
      return () => cancelAnimationFrame(frame);
    }
    window.addEventListener(PRELOADER_DONE_EVENT, play, { once: true });
    return () => window.removeEventListener(PRELOADER_DONE_EVENT, play);
  }, [intro]);

  const goTo = (label) => (event) => {
    event.preventDefault();
    onNavigate?.(label);
  };

  return (
    // The hero sits inside a rounded frame with a small margin from the
    // screen edges, so it reads as a framed card rather than a full-bleed band.
    <div className="hero-frame">
    <section
      className={`home-hero is-intro-${intro}`}
      aria-labelledby="home-hero-title"
    >
      <div className="frame home-hero-inner">
        <div className="home-hero-copy">
          <p className="home-hero-eyebrow hero-rise">
            Web, mobile &amp; product design
          </p>
          <h1 id="home-hero-title" className="home-hero-title hero-rise">
            Web and mobile apps, built by{" "}
            <span className="hero-highlight">one team</span>.
          </h1>
          <p className="home-hero-lede hero-rise">
            {TEAM_SIZE_LABEL} designers and engineers take your product from
            scope to launch, then keep it fast and stable.
          </p>
          <div className="home-hero-actions hero-rise">
            <a
              className="btn-gradient"
              href="/contact"
              onClick={goTo("Contact Us")}
            >
              Book a free 30-min call{" "}
              <Icon name="arrowRight" className="icon-sm" />
            </a>
            <a
              className="btn-secondary btn-secondary-on-dark"
              href="/portfolio"
              onClick={goTo("Portfolio")}
            >
              See case studies
            </a>
          </div>
          <p className="home-hero-trust hero-rise">
            <Icon name="shield" className="icon-sm" />
            Building for {industryList}
          </p>
        </div>
        <div className="home-hero-visual hero-rise">
          <DeviceMockup />
        </div>
      </div>
    </section>
    </div>
  );
}
