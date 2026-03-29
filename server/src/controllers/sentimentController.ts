import { Request, Response } from 'express';

const projects = [
  { "Project Name": "A M PINNACLE", "Registration No": "BRERAP00427-9/155/R-1663/2024", "Promoter Name": "R.D.ECO DEVELOPERS PVT. LTD." },
  { "Project Name": "A ONE HERITAGE", "Registration No": "BRERAP00923-1/607/R-783/2019", "Promoter Name": "A ONE BUILDERS DEVELOPERS" },
  { "Project Name": "A.R GREEN CITY", "Registration No": "BRERAP14746-5/100/R-1767/2024", "Promoter Name": "PARI CONSTRUCTION AND DEVELOPER" }
];

const comments_pool = [
  "Good reputation as a builder.",
  "Flat location is very good with amenities.",
  "Professional and attentive team.",
  "Value for money project.",
  "Completed on time and within budget.",
  "Eco-friendly development approach.",
  "High-quality materials used.",
  "Supportive staff and good communication.",
  "Outstanding craftsmanship.",
  "Workmanship impeccable.",
  "Project not completed on time.",
  "Lot of work pending.",
  "No clarity in agreement.",
  "Advance refund not returned.",
  "Extra money charged for parking.",
  "Worst build quality.",
  "Damp walls and no waterproof roof.",
  "No response after taking money.",
  "Construction lapses reported.",
  "Work incomplete even after payment."
];

const positive_keywords = ["good", "professional", "value", "eco", "quality", "supportive", "outstanding", "impeccable", "completed"];
const negative_keywords = ["not", "pending", "no", "worst", "refund", "extra", "damp", "lapses", "incomplete"];
const financial_keywords = ["refund", "extra", "money"];
const delay_keywords = ["not completed", "pending", "incomplete"];
const quality_keywords = ["quality", "craftsmanship", "damp", "worst"];

function analyzeSentiment(text: string) {
  const lowerText = text.toLowerCase();
  let score = 0;
  
  positive_keywords.forEach(word => {
    if (lowerText.includes(word)) score += 1;
  });
  
  negative_keywords.forEach(word => {
    if (lowerText.includes(word)) score -= 1;
  });

  if (score > 0) return { score, label: "Positive" };
  else if (score < 0) return { score, label: "Negative" };
  else return { score, label: "Neutral" };
}

