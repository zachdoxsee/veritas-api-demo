
import React from 'react';
import { ExternalLink, AlertTriangle, CheckCircle, Info, FileText, User, Calendar, Target, Brain, Scale, Scroll, Folder } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AnalysisResultProps {
  statement: string;
  speaker?: string;
  date?: string;
}

const AnalysisResult = ({ statement, speaker, date }: AnalysisResultProps) => {
  const displaySpeaker = speaker || "Unknown Speaker";
  const displayDate = date || "Date not specified";

  // Extract demo data based on the statement content for realistic analysis
  const isDemo = statement.includes("Senator Johnson") || statement.includes("secure our border");

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
          {isDemo ? (
            "The speaker positions themselves as consistently tough on border security and drug enforcement, emphasizing a law-and-order stance while claiming historical consistency on these positions."
          ) : (
            "The statement appears to advocate for [policy position] while framing the speaker as [characterization]. The tone is [tone analysis] and targets [audience/issue]."
          )}
        </p>
      </Card>

      {/* Contradiction Check */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Scale className="w-5 h-5 mr-2" />
          Contradiction Check
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border-l-4 border-l-red-500">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-slate-900">Voting Record Contradiction</h4>
              <p className="text-slate-700 text-sm mt-1">
                {isDemo ? (
                  <>
                    <strong>DIRECT CONTRADICTION:</strong> Voted against H.R. 2640 (Border Security Enhancement Act) in July 2023, which allocated $4.7B for border infrastructure and increased CBP staffing by 2,000 agents. Also opposed S. 1932 (Fentanyl Prevention Act) which enhanced drug interdiction funding by $850M.
                  </>
                ) : (
                  <>
                    <strong>INCONSISTENT:</strong> Voted against [specific bill] on [date] which directly contradicts this stated position. Previous voting pattern shows [pattern].
                  </>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-lg border-l-4 border-l-amber-500">
            <Info className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-slate-900">Donor Influence Analysis</h4>
              <p className="text-slate-700 text-sm mt-1">
                {isDemo ? (
                  <>
                    <strong>POTENTIAL CONFLICT:</strong> Received $340K from private prison corporations (CoreCivic, GEO Group) and border security contractors since 2022, while simultaneously taking public positions that would increase their business opportunities.
                  </>
                ) : (
                  <>
                    <strong>DONOR ALIGNMENT:</strong> Top contributors include [donor types] who benefit from this position. Received $[amount] from [relevant industries/PACs].
                  </>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border-l-4 border-l-red-500">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-slate-900">Past Statement Contradiction</h4>
              <p className="text-slate-700 text-sm mt-1">
                {isDemo ? (
                  <>
                    <strong>FLIP-FLOP DETECTED:</strong> In 2021 town hall, stated "Border walls are 20th century solutions to 21st century problems. We need comprehensive reform, not militarization." Also tweeted support for drug decriminalization programs in Oregon and Portugal as "evidence-based policy" (March 2022).
                  </>
                ) : (
                  <>
                    <strong>CONTRADICTS:</strong> Previous statement on [date] said "[quote]" which directly opposes current position. Historical stance was [previous position].
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary of Findings */}
      <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-l-red-500">
        <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
          <Scroll className="w-5 h-5 mr-2" />
          Summary of Findings
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1" />
              CONTRADICTION
            </span>
            <span className="text-slate-600">Confidence: High (85%)</span>
          </div>
          <p className="text-slate-700">
            {isDemo ? (
              "The speaker's current tough-on-crime border security stance directly contradicts their recent legislative voting record and documented public statements advocating for comprehensive immigration reform and drug policy alternatives. The position aligns closely with financial interests from private prison and border security donors."
            ) : (
              "Analysis reveals [type] contradiction between current statement and [evidence type]. The inconsistency appears to be [explanation] with [confidence level] certainty based on available evidence."
            )}
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
          {isDemo ? (
            <>
              <a 
                href="https://www.congress.gov/bill/118th-congress/house-bill/2640" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-blue-200"
              >
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <div className="flex-1">
                  <span className="text-blue-700 font-medium">H.R. 2640 - Border Security Enhancement Act (2023)</span>
                  <p className="text-slate-600 text-sm">Congress.gov - Voted NAY on July 26, 2023</p>
                </div>
              </a>
              
              <a 
                href="https://www.opensecrets.org/members-of-congress/industries" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-blue-200"
              >
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <div className="flex-1">
                  <span className="text-blue-700 font-medium">Private Prison Industry Donations: $340,000 (2022-2024)</span>
                  <p className="text-slate-600 text-sm">OpenSecrets.org - Top contributor: CoreCivic PAC</p>
                </div>
              </a>
              
              <a 
                href="https://web.archive.org/web/20220315000000*/twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-blue-200"
              >
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <div className="flex-1">
                  <span className="text-blue-700 font-medium">Tweet: "Portugal's drug decriminalization model works" (March 15, 2022)</span>
                  <p className="text-slate-600 text-sm">Twitter Archive - Wayback Machine</p>
                </div>
              </a>

              <a 
                href="https://example-townhall-transcript.com/2021/immigration-forum" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-blue-200"
              >
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <div className="flex-1">
                  <span className="text-blue-700 font-medium">Town Hall Transcript: "Comprehensive Reform Needed" (Aug 2021)</span>
                  <p className="text-slate-600 text-sm">Local News Archive - Video & Transcript Available</p>
                </div>
              </a>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200">
                <ExternalLink className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <span className="text-gray-500 font-medium">[Voting record evidence will appear here]</span>
                  <p className="text-gray-400 text-sm">ProPublica Congress API</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200">
                <ExternalLink className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <span className="text-gray-500 font-medium">[Campaign finance data will appear here]</span>
                  <p className="text-gray-400 text-sm">OpenSecrets.org</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200">
                <ExternalLink className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <span className="text-gray-500 font-medium">[Past statements/tweets will appear here]</span>
                  <p className="text-gray-400 text-sm">Social Media Archives</p>
                </div>
              </div>
            </>
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
            <strong>Cross-Reference Process:</strong> Statement analyzed against Congressional voting database (ProPublica), 
            campaign finance records (OpenSecrets), archived social media posts (Wayback Machine), and verified news interviews.
          </p>
          <p>
            <strong>Contradiction Criteria:</strong> Direct policy reversals, voting inconsistencies, rhetorical hypocrisy, 
            and donor-influenced position changes. Only verifiable contradictions with documented evidence are flagged.
          </p>
          <p>
            <strong>Confidence Scoring:</strong> Based on source reliability, recency of contradiction, and strength of evidence. 
            High (80%+), Medium (60-80%), Low (40-60%), Insufficient (&lt;40%).
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AnalysisResult;
