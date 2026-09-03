import AboutFace from "./AboutFace";

const About = () => (
  <section
    className="section about"
    id="about"
  >
    <div className="about-content">
      <div className="section-eyebrow about-eyebrow">
        About Me
      </div>

      <p className="about-statement">
        I build digital products combining{" "}
        <span className="hl">
          software
        </span>
        ,{" "}
        <span className="hl">
          AI
        </span>
        {" "}and{" "}
        <span className="hl">
          creativity
        </span>
        .
      </p>

      <p className="about-description">
        I enjoy turning ideas into thoughtful digital experiences —
        from interfaces and interactive products to intelligent
        systems that solve real problems.
      </p>

      <p className="about-description">
        I focus on building things that are useful, visually refined
        and designed to feel simple, even when the technology behind
        them is complex.
      </p>
    </div>

    <div className="about-visual">
      <AboutFace />
    </div>
  </section>
);

export default About;