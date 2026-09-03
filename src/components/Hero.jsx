import { useRef } from "react";

const Hero = () => {
  const animationFrameRef = useRef(null);

  const smoothScrollTo = (targetId) => {
    const target = document.querySelector(targetId);

    if (!target) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const startPosition = window.scrollY;
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY;

    const distance = targetPosition - startPosition;
    const duration = 1100;
    let startTime = null;

    const easeInOutCubic = (progress) => {
      return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    };

    const animation = (currentTime) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(
        0,
        startPosition + distance * easedProgress
      );

      if (progress < 1) {
        animationFrameRef.current =
          requestAnimationFrame(animation);
      }
    };

    animationFrameRef.current =
      requestAnimationFrame(animation);
  };

  const handleNavigation = (event, sectionId) => {
    event.preventDefault();
    smoothScrollTo(sectionId);
  };

  return (
    <header className="hero">
      <nav className="hero-nav">
        <div className="hero-brand">
          Subroto <span>Saha</span>
        </div>

        <div className="hero-links">
          <a
            href="#work"
            onClick={(event) =>
              handleNavigation(event, "#work")
            }
          >
            Work
          </a>

          <a
            href="#about"
            onClick={(event) =>
              handleNavigation(event, "#about")
            }
          >
            About
          </a>

          <a
            href="#skills"
            onClick={(event) =>
              handleNavigation(event, "#skills")
            }
          >
            Skills
          </a>

          <a
            href="#contact"
            onClick={(event) =>
              handleNavigation(event, "#contact")
            }
          >
            Contact
          </a>
        </div>
      </nav>

      <h1 className="hero-title">
        Building digital products with{" "}
        <span className="accent">
          code, AI &amp; creativity
        </span>
      </h1>

      <button
        type="button"
        className="hero-cta"
        onClick={() => smoothScrollTo("#work")}
      >
        Explore Work
      </button>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="arrow" />
      </div>
    </header>
  );
};

export default Hero;