import { useState } from "react";
import { FiMail, FiPhone, FiX } from "react-icons/fi";

const Contact = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState("");
  const [budget, setBudget] = useState(50000);

 const handleFormSubmit = async (event) => {
  event.preventDefault();

  const form = event.currentTarget;

  setNotice("");

  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company"),
    projectType: formData.get("projectType"),
    budget: formData.get("budget"),
    timeline: formData.get("timeline"),
    message: formData.get("message"),
  };

  try {
    setNotice("Sending your inquiry...");

    const response = await fetch(
      "http://localhost:5000/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Unable to send your inquiry."
      );
    }

    setNotice("✓ Your inquiry has been sent successfully.");

    form.reset();

    setBudget(50000);
  } catch (error) {
    console.error("Inquiry submission error:", error);

    setNotice(
      error.message ||
      "Something went wrong. Please try again."
    );
  }
};

  return (
    <section className="section contact" id="contact">
      <div className="section-eyebrow">Get In Touch</div>

      <h2>
        Let&apos;s build
        <br />
        something <span className="accent">interesting.</span>
      </h2>

      <div className="contact-action-wrap">
        <button
          type="button"
          className="contact-cta"
          onClick={() => {
            setShowOptions((current) => !current);
            setShowForm(false);
          }}
        >
          Get In Touch
        </button>

        {showOptions && (
          <div className="contact-options">
            <a
              className="contact-option"
              href="tel:+917838852620"
            >
              <span className="contact-option-icon">
                <FiPhone />
              </span>

              <span>
                <strong>Call Me</strong>
                <small>Let&apos;s discuss your project directly</small>
              </span>
            </a>

            <button
              type="button"
              className="contact-option"
              onClick={() => {
                setShowOptions(false);
                setShowForm(true);
                setNotice("");
              }}
            >
              <span className="contact-option-icon">
                <FiMail />
              </span>

              <span>
                <strong>Send Inquiry</strong>
                <small>Tell me about your project</small>
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="contact-meta">
        <a href="mailto:subroto.saha2002@gmail.com">
          subroto.saha2002@gmail.com
        </a>

        <span>—</span>

        Available for select projects
      </div>

      {showForm && (
        <div
          className="contact-modal-backdrop"
          onClick={() => setShowForm(false)}
        >
          <div
            className="contact-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="contact-modal-close"
              onClick={() => setShowForm(false)}
              aria-label="Close inquiry form"
            >
              <FiX />
            </button>

            <div className="section-eyebrow">
              Project Inquiry
            </div>

            <h3>Tell me about your project.</h3>

            <p className="contact-modal-description">
              Share a few details about what you&apos;re building and
              I&apos;ll get back to you as soon as possible.
            </p>

            <form
              className="project-inquiry-form"
              onSubmit={handleFormSubmit}
            >
              <div className="form-grid">

                {/* Full Name */}
                <label>
                  <span>Full Name *</span>

                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </label>

                {/* Email */}
                <label>
                  <span>Email Address *</span>

                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>

                {/* Phone */}
                <label>
                  <span>Phone Number</span>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </label>

                {/* Company */}
                <label>
                  <span>Company / Brand</span>

                  <input
                    type="text"
                    name="company"
                    placeholder="Optional"
                  />
                </label>

                {/* Project Type */}
                <label>
                  <span>Project Type *</span>

                  <select
                    name="projectType"
                    required
                  >
                    <option value="">
                      Select project type
                    </option>

                    <option value="2D Website">
                      2D Website
                    </option>

                    <option value="Website with 3D Interactive Interface">
                      Website with 3D Interactive Interface
                    </option>

                    <option value="Android / iOS Application">
                      Android / iOS Application
                    </option>
                  </select>
                </label>

                {/* Budget */}
                <label className="budget-field">
                  <span>Estimated Budget</span>

                  <div className="budget-slider-wrapper">

                    <div className="budget-value">
                      ₹{budget.toLocaleString("en-IN")}
                    </div>

                    <input
                      type="range"
                      name="budget"
                      min="20000"
                      max="200000"
                      step="5000"
                      value={budget}
                      onChange={(event) =>
                        setBudget(Number(event.target.value))
                      }
                      className="budget-slider"
                    />

                    <div className="budget-range-labels">
                      <span>₹20K</span>
                      <span>₹2L</span>
                    </div>

                  </div>
                </label>

                {/* Timeline */}
                <label className="form-full">
                  <span>Expected Timeline</span>

                  <input
                    type="text"
                    name="timeline"
                    placeholder="For example: 4–6 weeks"
                  />
                </label>

                {/* Project Description */}
                <label className="form-full">
                  <span>Tell me about your project *</span>

                  <textarea
                    name="message"
                    rows="6"
                    placeholder="Describe your idea, requirements, goals and anything important about the project..."
                    required
                  />
                </label>

              </div>

              <button
                type="submit"
                className="project-submit"
              >
                Send Project Inquiry
              </button>

              {notice && (
                <p className="form-notice">
                  {notice}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;