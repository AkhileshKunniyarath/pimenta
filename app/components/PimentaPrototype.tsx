"use client";

import * as React from "react";
import TopNav from "./nav/TopNav";
import Footer from "./nav/Footer";
import HomePage from "./pages/HomePage";
import StayPage from "./pages/StayPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import FarmPage from "./pages/FarmPage";
import JournalPage from "./pages/JournalPage";
import VolunteerPage from "./pages/VolunteerPage";
import PlanPage from "./pages/PlanPage";
import TermsPage from "./pages/TermsPage";
import BookPage from "./pages/BookPage";
import PackageDetailPage from "./pages/PackageDetailPage";
import { SiteContentProvider, useSiteContent } from "./context/SiteContentContext";

function App() {
  const { currency } = useSiteContent();
  const tweaks = { palette: "cardamom", heroLayout: "editorial", density: "medium" };

  // Initialize page and pkgSlug from URL hash if present
  const [page, setPage] = React.useState<string>(() => {
    if (typeof window === "undefined") return "home";
    const hash = window.location.hash;
    if (!hash || hash === "#" || hash === "#home") return "home";
    const parts = hash.slice(1).split(":");
    const route = parts[0];
    if (route === "package") return "packageDetail";
    return route;
  });

  const [pkgSlug, setPkgSlug] = React.useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const hash = window.location.hash;
    if (!hash) return null;
    const parts = hash.slice(1).split(":");
    const route = parts[0];
    const param = parts[1] || null;
    if (route === "package" || route === "book") return param;
    return null;
  });

  const pageContentRef = React.useRef<HTMLDivElement | null>(null);

  // Apply palette/density to body
  React.useEffect(() => {
    document.body.dataset.palette = tweaks.palette || "clay";
    document.body.dataset.density = tweaks.density || "medium";
  }, []);

  // Sync state to URL hash
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    let hashStr = `#${page}`;
    if (page === "packageDetail" && pkgSlug) {
      hashStr = `#package:${pkgSlug}`;
    } else if (page === "book" && pkgSlug) {
      hashStr = `#book:${pkgSlug}`;
    }
    if (window.location.hash !== hashStr) {
      window.location.hash = hashStr;
    }
  }, [page, pkgSlug]);

  // Handle browser back/forward buttons
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash === "#" || hash === "#home") {
        setPage("home");
        setPkgSlug(null);
        return;
      }
      const parts = hash.slice(1).split(":");
      const route = parts[0];
      const param = parts[1] || null;

      if (route === "package") {
        setPage("packageDetail");
        setPkgSlug(param);
      } else if (route === "book") {
        setPage("book");
        setPkgSlug(param);
      } else {
        setPage(route);
        setPkgSlug(null);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Scroll to top on page change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, pkgSlug]);

  // Scroll progress bar
  React.useEffect(() => {
    let bar = document.getElementById("scroll-progress");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "scroll-progress";
      document.body.appendChild(bar);
    }
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) {
        bar.style.width = total > 0 ? ((scrolled / total) * 100).toFixed(2) + "%" : "0%";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (bar && bar.parentNode) bar.parentNode.removeChild(bar);
    };
  }, []);

  // IntersectionObserver for sa-* animations
  React.useEffect(() => {
    let observer: IntersectionObserver;
    const SA_SELECTOR = ".scroll-animate, .sa-up, .sa-left, .sa-right, .sa-scale, .sa-clip";

    const initObserver = () => {
      if (observer) observer.disconnect();

      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            observer.unobserve(entry.target); // fire once
          }
        });
      }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });

      document.querySelectorAll(SA_SELECTOR).forEach(el => {
        if (!el.classList.contains("animated")) observer.observe(el);
      });
    };

    const timeout = setTimeout(initObserver, 120);
    const interval = setInterval(initObserver, 1100);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
      if (observer) observer.disconnect();
    };
  }, [page, pkgSlug]);

  const triggerTransition = () => {
    // Page transition sweep bar
    let bar = document.querySelector(".page-transition-bar") as HTMLDivElement | null;
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "page-transition-bar";
      document.body.appendChild(bar);
    }
    bar.classList.remove("pbar-active");
    void bar.offsetWidth; // reflow
    bar.classList.add("pbar-active");
    setTimeout(() => {
      if (bar) bar.classList.remove("pbar-active");
    }, 600);
  };

  const onBook = () => {
    triggerTransition();
    setPkgSlug(null);
    setPage("book");
  };

  const openPackage = (slug: string) => {
    triggerTransition();
    setPkgSlug(slug);
    setPage("packageDetail");
  };

  const navigateTo = (p: string) => {
    if (p === page && !pkgSlug) return;
    triggerTransition();
    // Fade out current page content
    if (pageContentRef.current) {
      pageContentRef.current.classList.add("page-fade-out");
    }
    setTimeout(() => {
      setPkgSlug(null);
      setPage(p);
      // Fade in new page
      requestAnimationFrame(() => {
        if (pageContentRef.current) {
          pageContentRef.current.classList.remove("page-fade-out");
          pageContentRef.current.classList.add("page-fade-in");
          setTimeout(() => {
            if (pageContentRef.current) {
              pageContentRef.current.classList.remove("page-fade-in");
            }
          }, 400);
        }
      });
    }, 210);
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage setPage={navigateTo} onBook={onBook} heroLayout={tweaks.heroLayout} openPackage={openPackage} />;
      case "stay":
        return <StayPage setPage={navigateTo} onBook={onBook} />;
      case "experiences":
        return <ExperiencesPage onBook={onBook} openPackage={openPackage} />;
      case "farm":
        return <FarmPage onBook={onBook} />;
      case "journal":
        return <JournalPage setPage={navigateTo} />;
      case "volunteer":
        return <VolunteerPage onBook={onBook} />;
      case "plan":
        return <PlanPage onBook={onBook} />;
      case "terms":
        return <TermsPage setPage={navigateTo} onBook={onBook} />;
      case "book":
        return <BookPage setPage={navigateTo} initialPkg={pkgSlug} />;
      case "packageDetail":
        return <PackageDetailPage slug={pkgSlug || ""} onBook={onBook} setPage={navigateTo} openPackage={openPackage} />;
      default:
        return <HomePage setPage={navigateTo} onBook={onBook} heroLayout={tweaks.heroLayout} openPackage={openPackage} />;
    }
  };

  return (
    <div className="app" data-screen-label={`page:${page}${pkgSlug ? ":" + pkgSlug : ""}`}>
      <TopNav page={page === "packageDetail" ? "experiences" : page} setPage={navigateTo} onBook={onBook} />
      <div ref={pageContentRef}>
        {renderPage()}
      </div>
      <Footer setPage={navigateTo} onBook={onBook} />
    </div>
  );
}

export default function PimentaPrototype({ initialContent }: { initialContent: any }) {
  return (
    <SiteContentProvider initialContent={initialContent}>
      <App />
    </SiteContentProvider>
  );
}
