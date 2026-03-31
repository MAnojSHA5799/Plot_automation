import { Request, Response } from 'express';

const API_KEY = process.env.SERPER_API_KEY || "e145e0bf1bbcdc1daf0505b5a265f850b80678e2";

export const getUpcomingEvents = async (req: Request, res: Response) => {
  try {
    const url = "https://google.serper.dev/search";
    const cities = ["Patna", "Muzaffarpur", "Gaya", "Bhagalpur", "Darbhanga"];
    const keywords = ["upcoming events 2026", "expo 2026"];

    const allEvents: any[] = [];
    const headers = {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    };

    const queries: { city: string; query: string }[] = [];
    for (const city of cities.slice(0, 2)) {
      for (const keyword of keywords) {
        queries.push({ city, query: `${keyword} in ${city}, Bihar` });
      }
    }

    const fetchPromises = queries.map(async (q) => {
      try {
        const payload = JSON.stringify({ q: q.query });
        const response = await fetch(url, {
          method: "POST",
          headers,
          body: payload,
        });
        const data = await response.json();
        const results = data.organic || [];
        
        return results.map((event: any) => {
          // AI Prediction Simulations
          const predictedAttendance = Math.floor(Math.random() * 4500) + 500;
          const aiConfidence = Math.floor(Math.random() * 20) + 75; // 75-95%
          const impactScore = Math.floor(Math.random() * 4) + 6; // 6-10
          
          const titleLower = event.title.toLowerCase();
          const snippetLower = (event.snippet || "").toLowerCase();
          const textLower = titleLower + " " + snippetLower;
          
          let category = "Other";
          
          if (textLower.includes('expo') || textLower.includes('exhibition')) category = "Expo";
          else if (textLower.includes('conference') || textLower.includes('summit')) category = "Conference";
          else if (textLower.includes('fair') || textLower.includes('b2b') || textLower.includes('trade')) category = "Trade Fair";

          const blocklist = ['rakhi', 'party', 'dj', 'holi', 'diwali', 'navratri', 'ramnavami', 'durga puja', 'new year', '31st', 'night', 'comedy', 'stand-up', 'music', 'concert', 'ticket', 'festive', 'marriage', 'wedding'];
          const isBlocked = blocklist.some(word => textLower.includes(word));
          
          if (isBlocked) category = "Other";
          
          // Generate a random date in the next 15 days for simulation
          const randomDays = Math.floor(Math.random() * 15);
          const eventDate = new Date();
          eventDate.setDate(eventDate.getDate() + randomDays);
          const eventDateStr = eventDate.toISOString().split('T')[0];

          return {
            Event_Name: event.title,
            Location: q.city,
            Link: event.link,
            Snippet: event.snippet,
            Predicted_Attendance: predictedAttendance,
            AI_Confidence: aiConfidence,
            Real_Estate_Impact: impactScore,
            Category: category,
            Event_Date: eventDateStr
          };
        });
      } catch (e) {
        console.error("Error fetching for", q.query, e);
        return [];
      }
    });

    const resultsArrays = await Promise.all(fetchPromises);
    resultsArrays.forEach((arr) => {
      allEvents.push(...arr);
    });

    const validEvents = allEvents.filter(ev => ev.Category !== "Other");

    const uniqueEvents = Array.from(
      new Map(validEvents.map((item) => [item.Event_Name, item])).values()
    );

    // Sort by AI Confidence
    uniqueEvents.sort((a, b) => b.AI_Confidence - a.AI_Confidence);

    // Generating Global AI Metrics
    const totalAttendance = uniqueEvents.reduce((acc, ev) => acc + ev.Predicted_Attendance, 0);
    const avgImpact = uniqueEvents.length > 0 
      ? (uniqueEvents.reduce((acc, ev) => acc + ev.Real_Estate_Impact, 0) / uniqueEvents.length).toFixed(1)
      : 0;

    const cityDistribution = cities.reduce((acc, city) => {
      acc[city] = uniqueEvents.filter(ev => ev.Location === city).length;
      return acc;
    }, {} as any);

    const generatedTrends = [
      { month: 'Jan', signal: Math.floor(Math.random() * 100) + 20 },
      { month: 'Feb', signal: Math.floor(Math.random() * 100) + 40 },
      { month: 'Mar', signal: Math.floor(Math.random() * 100) + 60 },
      { month: 'Apr', signal: Math.floor(Math.random() * 100) + 50 },
      { month: 'May', signal: Math.floor(Math.random() * 100) + 80 },
      { month: 'Jun', signal: Math.floor(Math.random() * 100) + 95 }
    ];

    res.json({
      success: true,
      count: uniqueEvents.length,
      globalMetrics: {
        TotalPredictedAttendance: totalAttendance,
        AverageMarketImpact: avgImpact,
        CityDistribution: Object.entries(cityDistribution).map(([name, count]) => ({ name, count })),
        AITrends: generatedTrends
      },
      data: uniqueEvents
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: "Server Error fetching events" });
  }
};
