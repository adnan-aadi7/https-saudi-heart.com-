import React from 'react';

interface LogoProps {
  className?: string;
  isDarkTheme?: boolean;
}

export const NationalLifeSupportLogo: React.FC<LogoProps> = ({
  className = 'h-12',
  isDarkTheme = false,
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Heart with Palm Frond Emblem */}
      <svg
        viewBox="0 0 100 90"
        className="w-10 h-10 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Heart outer shape in vibrant red */}
        <path
          d="M50 82C48 80 12 56 12 30C12 16 23 6 36 6C44 6 48 10 50 14C52 10 56 6 64 6C77 6 88 16 88 30C88 56 52 80 50 82Z"
          fill="none"
          stroke="#e11d48"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Green palm tree trunk and fronds inside the left & center of heart */}
        <path
          d="M48 65V35M48 40C43 36 34 35 28 39M48 48C41 45 34 46 29 52M48 35C44 28 35 25 30 27M48 32C52 26 60 25 66 28M48 38C54 34 62 35 68 40"
          stroke="#16a34a"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Text in English & Arabic */}
      <div className="flex flex-col justify-center leading-tight">
        <span
          className={`text-[13px] sm:text-[14px] font-bold tracking-tight ${
            isDarkTheme ? 'text-white' : 'text-slate-800'
          }`}
        >
          National Life Support Committee
        </span>
        <span
          className={`text-[12px] sm:text-[13px] font-semibold font-sans ${
            isDarkTheme ? 'text-teal-200' : 'text-slate-600'
          }`}
          dir="rtl"
        >
          اللجنة الوطنية لدعم الحياة
        </span>
      </div>
    </div>
  );
};

export const SaudiHeartAssociationBadge: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-2 bg-white rounded-md px-2.5 py-1.5 shadow-sm border border-slate-200/40">
      <svg
        viewBox="0 0 100 90"
        className="w-7 h-7 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 82C48 80 12 56 12 30C12 16 23 6 36 6C44 6 48 10 50 14C52 10 56 6 64 6C77 6 88 16 88 30C88 56 52 80 50 82Z"
          fill="none"
          stroke="#dc2626"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M48 65V35M48 40C43 36 34 35 28 39M48 48C41 45 34 46 29 52M48 35C44 28 35 25 30 27"
          stroke="#15803d"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col text-[11px] font-semibold text-slate-800 leading-tight">
        <span className="text-[10px] text-slate-700">Saudi Heart Association</span>
        <span className="text-[10px] text-slate-900 font-bold" dir="rtl">
          جمعية القلب السعودية
        </span>
      </div>
    </div>
  );
};

