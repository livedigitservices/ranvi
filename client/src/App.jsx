import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { SiteSettingsProvider } from './context/SiteSettingsContext';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { StudentLayout } from './components/layout/StudentLayout';
import { FacultyLayout } from './components/layout/FacultyLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { BankersPathPage } from './pages/public/BankersPathPage';
import { CompetitiveExamsPage } from './pages/public/CompetitiveExamsPage';
import { CourseDetailsPage } from './pages/public/CourseDetailsPage';
import { OnlineClassesPage } from './pages/public/OnlineClassesPage';
import { RecordedClassesPage } from './pages/public/RecordedClassesPage';
import { MockTestsPage } from './pages/public/MockTestsPage';
import { FacultyPage } from './pages/public/FacultyPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { EnquiryDemoPage } from './pages/public/EnquiryDemoPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { CheckoutPage } from './pages/public/CheckoutPage';
import {
  PrivacyPolicyPage,
  TermsPage,
  RefundPolicyPage,
  FAQPage,
  NotFoundPage,
} from './pages/public/PolicyPages';

// Student Portal Pages
import { StudentDashboardPage } from './pages/student/StudentDashboardPage';
import { MyCoursesPage } from './pages/student/MyCoursesPage';
import { CoursePlayerPage } from './pages/student/CoursePlayerPage';
import { LiveClassesSchedulePage } from './pages/student/LiveClassesSchedulePage';
import { MyMockTestsPage } from './pages/student/MyMockTestsPage';
import { ExamTakePage } from './pages/student/ExamTakePage';
import { ExamResultPage } from './pages/student/ExamResultPage';
import { StudentPaymentsPage } from './pages/student/StudentPaymentsPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';

// Faculty Portal Pages
import { FacultyDashboardPage } from './pages/faculty/FacultyDashboardPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminCoursesPage } from './pages/admin/AdminCoursesPage';
import { AdminCourseFormPage } from './pages/admin/AdminCourseFormPage';
import { AdminFacultyPage } from './pages/admin/AdminFacultyPage';
import { AdminLessonsPage } from './pages/admin/AdminLessonsPage';
import { AdminLiveClassesPage } from './pages/admin/AdminLiveClassesPage';
import { AdminMockTestsPage } from './pages/admin/AdminMockTestsPage';
import { AdminQuestionsPage } from './pages/admin/AdminQuestionsPage';
import { AdminStudentsPage } from './pages/admin/AdminStudentsPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';

const RouteLoadingSpinner = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
    <div className="w-10 h-10 border-4 border-[#1769D2] border-t-transparent rounded-full animate-spin mb-3"></div>
    <p className="text-xs font-bold text-slate-500">Loading session...</p>
  </div>
);

// Route Guards
const ProtectedStudentRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <RouteLoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const ProtectedFacultyRoute = ({ children }) => {
  const { isAuthenticated, isFaculty, isAdmin, loading } = useAuth();
  if (loading) return <RouteLoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isFaculty && !isAdmin) return <Navigate to="/student/dashboard" replace />;
  return children;
};

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <RouteLoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/student/dashboard" replace />;
  return children;
};

export function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToastProvider>
        <AuthProvider>
          <SiteSettingsProvider>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/bankers-path" element={<BankersPathPage />} />
                <Route path="/competitive-exams" element={<CompetitiveExamsPage />} />
                <Route path="/courses/:slug" element={<CourseDetailsPage />} />
                <Route path="/online-classes" element={<OnlineClassesPage />} />
                <Route path="/recorded-classes" element={<RecordedClassesPage />} />
                <Route path="/mock-tests" element={<MockTestsPage />} />
                <Route path="/faculty" element={<FacultyPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/enquiry" element={<EnquiryDemoPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/refund-policy" element={<RefundPolicyPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Student Learning Portal */}
              <Route
                path="/student"
                element={
                  <ProtectedStudentRoute>
                    <StudentLayout />
                  </ProtectedStudentRoute>
                }
              >
                <Route index element={<Navigate to="/student/dashboard" replace />} />
                <Route path="dashboard" element={<StudentDashboardPage />} />
                <Route path="my-courses" element={<MyCoursesPage />} />
                <Route path="courses/:courseId/player" element={<CoursePlayerPage />} />
                <Route path="live-classes" element={<LiveClassesSchedulePage />} />
                <Route path="mock-tests" element={<MyMockTestsPage />} />
                <Route path="mock-tests/:mockTestId/take" element={<ExamTakePage />} />
                <Route path="mock-tests/result/:attemptId" element={<ExamResultPage />} />
                <Route path="payments" element={<StudentPaymentsPage />} />
                <Route path="profile" element={<StudentProfilePage />} />
              </Route>

              {/* Dedicated Faculty Portal */}
              <Route
                path="/faculty"
                element={
                  <ProtectedFacultyRoute>
                    <FacultyLayout />
                  </ProtectedFacultyRoute>
                }
              >
                <Route index element={<Navigate to="/faculty/dashboard" replace />} />
                <Route path="dashboard" element={<FacultyDashboardPage />} />
              </Route>

              {/* Admin Management Portal */}
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="courses" element={<AdminCoursesPage />} />
                <Route path="courses/new" element={<AdminCourseFormPage />} />
                <Route path="courses/:courseId/edit" element={<AdminCourseFormPage />} />
                <Route path="faculty" element={<AdminFacultyPage />} />
                <Route path="lessons" element={<AdminLessonsPage />} />
                <Route path="live-classes" element={<AdminLiveClassesPage />} />
                <Route path="mock-tests" element={<AdminMockTestsPage />} />
                <Route path="mock-tests/:mockTestId/questions" element={<AdminQuestionsPage />} />
                <Route path="students" element={<AdminStudentsPage />} />
                <Route path="payments" element={<AdminPaymentsPage />} />
                <Route path="enquiries" element={<AdminEnquiriesPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
                <Route path="audit-logs" element={<AdminAuditLogsPage />} />
              </Route>
            </Routes>
          </SiteSettingsProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
