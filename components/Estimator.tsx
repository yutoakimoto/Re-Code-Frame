import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Sparkles, RefreshCw, ChevronRight, FileText, ChevronLeft, ArrowRight, X, Layers, PenTool } from 'lucide-react';
import { BASE_PRICES, FEATURES, PROJECT_SCALES, SCALE_MULTIPLIERS, PROJECT_TYPES, MAINTENANCE_COST, DESIGN_COST } from '../constants';
import { EstimateState, ProjectType, ProposalResponse, EstimationData, ProjectScale } from '../types';
import { Icon } from './ui/Icon';
import { generateProposal } from '../services/geminiService';

interface EstimatorProps {
  onConsult: (data: EstimationData) => void;
}

const Estimator: React.FC<EstimatorProps> = ({ onConsult }) => {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<EstimateState>({
    projectType: 'web',
    selectedFeatures: [],
    projectScale: 'small',
    isDesignProvided: true,
    maintenance: false,
  });
  
  const [totalPrice, setTotalPrice] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [proposal, setProposal] = useState<ProposalResponse | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Base Price
    let base = BASE_PRICES[state.projectType];
    
    // 2. Feature Cost
    const featureCost = state.selectedFeatures.reduce((acc, featId) => {
      const feat = FEATURES.find(f => f.id === featId);
      return acc + (feat ? feat.price : 0);
    }, 0);

    // 3. Scale Multiplier
    const scaleMult = SCALE_MULTIPLIERS[state.projectScale];
    
    // 4. Design Cost (Add-on)
    const designFee = state.isDesignProvided ? 0 : DESIGN_COST;

    // Logic: (Base + Features) * Scale + DesignFee
    const subTotal = (base + featureCost) * scaleMult + designFee;
    
    setTotalPrice(Math.round(subTotal));
  }, [state]);

  const toggleFeature = (id: string) => {
    setState(prev => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(id)
        ? prev.selectedFeatures.filter(f => f !== id)
        : [...prev.selectedFeatures, id]
    }));
  };

  const handleGenerateProposal = async () => {
    setIsGenerating(true);
    const result = await generateProposal(state);
    try {
        const json = JSON.parse(result);
        setProposal(json);
    } catch (e) {
        setProposal({
            summary: result,
            technicalChallenges: [],
            recommendedStack: [],
            timelineEstimation: ""
        });
    }
    setIsGenerating(false);
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    onConsult({
      state,
      totalPrice,
      proposal
    });

    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Optional: Focus the input to give visual cue
      const input = element.querySelector('input');
      if(input) input.focus();
    }
  };

  const steps = [
    { num: 1, title: "作るもの" },
    { num: 2, title: "必要な機能" },
    { num: 3, title: "規模とデザイン" },
    { num: 4, title: "概算結果" }
  ];

  return (
    <section id="estimator" className="py-24 relative bg-slate-50 border-t border-slate-100">
      
      <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="text-brand-600 font-bold tracking-wider text-xs uppercase mb-3 block px-3 py-1 bg-white inline-block rounded-full shadow-sm border border-slate-100">Estimation Tool</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">開発費用シミュレーター</h2>
          <p className="text-slate-600">わずか4ステップ。あなたのプロジェクトの概算を今すぐ算出します。</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 max-w-3xl mx-auto">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-brand-500 -z-10 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center cursor-pointer group" onClick={() => step > s.num && setStep(s.num)}>
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-[3px] shadow-sm ${
                    step >= s.num 
                      ? 'bg-brand-600 text-white border-brand-600 scale-110' 
                      : 'bg-white text-slate-400 border-slate-200 group-hover:border-slate-300'
                  }`}
                >
                  {step > s.num ? <Check className="w-5 h-5" strokeWidth={3} /> : s.num}
                </div>
                <span className={`text-xs mt-2 font-bold transition-colors uppercase tracking-wide ${step >= s.num ? 'text-brand-700' : 'text-slate-400'}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Panel */}
        <div className="bg-white rounded-3xl p-6 md:p-10 min-h-[500px] flex flex-col shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            
            {/* Step 1: Project Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <div className="mb-8 border-b border-slate-100 pb-4">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">どのようなシステムを作りますか？</h3>
                    <p className="text-slate-500 text-sm">最もイメージに近いものを1つ選択してください。</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {PROJECT_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setState({ ...state, projectType: type.id as ProjectType });
                        setTimeout(() => setStep(2), 300); // Auto advance
                      }}
                      className={`group relative p-6 rounded-2xl border text-left transition-all duration-200 ${
                        state.projectType === type.id 
                          ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-500 shadow-lg' 
                          : 'bg-white border-slate-200 hover:border-brand-300 hover:bg-slate-50 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between relative z-10">
                        <div className={`p-3 rounded-xl mb-4 transition-colors shadow-sm ${
                          state.projectType === type.id ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-brand-600'
                        }`}>
                          {type.icon}
                        </div>
                        {state.projectType === type.id && (
                            <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center animate-in zoom-in duration-200">
                                <Check className="w-4 h-4" strokeWidth={3} />
                            </div>
                        )}
                      </div>
                      <h4 className={`text-lg font-bold mb-2 relative z-10 ${state.projectType === type.id ? 'text-brand-900' : 'text-slate-900'}`}>{type.label}</h4>
                      <p className={`text-sm relative z-10 leading-relaxed ${state.projectType === type.id ? 'text-brand-700' : 'text-slate-500'}`}>{type.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Features */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <div className="mb-8 border-b border-slate-100 pb-4">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">必要な機能はありますか？</h3>
                    <p className="text-slate-500 text-sm">複数選択可能です。迷ったらそのままでも構いません。</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {FEATURES.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 relative group ${
                        state.selectedFeatures.includes(feature.id)
                          ? 'bg-brand-50 border-brand-500 shadow-md ring-1 ring-brand-500' 
                          : 'bg-white border-slate-200 hover:border-brand-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <Icon name={feature.icon || 'Circle'} className={`w-6 h-6 transition-colors ${state.selectedFeatures.includes(feature.id) ? 'text-brand-600' : 'text-slate-400 group-hover:text-brand-500'}`} />
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          state.selectedFeatures.includes(feature.id) ? 'bg-brand-600 border-brand-600 scale-110' : 'border-slate-300 bg-white'
                        }`}>
                          {state.selectedFeatures.includes(feature.id) && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                        </div>
                      </div>
                      <div className={`font-bold text-sm mb-1 ${state.selectedFeatures.includes(feature.id) ? 'text-brand-900' : 'text-slate-900'}`}>{feature.label}</div>
                      <div className="text-xs text-slate-500 leading-tight">{feature.description}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Scale & Design & Maint */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <div className="mb-8 border-b border-slate-100 pb-4">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">規模感とデザイン</h3>
                    <p className="text-slate-500 text-sm">プロジェクトの規模（ページ数）と、デザイン素材の有無を選択してください。</p>
                </div>
                
                <div className="space-y-8">
                  {/* Project Scale */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 flex items-center mb-4 uppercase tracking-wider">
                      <span className="w-1 h-4 bg-blue-500 rounded mr-2"></span>
                      システム規模・ページ数
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {PROJECT_SCALES.map((scale) => (
                        <button
                          key={scale.id}
                          onClick={() => setState({ ...state, projectScale: scale.id as ProjectScale })}
                          className={`p-5 rounded-xl border text-left transition-all ${
                            state.projectScale === scale.id 
                              ? 'bg-blue-50 border-blue-500 shadow-md ring-1 ring-blue-500' 
                              : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                             <div className={`font-bold ${state.projectScale === scale.id ? 'text-blue-900' : 'text-slate-900'}`}>{scale.label}</div>
                             {state.projectScale === scale.id && <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center"><Check className="w-3 h-3" strokeWidth={3} /></div>}
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed mb-3">{scale.desc}</p>
                          <div className={`text-xs font-mono inline-block px-2 py-1 rounded font-bold ${
                              state.projectScale === scale.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                          }`}>
                            コスト係数: x{scale.multiplier}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Design Option */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-700 flex items-center mb-4 uppercase tracking-wider">
                        <span className="w-1 h-4 bg-purple-500 rounded mr-2"></span>
                        デザイン・素材の準備
                      </h4>
                      <div className="space-y-3">
                        <button
                          onClick={() => setState({ ...state, isDesignProvided: true })}
                          className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${
                            state.isDesignProvided
                              ? 'bg-purple-50 border-purple-500 shadow-sm ring-1 ring-purple-500'
                              : 'bg-white border-slate-200 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <Layers className={`w-5 h-5 mr-3 ${state.isDesignProvided ? 'text-purple-600' : 'text-slate-400'}`} />
                            <div className="text-left">
                              <div className={`font-bold text-sm ${state.isDesignProvided ? 'text-purple-900' : 'text-slate-900'}`}>素材支給あり</div>
                              <div className="text-xs text-slate-500">ガイドラインや既存デザインを使用</div>
                            </div>
                          </div>
                          {state.isDesignProvided && <Check className="w-4 h-4 text-purple-600" />}
                        </button>

                        <button
                          onClick={() => setState({ ...state, isDesignProvided: false })}
                          className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${
                            !state.isDesignProvided
                              ? 'bg-purple-50 border-purple-500 shadow-sm ring-1 ring-purple-500'
                              : 'bg-white border-slate-200 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <PenTool className={`w-5 h-5 mr-3 ${!state.isDesignProvided ? 'text-purple-600' : 'text-slate-400'}`} />
                            <div className="text-left">
                              <div className={`font-bold text-sm ${!state.isDesignProvided ? 'text-purple-900' : 'text-slate-900'}`}>デザイン制作依頼</div>
                              <div className="text-xs text-slate-500">ゼロからデザインを作成 (+¥{DESIGN_COST.toLocaleString()})</div>
                            </div>
                          </div>
                          {!state.isDesignProvided && <Check className="w-4 h-4 text-purple-600" />}
                        </button>
                      </div>
                    </div>

                    {/* Maintenance */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-700 flex items-center mb-4 uppercase tracking-wider">
                        <span className="w-1 h-4 bg-green-500 rounded mr-2"></span>
                        公開後の保守・運用
                      </h4>
                      <button
                        onClick={() => setState({ ...state, maintenance: !state.maintenance })}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all h-[116px] ${
                          state.maintenance
                            ? 'bg-green-50 border-green-500 shadow-md ring-1 ring-green-500'
                            : 'bg-white border-slate-200 hover:border-green-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${state.maintenance ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                            <RefreshCw className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <div className={`font-bold text-sm ${state.maintenance ? 'text-green-900' : 'text-slate-900'}`}>保守サポート希望</div>
                            <div className="text-xs text-slate-500 mt-1">
                              サーバー監視、セキュリティ更新等
                            </div>
                          </div>
                        </div>
                        <div className="text-right pl-2">
                          <div className={`font-mono font-bold ${state.maintenance ? 'text-green-700' : 'text-slate-900'}`}>+¥{MAINTENANCE_COST.toLocaleString()}</div>
                          <span className="text-[10px] text-slate-400">/月</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Result */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col lg:flex-row gap-8"
                ref={resultRef}
              >
                {/* Left: Calculation */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 bg-slate-900 rounded-lg text-white">
                         <FileText className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">概算見積もり結果</h3>
                    </div>
                    
                    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl relative overflow-hidden mb-6 text-white group hover:shadow-2xl transition-shadow duration-300">
                      {/* Decorative elements */}
                       <div className="absolute top-0 right-0 p-4 opacity-10 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                         <FileText className="w-40 h-40 text-white" />
                       </div>
                       <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>

                      <div className="relative z-10">
                        <div className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Total Estimated Cost</div>
                        <div className="text-5xl lg:text-6xl font-bold tracking-tight mb-2 flex items-baseline font-sans">
                          ¥{totalPrice.toLocaleString()}
                          <span className="text-2xl text-slate-500 font-normal ml-1">~</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-8 font-medium border-l-2 border-slate-700 pl-3">
                          *税抜価格・要件により変動します。<br/>
                          これはAIによるシミュレーション値です。
                        </p>
                        
                        {state.maintenance && (
                          <div className="flex justify-between items-center py-4 border-t border-slate-700/50">
                            <span className="text-slate-300 font-medium flex items-center text-sm">
                              <RefreshCw className="w-4 h-4 mr-2 text-green-400" />
                              月額保守費用
                            </span>
                            <span className="text-xl font-mono text-white font-bold">¥{MAINTENANCE_COST.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="text-slate-500 text-xs mb-1 font-semibold uppercase">開発規模</div>
                        <div className="text-slate-900 font-bold">{PROJECT_SCALES.find(s => s.id === state.projectScale)?.label}</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="text-slate-500 text-xs mb-1 font-semibold uppercase">デザイン対応</div>
                        <div className="text-slate-900 font-bold">{state.isDesignProvided ? '素材支給あり' : '制作依頼 (追加費)'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={handleGenerateProposal}
                      disabled={isGenerating || !!proposal}
                      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-3 transition-all shadow-lg ${
                        proposal 
                        ? 'bg-green-50 text-green-700 border border-green-200 cursor-default'
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-200 hover:shadow-purple-300'
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>AIが構成案を作成中...</span>
                        </>
                      ) : proposal ? (
                        <>
                          <Check className="w-5 h-5" strokeWidth={3} />
                          <span>AI提案書の生成完了</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>AIで詳細な提案書を作成する</span>
                        </>
                      )}
                    </button>
                    <a 
                      href="#contact"
                      onClick={scrollToContact}
                      className="block w-full py-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-center font-bold transition-all shadow-lg shadow-brand-100 cursor-pointer"
                    >
                      この内容で専門家に相談する
                    </a>
                  </div>
                </div>

                {/* Right: AI Proposal Preview */}
                <div className={`flex-1 rounded-2xl border border-slate-200 bg-white p-2 overflow-hidden flex flex-col transition-all duration-500 shadow-sm ${proposal ? 'opacity-100' : 'opacity-60 grayscale'}`}>
                   <div className="bg-slate-50 h-full rounded-xl p-6 relative overflow-y-auto custom-scrollbar border border-slate-100">
                     {!proposal ? (
                       <div className="h-full flex flex-col items-center justify-center text-center p-8">
                         <div className="w-16 h-16 bg-white border border-purple-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                           <Sparkles className="w-8 h-8 text-purple-500" />
                         </div>
                         <h4 className="text-slate-900 font-bold mb-3 text-lg">AI Project Insight</h4>
                         <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                           左のボタンをクリックすると、Gemini AIがあなたのプロジェクト要件を分析し、
                           <span className="font-bold text-slate-700">技術構成</span>と<span className="font-bold text-slate-700">開発スケジュール</span>を提案します。
                         </p>
                       </div>
                     ) : (
                       <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-6"
                       >
                         <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                            <div className="flex items-center space-x-2">
                              <Sparkles className="w-5 h-5 text-purple-600" />
                              <span className="font-bold text-slate-800">AI提案書ドラフト</span>
                            </div>
                            <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded font-bold">Generated by Gemini</span>
                         </div>
                         
                         <div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">プロジェクト概要</div>
                            <p className="text-slate-700 text-sm leading-relaxed">{proposal.summary}</p>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           <div>
                             <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">推奨技術スタック</div>
                             <div className="flex flex-wrap gap-2">
                               {proposal.recommendedStack.map(s => (
                                 <span key={s} className="text-xs px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-medium shadow-sm">{s}</span>
                               ))}
                             </div>
                           </div>
                           <div>
                             <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">想定スケジュール</div>
                             <div className="flex items-center text-slate-700 text-sm font-medium bg-white px-3 py-2 rounded-lg border border-slate-200 inline-block shadow-sm">
                               <Clock className="w-4 h-4 mr-2 text-slate-400" />
                               {proposal.timelineEstimation}
                             </div>
                           </div>
                         </div>

                         <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
                            <div className="text-xs font-bold text-orange-700 uppercase tracking-wider mb-2 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1.5" />
                              技術的考慮事項
                            </div>
                            <ul className="list-disc list-inside text-slate-700 text-sm space-y-2 pl-1">
                              {proposal.technicalChallenges.map((c, i) => <li key={i}>{c}</li>)}
                            </ul>
                         </div>
                       </motion.div>
                     )}
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-100">
             {step > 1 ? (
               <button 
                 onClick={() => setStep(step - 1)}
                 className="text-slate-500 hover:text-slate-800 px-4 py-2 flex items-center transition-colors text-sm font-bold"
               >
                 <ChevronLeft className="w-4 h-4 mr-1" />
                 戻る
               </button>
             ) : <div />}
             
             {step < 4 ? (
               <button 
                 onClick={() => setStep(step + 1)}
                 className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-full font-bold flex items-center space-x-2 transition-all shadow-lg shadow-brand-200 hover:shadow-brand-300 transform hover:-translate-y-0.5"
               >
                 <span>次へ進む</span>
                 <ArrowRight className="w-4 h-4" />
               </button>
             ) : (
               <button 
                 onClick={() => {
                   setStep(1);
                   setState({ projectType: 'web', selectedFeatures: [], projectScale: 'small', isDesignProvided: true, maintenance: false });
                   setProposal(null);
                 }}
                 className="text-slate-500 hover:text-slate-800 px-4 py-2 flex items-center space-x-2 transition-colors text-sm font-medium"
               >
                 <RefreshCw className="w-4 h-4" />
                 <span>最初からやり直す</span>
               </button>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper icons for local usage if needed
function Clock(props: any) { return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }
function AlertCircle(props: any) { return <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }

export default Estimator;