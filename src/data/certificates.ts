import { CertificateData } from '../types/certificate';

const STORAGE_KEY = 'sha_certificates_database_v1';

export const DEFAULT_CERTIFICATES: Record<string, CertificateData> = {
  '311213179908': {
    id: '311213179908',
    holderName: 'Haseen Haider',
    courseName: 'SHA HSFA CPR AED Course',
    validFrom: 'July-15-2026',
    expiryDate: 'July-15-2028',
    trainingCenter: 'National Life Support Center - Riyadh',
    instructorName: 'Certified SHA Instructor',
    status: 'Valid',
  },
  '311213179909': {
    id: '311213179909',
    holderName: 'Mohammed Abdullah Al-Shehri',
    courseName: 'SHA BLS Provider',
    validFrom: 'August-01-2026',
    expiryDate: 'August-01-2028',
    trainingCenter: 'King Fahad Medical City Center',
    instructorName: 'Dr. Tariq Al-Otaibi',
    status: 'Valid',
  },
  '311213179910': {
    id: '311213179910',
    holderName: 'Fatimah Khalid Al-Mansoor',
    courseName: 'SHA ACLS Provider',
    validFrom: 'May-10-2026',
    expiryDate: 'May-10-2028',
    trainingCenter: 'Jeddah Heart & Life Support Center',
    instructorName: 'Dr. Reem Al-Zahrani',
    status: 'Valid',
  },
};

/**
 * Loads all certificates, merging defaults with any custom ones stored in localStorage.
 */
export function getAllCertificates(): Record<string, CertificateData> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_CERTIFICATES };
    }
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_CERTIFICATES, ...parsed };
  } catch (err) {
    console.warn('Failed to parse certificates from localStorage:', err);
    return { ...DEFAULT_CERTIFICATES };
  }
}

/**
 * Saves or updates a certificate in localStorage.
 */
export function saveCertificate(cert: CertificateData): void {
  const current = getAllCertificates();
  current[cert.id] = cert;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (err) {
    console.error('Failed to save certificate:', err);
  }
}

/**
 * Retrieves a certificate by ID.
 */
export function getCertificateById(id: string): CertificateData | null {
  const all = getAllCertificates();
  const trimmed = id.trim();
  if (all[trimmed]) {
    return all[trimmed];
  }
  return null;
}

