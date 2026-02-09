import React, { useState, useEffect } from 'react';
import { Send, FileText, CheckCircle2 } from 'lucide-react';
import { EstimationData } from '../types';
import { PROJECT_TYPES, PROJECT_SCALES, FEATURES } from '../constants';

interface ContactProps {
  estimationData?: EstimationData | null;
}

const Contact: React.FC<ContactProps> = ({ estimationData }) => {
  const [message, setMessage] = useState('');

  // Update message when estimation data changes
  useEffect(() => {
    if (estimationData) {
      const projectType = PROJECT_TYPES.find(p => p.id === estimationData.state.projectType)?.label || estimationData.state.projectType;
      const projectScale = PROJECT_SCALES.find(s => s.id === estimationData.state.projectScale)?.label || estimationData.state.projectScale;
      const features = estimationData.state.selectedFeatures
        .map(id => FEATURES.find(f => f.id === id)?.label)
        .filter(Boolean)
        .join(', ');

      const defaultText = `以下の見積もり結果について相談したいです。

【見積もり概要】
・開発タイプ: ${projectType}
・規模感: ${projectScale}
・デザイン素材: ${estimationData.state.isDesignProvided ? '支給あり' : '制作希望'}
・機能: ${features || '特になし'}
・保守サポート: ${estimationData.state.maintenance ? '希望する' : '希望しない'}
・概算費用: ¥${estimationData.totalPrice.toLocaleString()}~

【相談詳細】
(ここに具体的な相談内容を記載してください)
`;
      setMessage(defaultText);
    }
  }, [estimationData]);

  return (
    <section id="contact" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left: Info */}
          <div className="sticky top-24">
            <span className="text-brand-600 font-bold tracking-wider text-xs uppercase mb-3 block px-3 py-1 bg-brand-50 inline-block rounded-full">Contact Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              プロジェクトの具体化を<br />
              <span className="text-brand-600">プロフェッショナルがサポート</span>
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-8">
              概算見積もり結果をもとに、より詳細な要件定義や実現可能性の調査を行います。
              「まだふんわりした状態」でも構いません。まずは専門家と話してみませんか？
            </p>

            {estimationData && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                 <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-slate-200">
                   <FileText className="w-5 h-5 text-brand-600" />
                   <span className="font-bold text-slate-800">選択中の見積もりプラン</span>
                 </div>
                 <div className="space-y-3 text-sm">
                   <div className="flex justify-between">
                     <span className="text-slate-500">開発タイプ</span>
                     <span className="font-bold text-slate-900">{PROJECT_TYPES.find(p => p.id === estimationData.state.projectType)?.label}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-500">規模感</span>
                     <span className="font-bold text-slate-900">{PROJECT_SCALES.find(s => s.id === estimationData.state.projectScale)?.label}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-500">概算費用</span>
                     <span className="font-bold text-brand-600 text-lg">¥{estimationData.totalPrice.toLocaleString()}~</span>
                   </div>
                 </div>
                 {estimationData.proposal && (
                   <div className="mt-4 pt-4 border-t border-slate-200">
                     <div className="flex items-center text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg font-medium">
                       <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
                       AI提案書が含まれています
                     </div>
                   </div>
                 )}
              </div>
            )}
          </div>

          {/* Right: Form */}
          <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              {estimationData ? '見積もり内容についての相談' : '無料相談フォーム'}
            </h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">会社名・屋号</label>
                <input type="text" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-slate-400" placeholder="例: 株式会社EstiMate" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">ご担当者名</label>
                <input type="text" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-slate-400" placeholder="例: 山田 太郎" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">メールアドレス</label>
                <input type="email" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-slate-400" placeholder="例: yamada@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">ご相談内容</label>
                <textarea 
                  className="w-full h-48 bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all resize-none placeholder-slate-400" 
                  placeholder="シミュレーション結果について詳しく聞きたい、など"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-slate-300 hover:shadow-xl flex items-center justify-center space-x-2 mt-4">
                <Send className="w-4 h-4" />
                <span>相談を申し込む (無料)</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;