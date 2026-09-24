import Icon from "./Icon";
import HeroScene from "./HeroScene";
import { TEAM_SIZE_LABEL } from "../data/stats";

// The hero: a dark, rounded stage with the headline on the left and a WebGL
// product visual on the right. The copy is real DOM text and paints
// immediately; the 3D scene loads afterwards and never blocks it.
export default function Hero({ onNavigate }) {
  const goTo = (label) => (event) => {
    event.preventDefault();
    onNavigate?.(label);
  };

  return (
    <div className="hero-frame">
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="frame home-hero-inner">
          <div className="home-hero-copy">
            <p className="home-hero-eyebrow">
              Software development company &middot; Karachi &amp; Florida
            </p>
            <h1 id="home-hero-title" className="home-hero-title">
              We build the software your business{" "}
              <span className="hero-highlight">runs on</span>.
            </h1>
            <p className="home-hero-lede">
              Opus Geeks is a {TEAM_SIZE_LABEL}-person team designing and
              engineering mobile apps, web platforms and games, from first idea
              to launch and long after.
            </p>
            <div className="home-hero-actions">
              <a
                className="btn-gradient"
                href="/contact"
                onClick={goTo("Contact Us")}
              >
                Book a free 30-min call
                <Icon name="arrowRight" className="icon-sm" />
              </a>
              <a
                className="btn-secondary btn-secondary-on-dark"
                href="/portfolio"
                onClick={goTo("Portfolio")}
              >
                See our work
              </a>
            </div>
            <p className="home-hero-trust">
              Trusted by teams in fintech, healthcare, retail and real estate
            </p>
          </div>

          <div className="home-hero-visual">
            <HeroScene />
          </div>
        </div>
      </section>
    </div>
  );
}
