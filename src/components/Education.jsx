import EducationAvatar from "./EducationAvatar";


function Education() {
  return (
    <section
      className="section education-section"
      id="education"
    >
      <div className="education-layout">

        {/* Left side — interactive 3D graduation avatar */}
        <div className="education-visual">
          <div className="education-canvas">

            <div className="education-canvas-glow" />

            <div className="education-canvas-inner">
              <EducationAvatar />
            </div>

          </div>
        </div>


        {/* Right side — education content */}
        <div className="education-content">

          <div className="section-eyebrow">
            My Education
          </div>

          <h2 className="section-title education-title">
            Education &amp; Learning
          </h2>

          <p className="education-subtitle">
            Computer Science Foundation
          </p>


          <div className="education-card">

            <h3>
              Bachelor of Technology (B.Tech)
              <br />

              <span>
                Specialization in Artificial Intelligence
              </span>
            </h3>


            <p className="education-coursework">
              Relevant Coursework: Data Structures,
              Algorithms, Software Engineering,
              Web Development, Machine Learning,
              Database Systems
            </p>


            <p className="education-description">
              Graduated with a focus on practical
              software engineering and AI
              experimentation.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}


export default Education;