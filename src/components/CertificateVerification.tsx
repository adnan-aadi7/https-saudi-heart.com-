import React from 'react';
import { CertificateData } from '../types/certificate';

interface CertificateVerificationProps {
  certificate: CertificateData;
}

export const CertificateVerification: React.FC<CertificateVerificationProps> = ({
  certificate,
}) => {
  return (
    <section className="py-12 sm:py-16 px-4 bg-[#f4f5f7] flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full mx-auto space-y-8">
        {/* Main Title Matching Image 1 */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-[46px] font-bold text-[#222222] leading-tight">
            Certificate
            <br />
            Verification
          </h1>
        </div>

        {/* Certificate Card Matching Image 1 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200/60 p-6 sm:p-10">
          {/* Card Header matching Image 1 */}
          <h2 className="text-xl sm:text-[22px] font-bold text-[#111827] text-center mb-6">
            Certificate Details
          </h2>

          {/* Horizontal Divider matching Image 1 */}
          <hr className="border-t border-gray-200 mb-8" />

          {/* 4 Rows matching Image 1 */}
          <div className="space-y-4 text-sm sm:text-[15px]">
            {/* Certificate Holder Name */}
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="w-56 font-bold text-[#4b5563] shrink-0">
                Certificate Holder Name:
              </span>
              <span className="text-[#6b7280] font-normal sm:ml-4">
                {certificate.holderName}
              </span>
            </div>

            {/* Course Name */}
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="w-56 font-bold text-[#4b5563] shrink-0">
                Course Name:
              </span>
              <span className="text-[#6b7280] font-normal sm:ml-4">
                {certificate.courseName}
              </span>
            </div>

            {/* Certificate Valid From */}
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="w-56 font-bold text-[#4b5563] shrink-0">
                Certificate Valid From:
              </span>
              <span className="text-[#6b7280] font-normal sm:ml-4">
                {certificate.validFrom}
              </span>
            </div>

            {/* Certificate Expiry Date */}
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="w-56 font-bold text-[#4b5563] shrink-0">
                Certificate Expiry Date:
              </span>
              <span className="text-[#6b7280] font-normal sm:ml-4">
                {certificate.expiryDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
