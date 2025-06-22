
import React, { useState } from 'react';
import Header from '@/components/Header';
import StatementInput from '@/components/StatementInput';
import AnalysisResult from '@/components/AnalysisResult';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Info } from 'lucide-react';

interface AnalysisData {
  statement: string;
  speaker: string;
  date: string;
  source: 'text' | 'file';
}

interface AIAnalysisResult {
  intentSummary: string;
  contradictions: Array<{
    type: string;
    severity: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    evidence: string;
  }>;
  overallAssessment: {
    hasContradictions: boolean;
    confidenceLevel: 'high' | 'medium' | 'low';
    confidencePercentage: number;
    summary: string;
  };
  supportingEvidence: Array<{
    title: string;
    description: string;
    url: string | null;
    source: string;
  }>;
  methodology: string;
}

const Index = () => {
  const [analyzedData, setAnalyzedData] = useState<AnalysisData | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async (data: AnalysisData) => {
    setIsAnalyzing(true);
    
    try {
      console.log('Starting analysis for:', data);
      
      const { data: result, error } = await supabase.functions.invoke('analyze-political-statement', {
        body: {
          statement: data.statement,
          speaker: data.speaker,
          date: data.date
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Analysis failed: ${error.message}`);
      }

      if (result.error) {
        throw new Error(result.message || 'Analysis failed');
      }

      console.log('Analysis result:', result);
      setAiAnalysis(result);
      setAnalyzedData(data);
      
      toast({
        title: "Analysis Complete",
        description: "Political statement has been analyzed successfully.",
      });
    } catch (error) {
      console.error('Error during analysis:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze statement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setAnalyzedData(null);
    setAiAnalysis(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with American Flag motif */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-red-50/20"></div>
      
      {/* Civic plaza background image with subtle styling */}
      <div className="absolute inset-0 opacity-[0.06]">
        <img 
          src="/lovable-uploads/caa95dd5-1806-4c0b-9c02-a5d20eb73b89.png"
          alt="Civic plaza"
          className="w-full h-full object-cover filter grayscale-[0.8] saturate-50 backdrop-blur-sm"
        />
      </div>
      
      {/* Courthouse/Justice themed background elements */}
      <div className="absolute top-20 right-10 w-64 h-64 opacity-[0.03]">
        <svg viewBox="0 0 24 24" className="w-full h-full text-slate-800">
          <path fill="currentColor" d="M7 21q-.825 0-1.413-.588T5 19V9q0-.825.588-1.413T7 7h1V5q0-2.075 1.463-3.538T13 0q2.075 0 3.538 1.462T18 5v2h1q.825 0 1.413.587T21 9v10q0 .825-.588 1.412T19 21H7Zm6-4q.825 0 1.413-.588T15 15q0-.825-.588-1.413T13 13q-.825 0-1.413.587T11 15q0 .825.587 1.412T13 17Zm-3-10h6V5q0-1.25-.875-2.125T13 2q-1.25 0-2.125.875T10 5v2Z"/>
        </svg>
      </div>
      
      {/* Constitutional/scales of justice background */}
      <div className="absolute bottom-20 left-10 w-48 h-48 opacity-[0.02]">
        <svg viewBox="0 0 24 24" className="w-full h-full text-blue-800">
          <path fill="currentColor" d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L12 1L3 7V9C3 10.1 3.9 11 5 11V22H19V11C20.1 11 21 10.1 21 9ZM7 13V19H9V13H7ZM11 13V19H13V13H11ZM15 13V19H17V13H15Z"/>
        </svg>
      </div>

      {/* Subtle American flag stripes */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-2 bg-red-600 absolute top-20"></div>
        <div className="w-full h-2 bg-red-600 absolute top-28"></div>
        <div className="w-full h-2 bg-red-600 absolute top-36"></div>
        <div className="w-full h-2 bg-red-600 absolute top-44"></div>
        <div className="w-full h-2 bg-red-600 absolute top-52"></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="max-w-5xl mx-auto px-6 pt-6">
          {!analyzedData ? (
            <div className="space-y-8">
              <div className="text-center mt-4">
                <div className="relative inline-block">
                  <h2 className="text-4xl font-bold text-slate-900 mb-4 relative z-10">
                    Political Statement Verification
                  </h2>
                </div>
                <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed mb-8">
                  Cross-reference political statements with voting records, campaign finance data, and past positions 
                  to detect contradictions, hypocrisy, and verify consistency in political rhetoric.
                </p>
              </div>
              
              <StatementInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
              
              {isAnalyzing && (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-white to-blue-600 animate-pulse"></div>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <div className="absolute inset-0 animate-ping rounded-full h-8 w-8 border border-blue-400 opacity-25"></div>
                    </div>
                    <div className="text-slate-700">
                      <div className="font-medium">Analyzing statement with AI...</div>
                      <div className="text-sm text-slate-500">Cross-referencing patterns, detecting contradictions</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Analysis Complete</h2>
                  <p className="text-slate-600 mt-1 text-sm sm:text-base">
                    Analyzed statement by {analyzedData.speaker} • {analyzedData.date}
                  </p>
                </div>
                <button
                  onClick={handleNewAnalysis}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  New Analysis
                </button>
              </div>
              
              <AnalysisResult 
                statement={analyzedData.statement} 
                speaker={analyzedData.speaker}
                date={analyzedData.date}
                aiAnalysis={aiAnalysis}
              />
            </div>
          )}
        </main>
        
        {/* Simple AI Disclaimer */}
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-200 rounded-lg p-3 text-center">
            <p className="text-sm text-amber-800 flex items-center justify-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>AI analysis results should be independently verified and are subject to inherent limitations and biases.</span>
            </p>
          </div>
        </div>
        
        <footer className="bg-slate-900/95 backdrop-blur-sm text-slate-400 py-12 mt-8 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-white">Veritas</h3>
              <p className="text-slate-300 font-medium">
                AI-Powered Political Accountability Platform
              </p>
              <div className="max-w-2xl mx-auto text-sm leading-relaxed">
                <p className="mb-2">
                  <strong className="text-slate-200">Live AI Analysis</strong> - Real-time political statement verification
                </p>
                <p>
                  Powered by: OpenAI GPT-4 • Advanced Pattern Recognition • 
                  Political Database Cross-Reference • Contradiction Detection
                </p>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-500">
                  Built for journalists, researchers, and citizens seeking political transparency
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Created by Zach Doxsee
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
