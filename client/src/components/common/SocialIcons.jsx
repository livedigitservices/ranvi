import React from 'react';
import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
} from 'lucide-react';

/**
 * Standard, pixel-perfect WhatsApp SVG Icon
 * Matches Lucide icon sizing, stroke, and fill specifications
 */
export const WhatsAppIcon = ({ className = 'w-4 h-4', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

/**
 * Standard Twitter / X SVG Icon
 */
export const TwitterXIcon = ({ className = 'w-4 h-4', ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export { Instagram, Facebook, Youtube, Linkedin };

/**
 * Reusable, clean social media links bar
 */
export const SocialLinksBar = ({
  phone = '9876543210',
  socialLinks = {},
  variant = 'footer', // 'footer' | 'card' | 'pills'
  className = '',
}) => {
  const cleanPhone = phone.replace(/[^0-9]/g, '') || '919876543210';
  const whatsappUrl = socialLinks?.whatsapp || `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`}`;
  const youtubeUrl = socialLinks?.youtube || 'https://youtube.com';
  const instagramUrl = socialLinks?.instagram || 'https://instagram.com';
  const facebookUrl = socialLinks?.facebook || 'https://facebook.com';
  const linkedinUrl = socialLinks?.linkedin || 'https://linkedin.com';

  const channels = [
    {
      name: 'WhatsApp',
      url: whatsappUrl,
      icon: WhatsAppIcon,
      brandColor: 'text-[#25D366]',
      hoverBg: 'hover:bg-[#25D366]/20 hover:border-[#25D366]/50',
      badgeBg: 'bg-[#25D366]',
    },
    {
      name: 'YouTube',
      url: youtubeUrl,
      icon: Youtube,
      brandColor: 'text-[#FF0000]',
      hoverBg: 'hover:bg-[#FF0000]/20 hover:border-[#FF0000]/50',
      badgeBg: 'bg-[#FF0000]',
    },
    {
      name: 'Instagram',
      url: instagramUrl,
      icon: Instagram,
      brandColor: 'text-pink-500',
      hoverBg: 'hover:bg-pink-600/20 hover:border-pink-500/50',
      badgeBg: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-500',
    },
    {
      name: 'Facebook',
      url: facebookUrl,
      icon: Facebook,
      brandColor: 'text-[#1877F2]',
      hoverBg: 'hover:bg-[#1877F2]/20 hover:border-[#1877F2]/50',
      badgeBg: 'bg-[#1877F2]',
    },
    {
      name: 'LinkedIn',
      url: linkedinUrl,
      icon: Linkedin,
      brandColor: 'text-[#0A66C2]',
      hoverBg: 'hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50',
      badgeBg: 'bg-[#0A66C2]',
    },
  ];

  if (variant === 'pills') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {channels.map((ch) => {
          const IconComponent = ch.icon;
          return (
            <a
              key={ch.name}
              href={ch.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit our ${ch.name} page`}
              className={`p-2.5 rounded-xl bg-slate-100 hover:bg-white text-slate-700 hover:${ch.brandColor} border border-slate-200 shadow-xs transition-all active:scale-95 flex items-center justify-center`}
            >
              <IconComponent className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 gap-2.5 ${className}`}>
      {channels.slice(0, 4).map((ch) => {
        const IconComponent = ch.icon;
        return (
          <a
            key={ch.name}
            href={ch.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Connect with Ranvi on ${ch.name}`}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#08182D] ${ch.hoverBg} border border-white/10 text-slate-200 text-xs font-bold transition-all shadow-xs group`}
          >
            <span
              className={`w-6 h-6 rounded-lg ${ch.badgeBg} text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform`}
            >
              <IconComponent className="w-3.5 h-3.5" />
            </span>
            <span className="truncate">{ch.name}</span>
          </a>
        );
      })}
    </div>
  );
};
