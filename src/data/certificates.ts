export interface CertificateRecord {
  name: string;
  course: string;
  trainingCenter: string;
  validFrom: string;
  expiry: string;
}

export const CERTIFICATES_DB: Record<string, CertificateRecord> = {
  "311213179908": {
    name: "Haseen Haider",
    course: "SHA HSFA CPR AED Course",
    trainingCenter: "Dar As Sihha Medical Center",
    validFrom: "July-15-2026",
    expiry: "July-15-2028"
  },
  "311214179908": {
    name: "Haseen Haider",
    course: "SHA BLS Provider",
    trainingCenter: "Dar As Sihha Medical Center",
    validFrom: "July-15-2026",
    expiry: "July-15-2028"
  },
  "311213173997": {
    name: "Sayed Kumail Hussain Sayed Ali Qasim",
    course: "SHA HSFA CPR AED Course",
    trainingCenter: "Dar As Sihha Medical Center",
    validFrom: "Dec-15-2025",
    expiry: "Dec-15-2027"
  },
  "311214173977": {
    name: "Sayed Kumail Hussain Sayed Ali Qasim",
    course: "SHA BLS Provider",
    trainingCenter: "Dar As Sihha Medical Center",
    validFrom: "Dec-15-2025",
    expiry: "Dec-15-2027"
  },
  "311213172585": {
    name: "Syed Nadeem U Din Shah Syed Qayam U Din Shah",
    course: "SHA HSFA CPR AED Course",
    trainingCenter: "Dar As Sihha Medical Center",
    validFrom: "Feb-14-2026",
    expiry: "Feb-14-2028"
  },
  "311214172555": {
    name: "Syed Nadeem U Din Shah Syed Qayam U Din Shah",
    course: "SHA BLS Provider",
    trainingCenter: "Dar As Sihha Medical Center",
    validFrom: "Feb-14-2026",
    expiry: "Feb-14-2028"
  },
  "311213178822": {
    name: "Ahamed Ullah",
    course: "SHA HSFA CPR AED Course",
    trainingCenter: "Dar As Sihha Medical Center",
    validFrom: "Feb-25-2026",
    expiry: "Feb-25-2028"
  },
  "311214178802": {
    name: "Ahamed Ullah",
    course: "SHA BLS Provider",
    trainingCenter: "Dar As Sihha Medical Center",
    validFrom: "Feb-25-2026",
    expiry: "Feb-25-2028"
  }
};
