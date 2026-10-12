import React, { useState, useEffect } from 'react';
import { examService } from '../../services';
import { ExamCard } from '../../components/exams/ExamCard';
import { PageBanner } from '../../components/common/PageBanner';
import { FileCheck2, Filter, Award, ShieldCheck, Sparkles } from 'lucide-react';

export const MockTestsPage = () => {
  const [tests, setTests] = useState([]);
  const [divisionFilter, setDivisionFilter] = useState('ALL');
  const [freeOnly, setFreeOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await examService.getMockTests({ limit: 30 });
        if (res.success && res.data) {
          setTests(res.data.tests || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  const filteredTests = tests.filter((test) => {
    if (divisionFilter !== 'ALL' && test.division !== divisionFilter) return false;
    if (freeOnly && !test.isDemoFree) return false;
    return true;
  });

  return (
    <div className="space-y-12 pb-20">
      <PageBanner
        title="Online Mock Tests & 10–20 Model Papers"
        subtitle="Simulate the actual examination environment with full-length model test papers. Includes sectional time management, instant answer key analysis, and negative marking calculations."
        breadcrumbs={[{ label: 'Mock Tests' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Filters Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase mr-1">Category:</span>
            {[
              { label: 'All Model Papers', val: 'ALL' },
              { label: "Banker's Path (JAIIB / CAIIB)", val: 'BANKERS_PATH' },
              { label: 'Competitive Exams (IBPS / SBI / SSC)', val: 'COMPETITIVE_EXAMS' },
            ].map((f) => (
              <button
                key={f.val}
                onClick={() => setDivisionFilter(f.val)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  divisionFilter === f.val
                    ? 'bg-[#12356B] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs font-bold text-[#12356B] cursor-pointer bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <input
              type="checkbox"
              checked={freeOnly}
              onChange={(e) => setFreeOnly(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span>Show Free Demo Tests Only</span>
          </label>
        </div>

        {/* Papers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <ExamCard key={test._id} test={test} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <FileCheck2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#12356B]">No Model Papers Found</h3>
            <p className="text-xs text-slate-500 mt-1">Try switching filters to view other available model papers.</p>
          </div>
        )}
      </div>
    </div>
  );
};
