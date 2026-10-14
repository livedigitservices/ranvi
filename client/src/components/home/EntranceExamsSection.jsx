import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { entranceExamService } from '../../services';
import { GraduationCap, ArrowRight } from 'lucide-react';

const DEFAULT_ENTRANCE_TILES = [
  {
    name: 'JEE MAIN',
    path: '/enquiry?course=JEE%20Main',
    bg: 'from-[#1E88E5] to-[#1565C0]',
    arrowColor: 'text-[#1976D2]',
  },
  {
    name: 'NEET-UG',
    path: '/enquiry?course=NEET-UG',
    bg: 'from-[#E53935] to-[#C62828]',
    arrowColor: 'text-[#E53935]',
  },
  {
    name: 'CUET-UG',
    path: '/enquiry?course=CUET-UG',
    bg: 'from-[#00897B] to-[#00695C]',
    arrowColor: 'text-[#00897B]',
  },
  {
    name: 'AP EAPCET',
    path: '/enquiry?course=AP%20EAPCET',
    bg: 'from-[#EF6C00] to-[#E65100]',
    arrowColor: 'text-[#EF6C00]',
  },
  {
    name: 'TG EAPCET',
    path: '/enquiry?course=TG%20EAPCET',
    bg: 'from-[#7B1FA2] to-[#6A1B9A]',
    arrowColor: 'text-[#7B1FA2]',
  },
  {
    name: 'AP POLYCET',
    path: '/enquiry?course=AP%20POLYCET',
    bg: 'from-[#1565C0] to-[#0D47A1]',
    arrowColor: 'text-[#1565C0]',
  },
  {
    name: 'TG POLYCET',
    path: '/enquiry?course=TG%20POLYCET',
    bg: 'from-[#D81B60] to-[#C2185B]',
    arrowColor: 'text-[#D81B60]',
  },
  {
    name: 'APRJC CET',
    path: '/enquiry?course=APRJC%20CET',
    bg: 'from-[#00695C] to-[#004D40]',
    arrowColor: 'text-[#00695C]',
  },
  {
    name: 'TGCET',
    path: '/enquiry?course=TGCET',
    bg: 'from-[#5E35B1] to-[#4527A0]',
    arrowColor: 'text-[#5E35B1]',
  },
];

const PALETTE = [
  { bg: 'from-[#1E88E5] to-[#1565C0]', arrowColor: 'text-[#1976D2]' },
  { bg: 'from-[#E53935] to-[#C62828]', arrowColor: 'text-[#E53935]' },
  { bg: 'from-[#00897B] to-[#00695C]', arrowColor: 'text-[#00897B]' },
  { bg: 'from-[#EF6C00] to-[#E65100]', arrowColor: 'text-[#EF6C00]' },
  { bg: 'from-[#7B1FA2] to-[#6A1B9A]', arrowColor: 'text-[#7B1FA2]' },
  { bg: 'from-[#1565C0] to-[#0D47A1]', arrowColor: 'text-[#1565C0]' },
  { bg: 'from-[#D81B60] to-[#C2185B]', arrowColor: 'text-[#D81B60]' },
  { bg: 'from-[#00695C] to-[#004D40]', arrowColor: 'text-[#00695C]' },
  { bg: 'from-[#5E35B1] to-[#4527A0]', arrowColor: 'text-[#5E35B1]' },
  { bg: 'from-[#F59E0B] to-[#D97706]', arrowColor: 'text-[#D97706]' },
  { bg: 'from-[#558B2F] to-[#33691E]', arrowColor: 'text-[#558B2F]' },
];

export const EntranceExamsSection = () => {
  const [tiles, setTiles] = useState(DEFAULT_ENTRANCE_TILES);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await entranceExamService.getEntranceExams();
        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          const dynamicTiles = res.data.map((exam, idx) => ({
            name: (exam.shortCode || exam.title).toUpperCase(),
            path: `/enquiry?course=${encodeURIComponent(exam.title)}`,
            bg: PALETTE[idx % PALETTE.length].bg,
            arrowColor: PALETTE[idx % PALETTE.length].arrowColor,
          }));
          setTiles(dynamicTiles);
        }
      } catch (err) {
        // Fallback to DEFAULT_ENTRANCE_TILES seamlessly
      }
    };
    fetchExams();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#FFF9EE] rounded-3xl p-5 sm:p-7 md:p-8 border border-[#FFE8BF] shadow-sm">
        {/* Card Header matching exact reference style */}
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FFE5A3] text-[#0A2540] flex items-center justify-center shrink-0 shadow-xs">
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-[#0A2540]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A2540] font-serif tracking-tight leading-tight">
                All Entrance Exams Coaching
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
                Engineering • Medical • Central Universities • State Admissions • Polytechnic & Residential
              </p>
            </div>
          </div>

          <Link
            to="/entrance-exams"
            className="inline-flex items-center gap-1.5 bg-[#1976D2] hover:bg-[#1565C0] text-white text-xs sm:text-sm font-bold px-3 sm:px-5 py-3 sm:py-2.5 rounded-full shadow-sm hover:shadow transition-all shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>

        {/* Colorful Pill Tiles Matching Reference Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {tiles.map((tile, idx) => {
            const isLastOdd = idx === tiles.length - 1 && tiles.length % 2 !== 0;

            return (
              <Link
                key={idx}
                to={tile.path}
                className={`bg-gradient-to-r ${tile.bg} text-white px-4 py-3 sm:py-3.5 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-between group min-h-[54px] ${
                  isLastOdd ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <span className="font-extrabold text-sm sm:text-base tracking-wide text-white drop-shadow-xs">
                  {tile.name}
                </span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] ${
                      tile.arrowColor || 'text-[#1976D2]'
                    }`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EntranceExamsSection;
