import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { courseService } from '../../services';
import { CourseCard } from '../../components/course/CourseCard';
import { PageBanner } from '../../components/common/PageBanner';
import { Landmark, Award, BookOpen, ShieldCheck, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export const BankersPathPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || searchParams.get('cat');

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
          courseService.getCourses({ division: 'BANKERS_PATH', limit: 30 }),
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
      searchParams.delete('cat');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

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

  const filteredCourses = selectedCat === 'ALL'
    ? courses
    : courses.filter(c => {
        const sel = selectedCat.toUpperCase();
        const catSlug = c.categoryId?.slug?.toUpperCase() || '';
        const catName = c.categoryId?.name?.toUpperCase() || '';
        const title = c.title?.toUpperCase() || '';

        if (catSlug === sel || c.categoryId?._id === selectedCat) return true;
        if (title.includes(sel) || catName.includes(sel)) return true;

        if (sel.includes('NISM') && (catSlug.includes('NISM') || title.includes('NISM'))) return true;
        if (sel.includes('SEBI') && (catSlug.includes('NISM') || title.includes('SEBI'))) return true;

        return false;
      });

  const activeCertInfo = certificationsList.find(
    (c) => c.name.toUpperCase() === selectedCat.toUpperCase() || (selectedCat.toUpperCase().includes('NISM') && c.name.includes('NISM'))
  );

  return (
    <div className="bg-[#F7F9FC] pb-20">
      <PageBanner
        title="Banker's Path — Banking, Insurance & Finance Programs"
        subtitle="Specialized professional coaching for in-service banking employees, financial consultants, and bank aspirants pursuing rapid career promotions and IIBF/SEBI certifications."
        breadcrumbs={[{ label: "Banker's Path" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Certification Filter Tabs */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3.5">
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
                  ? 'bg-[#12356B] text-white shadow-md scale-[1.02]'
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
                  selectedCat.toUpperCase() === cert.name.toUpperCase() ||
                  (selectedCat.toUpperCase().includes('NISM') && cert.name.includes('NISM'))
                    ? 'bg-[#1769D2] text-white shadow-md scale-[1.02]'
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
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1769D2] flex items-center justify-center mx-auto border border-blue-200 shadow-inner">
              <Landmark className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider bg-[#EAF3FF] text-[#12356B] px-3 py-1 rounded-full">
                IIBF / SEBI Program
              </span>
              <h3 className="text-xl font-black text-[#0B1E3D] font-heading mt-2">
                New {selectedCat} Certification Batch Starting Soon
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed max-w-lg mx-auto">
                {activeCertInfo?.desc ||
                  `Our new ${selectedCat} live Zoom batch is currently enrolling. Speak with our academic counselors for syllabus details, schedules, and fee concessions.`}
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                to={`/enquiry?course=${encodeURIComponent(selectedCat)}`}
                className="inline-flex items-center gap-2 bg-[#1769D2] hover:bg-[#12356B] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-sm transition-all"
              >
                Book Free Counseling & Syllabus <ArrowRight className="w-4 h-4" />
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
