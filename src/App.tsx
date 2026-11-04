import React, { useState, useEffect } from 'react';
import { CERTIFICATES_DB, CertificateRecord } from './data/certificates';

export const App: React.FC = () => {
  const [certData, setCertData] = useState<CertificateRecord>(CERTIFICATES_DB["311213179908"]);
  const [isManualSearch, setIsManualSearch] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<{ text: string; color: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Status helper (matching script.js)
  const getCertificateStatus = (expiryString: string): string => {
    try {
      const expiryDate = new Date(expiryString);
      const currentDate = new Date();
      if (expiryDate > currentDate) {
        return "Active";
      } else {
        return "Expired";
      }
    } catch {
      return "Active";
    }
  };

  const verifyCertificate = (certNumber: string, verificationType: 'qr' | 'manual' = 'manual') => {
    const trimmed = certNumber.trim();
    if (CERTIFICATES_DB[trimmed]) {
      const data = CERTIFICATES_DB[trimmed];
      setCertData(data);

      if (verificationType === 'manual') {
        setIsManualSearch(true);
      } else {
        setIsManualSearch(false);
      }

      setErrorMsg({
        text: 'Certificate Verified Successfully',
        color: 'lightgreen',
      });

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      setErrorMsg({
        text: 'Invalid eCertificate ID',
        color: 'red',
      });
    }

    setSearchInput('');
    setTimeout(() => {
      setErrorMsg(null);
    }, 3000);
  };

  // On page load, read QR param ?id=...
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const qrID = searchParams.get('id');

      if (qrID && qrID.trim()) {
        verifyCertificate(qrID.trim(), 'qr');
      } else {
        // Default URL displays ?id=311213179908#
        const defaultUrl = `${window.location.pathname}?id=311213179908#`;
        window.history.replaceState({ id: '311213179908' }, '', defaultUrl);
        verifyCertificate('311213179908', 'qr');
      }
    } catch {
      // Ignore in restricted environments
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      verifyCertificate(searchInput.trim(), 'manual');
    }
  };

  const currentStatus = getCertificateStatus(certData.expiry);

  return (
    <div>
      {/* =========================
              MAIN CONTAINER
      ========================= */}
      <div className="certificate-container">
        {/* Header */}
        <div className="logo-container">
          <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" title="Saudi Heart Association">
            <img
              className="main-logo"
              src="/img/logo.png"
              alt="Logo"
            />
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              className="icon-logo"
              src="/img/icon.png"
              alt="Menu"
            />
          </button>
        </div>

        {/* Functional Hamburger Drawer */}
        {isMenuOpen && (
          <div
            className="nav-drawer-overlay"
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className="nav-drawer-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="nav-drawer-header">
                <span className="nav-drawer-title">Navigation Menu</span>
                <button
                  type="button"
                  className="nav-drawer-close"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  &times;
                </button>
              </div>

              <nav className="nav-drawer-links">
                <a
                  href="https://saudi-heart.com/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Home</span>
                  <span style={{ fontSize: '13px', color: '#999' }}>&rsaquo;</span>
                </a>
                <a
                  href="https://saudi-heart.com/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Courses</span>
                  <span style={{ fontSize: '13px', color: '#999' }}>&rsaquo;</span>
                </a>
                <a
                  href="https://saudi-heart.com/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Online Courses</span>
                  <span style={{ fontSize: '13px', color: '#999' }}>&rsaquo;</span>
                </a>
                <a
                  href="https://saudi-heart.com/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Training Centers</span>
                  <span style={{ fontSize: '13px', color: '#999' }}>&rsaquo;</span>
                </a>
                <a
                  href="https://saudi-heart.com/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Become Training Center</span>
                  <span style={{ fontSize: '13px', color: '#999' }}>&rsaquo;</span>
                </a>
                <a
                  href="#"
                  className="active"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                  }}
                >
                  <span>Certificate Verification</span>
                  <span style={{ fontSize: '11px', color: '#002b35', fontWeight: 'bold' }}>Active</span>
                </a>
                <a
                  href="https://shacpr.org.sa/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Browse for old CPR website</span>
                  <span style={{ fontSize: '13px', color: '#999' }}>&rsaquo;</span>
                </a>
                <a
                  href="https://saudi-heart.com/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>For instructors and Coordinator</span>
                  <span style={{ fontSize: '13px', color: '#999' }}>&rsaquo;</span>
                </a>
              </nav>
            </div>
          </div>
        )}

        {/* Heading */}
        <div
          className={`text-container ${isManualSearch ? 'manual-search-mode' : ''}`}
          id="verificationHeader"
        >
          <h1 id="pageHeading">
            {isManualSearch ? (
              ''
            ) : (
              <>
                Certificate <br />
                Verification
              </>
            )}
          </h1>
        </div>

        {/* Certificate Card */}
        <div className={`certificate-card ${isManualSearch ? 'manual-search-mode' : ''}`}>
          <h2 className="card-heading">Certificate Details</h2>

          <hr className="divider" />

          {/* Name */}
          <div className="detail-row">
            <p className="detail-label">Certificate Holder Name:</p>
            <p className="detail-value" id="holderName">
              {certData.name}
            </p>
          </div>

          {/* Course */}
          <div className="detail-row">
            <p className="detail-label">Course Name:</p>
            <p className="detail-value" id="courseName">
              {certData.course}
            </p>
          </div>

          {/* Training Center (Manual Mode Only) */}
          <div className="detail-row manual-only" id="trainingCenterRow">
            <p className="detail-label">Training Center:</p>
            <p className="detail-value" id="trainingCenter">
              {certData.trainingCenter || 'Dar As Sihha Medical Center'}
            </p>
          </div>

          {/* Valid */}
          <div className="detail-row">
            <p className="detail-label">Certificate Valid From:</p>
            <p className="detail-value" id="validFrom">
              {certData.validFrom}
            </p>
          </div>

          {/* Expiry */}
          <div className="detail-row">
            <p className="detail-label">Certificate Expiry Date:</p>
            <p className="detail-value" id="expiryDate">
              {certData.expiry}
            </p>
          </div>

          {/* Certificate Status (Manual Mode Only) */}
          <div className="detail-row manual-only" id="certificateStatusRow">
            <p className="detail-label">Certificate Status:</p>
            <p
              className={`detail-value certificate-status ${currentStatus.toLowerCase()}`}
              id="certificateStatus"
            >
              {currentStatus}
            </p>
          </div>
        </div>
      </div>

      {/* =========================
              FOOTER
      ========================= */}
      <footer className="footer">
        <div className="footer-container">
          {/* Left */}
          <div className="footer-left">
            <div className="about-section">
              <img
                src="/img/bcg.png"
                alt="SHA Logo"
                className="footer-main-logo"
              />

              <h2>About Us</h2>

              <p>
                The Saudi Heart Association, hereafter called &quot;The Association&quot;
                is recognized at its premises and may have more chapters in other
                locations if needed.
              </p>

              <p>
                The progression and development of the scientific thinking in
                the speciality of the Association.
              </p>

              <img
                src="/img/about.png"
                alt="About Image"
                className="about-image"
              />

              <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" className="read-more">
                Read More
              </a>
            </div>

            {/* Quick Links */}
            <div className="quick-links-section">
              <h2>Quick Links</h2>

              <ul>
                <li><a href="https://saudi-heart.com/" target="_blank" rel="noreferrer">Home</a></li>
                <li><a href="https://saudi-heart.com/" target="_blank" rel="noreferrer">Courses</a></li>
                <li><a href="https://saudi-heart.com/" target="_blank" rel="noreferrer">Online Courses</a></li>
                <li><a href="https://saudi-heart.com/" target="_blank" rel="noreferrer">Training Centers</a></li>
                <li><a href="https://saudi-heart.com/" target="_blank" rel="noreferrer">Become Training Center</a></li>
                <li><a href="https://shacpr.org.sa/" target="_blank" rel="noreferrer">Browse for old CPR website</a></li>
                <li><a href="https://saudi-heart.com/" target="_blank" rel="noreferrer">For instructors and Coordinator</a></li>
              </ul>
            </div>
          </div>

          {/* Middle */}
          <div className="footer-middle">
            <h2>Popular Courses</h2>

            <ul>
              <li><a href="https://saudi-heart.com/" target="_blank" rel="noreferrer">SHA BLS Provider</a></li>
              <li><a href="https://saudi-heart.com/" target="_blank" rel="noreferrer">SHA ACLS Provider</a></li>
              <li><a href="https://saudi-heart.com/" target="_blank" rel="noreferrer">SHA PALS Provider</a></li>
              <li><a href="https://saudi-heart.com/" target="_blank" rel="noreferrer">SHA NIRP Provider</a></li>
              <li><a href="https://saudi-heart.com/" target="_blank" rel="noreferrer">SHA HSFA CRR AED</a></li>
            </ul>
          </div>

          {/* Right */}
          <div className="footer-right">
            <div className="support-section">
              <h2>Support</h2>

              <div className="support-item">
                <h4>CPR Chairman</h4>
                <a href="mailto:cprchairman@sha.org.sa" className="email-link">
                  <img src="/img/email.png" alt="Email" />
                  cprchairman@sha.org.sa
                </a>
              </div>

              <div className="support-item">
                <h4>CPR Registration</h4>
                <a href="mailto:cprregistration@sha.org.sa" className="email-link">
                  <img src="/img/email.png" alt="Email" />
                  cprregistration@sha.org.sa
                </a>
              </div>

              <div className="support-item">
                <h4>CPR Operation</h4>
                <a href="mailto:cproperation@sha.org.sa" className="email-link">
                  <img src="/img/email.png" alt="Email" />
                  cproperation@sha.org.sa
                </a>
              </div>

              <div className="support-item">
                <h4>CPR Events</h4>
                <a href="mailto:cprevents@sha.org.sa" className="email-link">
                  <img src="/img/email.png" alt="Email" />
                  cprevents@sha.org.sa
                </a>
              </div>

              <div className="support-item">
                <h4>CPR Help Desk</h4>
                <a href="mailto:cprhelpdesk@sha.org.sa" className="email-link">
                  <img src="/img/email.png" alt="Email" />
                  cprhelpdesk@sha.org.sa
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="location-section">
              <h2>Location</h2>
              <p>
                Head Quarters Office No. 603, Floor 6, Amaz Center Near
                Voco Hotel, King Fahad Road Riyadh
              </p>
            </div>

            {/* Call */}
            <div className="contact-section">
              <h2>Call Us</h2>
              <p className="phone">+966 920 000 742</p>
            </div>
          </div>

          {/* Search */}
          <div className="right-side-container">
            <div className="certificate-section">
              <h2>Search E-Certificate</h2>

              <p>
                Enter the eCertificate ID in the box and click on verify
                button to verify your certificate
              </p>

              <form className="search-container" onSubmit={handleFormSubmit}>
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
                <p style={{ marginTop: '15px', fontSize: '15px', color: errorMsg.color }}>
                  {errorMsg.text}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            Copyright &copy; 2025 Saudi Heart Association{' '}
            <strong>Powered &amp; Owned By Konoz Retaj IT</strong>
          </p>

          <img
            src="/img/footer img.png"
            alt="Partner Logo"
            className="partner-logo"
          />
        </div>
      </footer>
    </div>
  );
};

export default App;
