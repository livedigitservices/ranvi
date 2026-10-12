import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { examService } from '../../services';
import { ExamCard } from '../../components/exams/ExamCard';
import { FileCheck2, Award, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const MyMockTestsPage = () => {
  const [availableTests, setAvailableTests] = useState([]);
  const [pastAttempts, setPastAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const [testsRes, historyRes] = await Promise.all([
          examService.getMockTests({ limit: 30 }),
          examService.getMyExamHistory(),
        ]);

        if (testsRes.success) setAvailableTests(testsRes.data.tests || []);
        if (historyRes.success) setPastAttempts(historyRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExamData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#12356B] font-heading">
            Mock Tests & Model Papers
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Test your readiness with 10–20 exam pattern papers. Results & solutions available instantly.
          </p>
        </div>
      </div>

      {/* Past Attempts Summary Table */}
      {pastAttempts.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-[#12356B] font-heading">
            Your Previous Test Scores & Results
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-[#12356B] border-b border-slate-200">
                  <th className="p-3 font-bold">Paper Title</th>
                  <th className="p-3 font-bold">Date Taken</th>
                  <th className="p-3 font-bold">Score</th>
                  <th className="p-3 font-bold">Accuracy</th>
                  <th className="p-3 font-bold">Result</th>
                  <th className="p-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {pastAttempts.map((attempt) => (
                  <tr key={attempt._id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-[#12356B]">{attempt.mockTestId?.title}</td>
                    <td className="p-3 text-slate-500">{new Date(attempt.submittedAt).toLocaleDateString()}</td>
                    <td className="p-3 font-black text-[#12356B]">
                      {attempt.score} / {attempt.totalMarks}
                    </td>
                    <td className="p-3 font-bold text-[#1769D2]">{attempt.accuracyPercentage}%</td>
                    <td className="p-3">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                        attempt.isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {attempt.isPassed ? 'Passed' : 'Needs Practice'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        to={`/student/mock-tests/result/${attempt._id}`}
                        className="text-xs font-bold text-[#1769D2] hover:underline"
                      >
                        View Solutions →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Available Model Papers Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#12356B] font-heading">
          Available 10–20 Model Test Papers
        </h3>

        {loading ? (
          <div className="py-16 text-center">
            <div className="w-8 h-8 border-4 border-[#1769D2] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs text-slate-500">Loading model papers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTests.map((test) => (
              <ExamCard key={test._id} test={test} isUnlocked={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
