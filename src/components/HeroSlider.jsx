import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const slides = [
  {
    id: 1,
    eyebrow: "Full-Cycle Product Studio",
    titlePrefix: "We turn your idea into a product people ",
    titleHighlight: "actually love",
    titleSuffix: ".",
    description:
      "From first sketch to launch day, our team designs and builds the app, website, or platform your business needs to grow.",
    bgImage:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1600&q=80",
    action: "Explore our work",
  },
  {
    id: 2,
    eyebrow: "App & Web Development",
    titlePrefix: "Fast, reliable software built by people who ",
    titleHighlight: "sweat the details",
    titleSuffix: ".",
    description:
      "We ship production-ready apps and websites for fintech, healthcare, retail, and real estate teams who can't afford downtime.",
    bgImage:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=80",
    action: "See our services",
  },
  {
    id: 3,
    eyebrow: "Brand & UX/UI Design",
    titlePrefix: "Design that makes people ",
    titleHighlight: "trust you",
    titleSuffix: " at first glance.",
    description:
      "We craft interfaces and identities your customers remember — and your team is proud to ship.",
    bgImage:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80",
    action: "Start a conversation",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const goToSlide = useCallback((index) => {
    setCurrent((index + slides.length) % slides.length);
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
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      className="hero-slider-section"
      aria-label="Featured services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.changedTouches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(distance) > 50) {
          distance > 0 ? goToPrevious() : goToNext();
        }
        touchStartX.current = null;
      }}
    >
      <div className="hero-slider-track">
        {slides.map((slide, index) => (
          <article
            className={`hero-slide ${index === current ? "is-active" : ""}`}
            key={slide.id}
            aria-hidden={index !== current}
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            <div className="hero-slide-shade" />
            <div className="hero-slide-content">
              <p className="hero-slide-eyebrow">{slide.eyebrow}</p>
              <h1>
                {slide.titlePrefix}
                <span className="hero-highlight">{slide.titleHighlight}</span>
                {slide.titleSuffix}
              </h1>
              <p className="hero-slide-description">{slide.description}</p>
              <a
                className="hero-slide-action"
                href="#contact"
                tabIndex={index === current ? 0 : -1}
              >
                {slide.action}
                <Icon name="arrowRight" className="icon-sm" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="hero-slider-controls">
        <button
          className="hero-slider-arrow"
          type="button"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <Icon name="arrowLeft" className="icon-sm" />
        </button>

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

        <button
          className="hero-slider-arrow"
          type="button"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <Icon name="arrowRight" className="icon-sm" />
        </button>
      </div>
    </section>
  );
}
