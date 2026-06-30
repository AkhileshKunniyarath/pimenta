"use client";

import * as React from "react";

export default function AdminLoginClient() {
  const [username, setUsername] = React.useState("admin");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to log in.");
      }

      window.location.reload();
    } catch (error: any) {
      setMessage(error.message || "Unable to log in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="admin-login-wrapper paper-noise">
      {/* Left side: Editorial brand intro */}
      <div className="admin-login-hero">
        <div className="admin-login-hero-overlay"></div>
        <div className="admin-login-hero-content">
          <div className="mono tracked admin-login-hero-eyebrow">Heritage farm stay</div>
          <h2 className="serif admin-login-hero-title">The Pimenta</h2>
          <p className="admin-login-hero-text">
            A family-run farm stay in Kerala surrounded by spice gardens, serving organic vegetarian cuisine with warm hospitality.
          </p>
          <div className="admin-login-hero-footer">
            <span>Kerala, India</span>
            <span className="admin-login-hero-separator">•</span>
            <span>Spice Sanctuary</span>
          </div>
        </div>
      </div>

      {/* Right side: Login form */}
      <div className="admin-login-container">
        <div className="admin-login-nav-top">
          <a href="/" className="admin-login-back-link">
            <svg className="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to main site</span>
          </a>
        </div>

        <form className="admin-login-card" onSubmit={handleSubmit}>
          <div className="admin-login-header">
            <div className="mono tracked admin-login-eyebrow">Admin portal</div>
            <h1 className="serif admin-login-title">Sign In</h1>
            <p className="admin-login-copy">
              Sign in to manage site content, uploaded media, and booking enquiries.
            </p>
          </div>

          <div className="admin-login-fields">
            {/* Username field */}
            <div className="admin-login-field-group">
              <label className="admin-login-field-label">
                <span className="mono tracked">Username</span>
              </label>
              <div className="admin-login-input-wrapper">
                <span className="input-icon-left">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <input
                  autoComplete="username"
                  className="admin-login-input"
                  placeholder="Enter username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="admin-login-field-group">
              <label className="admin-login-field-label">
                <span className="mono tracked">Password</span>
              </label>
              <div className="admin-login-input-wrapper">
                <span className="input-icon-left">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  className="admin-login-input"
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {message ? (
            <div className="admin-login-error">
              <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{message}</span>
            </div>
          ) : null}

          <button className="btn btn-accent admin-login-button" disabled={submitting} type="submit">
            {submitting ? (
              <>
                <svg className="spinner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2"></circle>
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
