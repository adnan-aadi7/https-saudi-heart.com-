export interface CertificateData {
  id: string; // e.g. '311213179908'
  holderName: string; // e.g. 'Sarfaraz Ali Muntaz Ali'
  courseName: string; // e.g. 'SHA HSFA CPR AED Course'
  validFrom: string; // e.g. 'July-15-2026'
  expiryDate: string; // e.g. 'July-15-2028'
  trainingCenter?: string; // e.g. 'Riyadh Main Life Support Center'
  instructorName?: string; // e.g. 'Dr. A. Al-Ghamdi'
  status?: 'Valid' | 'Expired' | 'Suspended';
  nationalIdOrIqama?: string;
}

