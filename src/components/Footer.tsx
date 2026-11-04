import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { NationalLifeSupportLogo, SaudiHeartAssociationBadge } from './logos/Logos';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#03252d] text-slate-300 pt-12 pb-8 border-t border-teal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Logo */}
        <div className="pb-6">
          <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer">
            <NationalLifeSupportLogo isDarkTheme={true} className="h-14" />
          </a>
        </div>

        {/* 4 Main Grid Columns Matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-sm">
          {/* Column 1: About Us & Quick Links */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-white text-lg font-bold">About Us</h3>
              <p className="text-xs leading-relaxed text-slate-300/90">
                The Saudi Heart Association, hereafter called &quot;The Association&quot; is recognized at its premises and may have more chapters in other locations if needed.
              </p>
              <p className="text-xs leading-relaxed text-slate-300/90">
                The progression and development of the scientific thinking in the speciality of the Association.
              </p>

              {/* SHA Logo Badge & Read More Link */}
              <div className="pt-2 flex items-center gap-3">
                <SaudiHeartAssociationBadge />
                <a
                  href="https://saudi-heart.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-500 hover:text-amber-400 font-bold text-xs transition-colors"
                >
                  Read More
                </a>
              </div>
            </div>

            {/* Quick Links Section under About Us */}
            <div className="pt-4 border-t border-teal-900/60">
              <h4 className="text-white text-base font-bold mb-2">Quick Links</h4>
              <div className="h-0.5 bg-teal-900/60 w-full mb-3" />
              <ul className="space-y-2 text-xs text-slate-300/90">
                <li>
                  <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    Online Courses
                  </a>
                </li>
                <li>
                  <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    Training Centers
                  </a>
                </li>
                <li>
                  <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    Become Training Center
                  </a>
                </li>
                <li>
                  <a href="https://shacpr.org.sa/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    Browse for old CPR website
                  </a>
                </li>
                <li>
                  <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    For instructors and Coordinator
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Popular Courses */}
          <div className="space-y-3">
            <h3 className="text-white text-lg font-bold">Popular Courses</h3>
            <div className="h-0.5 bg-teal-900/60 w-full mb-3" />
            <ul className="space-y-3 text-xs text-slate-300/90">
              <li>
                <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  SHA BLS Provider
                </a>
              </li>
              <li>
                <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  SHA ACLS Provider
                </a>
              </li>
              <li>
                <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  SHA PALS Provider
                </a>
              </li>
              <li>
                <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  SHA NIRP Provider
                </a>
              </li>
              <li>
                <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  SHA HSFA CRR AED
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-3">
            <h3 className="text-white text-lg font-bold">Support</h3>
            <div className="h-0.5 bg-teal-900/60 w-full mb-3" />
            <div className="space-y-3.5 text-xs">
              <div>
                <p className="font-semibold text-slate-200">CPR Chairman</p>
                <a
                  href="mailto:cprchairman@sha.org.sa"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-teal-300 mt-0.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>cprchairman@sha.org.sa</span>
                </a>
              </div>

              <div>
                <p className="font-semibold text-slate-200">CPR Registration</p>
                <a
                  href="mailto:cprregistration@sha.org.sa"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-teal-300 mt-0.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>cprregistration@sha.org.sa</span>
                </a>
              </div>

              <div>
                <p className="font-semibold text-slate-200">CPR Operation</p>
                <a
                  href="mailto:cproperation@sha.org.sa"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-teal-300 mt-0.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>cproperation@sha.org.sa</span>
                </a>
              </div>

              <div>
                <p className="font-semibold text-slate-200">CPR Events</p>
                <a
                  href="mailto:cprevents@sha.org.sa"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-teal-300 mt-0.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>cprevents@sha.org.sa</span>
                </a>
              </div>

              <div>
                <p className="font-semibold text-slate-200">CPR Help Desk</p>
                <a
                  href="mailto:cprhelpdesk@sha.org.sa"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-teal-300 mt-0.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>cprhelpdesk@sha.org.sa</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Location & Call Us */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-white text-lg font-bold">Location</h3>
              <div className="h-0.5 bg-teal-900/60 w-full mb-3" />
              <p className="text-xs leading-relaxed text-slate-300/90 flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  Head Quarters Office No. 603, Floor 6, Amaz Center Near Voco Hotel, King Fahad Road Riyadh
                </span>
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-white text-lg font-bold">Call Us</h3>
              <div className="h-0.5 bg-teal-900/60 w-full mb-3" />
              <a
                href="tel:+966920000742"
                className="text-sm font-semibold text-slate-100 hover:text-teal-300 flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span>+966 920 000 742</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 mt-6 border-t border-teal-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>
            &copy; {new Date().getFullYear()} Saudi Heart Association (SHA) - National Life Support Committee. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" className="hover:text-slate-200 transition-colors">
              Terms & Conditions
            </a>
            <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </a>
            <a href="https://saudi-heart.com/" target="_blank" rel="noreferrer" className="hover:text-slate-200 transition-colors">
              Official Portal: saudi-heart.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

