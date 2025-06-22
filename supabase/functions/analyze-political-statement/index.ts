
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

Please provide a comprehensive analysis in the following JSON format:

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
      "url": "https://example.com/evidence" | null,
      "source": "Source name"
    }
  ],
  "methodology": "Brief explanation of analysis methodology used"
}

Focus on:
1. Voting record inconsistencies
2. Past public statements that contradict this position
3. Campaign finance/donor influences that may conflict with stated positions
4. Policy flip-flops or position changes over time
5. Rhetorical techniques used to obscure or mislead

Be factual, objective, and provide specific examples where possible. If you cannot find contradictions, state that clearly.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert political analyst and fact-checker with access to comprehensive political databases. Provide thorough, objective analysis based on factual information.' },
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
    let analysisResult;

    try {
      analysisResult = JSON.parse(data.choices[0].message.content);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // Fallback response if JSON parsing fails
      analysisResult = {
        intentSummary: data.choices[0].message.content.substring(0, 200) + "...",
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
