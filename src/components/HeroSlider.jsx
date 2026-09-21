import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Icon from "./Icon";
import Magnetic from "./Magnetic";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const lineVariants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const slides = [
  {
    id: 1,
    eyebrow: "App & Web Development",
    titlePrefix: "Fast, reliable software built by people who ",
    titleHighlight: "sweat the details",
    titleSuffix: ".",
    description:
      "We design and develop production-ready websites, web applications, and software products that help ambitious teams move faster.",
    action: "See our services",
    visual: "web",
  },
  {
    id: 2,
    eyebrow: "Mobile App Development",
    titlePrefix: "Beautiful mobile apps built for a ",
    titleHighlight: "better tomorrow",
    titleSuffix: ".",
    description:
      "From first sketch to launch, we create high-performance mobile applications that feel effortless, useful, and unmistakably yours.",
    action: "View our work",
    visual: "mobile",
  },
  {
    id: 3,
    eyebrow: "Cloud & Backend Solutions",
    titlePrefix: "Powerful backend systems built for ",
    titleHighlight: "scalable growth",
    titleSuffix: ".",
    description:
      "We engineer secure, scalable, high-performance backend systems that keep your product dependable as demand grows.",
    action: "Our services",
    visual: "cloud",
  },
];

function WebVisual() {
  return (
    <>
      <div className="dashboard-window">
        <div className="dashboard-topbar">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="dashboard-url">opusgeeks / workspace</span>
          <span className="dashboard-status">Live</span>
        </div>
        <div className="dashboard-body">
          <div className="dashboard-sidebar">
            <span className="sidebar-logo">O</span>
            <span className="sidebar-line is-selected" />
            <span className="sidebar-line" />
            <span className="sidebar-line" />
            <span className="sidebar-line" />
            <span className="sidebar-line sidebar-line-short" />
          </div>
          <div className="dashboard-content">
            <div className="dashboard-heading">
              <div>
                <span className="micro-label">PRODUCT OVERVIEW</span>
                <strong>Good morning, team</strong>
              </div>
              <span className="avatar-stack">
                <i />
                <i />
                <i />
              </span>
            </div>
            <div className="metric-row">
              <div className="metric-card">
                <span>Active users</span>
                <strong>24,892</strong>
                <small>+18.4%</small>
              </div>
              <div className="metric-card">
                <span>Conversion</span>
                <strong>8.64%</strong>
                <small>+4.2%</small>
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-card-heading">
                <span>Weekly activity</span>
                <small>Last 7 days</small>
              </div>
              <div className="chart-area">
                <span className="chart-line" />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tech-phone">
        <PhoneScreen />
      </div>
      <div className="floating-tech-card api-card">
        <span className="tech-card-icon">&lt;/&gt;</span>
        <span>
          <b>React</b>
          <small>Component ready</small>
        </span>
        <em />
      </div>
      <div className="floating-tech-card cloud-card">
        <span className="tech-card-icon">⌁</span>
        <span>
          <b>Cloud</b>
          <small>99.98% uptime</small>
        </span>
      </div>
      <div className="floating-tech-card analytics-card">
        <span className="tech-card-icon">◈</span>
        <span>
          <b>MongoDB</b>
          <small>Data connected</small>
        </span>
      </div>
      <div className="code-orbit">
        <span>const</span> launch = <b>fast</b>
        <i>;</i>
      </div>
    </>
  );
}

function PhoneScreen() {
  return (
    <>
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="phone-header">
          <span>9:41</span>
          <span>•••</span>
        </div>
        <span className="micro-label">YOUR BALANCE</span>
        <strong className="phone-balance">$12,480.60</strong>
        <div className="phone-mini-chart">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="phone-list">
          <i />
          <i />
          <i />
        </div>
      </div>
    </>
  );
}

function MobileVisual() {
  return (
    <>
      <div className="mobile-hero-phone tech-phone">
        <PhoneScreen />
        <div className="phone-home-indicator" />
      </div>
      <div className="mobile-orbit orbit-ring" />
      <div className="mobile-orbit orbit-ring orbit-ring-small" />
      <div className="floating-tech-card mobile-react-card">
        <span className="tech-card-icon">⚛</span>
        <span>
          <b>React Native</b>
          <small>One codebase</small>
        </span>
      </div>
      <div className="floating-tech-card mobile-ios-card">
        <span className="tech-card-icon"></span>
        <span>
          <b>iOS</b>
          <small>Native experience</small>
        </span>
      </div>
      <div className="floating-tech-card mobile-android-card">
        <span className="tech-card-icon">◉</span>
        <span>
          <b>Android</b>
          <small>Built to perform</small>
        </span>
      </div>
      <div className="mobile-code-orbit">
        <span>build</span>(<b>tomorrow</b>)
      </div>
    </>
  );
}

