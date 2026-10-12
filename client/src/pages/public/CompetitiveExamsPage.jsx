import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { courseService } from '../../services';
import { CourseCard } from '../../components/course/CourseCard';
import { PageBanner } from '../../components/common/PageBanner';
import { Building2, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

export const CompetitiveExamsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat');

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
          courseService.getCourses({ division: 'COMPETITIVE_EXAMS', limit: 20 }),
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
      setSearchParams(searchParams);
    } else {
      setSearchParams({ cat: slug });
    }
  };

  const examCategories = [
    { slug: 'BANKING', label: 'Banking (IBPS/SBI/RBI)', color: 'bg-blue-600' },
    { slug: 'GOVERNMENT', label: 'Government (SSC CGL/CHSL)', color: 'bg-orange-600' },
    { slug: 'RAILWAYS', label: 'Railways (RRB NTPC/Group D)', color: 'bg-purple-600' },
    { slug: 'INSURANCE', label: 'Insurance (LIC/NIACL)', color: 'bg-blue-800' },
    { slug: 'POLICE_DEFENCE', label: 'Police & Defence', color: 'bg-teal-600' },
    { slug: 'TEACHING', label: 'Teaching & State PSC', color: 'bg-amber-600' },
  ];

  const filteredCourses = selectedCat === 'ALL'
    ? courses
    : courses.filter(c =>
        c.categoryId?.slug?.toUpperCase() === selectedCat.toUpperCase() ||
        c.categoryId?._id === selectedCat ||
        c.title?.toUpperCase().includes(selectedCat.toUpperCase())
      );

  return (
    <div className="bg-[#F7F9FC] pb-20">
      <PageBanner
        title="All Competitive Examinations Coaching"
        subtitle="Build your career with confidence. Intensive preparation for Banking (IBPS, SBI, RBI), SSC (CGL, CHSL, MTS), Railways (RRB), Insurance (LIC), Police, Defence, and State Government recruitment examinations."
        breadcrumbs={[{ label: "Competitive Exams" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Category Filter Chips */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
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
                  ? 'bg-[#12356B] text-white shadow-md'
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
                    ? 'bg-[#1769D2] text-white shadow-md'
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
              <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#12356B]">Upcoming Batch for {selectedCat}</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Our new {selectedCat} live batch is currently enrolling. Book a free demo class with our subject faculty.
            </p>
            <div className="mt-4">
              <button
                onClick={() => handleFilterClick('ALL')}
                className="text-xs font-bold text-[#1769D2] hover:underline"
              >
                View all available courses
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