function getRandomElements(arr: any[], n: number) {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len) n = len;
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export const getSentimentAnalysis = async (req: Request, res: Response) => {
  try {
    const records: any[] = [];
    
    projects.forEach(project => {
      const selectedComments = getRandomElements(comments_pool, 8);
      selectedComments.forEach(comment => {
        const { score, label } = analyzeSentiment(comment);
        records.push({
          "Project Name": project["Project Name"],
          "Promoter Name": project["Promoter Name"],
          "Comment": comment,
          "Sentiment Score": score,
          "Sentiment Label": label
        });
      });
    });

    // Risk Flags
    records.forEach(record => {
      const lowerComment = record["Comment"].toLowerCase();
      record["Financial Issue"] = financial_keywords.some(k => lowerComment.includes(k)) ? 1 : 0;
      record["Delay Issue"] = delay_keywords.some(k => lowerComment.includes(k)) ? 1 : 0;
      record["Quality Issue"] = quality_keywords.some(k => lowerComment.includes(k)) ? 1 : 0;
    });

    // Group By Promoter
    const promoters = Array.from(new Set(records.map(r => r["Promoter Name"])));
    const summary = promoters.map(promoter => {
      const pRecords = records.filter(r => r["Promoter Name"] === promoter);
      const count = pRecords.length;
      
      const avgSentiment = pRecords.reduce((sum, r) => sum + r["Sentiment Score"], 0) / count;
      const sumFinancial = pRecords.reduce((sum, r) => sum + r["Financial Issue"], 0);
      const sumDelay = pRecords.reduce((sum, r) => sum + r["Delay Issue"], 0);
      const sumQuality = pRecords.reduce((sum, r) => sum + r["Quality Issue"], 0);

      const trustScore = (avgSentiment * 25) - (sumFinancial * 5) - (sumDelay * 5) - (sumQuality * 5);
      const riskScore = sumFinancial + sumDelay + sumQuality;
      const salesProbability = Math.max(0, 100 - (riskScore * 5));

      // Mock prediction
      let predictedCategory = "Average";
      if (salesProbability >= 80) predictedCategory = "High Growth";
      else if (salesProbability < 50) predictedCategory = "At Risk";

      let trend = "Stable";
      if (trustScore > 50) trend = "Upward";
      else if (trustScore < 20) trend = "Downward";

      return {
        "Promoter Name": promoter,
        "Sentiment Score": avgSentiment.toFixed(2),
        "Financial Issue": sumFinancial,
        "Delay Issue": sumDelay,
        "Quality Issue": sumQuality,
        "Trust Score (0-100)": trustScore.toFixed(2),
        "Risk Score": riskScore,
        "Sales Probability (%)": salesProbability.toFixed(2),
        "Predicted Sales Category": predictedCategory,
        "Performance Trend": trend
      };
    });

    const theoretical_report = `================ THEORETICAL BASIS OF REAL ESTATE SALES PERFORMANCE ================

1️⃣ TRUST-BASED PURCHASE FRAMEWORK

• Real estate ek capital-intensive aur long-term commitment hota hai, jisme buyer apni lifetime savings ya long-term loan invest karta hai.

• Decision-making process highly risk-sensitive hota hai. Buyers agreement terms, possession timeline, construction progress aur financial transparency ko closely evaluate karte hain.

• Jab agreement clarity, payment schedule transparency aur communication consistency maintained hoti hai, tab trust ecosystem strong hota hai.

• Refund disputes, ambiguous clauses, delayed responses ya incomplete information directly perceived risk ko increase karte hain.

• High perceived risk purchase intention ko weaken karta hai aur conversion cycle ko slow kar deta hai.

• Trust erosion market reputation ko impact karta hai, especially digital reviews aur word-of-mouth channels ke through.

• Consistent transparency, regulatory compliance aur structured customer communication sustainable sales performance ka foundation create karte hain.


2️⃣ FINANCIAL RISK & BUYER BEHAVIOURAL RESPONSE

• Real estate demand ka significant segment loan-dependent middle-income buyers ka hota hai.

• Project delay hone par EMI + rent ka parallel financial burden buyer cash-flow pressure create karta hai.

• Unplanned escalation cost, hidden charges ya additional demand notices buyer ke financial confidence ko disturb karte hain.

• Behavioural finance principles ke according, buyers financial loss ko potential gain se zyada psychologically weightage dete hain.

• Even minor financial uncertainty bhi decision postponement ya project switching behaviour trigger kar sakti hai.

• Clearly defined pricing structure aur zero-hidden-cost policy buyer confidence aur booking stability ko strengthen karti hai.


3️⃣ SERVICE QUALITY & EXECUTION IMPACT (SERVQUAL DIMENSIONS)

• Reliability directly on-time project delivery se linked hai. Schedule deviation credibility ko damage karta hai.

• Responsiveness customer interaction quality ko define karta hai. Slow grievance handling dissatisfaction escalate karta hai.

• Assurance legal compliance, documentation accuracy aur regulatory alignment ko represent karta hai.

• Tangibles physical construction quality, finishing standards, waterproofing aur material durability ko reflect karta hai.

• Empathy after-sales service, maintenance response aur long-term customer engagement ko define karta hai.

• In dimensions me weakness overall service perception ko weaken karti hai, jo repeat referrals aur new bookings par direct impact daalti hai.


4️⃣ OPERATIONAL FACTORS CONTRIBUTING TO SALES DECLINE

• Timeline deviation buyer trust ko weaken karta hai.

• Incomplete construction ya structural defects future maintenance concerns raise karte hain.

• Refund-related conflicts brand credibility ko directly damage karte hain.

• Hidden charges transparency gap create karte hain, jisse negative sentiment accelerate hota hai.

• Damp walls, leakage aur quality lapses durability perception ko reduce karte hain.

• Negative online sentiment compounding effect create karta hai jo lead conversion rate ko gradually reduce karta hai.

• Operational inefficiencies long-term revenue sustainability ko impact karti hain.


5️⃣ STRATEGIC DRIVERS OF SALES ACCELERATION

• Competitive aur justified pricing demand stimulation ka primary driver hai.

• Professional sales team behaviour aur structured communication buyer assurance increase karta hai.

• Eco-conscious branding modern urban buyers ke preference ko align karta hai.

• Superior construction quality brand differentiation create karti hai.

• Strategic location advantage long-term appreciation potential ko enhance karta hai.

• Positive customer experience organic referrals aur low-cost marketing advantage generate karta hai.

• Strong post-possession service repeat investment probability ko improve karta hai.


6️⃣ INTEGRATED TRUST–RISK SALES MODEL

• Sales performance fundamentally trust accumulation aur risk mitigation ke balance par depend karti hai.

• Trust Score customer sentiment, service consistency aur financial transparency ko reflect karta hai.

• Risk Score delay issues, financial disputes aur quality complaints ka cumulative impact measure karta hai.

• High Trust + Controlled Risk → Strong Conversion & Sustainable Growth.

• Low Trust + Elevated Risk → Booking Slowdown & Revenue Volatility.

• Strategic management priority honi chahiye:
  - Transparent documentation
  - Strict project monitoring
  - Proactive communication
  - Quality assurance controls

• Long-term brand reputation compounding competitive advantage create karti hai jo future sales pipeline ko stabilize karti hai.

====================================================================================`;

    res.json({
      success: true,
      data: {
        records,
        summary,
        theoreticalReport: theoretical_report
      }
    });

  } catch (error) {
    console.error("Error generating sentiment analysis:", error);
    res.status(500).json({ success: false, message: "Server Error generating sentiment analysis" });
  }
};
