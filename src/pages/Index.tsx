
import React, { useState } from 'react';
import Header from '@/components/Header';
import StatementInput from '@/components/StatementInput';
import AnalysisResult from '@/components/AnalysisResult';

const Index = () => {
  const [analyzedStatement, setAnalyzedStatement] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (statement: string) => {
    setIsAnalyzing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAnalyzedStatement(statement);
    setIsAnalyzing(false);
  };

  const handleNewAnalysis = () => {
    setAnalyzedStatement(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        {!analyzedStatement ? (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Political Statement Analysis
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Detect contradictions, hypocrisy, and misalignment between political rhetoric 
                and actual voting records, donor history, and past statements.
              </p>
            </div>
            
            <StatementInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            
            {isAnalyzing && (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-slate-700">Analyzing statement against voting records, donations, and past statements...</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Analysis Complete</h2>
              <button
                onClick={handleNewAnalysis}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                New Analysis
              </button>
            </div>
            
            <AnalysisResult statement={analyzedStatement} />
          </div>
        )}
      </main>
      
      <footer className="bg-slate-900 text-slate-400 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="mb-2">
            <strong className="text-white">Veritas</strong> - Political Accountability Platform
          </p>
          <p className="text-sm">
            This is a prototype demonstration. Data sources: ProPublica API, OpenSecrets API, Social Media Archives
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
