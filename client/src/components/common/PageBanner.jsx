import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PageBanner = ({ title, subtitle, breadcrumbs = [] }) => {
  return (
    <div className="bg-gradient-to-r from-[#12356B] via-[#17488B] to-[#1769D2] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40 relative overflow-hidden">
      {/* Decorative subtle ambient pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb links */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-blue-200/80 mb-3 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-blue-300/60" />
                {crumb.link ? (
                  <Link to={crumb.link} className="hover:text-white transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-[#F4B942] font-semibold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-blue-100 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
