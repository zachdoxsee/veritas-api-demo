import React, { useState } from 'react';
import { Search, Sparkles, Upload, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StatementInputProps {
  onAnalyze: (data: {
    statement: string;
    speaker: string;
    date: string;
    source: 'text' | 'file';
  }) => void;
  isAnalyzing: boolean;
}

const StatementInput = ({ onAnalyze, isAnalyzing }: StatementInputProps) => {
  const [statement, setStatement] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [date, setDate] = useState('');
  const [inputMethod, setInputMethod] = useState<'text' | 'file'>('text');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const demoStatement = `"We need to allow Medicare to negotiate prescription drug prices to bring down costs for seniors. Big Pharma has gotten away with price gouging for too long, and it's time to put patients over profits." - Senator Rick Scott, March 2024`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalStatement = inputMethod === 'file' && uploadedFile 
      ? `[File: ${uploadedFile.name}] ${statement}` 
      : statement;
      
    if (finalStatement.trim() && speaker.trim()) {
      onAnalyze({
        statement: finalStatement,
        speaker: speaker.trim(),
        date: date || new Date().toISOString().split('T')[0],
        source: inputMethod
      });
    }
  };

  const useDemoStatement = () => {
    setStatement(demoStatement);
    setSpeaker('Senator Rick Scott');
    setDate('2024-03-15');
    setInputMethod('text');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setStatement(`Uploaded file: ${file.name}`);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-300/50 p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-red-100/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="mb-6 relative z-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-3 flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-3">
            <Search className="w-5 h-5 text-white" />
          </div>
          Statement Analysis
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Upload or paste a political statement, tweet, or public quote to analyze for consistency with past behavior and voting records.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        {/* Input Method Toggle */}
        <div className="flex space-x-2 bg-slate-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setInputMethod('text')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              inputMethod === 'text'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Text Input
          </button>
          <button
            type="button"
            onClick={() => setInputMethod('file')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              inputMethod === 'file'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            File Upload
          </button>
        </div>

        {/* Speaker Input */}
        <div>
          <Label htmlFor="speaker" className="text-slate-700 font-medium mb-2 flex items-center">
            <User className="w-4 h-4 mr-2" />
            Speaker/Politician Name *
          </Label>
          <Input
            id="speaker"
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
            placeholder="e.g., Senator John Smith, Rep. Jane Doe"
            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        {/* Date Input */}
        <div>
          <Label htmlFor="date" className="text-slate-700 font-medium mb-2 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Statement Date (Optional)
          </Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Statement Input */}
        <div>
          <Label className="text-slate-700 font-medium mb-2 block">
            Statement Content *
          </Label>
          
          {inputMethod === 'text' ? (
            <textarea
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              placeholder="Paste the political statement, tweet, or quote here..."
              className="w-full h-32 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-slate-900 placeholder-slate-500"
              required
            />
          ) : (
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <div className="text-slate-600 font-medium text-lg mb-2">
                Coming Soon
              </div>
              <p className="text-sm text-slate-500">
                File upload functionality will be available soon
              </p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-3 items-center sm:flex-row sm:space-y-0 sm:justify-between sm:items-center pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={useDemoStatement}
            className="flex items-center space-x-2 border-slate-300 hover:bg-slate-50 w-full sm:w-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>Try Demo Statement</span>
          </Button>
          
          <Button
            type="submit"
            disabled={!statement.trim() || !speaker.trim() || isAnalyzing}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 w-full sm:w-auto"
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
