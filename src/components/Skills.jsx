import { useEffect, useRef, useState } from "react";
import {
  SiReact,
  SiJavascript,
  SiCplusplus,
  SiThreedotjs,
} from "react-icons/si";
import { FaBrain, FaDatabase } from "react-icons/fa";

const skills = [
  {
    name: "React",
    pct: 95,
    icon: SiReact,
  },
  {
    name: "JavaScript",
    pct: 90,
    icon: SiJavascript,
  },
  {
    name: "C++",
    pct: 95,
    icon: SiCplusplus,
  },
  {
    name: "SQL",
    pct: 68,
    icon: FaDatabase,
  },
  {
    name: "AI Systems",
    pct: 88,
    icon: FaBrain,
  },
  {
    name: "Three.js",
    pct: 80,
    icon: SiThreedotjs,
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const [mobileActive, setMobileActive] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 820px)");

    const handleViewportEntry = () => {
      if (!mediaQuery.matches || !sectionRef.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setMobileActive(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.25,
        }
      );

      observer.observe(sectionRef.current);

      return observer;
    };

    let observer = handleViewportEntry();

    const handleResize = () => {
      if (observer) {
        observer.disconnect();
      }

      if (!mediaQuery.matches) {
        setMobileActive(false);
      } else {
        observer = handleViewportEntry();
      }
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      if (observer) {
        observer.disconnect();
      }

      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section skills-section ${
        mobileActive ? "skills-mobile-active" : ""
      }`}
      id="skills"
    >
      <div className="section-eyebrow">My Toolkit</div>

      <h2 className="section-title">
        Skills &amp; Capabilities
      </h2>

      <div className="skills-grid">
        {skills.map((skill) => {
          const Icon = skill.icon;

          return (
            <div
              className="skill-row"
              key={skill.name}
              tabIndex="0"
              style={{ "--skill-progress": `${skill.pct}%` }}
            >
              <div className="skill-head">
                <div className="skill-name">
                  <div className="skill-icon">
                    <Icon />
                  </div>

                  <span>{skill.name}</span>
                </div>

                <span className="pct">
                  {skill.pct}%
                </span>
              </div>

              <div className="skill-bar">
                <div className="skill-fill" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;