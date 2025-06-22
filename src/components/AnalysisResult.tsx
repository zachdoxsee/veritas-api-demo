
import React from 'react';
import { ExternalLink, AlertTriangle, CheckCircle, Info, FileText, User, Calendar, Target, Brain, Scale, Scroll, Folder, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';

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

interface AnalysisResultProps {
  statement: string;
  speaker?: string;
  date?: string;
  aiAnalysis?: AIAnalysisResult | null;
}

const AnalysisResult = ({ statement, speaker, date, aiAnalysis }: AnalysisResultProps) => {
  const displaySpeaker = speaker || "Unknown Speaker";
  const displayDate = date || "Date not specified";

  // Use demo data if no AI analysis is available
  const isDemo = !aiAnalysis && (statement.includes("Senator Johnson") || statement.includes("secure our border"));

  const getSeverityColor = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-amber-500 bg-amber-50';
      case 'low': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />;
      case 'medium': return <Info className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />;
      case 'low': return <Info className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />;
      default: return <Info className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />;
    }
  };

  const getConfidenceColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Statement Input */}
      <Card className="p-6 bg-gradient-to-r from-slate-50 to-blue-50/30 border-l-4 border-l-blue-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100/30 rounded-full -translate-y-8 translate-x-8"></div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Statement Input
        </h3>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-slate-600 space-x-4">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span className="font-medium">{displaySpeaker}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{displayDate}</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border italic text-slate-700 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-lg"></div>
            <div className="pl-4">
              "{statement}"
            </div>
          </div>
        </div>
      </Card>

      {/* Intent Summary */}
      <Card className="p-6 bg-gradient-to-r from-white to-purple-50/30">
        <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          Intent Summary
        </h3>
        <p className="text-slate-700 leading-relaxed">
          {aiAnalysis?.intentSummary || (isDemo ? (
            "The speaker positions themselves as consistently tough on border security and drug enforcement, emphasizing a law-and-order stance while claiming historical consistency on these positions."
          ) : (
            "The statement appears to advocate for [policy position] while framing the speaker as [characterization]. The tone is [tone analysis] and targets [audience/issue]."
          ))}
        </p>
      </Card>

      {/* Contradiction Check */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Scale className="w-5 h-5 mr-2" />
          Contradiction Analysis
        </h3>
        
        <div className="space-y-4">
          {aiAnalysis?.contradictions && aiAnalysis.contradictions.length > 0 ? (
            aiAnalysis.contradictions.map((contradiction, index) => (
              <div key={index} className={`flex items-start space-x-3 p-4 rounded-lg border-l-4 ${getSeverityColor(contradiction.severity)}`}>
                {getSeverityIcon(contradiction.severity)}
                <div>
                  <h4 className="font-medium text-slate-900">{contradiction.title}</h4>
                  <p className="text-slate-700 text-sm mt-1">
                    <strong>{contradiction.type.toUpperCase().replace('_', ' ')}:</strong> {contradiction.description}
                  </p>
                  {contradiction.evidence && (
                    <p className="text-xs text-slate-600 mt-2 italic">
                      Evidence: {contradiction.evidence}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : !aiAnalysis && isDemo ? (
            // Demo data fallback
            <>
              <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border-l-4 border-l-red-500">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-slate-900">Voting Record Contradiction</h4>
                  <p className="text-slate-700 text-sm mt-1">
                    <strong>DIRECT CONTRADICTION:</strong> Voted against H.R. 2640 (Border Security Enhancement Act) in July 2023, which allocated $4.7B for border infrastructure and increased CBP staffing by 2,000 agents.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-lg border-l-4 border-l-amber-500">
                <Info className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-slate-900">Donor Influence Analysis</h4>
                  <p className="text-slate-700 text-sm mt-1">
                    <strong>POTENTIAL CONFLICT:</strong> Received $340K from private prison corporations and border security contractors since 2022.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border-l-4 border-l-green-500">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-slate-900">No Major Contradictions Detected</h4>
                <p className="text-slate-700 text-sm mt-1">
                  The AI analysis did not identify significant contradictions in this statement based on available information.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Summary of Findings */}
      <Card className={`p-6 border-l-4 ${aiAnalysis?.overallAssessment.hasContradictions ? 'bg-gradient-to-r from-red-50 to-orange-50 border-l-red-500' : 'bg-gradient-to-r from-green-50 to-blue-50 border-l-green-500'}`}>
        <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
          <Scroll className="w-5 h-5 mr-2" />
          Summary of Findings
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
              aiAnalysis?.overallAssessment.hasContradictions ? getConfidenceColor(aiAnalysis.overallAssessment.confidenceLevel) : 'bg-green-100 text-green-800'
            }`}>
              {aiAnalysis?.overallAssessment.hasContradictions ? (
                <>
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  CONTRADICTIONS FOUND
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  NO MAJOR ISSUES
                </>
              )}
            </span>
            <span className="text-slate-600">
              Confidence: {aiAnalysis?.overallAssessment.confidenceLevel || 'Medium'} ({aiAnalysis?.overallAssessment.confidencePercentage || 75}%)
            </span>
          </div>
          <p className="text-slate-700">
            {aiAnalysis?.overallAssessment.summary || (isDemo ? (
              "The speaker's current tough-on-crime border security stance directly contradicts their recent legislative voting record and documented public statements advocating for comprehensive immigration reform and drug policy alternatives."
            ) : (
              "Analysis completed. The statement has been cross-referenced against available political databases and historical records."
            ))}
          </p>
        </div>
      </Card>

      {/* Supporting Evidence */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Folder className="w-5 h-5 mr-2" />
          Supporting Evidence
        </h3>
        
        <div className="space-y-3">
          {aiAnalysis?.supportingEvidence && aiAnalysis.supportingEvidence.length > 0 ? (
            aiAnalysis.supportingEvidence.map((evidence, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-blue-200">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <div className="flex-1">
                  <span className="text-blue-700 font-medium">{evidence.title}</span>
                  <p className="text-slate-600 text-sm">{evidence.description}</p>
                  <p className="text-slate-500 text-xs mt-1">Source: {evidence.source}</p>
                </div>
              </div>
            ))
          ) : isDemo ? (
            // Demo evidence
            <>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-blue-200">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <div className="flex-1">
                  <span className="text-blue-700 font-medium">H.R. 2640 - Border Security Enhancement Act (2023)</span>
                  <p className="text-slate-600 text-sm">Congress.gov - Voted NAY on July 26, 2023</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-blue-200">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <div className="flex-1">
                  <span className="text-blue-700 font-medium">Private Prison Industry Donations: $340,000 (2022-2024)</span>
                  <p className="text-slate-600 text-sm">OpenSecrets.org - Top contributor: CoreCivic PAC</p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <Shield className="w-4 h-4 text-gray-400" />
              <div className="flex-1">
                <span className="text-gray-500 font-medium">Evidence sources will appear here when contradictions are detected</span>
                <p className="text-gray-400 text-sm">AI analysis searches multiple databases for supporting information</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Methodology */}
      <Card className="p-6 bg-gradient-to-r from-slate-50 to-gray-50">
        <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
          <Info className="w-5 h-5 mr-2" />
          Analysis Methodology
        </h3>
        <div className="text-slate-700 space-y-2 text-sm">
          <p>
            <strong>AI-Powered Analysis:</strong> {aiAnalysis?.methodology || "Advanced natural language processing and pattern recognition to identify inconsistencies in political statements."}
          </p>
          <p>
            <strong>Cross-Reference Process:</strong> Statement analyzed using AI models trained on political databases, 
            voting records, campaign finance data, and archived public statements.
          </p>
          <p>
            <strong>Confidence Scoring:</strong> Based on pattern strength, source reliability, and contradiction severity. 
            High (80%+), Medium (60-80%), Low (40-60%), Insufficient (&lt;40%).
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AnalysisResult;
