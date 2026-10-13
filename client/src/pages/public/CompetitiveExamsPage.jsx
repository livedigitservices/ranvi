import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { courseService } from '../../services';
import { CourseCard } from '../../components/course/CourseCard';
import { PageBanner } from '../../components/common/PageBanner';
import { Building2, BookOpen, Sparkles, CheckCircle2, ArrowRight, PhoneCall, HelpCircle } from 'lucide-react';

export const CompetitiveExamsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat') || searchParams.get('category');

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(catParam || 'ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (catParam) {
      setSelectedCat(catParam);
    }
  }, [catParam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, catRes] = await Promise.all([
          courseService.getCourses({ division: 'COMPETITIVE_EXAMS', limit: 30 }),
          courseService.getCategories({ division: 'COMPETITIVE_EXAMS' }),
        ]);

        if (courseRes.success) setCourses(courseRes.data.courses || []);
        if (catRes.success) setCategories(catRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterClick = (slug) => {
    setSelectedCat(slug);
    if (slug === 'ALL') {
      searchParams.delete('cat');
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ cat: slug });
    }
  };

  const examCategories = [
    { slug: 'IBPS', label: 'IBPS PO/Clerk' },
    { slug: 'SBI', label: 'SBI PO/Clerk' },
    { slug: 'RBI', label: 'RBI Assistant/Grade B' },
    { slug: 'SSC', label: 'SSC CGL/CHSL' },
    { slug: 'RAILWAYS', label: 'Railways RRB' },
    { slug: 'LIC', label: 'LIC & Insurance' },
    { slug: 'POLICE', label: 'Police & SI' },
    { slug: 'DEFENCE', label: 'Defence & Armed Forces' },
    { slug: 'TEACHING', label: 'Teaching & TET' },
    { slug: 'STATE GOVT', label: 'State Govt PSC' },
  ];

  const filteredCourses = selectedCat === 'ALL'
    ? courses
    : courses.filter((c) => {
        const sel = selectedCat.toUpperCase();
        const catSlug = c.categoryId?.slug?.toUpperCase() || '';
        const catName = c.categoryId?.name?.toUpperCase() || '';
        const title = c.title?.toUpperCase() || '';
        const shortDesc = c.shortDescription?.toUpperCase() || '';

        if (catSlug === sel || c.categoryId?._id === selectedCat) return true;
        if (title.includes(sel) || catName.includes(sel) || shortDesc.includes(sel)) return true;

        // Alias matching
        if (['IBPS', 'SBI', 'RBI', 'BANKING'].includes(sel)) {
          return catSlug.includes('BANKING') || title.includes('BANK') || title.includes('IBPS') || title.includes('SBI');
        }
        if (['SSC', 'GOVERNMENT', 'CGL', 'CHSL'].includes(sel)) {
          return catSlug.includes('SSC') || catSlug.includes('GOV') || title.includes('SSC');
        }
        if (['RAILWAYS', 'RRB'].includes(sel)) {
          return catSlug.includes('RAIL') || title.includes('RAILWAY') || title.includes('RRB');
        }
        if (['LIC', 'INSURANCE'].includes(sel)) {
          return catSlug.includes('INSUR') || title.includes('LIC') || title.includes('INSURANCE');
        }
        if (['POLICE', 'DEFENCE'].includes(sel)) {
          return catSlug.includes('POLICE') || catSlug.includes('DEFEN') || title.includes('POLICE') || title.includes('DEFENCE');
        }
        if (['TEACHING', 'STATE GOVT', 'STATE'].includes(sel)) {
          return catSlug.includes('TEACH') || catSlug.includes('STATE') || title.includes('TEACHING');
        }

        return false;
      });

  return (
    <div className="bg-[#F7F9FC] pb-20">
      <PageBanner
        title="All Competitive Examinations Coaching"
        subtitle="Build your career with confidence. Intensive preparation for Banking (IBPS, SBI, RBI), SSC (CGL, CHSL, MTS), Railways (RRB), Insurance (LIC), Police, Defence, and State Government recruitment examinations."
        breadcrumbs={[{ label: "Competitive Exams" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Category Filter Chips */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3.5">
            <Sparkles className="w-4 h-4 text-[#1769D2]" />
            <span className="text-xs font-black text-[#12356B] uppercase tracking-wider">
              Filter by Recruitment Exam Category:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleFilterClick('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                selectedCat === 'ALL'
                  ? 'bg-[#12356B] text-white shadow-md scale-[1.02]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Recruitment Exams ({courses.length})
            </button>

            {examCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleFilterClick(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  selectedCat.toUpperCase() === cat.slug.toUpperCase()
                    ? 'bg-[#1769D2] text-white shadow-md scale-[1.02]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-3xl"></div>
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200 shadow-inner">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
                Upcoming Batch Enrolling
              </span>
              <h3 className="text-xl font-black text-[#0B1E3D] font-heading mt-2">
                New {selectedCat} Live Coaching Batch Starting Soon
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed max-w-lg mx-auto">
                Admissions for our dedicated <strong>{selectedCat}</strong> interactive live Zoom batch and full test series are now open. Reserve your seat or speak with our academic counselors.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                to={`/enquiry?course=${encodeURIComponent(selectedCat)}`}
                className="inline-flex items-center gap-2 bg-[#1769D2] hover:bg-[#12356B] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-sm transition-all"
              >
                Book Free Demo Class <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => handleFilterClick('ALL')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-black transition-all"
              >
                View All Available Courses
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
