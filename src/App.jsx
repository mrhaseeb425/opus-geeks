import {
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import { MotionConfig } from "framer-motion";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import MobileCallBar from "./components/MobileCallBar";
import RouteScroll from "./components/RouteScroll";
import Navbar from "./components/Navbar";
import { footerCta } from "./data/cta";
import { PAGE_META, postMeta, projectMeta, serviceMeta } from "./data/meta";
import { findPost } from "./data/posts";
import { findProject } from "./data/projects";
import { SERVICES } from "./data/site";
import {
  navigate,
  parsePath,
  pathForLabel,
  upgradeLegacyHash,
  useDocumentMeta,
  useLinkInterception,
  useLocation,
} from "./lib/router";
import { lazyPage, preloadWhenIdle } from "./lib/lazyPage";
import { applyTheme, getInitialTheme } from "./lib/theme";
import Home from "./pages/Home";

// Home ships in the main bundle (most visits land there); every other route
// is its own chunk, prefetched when the browser goes idle.
const About = lazyPage(() => import("./pages/About"));
const BlogPost = lazyPage(() => import("./pages/BlogPost"));
const Careers = lazyPage(() => import("./pages/Careers"));
const Blogs = lazyPage(() => import("./pages/Blogs"));
const CaseStudy = lazyPage(() => import("./pages/CaseStudy"));
const ContactUs = lazyPage(() => import("./pages/ContactUs"));
const FAQs = lazyPage(() => import("./pages/FAQs"));
const NotFound = lazyPage(() => import("./pages/NotFound"));
const Portfolio = lazyPage(() => import("./pages/Portfolio"));
const Services = lazyPage(() => import("./pages/Services"));
const LAZY_PAGES = [
  Services,
  Portfolio,
  Blogs,
  About,
  ContactUs,
  FAQs,
  CaseStudy,
  BlogPost,
  Careers,
  NotFound,
];

// Resolves the current URL into what to render. A drawer preview pushes the
// detail URL with `modalOf` in history state, so the list page stays mounted
// underneath while the address bar shows the shareable detail URL.
function resolveRoute(pathname, state) {
  const modalOf = state?.modalOf ?? null;
  const base = parsePath(modalOf ?? pathname);
  const previewSlug = modalOf ? parsePath(pathname).slug : null;

  let detail = null;
  if (!modalOf && base.slug) {
    if (base.page === "Blogs") detail = findPost(base.slug);
    if (base.page === "Portfolio") detail = findProject(base.slug);
  }
  const service =
    base.page === "Services" && base.slug
      ? SERVICES.find((s) => s.slug === base.slug)
      : null;

  let page = base.page;
  if (
    (page === "Blogs" || page === "Portfolio") &&
    base.slug &&
    !modalOf &&
    !detail
  ) {
    page = "NotFound";
  }
  if (page === "Services" && base.slug && !service) page = "NotFound";

  return { page, slug: base.slug, detail, service, previewSlug, modalOf };
}

function metaFor(route, pathname) {
  const preview =
    route.previewSlug &&
    (route.page === "Blogs"
      ? findPost(route.previewSlug)
      : findProject(route.previewSlug));
  const detail = route.detail ?? preview;
  if (detail && route.page === "Blogs") return postMeta(detail);
  if (detail && route.page === "Portfolio") return projectMeta(detail);
  if (route.service) return serviceMeta(route.service);
  return { ...PAGE_META[route.page], path: pathname };
}

export default function App() {
  const { pathname, state } = useLocation();
  const route = resolveRoute(pathname, state);
  const [theme, setTheme] = useState(getInitialTheme);
  const isDarkMode = theme === "dark";

  useLinkInterception();
  useDocumentMeta(metaFor(route, pathname));

  useEffect(() => {
    upgradeLegacyHash();
    return preloadWhenIdle(LAZY_PAGES);
  }, []);

  const toggleTheme = () => {
    const next = isDarkMode ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  // Pages keep calling setActiveNav("Contact Us") etc.; it now maps the
  // label to a real URL.
  const setActiveNav = useCallback(
    (label) => navigate(pathForLabel(label)),
    [],
  );

  // Detail pages are separate screens; the Services page stays mounted while
  // jumping between its sections.
  const pageKey =
    route.detail || route.page === "NotFound"
      ? `${route.page}:${route.slug ?? pathname}`
      : route.page;

  const activeNav = route.service ? route.service.name : route.page;

  const renderPage = () => {
    switch (route.page) {
      case "Home":
        return <Home setActiveNav={setActiveNav} />;
      case "Services":
        return <Services setActiveNav={setActiveNav} />;
      case "Portfolio":
        return route.detail ? (
          <CaseStudy project={route.detail} setActiveNav={setActiveNav} />
        ) : (
          <Portfolio
            previewSlug={route.previewSlug}
            setActiveNav={setActiveNav}
          />
        );
      case "Blogs":
        return route.detail ? (
          <BlogPost post={route.detail} />
        ) : (
          <Blogs previewSlug={route.previewSlug} />
        );
      case "About":
        return <About setActiveNav={setActiveNav} />;
      case "Contact Us":
        return <ContactUs />;
      case "FAQs":
        return <FAQs setActiveNav={setActiveNav} />;
      case "Careers":
        return <Careers />;
      default:
        return <NotFound />;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className={`app-shell ${isDarkMode ? "is-dark" : ""}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleTheme}
        />
        {/* The header never waits. Page and footer resolve together, so a
            first visit to a lazy route never shifts the footer (CLS). */}
        <Suspense fallback={<div className="route-fallback" />}>
          <main className="main-stage" id="main-content" tabIndex={-1}>
            <RouteScroll
              pageKey={pageKey}
              sectionId={route.service?.slug}
              disabled={Boolean(route.modalOf)}
            />
            <div key={pageKey}>{renderPage()}</div>
          </main>
          <Footer
            activeNav={activeNav}
            setActiveNav={setActiveNav}
            cta={footerCta(route.page)}
          />
        </Suspense>
        <BackToTop />
        {route.page !== "Contact Us" && <MobileCallBar />}
      </div>
    </MotionConfig>
  );
}
