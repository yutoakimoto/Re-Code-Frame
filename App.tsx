import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Estimator from './components/Estimator';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { EstimationData } from './types';

const App: React.FC = () => {
  const [estimationData, setEstimationData] = useState<EstimationData | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-100 selection:text-brand-900 font-sans">
      <Header />
      <main>
        {/* Catch / Conclusion */}
        <Hero />
        
        {/* P & A: Problem & Affinity */}
        <Problem />
        
        {/* S: Solution */}
        <Solution />
        
        {/* O & A: Offer (Tool) & Action */}
        <Estimator onConsult={setEstimationData} />

        {/* FAQ */}
        <FAQ />
        
        {/* Action: Final conversion */}
        <Contact estimationData={estimationData} />
      </main>
      <Footer />
    </div>
  );
};

export default App;