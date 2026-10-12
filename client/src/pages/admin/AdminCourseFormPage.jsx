import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { adminService, courseService, uploadService } from '../../services';
import { useToast } from '../../context/ToastContext';
import {
  BookOpen,
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  HelpCircle,
  Layers,
} from 'lucide-react';

export const AdminCourseFormPage = () => {
  const { courseId } = useParams();
  const isEditMode = Boolean(courseId);
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    division: 'BANKERS_PATH',
    categoryId: '',
    shortDescription: '',
    fullDescription: '',
    fee: 3999,
    originalPrice: 6999,
    duration: '3 Months',
    mode: 'BOTH',
    batchSchedule: 'Daily Live 7:30 PM - 9:00 PM',
    validityDays: 180,
    isDemoEligible: true,
    isFeatured: true,
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop',
    syllabus: [
      {
        title: 'Paper 1: Indian Economy & Financial System',
        description: 'Comprehensive coverage of macroeconomics and financial architecture',
        topics: ['Economic Planning in India', 'Monetary Policy & Fiscal Policy', 'Regulatory Framework of Banks'],
      },
    ],
  });

  useEffect(() => {
    const initData = async () => {
      try {
        const catRes = await courseService.getCategories();
        if (catRes.success && catRes.data) {
          setCategories(catRes.data);
        }

        if (isEditMode) {
          const courseRes = await courseService.getCourseBySlug(courseId);
          if (courseRes.success && courseRes.data) {
            const c = courseRes.data.course || courseRes.data;
            setFormData({
              title: c.title || '',
              slug: c.slug || '',
              division: c.division || 'BANKERS_PATH',
              categoryId: c.categoryId?._id || c.categoryId || '',
              shortDescription: c.shortDescription || '',
              fullDescription: c.fullDescription || '',
              fee: c.fee || 0,
              originalPrice: c.originalPrice || 0,
              duration: c.duration || '',
              mode: c.mode || 'BOTH',
              batchSchedule: c.batchSchedule || '',
              validityDays: c.validityDays || 180,
              isDemoEligible: c.isDemoEligible ?? true,
              isFeatured: c.isFeatured ?? true,
              thumbnail: c.thumbnail || '',
              syllabus: c.syllabus?.length > 0 ? c.syllabus : [
                { title: 'Module 1: Fundamentals', description: '', topics: ['Topic 1'] }
              ],
            });
          }
        } else if (catRes.data?.length > 0) {
          setFormData((prev) => ({ ...prev, categoryId: catRes.data[0]._id }));
        }
      } catch (err) {
        console.error(err);
        toastError('Failed to initialize course form data');
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, [courseId, isEditMode]);

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingThumbnail(true);
      const res = await uploadService.uploadImage(file);
      if (res.success && res.data?.url) {
        setFormData((prev) => ({ ...prev, thumbnail: res.data.url }));
        success('Course thumbnail uploaded successfully!');
      }
    } catch (err) {
      toastError(err.message || 'Image upload failed');
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const handleAddSyllabusModule = () => {
    setFormData((prev) => ({
      ...prev,
      syllabus: [
        ...prev.syllabus,
        {
          title: `Paper ${prev.syllabus.length + 1}: Subject Name`,
          description: 'Module core concepts & syllabus breakdown',
          topics: ['Topic 1', 'Topic 2'],
        },
      ],
    }));
  };

  const handleRemoveSyllabusModule = (idx) => {
    setFormData((prev) => ({
      ...prev,
      syllabus: prev.syllabus.filter((_, i) => i !== idx),
    }));
  };

  const handleAddTopic = (moduleIdx) => {
    const updated = [...formData.syllabus];
    updated[moduleIdx].topics = [...(updated[moduleIdx].topics || []), `New Topic ${updated[moduleIdx].topics.length + 1}`];
    setFormData({ ...formData, syllabus: updated });
  };

  const handleRemoveTopic = (moduleIdx, topicIdx) => {
    const updated = [...formData.syllabus];
    updated[moduleIdx].topics = updated[moduleIdx].topics.filter((_, i) => i !== topicIdx);
    setFormData({ ...formData, syllabus: updated });
  };

  const handleTopicChange = (moduleIdx, topicIdx, value) => {
    const updated = [...formData.syllabus];
    updated[moduleIdx].topics[topicIdx] = value;
    setFormData({ ...formData, syllabus: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let res;
      if (isEditMode) {
        res = await adminService.updateCourse(courseId, formData);
      } else {
        res = await adminService.createCourse(formData);
      }

      if (res.success) {
        success(isEditMode ? 'Course updated successfully!' : 'Course created and published live!');
        navigate('/admin/courses');
      }
    } catch (err) {
      toastError(err.message || 'Failed to save course');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-[#1769D2] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs font-bold text-slate-500">Loading course details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl pb-24">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/courses"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#12356B]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Course Directory
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-extrabold text-[#0B1E3D] font-heading">
            {isEditMode ? 'Edit Course Program' : 'Create & Publish New Course Program'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure course division, category, pricing, live batch schedule, syllabus modules, and cover media.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* Row 1: Title & Division */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Course Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. JAIIB Master Class 2026 (All 4 Papers)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Coaching Division *</label>
              <select
                value={formData.division}
                onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"
              >
                <option value="BANKERS_PATH">Banker's Path</option>
                <option value="COMPETITIVE_EXAMS">Competitive Exams</option>
              </select>
            </div>
          </div>

          {/* Row 2: Category & Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category Classification *</label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"
              >
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name} ({c.division})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Delivery Learning Mode *</label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"
              >
                <option value="BOTH">Online + Offline (Hybrid Classroom)</option>
                <option value="ONLINE">Online Interactive Only</option>
                <option value="OFFLINE">Offline Classroom Only</option>
              </select>
            </div>
          </div>

          {/* Row 3: Pricing & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Enrolment Fee (₹) *</label>
              <input
                type="number"
                required
                min={0}
                value={formData.fee}
                onChange={(e) => setFormData({ ...formData, fee: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Strike-through Price (₹)</label>
              <input
                type="number"
                min={0}
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g. 3 Months"
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Access Validity (Days)</label>
              <input
                type="number"
                min={30}
                value={formData.validityDays}
                onChange={(e) => setFormData({ ...formData, validityDays: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          {/* Row 4: Batch Schedule */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Live Batch Timing & Schedule</label>
            <input
              type="text"
              value={formData.batchSchedule}
              onChange={(e) => setFormData({ ...formData, batchSchedule: e.target.value })}
              placeholder="e.g. Daily Live Zoom 7:30 PM - 9:00 PM (Mon-Sat)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
            />
          </div>

          {/* Row 5: Descriptions */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Short Description (for cards) *</label>
            <textarea
              rows={2}
              required
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Summary highlighting primary target exams and core benefits..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Full In-Depth Description *</label>
            <textarea
              rows={4}
              required
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              placeholder="Detailed syllabus outline, eligibility, faculty background, and study plan..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
            />
          </div>

          {/* Row 6: Course Thumbnail Upload */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <label className="block font-bold text-slate-800">Course Thumbnail Image</label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {formData.thumbnail && (
                <img
                  src={formData.thumbnail}
                  alt="Course Thumbnail"
                  className="w-28 h-20 rounded-xl object-cover border border-slate-200 shadow-xs"
                />
              )}
              <div className="flex-1 w-full space-y-2">
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  placeholder="Image URL or upload file below..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono text-[11px]"
                />
                <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#12356B] text-white font-bold cursor-pointer hover:bg-[#0e2a56] shadow-sm">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingThumbnail ? 'Uploading Thumbnail...' : 'Upload Image File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Row 7: Dynamic Syllabus Module Builder */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  Interactive Syllabus Modules & Topics
                </label>
                <p className="text-[11px] text-slate-500">Add course modules and detailed topics for the public syllabus accordion.</p>
              </div>
              <button
                type="button"
                onClick={handleAddSyllabusModule}
                className="inline-flex items-center gap-1.5 bg-[#1769D2] hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Module
              </button>
            </div>

            {formData.syllabus.map((mod, modIdx) => (
              <div key={modIdx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    required
                    value={mod.title}
                    onChange={(e) => {
                      const updated = [...formData.syllabus];
                      updated[modIdx].title = e.target.value;
                      setFormData({ ...formData, syllabus: updated });
                    }}
                    placeholder={`Module / Paper ${modIdx + 1} Title`}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold text-xs"
                  />
                  {formData.syllabus.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSyllabusModule(modIdx)}
                      className="text-rose-500 hover:text-rose-700 p-1.5"
                      title="Remove Module"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  value={mod.description || ''}
                  onChange={(e) => {
                    const updated = [...formData.syllabus];
                    updated[modIdx].description = e.target.value;
                    setFormData({ ...formData, syllabus: updated });
                  }}
                  placeholder="Module summary / description"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[11px]"
                />

                {/* Topics in this Module */}
                <div className="pl-3 border-l-2 border-blue-200 space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-600 uppercase">Topics Covered</span>
                    <button
                      type="button"
                      onClick={() => handleAddTopic(modIdx)}
                      className="text-[11px] font-bold text-[#1769D2] hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Topic
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {mod.topics?.map((topic, topicIdx) => (
                      <div key={topicIdx} className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={topic}
                          onChange={(e) => handleTopicChange(modIdx, topicIdx, e.target.value)}
                          placeholder="Topic name"
                          className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-[11px]"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveTopic(modIdx, topicIdx)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#12356B] hover:bg-[#0e2a56] text-white font-extrabold py-3.5 px-8 rounded-xl text-sm transition-all shadow-md disabled:opacity-50"
            >
              <Save className="w-4 h-4" />{' '}
              {submitting ? 'Saving Course...' : isEditMode ? 'Update Course Program' : 'Publish Course Program'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
