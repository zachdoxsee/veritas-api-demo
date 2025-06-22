
import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StatementInputProps {
  onAnalyze: (statement: string) => void;
  isAnalyzing: boolean;
}

const StatementInput = ({ onAnalyze, isAnalyzing }: StatementInputProps) => {
  const [statement, setStatement] = useState('');

  const demoStatement = `"I've always been a champion of working families and will fight against corporate greed. The wealthy need to pay their fair share!" - @SenatorDemo, March 15, 2024`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (statement.trim()) {
      onAnalyze(statement);
    }
  };

  const useDemoStatement = () => {
    setStatement(demoStatement);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">🎯 Statement Analysis</h2>
        <p className="text-slate-600">Paste a political tweet, quote, or public statement to analyze for consistency with past behavior.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            placeholder="Paste the political statement, tweet, or quote here..."
            className="w-full h-32 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-slate-900 placeholder-slate-500"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={useDemoStatement}
            className="flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Try Demo Statement</span>
          </Button>
          
          <Button
            type="submit"
            disabled={!statement.trim() || isAnalyzing}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
          >
            <Search className="w-4 h-4" />
            <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Statement'}</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StatementInput;
