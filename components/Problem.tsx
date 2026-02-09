import React from 'react';
import { XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Problem: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Big Box Problem Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-4 border-brand-100 rounded-[2.5rem] p-8 md:p-12 bg-slate-50/50 relative shadow-xl shadow-brand-100/20 mt-8"
        >
          <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-brand-600 text-white px-8 py-3 rounded-full font-bold shadow-lg whitespace-nowrap text-lg tracking-wide border-4 border-white">
            こんなお悩みありませんか？
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-10 mt-6">
            {/* Left: Headline */}
            <div className="md:w-5/12 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                システム開発の<br/>
                <span className="text-brand-600">見積もり</span>って<br/>
                <span className="text-rose-500 text-4xl md:text-5xl drop-shadow-sm inline-block transform -rotate-2 mt-2">面倒くさい！</span>
              </h2>
            </div>

            {/* Right: Checklist */}
            <div className="md:w-7/12 space-y-4 w-full">
              {[
                "相場がわからず、社内の予算取りができない",
                "仕様書がないと見積もりを断られてしまう",
                "専門用語が難しくてエンジニアと会話が進まない",
                "制作会社によって提示金額がバラバラすぎる"
              ].map((text, i) => (
                <div key={i} className="flex items-start space-x-3 bg-white p-4 rounded-xl shadow-sm border border-slate-200 items-center">
                  <XCircle className="w-6 h-6 text-rose-500 shrink-0 fill-rose-50" />
                  <span className="font-bold text-slate-700 md:text-lg">{text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-10 text-center relative z-10">
             <div className="inline-block bg-white border-2 border-brand-400 text-brand-700 font-bold px-10 py-4 rounded-full shadow-lg relative text-lg">
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-b-2 border-r-2 border-brand-400 rotate-45"></div>
                とにかくもっと<span className="text-xl text-brand-600">簡単に概算を知りたい</span>・・・
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Problem;