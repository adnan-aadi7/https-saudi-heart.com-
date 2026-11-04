import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CertificateVerification } from './components/CertificateVerification';
import { Footer } from './components/Footer';
import { CertificateData } from './types/certificate';

// Fixed certificate data matching Image 1
const FIXED_CERTIFICATE: CertificateData = {
  id: '311213179908',
  holderName: 'Haseen Haider ',
  courseName: 'SHA HSFA CPR AED Course',
  validFrom: 'July-15-2026',
  expiryDate: 'July-15-2028',
};

export const App: React.FC = () => {
  const [certData, setCertData] = useState<CertificateData>(FIXED_CERTIFICATE);

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const idFromUrl = searchParams.get('id');

      if (idFromUrl && idFromUrl.trim()) {
        setCertData((prev) => ({
          ...prev,
          id: idFromUrl.trim(),
        }));
      } else {
        // Ensure browser address bar always ends with ?id=311213179908#
        const defaultUrl = `${window.location.pathname}?id=${FIXED_CERTIFICATE.id}#`;
        window.history.replaceState({ id: FIXED_CERTIFICATE.id }, '', defaultUrl);
      }
    } catch {
      // Ignore if history state is restricted
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f5f7]">
      {/* Official White Header matching Image 1 */}
      <Navbar />

      {/* Main Certificate Verification View matching Image 1 */}
      <main className="flex-1">
        <CertificateVerification certificate={certData} />
      </main>

      {/* Official Dark Teal Footer matching Image 2 */}
      <Footer />
    </div>
  );
};

export default App;
