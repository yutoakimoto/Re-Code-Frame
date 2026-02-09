import React from 'react';
import { ArrowRight, CheckCircle2, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const scrollToEstimator = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('estimator');
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center justify-center">
      {/* Elegant Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-white">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-50 via-white to-white"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-100/40 rounded-full blur-[80px] animate-blob" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-indigo-50/60 rounded-full blur-[80px] animate-blob animation-delay-2000" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-brand-100 shadow-sm mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
            <span className="text-xs font-bold text-brand-700 tracking-wide uppercase">AI Estimate System</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]"
          >
            システム開発の概算を、<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
              その場で即時シミュレーション
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed font-medium"
          >
            「いくらかかるか分からない」をゼロに。<br className="hidden md:block"/>
            AI見積もりから<span className="text-slate-900 font-bold border-b-4 border-brand-200">実装・運用までワンストップ</span>で実現します。
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
          >
            <a 
              href="#estimator" 
              onClick={scrollToEstimator}
              className="w-full sm:w-auto px-10 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all shadow-xl shadow-brand-200 hover:shadow-2xl hover:shadow-brand-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>無料で見積もりを作成</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact');
                if (element) {
                   const headerOffset = 90;
                   const elementPosition = element.getBoundingClientRect().top;
                   const offsetPosition = elementPosition + window.scrollY - headerOffset;
                   window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto px-10 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold text-lg flex items-center justify-center transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              エンジニアに相談
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-500 font-medium"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500" />
              <span>会員登録不要</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bot className="w-4 h-4 text-brand-500" />
              <span>生成AI開発対応</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500" />
              <span>最短1ヶ月納品</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;