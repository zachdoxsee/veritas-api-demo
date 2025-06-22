
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Whitelist of trusted URL patterns that we know work
const TRUSTED_URL_PATTERNS = [
  /^https:\/\/www\.congress\.gov\/bill\/\d+th-congress\/(house|senate)-bill\/\d+/,
  /^https:\/\/www\.senate\.gov\/legislative\/LIS\/roll_call_votes\//,
  /^https:\/\/clerk\.house\.gov\/Votes\//,
  /^https:\/\/www\.opensecrets\.org\/members-of-congress\//,
  /^https:\/\/www\.fec\.gov\//,
  /^https:\/\/ballotpedia\.org\//,
];

const validateUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    new URL(url); // Basic URL validation
    return TRUSTED_URL_PATTERNS.some(pattern => pattern.test(url));
  } catch {
    return false;
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { statement, speaker, date } = await req.json();

    console.log('Analyzing statement:', { statement, speaker, date });

    const prompt = `You are a political fact-checker and analyst. Analyze the following political statement for contradictions, hypocrisy, and inconsistencies.

STATEMENT: "${statement}"
SPEAKER: ${speaker}
DATE: ${date}

Please provide a comprehensive analysis in the following JSON format (respond with ONLY the JSON, no markdown formatting):

{
  "intentSummary": "Brief summary of the speaker's intent and positioning",
  "contradictions": [
    {
      "type": "voting_record" | "past_statement" | "donor_influence" | "policy_flip",
      "severity": "high" | "medium" | "low",
      "title": "Short title of the contradiction",
      "description": "Detailed explanation of the contradiction",
      "evidence": "Specific evidence or example"
    }
  ],
  "overallAssessment": {
    "hasContradictions": true | false,
    "confidenceLevel": "high" | "medium" | "low",
    "confidencePercentage": 85,
    "summary": "Overall assessment summary"
  },
  "supportingEvidence": [
    {
      "title": "Title of evidence",
      "description": "Description of the evidence",
      "url": null,
      "source": "Source name (e.g., 'Congress.gov', 'OpenSecrets.org', 'Senate.gov')"
    }
  ],
  "methodology": "Brief explanation of analysis methodology used"
}

IMPORTANT INSTRUCTIONS FOR URLs:
- For supportingEvidence, ALWAYS set "url" to null unless you are absolutely certain about a specific, well-known government URL
- Do NOT fabricate or guess URLs - they must be real and working
- Focus on providing detailed descriptions and authoritative source names instead of URLs
- Only include URLs if they follow these exact patterns:
  * Congress.gov bill pages: https://www.congress.gov/bill/[congress]th-congress/[chamber]-bill/[number]
  * Senate vote records: https://www.senate.gov/legislative/LIS/roll_call_votes/...
  * OpenSecrets member pages: https://www.opensecrets.org/members-of-congress/...
- If unsure about a URL, set it to null and provide a strong source name and description

Focus on:
1. Voting record inconsistencies
2. Past public statements that contradict this position
3. Campaign finance/donor influences that may conflict with stated positions
4. Policy flip-flops or position changes over time
5. Rhetorical techniques used to obscure or mislead

Be factual, objective, and provide specific examples where possible. If you cannot find contradictions, state that clearly.

IMPORTANT: Respond with ONLY the JSON object, no markdown code blocks or additional text.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert political analyst and fact-checker. You must respond with valid JSON only, no markdown formatting or code blocks. Never fabricate URLs - set them to null if uncertain.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    let rawContent = data.choices[0].message.content;
    
    console.log('Raw AI response:', rawContent);

    let analysisResult;

    try {
      // Clean the response - remove markdown code blocks if present
      let cleanedContent = rawContent.trim();
      
      // Remove markdown code blocks
      if (cleanedContent.startsWith('```json')) {
        cleanedContent = cleanedContent.replace(/^```json\n?/, '');
      }
      if (cleanedContent.startsWith('```')) {
        cleanedContent = cleanedContent.replace(/^```\n?/, '');
      }
      if (cleanedContent.endsWith('```')) {
        cleanedContent = cleanedContent.replace(/\n?```$/, '');
      }
      
      console.log('Cleaned content:', cleanedContent);
      
      analysisResult = JSON.parse(cleanedContent);
      
      // Validate and filter URLs in supporting evidence
      if (analysisResult.supportingEvidence) {
        analysisResult.supportingEvidence = analysisResult.supportingEvidence.map((evidence: any) => ({
          ...evidence,
          url: evidence.url && validateUrl(evidence.url) ? evidence.url : null
        }));
      }
      
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      console.error('Raw content was:', rawContent);
      
      // Fallback response if JSON parsing fails
      analysisResult = {
        intentSummary: "Analysis could not be completed due to response formatting issues. Please try again.",
        contradictions: [{
          type: "analysis_error",
          severity: "low",
          title: "Analysis Format Error",
          description: "The AI response could not be parsed properly. Please try again.",
          evidence: "System error in response formatting"
        }],
        overallAssessment: {
          hasContradictions: false,
          confidenceLevel: "low",
          confidencePercentage: 0,
          summary: "Analysis could not be completed due to formatting error"
        },
        supportingEvidence: [],
        methodology: "Error in analysis processing"
      };
    }

    console.log('Analysis completed successfully');

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-political-statement function:', error);
    return new Response(JSON.stringify({ 
      error: 'Analysis failed',
      message: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
