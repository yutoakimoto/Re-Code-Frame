import React, { useState, useEffect } from 'react';
import { DraftingCompass } from 'lucide-react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 90; // Fixed header height + buffer
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {/* Sketch-style Icon container */}
          <div 
            className="p-2.5 bg-brand-600 shadow-md shadow-brand-200 text-white transition-transform group-hover:scale-105 group-hover:rotate-[-2deg]"
            style={{ 
              borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
              border: '2px solid rgba(255,255,255,0.2)'
            }}
          >
            <DraftingCompass className="w-5 h-5" strokeWidth={2} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Re:Code <span className="text-brand-600">Frame</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')} className="hover:text-brand-600 transition-colors">サービス特徴</a>
          <a href="#estimator" onClick={(e) => handleSmoothScroll(e, 'estimator')} className="hover:text-brand-600 transition-colors">料金シミュレーション</a>
          <a href="#faq" onClick={(e) => handleSmoothScroll(e, 'faq')} className="hover:text-brand-600 transition-colors">よくある質問</a>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-brand-600 transition-colors">お問い合わせ</a>
        </nav>
        
        <a 
          href="#estimator"
          onClick={(e) => handleSmoothScroll(e, 'estimator')}
          className="hidden md:block px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-full text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 cursor-pointer"
        >
          見積もり作成
        </a>
      </div>
    </header>
  );
};

export default Header;