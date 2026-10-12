import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { RanviLogo } from './RanviLogo';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const Footer = () => {
  const { settings } = useSiteSettings();
  const contact = settings?.contactInfo || {
    address: 'Ranvi Knowledge Tower, MG Road Coaching Hub, India',
    phone: '+91 98765 43210',
    email: 'admissions@ranviinstitutions.com',
    workingHours: 'Mon - Sat: 8:00 AM - 8:00 PM',
  };
  return (
    <footer className="bg-[#0B1E3D] text-slate-200 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center">
              <RanviLogo size="default" variant="light" showTagline={true} />
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed pr-6 mt-3">
              Premier educational coaching institute providing result-oriented training for banking employees (JAIIB, CAIIB, DBF, DTM) and competitive recruitment exam aspirants (Banking, SSC, Railways, Insurance, Police & Defence).
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
              <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F4B942]" /> Single-Device Secure
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" /> Ex-Banker Faculty
              </span>
            </div>
          </div>

          {/* Col 2: Banker's Path Courses */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F4B942]"></span>
              Banker's Path
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link to="/courses/jaiib-master-class-2026" className="hover:text-[#F4B942] transition-colors">JAIIB Master Course</Link></li>
              <li><Link to="/courses/caiib-advanced-comprehensive-batch" className="hover:text-[#F4B942] transition-colors">CAIIB Comprehensive</Link></li>
              <li><Link to="/bankers-path?category=DBF" className="hover:text-[#F4B942] transition-colors">DBF (Banking Diploma)</Link></li>
              <li><Link to="/bankers-path?category=DTM" className="hover:text-[#F4B942] transition-colors">DTM (Treasury Management)</Link></li>
              <li><Link to="/bankers-path?category=AMFI" className="hover:text-[#F4B942] transition-colors">AMFI Mutual Funds</Link></li>
              <li><Link to="/bankers-path?category=NISM" className="hover:text-[#F4B942] transition-colors">NISM (SEBI Modules)</Link></li>
              <li><Link to="/bankers-path?category=IRDAI" className="hover:text-[#F4B942] transition-colors">IRDAI & DRA Prep</Link></li>
            </ul>
          </div>

          {/* Col 3: Competitive Exams */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1769D2]"></span>
              Competitive Exams
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link to="/competitive-exams?cat=BANKING" className="hover:text-[#F4B942] transition-colors">IBPS PO / Clerk / RRB</Link></li>
              <li><Link to="/competitive-exams?cat=BANKING" className="hover:text-[#F4B942] transition-colors">SBI PO & Clerk Batches</Link></li>
              <li><Link to="/competitive-exams?cat=BANKING" className="hover:text-[#F4B942] transition-colors">RBI Grade B & Assistant</Link></li>
              <li><Link to="/competitive-exams?cat=GOVERNMENT" className="hover:text-[#F4B942] transition-colors">SSC CGL / CHSL / MTS</Link></li>
              <li><Link to="/competitive-exams?cat=RAILWAYS" className="hover:text-[#F4B942] transition-colors">Railways (RRB NTPC)</Link></li>
              <li><Link to="/competitive-exams?cat=POLICE_DEFENCE" className="hover:text-[#F4B942] transition-colors">Police & Defence Exams</Link></li>
              <li><Link to="/mock-tests" className="hover:text-[#F4B942] transition-colors">10–20 Model Papers</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Help */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Contact Institute
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F4B942] shrink-0 mt-0.5" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F4B942] shrink-0" />
                <a href={`tel:${contact.phone?.replace(/[^0-9+]/g, '')}`} className="hover:text-white font-bold">{contact.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F4B942] shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white truncate">{contact.email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#F4B942] shrink-0 mt-0.5" />
                <span>{contact.workingHours}</span>
              </li>
            </ul>

            <div className="mt-4 pt-3">
              <Link
                to="/enquiry"
                className="inline-flex items-center gap-1.5 text-xs font-black bg-[#F4B942] text-[#12356B] px-3.5 py-2 rounded-lg hover:bg-amber-300 transition-colors shadow-xs"
              >
                Book Free Demo Class <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} RANVI INSTITUTIONS. All rights reserved. Learn • Excel • Achieve.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-200 transition-colors">Terms & Conditions</Link>
            <Link to="/refund-policy" className="hover:text-slate-200 transition-colors">Refund & Cancellation</Link>
            <Link to="/faq" className="hover:text-slate-200 transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
