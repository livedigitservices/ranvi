import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { courseService } from '../../services';
import { CourseCard } from '../../components/course/CourseCard';
import { PageBanner } from '../../components/common/PageBanner';
import { Landmark, Award, BookOpen, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export const BankersPathPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(categoryParam || 'ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCat(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, catRes] = await Promise.all([
          courseService.getCourses({ division: 'BANKERS_PATH', limit: 20 }),
          courseService.getCategories({ division: 'BANKERS_PATH' }),
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
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

  const filteredCourses = selectedCat === 'ALL'
    ? courses
    : courses.filter(c =>
        c.categoryId?.slug?.toUpperCase() === selectedCat.toUpperCase() ||
        c.categoryId?._id === selectedCat ||
        c.title?.toUpperCase().includes(selectedCat.toUpperCase())
      );

  const certificationsList = [
    { name: 'JAIIB', color: 'bg-blue-600', desc: 'Junior Associate of Indian Institute of Bankers — 4 subjects: IE&IFS, PPB, AFM, RBWM' },
    { name: 'CAIIB', color: 'bg-red-600', desc: 'Certified Associate of Indian Institute of Bankers — 4 core + 1 elective subject for scale promotions' },
    { name: 'DBF', color: 'bg-emerald-600', desc: 'Diploma in Banking & Finance — flagship entry credential for aspirants seeking bank clerk/PO jobs' },
    { name: 'DTM', color: 'bg-amber-600', desc: 'Diploma in Treasury, Investment & Risk Management — dealing room, money market & forex specialization' },
    { name: 'AMFI', color: 'bg-purple-600', desc: 'Association of Mutual Funds in India — mandatory ARN registration for wealth management' },
    { name: 'NISM (SEBI)', color: 'bg-blue-700', desc: 'National Institute of Securities Markets — equity derivatives, currency, and investment advisory' },
    { name: 'IRDAI', color: 'bg-pink-600', desc: 'Insurance Regulatory and Development Authority — life and general insurance agency & POSP' },
    { name: 'DRA', color: 'bg-teal-600', desc: 'Debt Recovery Agent IIBF certification for authorized debt collection & recovery officers' },
  ];

  return (
    <div className="bg-[#F7F9FC] pb-20">
      <PageBanner
        title="Banker's Path — Banking, Insurance & Finance Programs"
        subtitle="Specialized professional coaching for in-service banking employees, financial consultants, and bank aspirants pursuing rapid career promotions and IIBF/SEBI certifications."
        breadcrumbs={[{ label: "Banker's Path" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Certification Filter Tabs */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#1769D2]" />
            <span className="text-xs font-black text-[#12356B] uppercase tracking-wider">
              Filter by Certification Program:
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
              All Banker's Path ({courses.length})
            </button>

            {certificationsList.map((cert) => (
              <button
                key={cert.name}
                onClick={() => handleFilterClick(cert.name)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  selectedCat.toUpperCase() === cert.name.toUpperCase()
                    ? 'bg-[#1769D2] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cert.name}
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
              Our new {selectedCat} live Zoom batch is currently enrolling. Speak with our academic counselors for syllabus details and schedules.
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

        {/* Comprehensive 8-Certifications Overview Guide */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="mb-6">
            <span className="text-xs font-black uppercase text-[#1769D2] tracking-wider bg-[#EAF3FF] px-3 py-1 rounded-full">
              IIBF & SEBI Recognized
            </span>
            <h3 className="text-2xl font-black text-[#12356B] font-heading mt-2">
              Complete Banker's Path Curriculum Guide
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certificationsList.map((cert) => (
              <div key={cert.name} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-3 h-3 rounded-full ${cert.color}`}></span>
                    <span className="text-base font-black text-[#12356B]">{cert.name}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
