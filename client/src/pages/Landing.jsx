import { useNavigate } from "react-router-dom";

import "../styles/landing.css";

export default function Landing() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div
          className="landing-logo"
          onClick={() =>
            navigate("/")
          }
          style={{
            cursor: "pointer",
          }}
        >
          <span className="landing-logo-mark">
            &#9670;
          </span>

          NxtBuild
        </div>

        <div className="landing-nav-right">
          <button
            className="landing-nav-login"
            onClick={goToLogin}
          >
            Sign in
          </button>

          <button
            className="landing-nav-cta"
            onClick={goToLogin}
          >
            Get Started
          </button>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-content">
          <div className="landing-badge">
            ✦ AI-Powered Builder
          </div>

          <h1 className="landing-hero-title">
            Build Web Apps with{" "}
            <span className="landing-hero-accent">
              AI
            </span>
          </h1>

          <p className="landing-hero-subtitle">
            Describe your idea and
            watch NxtBuild generate
            a fully working web
            app in seconds.
            Powered by Google
            Gemini.
          </p>

          <div className="landing-prompt-box">
            <div className="landing-prompt-input">
              Build me a todo app
              with dark mode...
            </div>

            <button
              className="landing-prompt-btn"
              onClick={
                goToLogin
              }
            >
              Start Building →
            </button>
          </div>

          <div className="landing-stats">
            <div className="landing-stat">
              <span className="landing-stat-number">
                10x
              </span>

              <span className="landing-stat-label">
                Faster
              </span>
            </div>

            <div className="landing-stat-divider" />

            <div className="landing-stat">
              <span className="landing-stat-number">
                AI
              </span>

              <span className="landing-stat-label">
                Powered
              </span>
            </div>

            <div className="landing-stat-divider" />

            <div className="landing-stat">
              <span className="landing-stat-number">
                Free
              </span>

              <span className="landing-stat-label">
                To Start
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <h2 className="landing-section-title">
          How it works
        </h2>

        <p className="landing-section-subtitle">
          Three simple steps to
          your next web app
        </p>

        <div className="landing-features-grid">
          <div className="feature-card">
            <div className="feature-card-step">
              1
            </div>

            <div className="feature-card-title">
              Describe your idea
            </div>

            <p className="feature-card-desc">
              Type what you want
              to build in plain
              English. No
              technical
              knowledge required.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card-step">
              2
            </div>

            <div className="feature-card-title">
              AI generates code
            </div>

            <p className="feature-card-desc">
              Google Gemini
              instantly generates
              clean HTML, CSS,
              and JavaScript for
              your app.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card-step">
              3
            </div>

            <div className="feature-card-title">
              Preview and refine
            </div>

            <p className="feature-card-desc">
              See your app live
              instantly. Chat to
              make changes until
              it's exactly what
              you want.
            </p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-content">
          <div className="landing-footer-logo">
            <span
              style={{
                color:
                  "#818cf8",
              }}
            >
              &#9670;
            </span>

            NxtBuild
          </div>

          <p className="landing-footer-text">
            Built with React +
            Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
}