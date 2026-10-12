import React, { useState, useEffect } from 'react';
import { PageBanner } from '../../components/common/PageBanner';
import { facultyService } from '../../services';
import {
  Award,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Star,
  Sparkles,
  Users,
} from 'lucide-react';

export const FacultyPage = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await facultyService.getFacultyList();
        if (res.success && res.data?.length > 0) {
          setFacultyList(res.data);
        }
      } catch (err) {
        console.error('Failed to load faculty', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  // Fallback if none seeded yet
  const displayFaculty = facultyList.length > 0 ? facultyList : [
    {
      name: 'Dr. Rajesh Sharma',
      designation: 'Chief Academic Director & Lead Banking Faculty',
      experience: 'Ex-General Manager, State Bank of India • 28+ Yrs Exp',
      qualifications: 'Ph.D in Banking & Finance, CAIIB, M.Com',
      bio: 'Author of bestselling JAIIB/CAIIB strategy manuals. Trained over 25,000 banking officers across public and private commercial banks.',
      specialization: 'JAIIB / CAIIB, Banking Regulations & Retail Banking',
      subjects: ['Indian Economy & IFS', 'Principles & Practices of Banking', 'Commercial Lending Norms'],
      rating: 4.9,
      studentsTrained: '25,000+',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Prof. Ananya Sen',
      designation: 'Head of Quantitative Aptitude & DI',
      experience: 'Ex-IBPS Chief Trainer • 14+ Yrs Teaching',
      qualifications: 'M.Sc Mathematics, Gold Medalist',
      bio: 'Pioneer of high-speed Vedic calculation techniques, Caselet DI solving frameworks, and arithmetic shortcuts.',
      specialization: 'Speed Math, Data Interpretation, High-Yield Shortcuts',
      subjects: ['Data Interpretation', 'Speed Mathematics', 'Advanced Arithmetic'],
      rating: 4.9,
      studentsTrained: '18,000+',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Vikas Deshmukh (CA, CFA)',
      designation: 'Lead Mentor - Treasury & Investment Banking',
      experience: 'Ex-Treasury Head, Punjab National Bank • 19+ Yrs Exp',
      qualifications: 'Chartered Accountant (FCA), CFA, CAIIB',
      bio: 'Expert in Bank Financial Management (BFM), Basel III risk assessment, NISM certifications, and foreign currency market operations.',
      specialization: 'Treasury Management (DTM), NISM, AMFI & Forex Operations',
      subjects: ['Bank Financial Management (BFM)', 'Treasury Operations', 'Forex Regulations'],
      rating: 4.8,
      studentsTrained: '12,000+',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    },
  ];

  return (
    <div className="space-y-12 pb-24 bg-[#F8FAFC]">
      <PageBanner
        title="Distinguished Faculty & Academic Mentors"
        subtitle="Learn directly from veteran bank general managers, chartered accountants, and top competitive exam toppers dedicated to your milestone achievement."
        breadcrumbs={[{ label: 'Faculty' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-4 border-[#1769D2] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs font-bold text-slate-500">Loading faculty mentors...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayFaculty.map((member, idx) => {
              const subjectsArray = Array.isArray(member.subjects)
                ? member.subjects
                : typeof member.subjects === 'string'
                ? member.subjects.split(',').map((s) => s.trim())
                : [];

              return (
                <div
                  key={member._id || idx}
                  className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between card-hover-effect group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-200 shadow-md group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#12356B] to-[#1769D2] text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                          {member.name
                            ?.split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-extrabold text-[#0B1E3D] font-heading">
                            {member.name}
                          </h3>
                        </div>
                        <p className="text-xs text-[#1769D2] font-bold">{member.designation}</p>
                        <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                          {member.experience || `${member.experienceYears || 10}+ Yrs Experience`}
                        </span>
                      </div>
                    </div>

                    {member.qualifications && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 text-[#12356B] text-[11px] font-bold border border-blue-100">
                        <GraduationCap className="w-3.5 h-3.5 text-[#1769D2]" />
                        <span>{member.qualifications}</span>
                      </div>
                    )}

                    <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                      {member.bio ||
                        'Dedicated academic mentor committed to conceptual clarity, strategic problem-solving, and milestone achievement.'}
                    </p>

                    {member.specialization && (
                      <div className="pt-2">
                        <span className="text-[10px] font-black text-[#0B1E3D] uppercase tracking-wider block mb-1">
                          Core Specialization:
                        </span>
                        <p className="text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          {member.specialization}
                        </p>
                      </div>
                    )}

                    {subjectsArray.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">
                          Subjects Taught:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {subjectsArray.map((sub, sidx) => (
                            <span
                              key={sidx}
                              className="bg-blue-50/70 border border-blue-200/60 text-[#12356B] text-[10px] font-bold px-2 py-0.5 rounded-lg"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-bold text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Mentor
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-extrabold text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{member.rating || 4.9}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
