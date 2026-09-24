import { useEffect, useState } from "react";
import { CONTACT } from "../data/site";
import Icon from "./Icon";

// Sticky "Book a call" bar, shown on phones only (CSS hides it above 720px).
// It slides in once the visitor has scrolled past the first screen, so it
// never doubles up with the page's own hero CTA. Links straight to the
// booking page when one is set, otherwise to /contact (booking card on top).
export default function MobileCallBar() {
  const [visible, setVisible] = useState(false);
  const external = Boolean(CONTACT.calendlyUrl);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 0.75);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`mobile-call-bar ${visible ? "is-visible" : ""}`}
      aria-hidden={!visible}
    >
      <a
        className="btn-gradient mobile-call-button"
        href={CONTACT.calendlyUrl ?? "/contact"}
        tabIndex={visible ? 0 : -1}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        <Icon name="phone" className="icon-sm" />
        Book a free 30-min call
      </a>
    </div>
  );
}
