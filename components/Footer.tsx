import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-white font-bold text-xl mb-4 md:mb-0 tracking-tight">
          Re:Code <span className="text-brand-500">Frame</span>
        </div>
        <div className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Re:Code Frame. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;