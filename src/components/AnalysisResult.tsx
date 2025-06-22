
import React from 'react';
import { ExternalLink, AlertTriangle, CheckCircle, Info, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AnalysisResultProps {
  statement: string;
}

const AnalysisResult = ({ statement }: AnalysisResultProps) => {
  return (
    <div className="space-y-6">
      {/* Statement Input */}
      <Card className="p-6 bg-slate-50 border-l-4 border-l-blue-600">
        <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
          🎯 Statement Input
        </h3>
        <div className="bg-white p-4 rounded-lg border italic text-slate-700">
          "{statement}"
        </div>
      </Card>

      {/* GPT Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
          🧠 GPT Analysis
        </h3>
        <p className="text-slate-700 leading-relaxed">
          This statement positions the politician as a populist advocate for working-class Americans, 
          explicitly opposing corporate interests and wealthy individuals while advocating for progressive 
          taxation policies. The rhetoric employs common anti-establishment framing typical of campaigns 
          targeting economic inequality.
        </p>
      </Card>

      {/* Contradiction Check */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          ⚖️ Contradiction Check
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-slate-900">Voting Record</h4>
              <p className="text-slate-700 text-sm">
                <strong>CONTRADICTS:</strong> Voted in favor of H.R. 1234 (Corporate Tax Relief Act) in 2023, 
                reducing corporate tax rates from 21% to 18%. Also voted against S. 567 (Minimum Wage Protection Act).
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-slate-900">Donor History</h4>
              <p className="text-slate-700 text-sm">
                <strong>CONTRADICTS:</strong> Received $2.3M from corporate PACs in 2023-2024 cycle, 
                including $450K from financial services and $380K from pharmaceutical companies.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-slate-900">Past Public Statements</h4>
              <p className="text-slate-700 text-sm">
                <strong>CONSISTENT:</strong> Similar rhetoric found in 12 previous tweets and 3 campaign speeches 
                since 2022, maintaining consistent messaging on wealth inequality.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary of Findings */}
      <Card className="p-6 bg-red-50 border-l-4 border-l-red-500">
        <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
          📜 Summary of Findings
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              CONTRADICTION
            </span>
            <span className="text-slate-600">High confidence level</span>
          </div>
          <p className="text-slate-700">
            While the politician's public messaging consistently advocates for working families, 
            their legislative voting record and campaign financing sources directly contradict these stated values. 
            The gap between rhetoric and action suggests performative populism rather than genuine policy commitment.
          </p>
        </div>
      </Card>

      {/* Supporting Evidence */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          📂 Supporting Evidence
        </h3>
        
        <div className="space-y-3">
          <a 
            href="#" 
            className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-blue-600" />
            <div className="flex-1">
              <span className="text-blue-600 font-medium">H.R. 1234 - Corporate Tax Relief Act (2023)</span>
              <p className="text-slate-600 text-sm">ProPublica Congressional Voting Database</p>
            </div>
          </a>
          
          <a 
            href="#" 
            className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-blue-600" />
            <div className="flex-1">
              <span className="text-blue-600 font-medium">Campaign Finance Report Q4 2023</span>
              <p className="text-slate-600 text-sm">OpenSecrets.org FEC Database</p>
            </div>
          </a>
          
          <a 
            href="#" 
            className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-blue-600" />
            <div className="flex-1">
              <span className="text-blue-600 font-medium">Previous Tweet: "Supporting American Business" (Jan 2023)</span>
              <p className="text-slate-600 text-sm">Twitter/X Archive</p>
            </div>
          </a>
        </div>
      </Card>

      {/* Notes */}
      <Card className="p-6 bg-blue-50">
        <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
          🧵 Notes
        </h3>
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div className="text-slate-700 space-y-2">
            <p>
              This analysis was conducted during a mid-term election cycle, when populist messaging 
              typically increases among incumbent politicians seeking re-election.
            </p>
            <p>
              The politician's district has experienced significant economic hardship, making anti-corporate 
              rhetoric politically advantageous despite contradictory legislative actions.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalysisResult;
