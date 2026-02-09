import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-brand-600' : 'text-slate-800 group-hover:text-brand-600'}`}>
          {question}
        </span>
        <div className={`p-1 rounded-full transition-colors ${isOpen ? 'bg-brand-50 text-brand-600' : 'bg-slate-50 text-slate-400 group-hover:text-brand-500'}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-slate-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "このシミュレーションで出た金額は確定ですか？",
      answer: "いいえ、あくまでシステム開発の一般的な相場に基づいた概算シミュレーションです。お客様の具体的な要件（こだわりのデザイン、複雑な権限設定、既存システムとの連携など）をヒアリングさせていただいた上で、正式な御見積書を無料で作成いたします。"
    },
    {
      question: "AI（ChatGPTなど）を活用したシステム開発は可能ですか？",
      answer: "はい、得意分野です。OpenAI API等のLLM（大規模言語モデル）を組み込んだ業務効率化ツールや、社内データをAIが検索・回答するRAGシステムの構築実績が多数ございます。ぜひご相談ください。"
    },
    {
      question: "仕様書や要件定義書がなくても依頼できますか？",
      answer: "問題ありません。弊社のプロジェクトマネージャーが、お客様の「やりたいこと」や「解決したい課題」を丁寧にヒアリングし、要件定義からサポートいたします。"
    },
    {
      question: "既存システムの改修やリニューアルも対応できますか？",
      answer: "はい、対応可能です。「ソースコードはあるが仕様書がない」「作った担当者が退職して詳細が不明」といったレガシーシステムの解析・モダン化（リプレイス）も承っております。"
    },
    {
      question: "開発後の保守・運用サポートはありますか？",
      answer: "はい、ございます。サーバーの監視、セキュリティアップデート、軽微な修正対応など、システムを安定稼働させるための月額保守プランをご用意しております。"
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold tracking-wider text-xs uppercase mb-3 block px-3 py-1 bg-brand-50 inline-block rounded-full">Q&A</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            よくあるご質問
          </h2>
          <p className="text-slate-600">
            システム開発に関する疑問や不安にお答えします。
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;