function CloudVisual() {
  return (
    <>
      <div className="cloud-glow">
        <span className="cloud-puff puff-one" />
        <span className="cloud-puff puff-two" />
        <span className="cloud-puff puff-three" />
        <b>99.98%</b>
        <small>UPTIME</small>
      </div>
      <div className="server-rack">
        <div className="server-unit">
          <span>API</span>
          <i />
          <i />
          <i />
        </div>
        <div className="server-unit">
          <span>CORE</span>
          <i />
          <i />
          <i />
        </div>
        <div className="server-unit">
          <span>DATA</span>
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="server-base" />
      <div className="floating-tech-card backend-api-card">
        <span className="tech-card-icon">&lt;/&gt;</span>
        <span>
          <b>API</b>
          <small>Secure gateway</small>
        </span>
      </div>
      <div className="floating-tech-card backend-db-card">
        <span className="tech-card-icon">◈</span>
        <span>
          <b>Database</b>
          <small>Encrypted storage</small>
        </span>
      </div>
      <div className="floating-tech-card backend-node-card">
        <span className="tech-card-icon">JS</span>
        <span>
          <b>Node.js</b>
          <small>High throughput</small>
        </span>
      </div>
      <div className="floating-tech-card backend-python-card">
        <span className="tech-card-icon">Py</span>
        <span>
          <b>Python</b>
          <small>Smart services</small>
        </span>
      </div>
      <div className="floating-tech-card backend-docker-card">
        <span className="tech-card-icon">◇</span>
        <span>
          <b>Docker</b>
          <small>Ready to scale</small>
        </span>
      </div>
      <div className="backend-code-orbit">
        <span>deploy</span> --zero-downtime
      </div>
    </>
  );
}

function TechnologyVisual({ type }) {
  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--visual-rotate-y", `${x * 4}deg`);
    event.currentTarget.style.setProperty("--visual-rotate-x", `${y * -3}deg`);
    event.currentTarget.style.setProperty("--visual-shift-x", `${x * 8}px`);
    event.currentTarget.style.setProperty("--visual-shift-y", `${y * 6}px`);
  };

  const resetPointer = (event) => {
    event.currentTarget.style.setProperty("--visual-rotate-y", "0deg");
    event.currentTarget.style.setProperty("--visual-rotate-x", "0deg");
    event.currentTarget.style.setProperty("--visual-shift-x", "0px");
    event.currentTarget.style.setProperty("--visual-shift-y", "0px");
  };

  return (
    <div
      className="hero-tech-visual"
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="tech-visual-halo" />
      <div className="tech-visual-grid" />

      <div className={`hero-visual-scene scene-${type}`}>
        {type === "web" && <WebVisual />}
        {type === "mobile" && <MobileVisual />}
        {type === "cloud" && <CloudVisual />}
      </div>
    </div>
  );
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [autoPlayReset, setAutoPlayReset] = useState(0);
  const touchStartX = useRef(null);

  const goToSlide = useCallback((index) => {
    setCurrent((index + slides.length) % slides.length);
    setAutoPlayReset((previous) => previous + 1);
  }, []);

  const goToNext = useCallback(() => {
    goToSlide(current + 1);
  }, [current, goToSlide]);

  const goToPrevious = useCallback(() => {
    goToSlide(current - 1);
  }, [current, goToSlide]);

  useEffect(() => {
    if (
      isPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlayReset, isPaused]);

  return (
    <section
      className="hero-slider-section"
      aria-label="Featured services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(event) => {
        setIsPaused(true);
        touchStartX.current = event.changedTouches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) {
          setIsPaused(false);
          return;
        }
        const distance = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(distance) > 50) {
          distance > 0 ? goToPrevious() : goToNext();
        }
        touchStartX.current = null;
        setIsPaused(false);
      }}
      onTouchCancel={() => {
        touchStartX.current = null;
        setIsPaused(false);
      }}
    >
      <div className="hero-slider-track">
        {slides.map((slide, index) => (
          <article
            className={`hero-slide ${index === current ? "is-active" : ""}`}
            key={slide.id}
            aria-hidden={index !== current}
          >
            <div className="hero-slide-shade" />
            <TechnologyVisual type={slide.visual} />
            <motion.div
              className="hero-slide-content"
              variants={contentVariants}
              initial="hidden"
              animate={index === current ? "visible" : "hidden"}
            >
              <div className="reveal-mask">
                <motion.p className="hero-slide-eyebrow" variants={lineVariants}>
                  {slide.eyebrow}
                </motion.p>
              </div>
              <div className="reveal-mask">
                <motion.h1 variants={lineVariants}>
                  {slide.titlePrefix}
                  <span className="hero-highlight">{slide.titleHighlight}</span>
                  {slide.titleSuffix}
                </motion.h1>
              </div>
              <div className="reveal-mask">
                <motion.p
                  className="hero-slide-description"
                  variants={lineVariants}
                >
                  {slide.description}
                </motion.p>
              </div>
              <motion.div variants={lineVariants}>
                <Magnetic strength={0.3}>
                  <a
                    className="hero-slide-action"
                    href="#contact"
                    tabIndex={index === current ? 0 : -1}
                  >
                    {slide.action}
                    <Icon name="arrowRight" className="icon-sm" />
                  </a>
                </Magnetic>
              </motion.div>
            </motion.div>
          </article>
        ))}
      </div>

      <div className="hero-slider-controls">
        <Magnetic strength={0.4}>
          <button
            className="hero-slider-arrow"
            type="button"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            <Icon name="arrowLeft" className="icon-sm" />
          </button>
        </Magnetic>

        <div
          className="hero-slider-dots"
          role="tablist"
          aria-label="Choose a featured service"
        >
          {slides.map((slide, index) => (
            <button
              className={`hero-slider-dot ${index === current ? "is-active" : ""}`}
              key={slide.id}
              type="button"
              role="tab"
              aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`}
              aria-selected={index === current}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <Magnetic strength={0.4}>
          <button
            className="hero-slider-arrow"
            type="button"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <Icon name="arrowRight" className="icon-sm" />
          </button>
        </Magnetic>
      </div>
    </section>
  );
}
