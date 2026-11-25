import React, { useState, useEffect } from 'react';
import { CERTIFICATES_DB, CertificateRecord } from './data/certificates';

export const App: React.FC = () => {
  const [certData, setCertData] = useState<CertificateRecord>(CERTIFICATES_DB["3326922354442"]);
  const [isManualSearch, setIsManualSearch] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<{ text: string; color: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getCertificateStatus = (expiryString: string): string => {
    try {
      const expiryDate = new Date(expiryString);
      return expiryDate > new Date() ? 'Active' : 'Expired';
    } catch {
      return 'Active';
    }
  };

  const verifyCertificate = (certNumber: string, type: 'qr' | 'manual' = 'manual') => {
    const trimmed = certNumber.trim();
    if (CERTIFICATES_DB[trimmed]) {
      setCertData(CERTIFICATES_DB[trimmed]);
      setIsManualSearch(type === 'manual');
      setErrorMsg({ text: 'Certificate Verified Successfully', color: '#27ae60' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrorMsg({ text: 'Invalid eCertificate ID', color: '#e53935' });
    }
    setSearchInput('');
    setTimeout(() => setErrorMsg(null), 3000);
  };

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const qrID = params.get('id');
      if (qrID && qrID.trim()) {
        verifyCertificate(qrID.trim(), 'qr');
      } else {
        const defaultUrl = `${window.location.pathname}?id=3326922354442#`;
        window.history.replaceState({ id: '3326922354442' }, '', defaultUrl);
        verifyCertificate('3326922354442', 'qr');
      }
    } catch {
      // restricted environment
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) verifyCertificate(searchInput.trim(), 'manual');
  };

  const currentStatus = getCertificateStatus(certData.expiry);

  const navLinks = [
    { label: 'Home', href: 'https://saudi-heart.com/' },
    { label: 'Courses', href: 'https://saudi-heart.com/' },
    { label: 'Online Courses', href: 'https://saudi-heart.com/' },
    { label: 'Training Centers', href: 'https://saudi-heart.com/' },
    { label: 'Become Training Center', href: 'https://saudi-heart.com/' },
    { label: 'Browse for old CPR website', href: 'https://shacpr.org.sa/' },
    { label: 'For instructors and Coordinator', href: 'https://saudi-heart.com/' },
  ];

  return (
    <div className="page-wrapper">

      {/* ── HEADER ── */}
      <header className="sha-header">
        <div className="sha-header-inner">
          <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer">
            <img className="sha-logo" src="/img/logo.png" alt="Saudi Heart Association" />
          </a>

          {/* Desktop Nav */}
          <nav className="sha-desktop-nav">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            ))}
            <a href="#" className="sha-nav-active" onClick={(e) => e.preventDefault()}>
              Certificate Verification
            </a>
          </nav>

          {/* Hamburger */}
          <button
            type="button"
            className="sha-hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      {isMenuOpen && (
        <div className="drawer-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <span>Navigation Menu</span>
              <button onClick={() => setIsMenuOpen(false)} className="drawer-close">&times;</button>
            </div>
            <nav className="drawer-links">
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                  onClick={() => setIsMenuOpen(false)}>
                  <span>{l.label}</span><span className="drawer-arrow">›</span>
                </a>
              ))}
              <a href="#" className="drawer-active"
                onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); }}>
                <span>Certificate Verification</span>
                <span className="drawer-badge">Active</span>
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* ── HERO BANNER ── */}
      <section className={`sha-hero ${isManualSearch ? 'sha-hero--manual' : ''}`}>
        {isManualSearch ? (
          <h1 className="sha-hero-title">Certificate Verification</h1>
        ) : (
          <h1 className="sha-hero-title">
            Certificate<br />Verification
          </h1>
        )}
      </section>

      {/* ── CERTIFICATE CARD ── */}
      <main className="sha-main">
        <div className="cert-card">
          <h2 className="cert-card-title">Certificate Details</h2>
          <hr className="cert-divider" />

          <div className="cert-row">
            <span className="cert-label">Certificate Holder Name:</span>
            <span className="cert-value">{certData.name}</span>
          </div>

          <div className="cert-row">
            <span className="cert-label">Course Name:</span>
            <span className="cert-value">{certData.course}</span>
          </div>

          {/* Training Center — shown in manual search mode */}
          <div className={`cert-row ${isManualSearch ? '' : 'cert-row--hidden'}`}>
            <span className="cert-label">Training Center:</span>
            <span className="cert-value">{certData.trainingCenter || 'Dar As Sihha Medical Center'}</span>
          </div>

          <div className="cert-row">
            <span className="cert-label">Certificate Valid From:</span>
            <span className="cert-value">{certData.validFrom}</span>
          </div>

          <div className="cert-row">
            <span className="cert-label">Certificate Expiry Date:</span>
            <span className="cert-value">{certData.expiry}</span>
          </div>

          {/* Status — shown in manual search mode */}
          <div className={`cert-row ${isManualSearch ? '' : 'cert-row--hidden'}`}>
            <span className="cert-label">Certificate Status:</span>
            <span className={`cert-value cert-status cert-status--${currentStatus.toLowerCase()}`}>
              {currentStatus}
            </span>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="sha-footer">
        <div className="sha-footer-grid">

          {/* About */}
          <div className="footer-col footer-col--about">
            <img src="/img/bcg.png" alt="SHA Logo" className="footer-brand-logo" />
            <h3>About Us</h3>
            <p>
              The Saudi Heart Association, hereafter called "The Association"
              is recognized at its premises and may have more chapters in other locations if needed.
            </p>
            <p>
              The progression and development of the scientific thinking in the speciality of the Association.
            </p>
            <img src="/img/about.png" alt="About" className="footer-about-img" />
            <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" className="footer-read-more">
              Read More
            </a>

            <div className="footer-quick-links">
              <h3>Quick Links</h3>
              <ul>
                {navLinks.map((l) => (
                  <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer">{l.label}</a></li>
                ))}
                <li><a href="#" onClick={(e) => e.preventDefault()}>Certificate Verification</a></li>
              </ul>
            </div>
          </div>

          {/* Popular Courses */}
          <div className="footer-col footer-col--courses">
            <h3>Popular Courses</h3>
            <ul>
              {['SHA BLS Provider', 'SHA ACLS Provider', 'SHA PALS Provider', 'SHA NIRP Provider', 'SHA HSFA CRR AED'].map((c) => (
                <li key={c}><a href="https://saudi-heart.com/" target="_blank" rel="noreferrer">{c}</a></li>
              ))}
            </ul>
          </div>

          {/* Support + Search */}
          <div className="footer-col footer-col--support">
            <h3>Support</h3>
            {[
              { title: 'CPR Chairman', email: 'cprchairman@sha.org.sa' },
              { title: 'CPR Registration', email: 'cprregistration@sha.org.sa' },
              { title: 'CPR Operation', email: 'cproperation@sha.org.sa' },
              { title: 'CPR Events', email: 'cprevents@sha.org.sa' },
              { title: 'CPR Help Desk', email: 'cprhelpdesk@sha.org.sa' },
            ].map(({ title, email }) => (
              <div key={email} className="footer-support-item">
                <h4>{title}</h4>
                <a href={`mailto:${email}`} className="footer-email-link">
                  <img src="/img/email.png" alt="email" />
                  {email}
                </a>
              </div>
            ))}

            <div className="footer-location">
              <h3>Location</h3>
              <p>Head Quarters Office No. 603, Floor 6, Amaz Center Near Voco Hotel, King Fahad Road Riyadh</p>
            </div>

            <div className="footer-call">
              <h3>Call Us</h3>
              <p className="footer-phone">+966 920 000 742</p>
            </div>

            {/* E-Certificate Search */}
            <div className="footer-search-box">
              <h3>Search E-Certificate</h3>
              <p>Enter the eCertificate ID in the box and click on verify button to verify your certificate</p>
              <form className="footer-search-form" onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  placeholder="Enter eCertificate ID"
                  required
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit">Verify</button>
              </form>
              {errorMsg && (
                <p className="footer-search-msg" style={{ color: errorMsg.color }}>
                  {errorMsg.text}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="sha-footer-bottom">
          <p>Copyright &copy; 2025 Saudi Heart Association <strong>Powered &amp; Owned By Konoz Retaj IT</strong></p>
          <img src="/img/footer img.png" alt="Partner Logo" className="footer-partner-logo" />
        </div>
      </footer>
    </div>
  );
};

export default App;
