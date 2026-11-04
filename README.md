# Saudi Heart Association (SHA) - Certificate Verification Portal

A pixel-accurate production-ready implementation of the **Saudi Heart Association (SHA) - National Life Support Committee** Certificate Verification page, built with **React 18**, **TypeScript (TSX)**, **Vite**, and **Tailwind CSS**.

---

## Verification Details

- **Certificate Holder Name:** `Haseen Haider`
- **Course Name:** `SHA HSFA CPR AED Course`
- **Certificate Valid From:** `July-15-2026`
- **Certificate Expiry Date:** `July-15-2028`
- **Certificate ID:** `311213179908`
- **Official Domain Representation:** `https://saudi-heart.com/?id=311213179908#`

---

## Key Features

1. **Exact Navbar (Light / White)**:
   - Official National Life Support Committee emblem with dual English and Arabic typography.
   - 3-line hamburger menu toggling the official drawer links (Home, Courses, Online Courses, Training Centers, etc.).
   - Clean and authentic — all edit buttons removed.

2. **Certificate Verification Card**:
   - Matching Image 1 with exact font weights, dividers, and alignments.
   - Official verification domain banner showing `https://saudi-heart.com/?id=311213179908#`.
   - Browser address bar automatically formatted to end with `?id=311213179908#`.

3. **QR Code Generation & Linking**:
   - One-click **"View QR Code"** modal.
   - Instant **"Download QR Code"** button to export the QR code image for printing on cards or certificates.
   - Scannable via any smartphone camera to open the verification page.

4. **Complete Dark Teal Footer (Matching Image 2)**:
   - **About Us**: Official text and SHA badge with gold "Read More" button.
   - **Quick Links**: Navigation to official portals.
   - **Popular Courses**: SHA BLS, ACLS, PALS, NIRP, and HSFA CRR AED.
   - **Support**: Direct mailto links for CPR Chairman, CPR Registration, CPR Operation, CPR Events, and Help Desk.
   - **Location & Phone**: Amaz Center, King Fahad Road Riyadh, and `+966 920 000 742`.

---

## Deployment & Linking After Deployment

### Deploying to Netlify / Vercel
1. Run `npm run build` (outputs to the `/dist` directory).
2. Deploy the `/dist` folder to Netlify (e.g., matching `https://shacpr-org-ksa.netlify.app/?id=311213179908#`) or Vercel.
3. If connecting a custom domain or subdomain (e.g., `shacpr.saudi-heart.com` or `verification.saudi-heart.com`), configure your DNS CNAME record in your domain registrar.

### Linking Your QR Code
- Once deployed, open your site URL (e.g., `https://your-site.netlify.app/?id=311213179908#`).
- Click **"View QR Code"** &rarr; **"Download QR Code"**.
- Print or embed this QR code anywhere — scanning it will instantly open the certificate verification page!
