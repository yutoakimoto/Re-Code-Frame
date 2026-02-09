import React from 'react';
import { MousePointerClick, Cpu, Code2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Solution: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: <MousePointerClick className="w-8 h-8 text-white" strokeWidth={2} />,
      title: "要件を選択",
      desc: "「Webシステム」「アプリ」など、選択肢からプロジェクト概要をポチポチ選ぶだけ。最短30秒。",
      color: "bg-brand-500"
    },
    {
      id: 2,
      icon: <Cpu className="w-8 h-8 text-white" strokeWidth={2} />,
      title: "AIによる即時見積もり",
      desc: "独自のロジックとAIが、現在の市場相場に基づいた概算費用と開発スケジュールを瞬時に算出。",
      color: "bg-brand-600"
    },
    {
      id: 3,
      icon: <Code2 className="w-8 h-8 text-white" strokeWidth={2} />,
      title: "プロによる実装・開発",
      desc: "概算に納得いただけたら、詳細な要件定義へ。経験豊富なエンジニアが実装までワンストップで担当。",
      color: "bg-indigo-600"
    }
  ];

  return (
    <section id="features" className="py-24 bg-brand-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold tracking-wider text-sm uppercase mb-3 block">Simple Workflow</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
             ご利用の流れ<br className="md:hidden"/> <span className="text-brand-600">簡単3ステップ</span>
          </h2>
          <p className="text-slate-600 text-lg">
            難しい知識は一切不要。誰でも直感的に利用できます。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col h-full">
               {/* Arrow Connector (Desktop) */}
               {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-6 top-24 transform -translate-y-1/2 z-20 text-brand-200">
                     <ChevronRight className="w-12 h-12" strokeWidth={3} />
                  </div>
               )}
               {/* Arrow Connector (Mobile) */}
               {index < steps.length - 1 && (
                  <div className="md:hidden absolute left-1/2 -bottom-6 transform -translate-x-1/2 z-20 text-brand-200 rotate-90">
                     <ChevronRight className="w-10 h-10" strokeWidth={3} />
                  </div>
               )}

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.2 }}
                 className="flex-1 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center relative z-10 hover:-translate-y-1 transition-transform duration-300"
               >
                  <div className="text-brand-600 font-black text-lg tracking-widest mb-4">STEP 0{step.id}</div>
                  
                  <div className={`w-20 h-20 rounded-2xl ${step.color} shadow-lg shadow-brand-200 flex items-center justify-center mb-6 transform rotate-3`}>
                    <div className="transform -rotate-3">
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-4 border-b-2 border-brand-100 pb-2 w-full">
                    {step.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-7 font-medium">
                    {step.desc}
                  </p>
               </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;