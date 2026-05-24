
const insights = [
  "High-intent leads mention pricing 68% more often.",
  "Instagram campaigns generated the most qualified leads this week.",
  "Response delays above 2 hours reduced conversion likelihood.",
];

export default function AIInsights() {
  return (
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow">
      
      <h2 className="text-xl font-semibold mb-4">
        AI Insights
      </h2>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-muted/30 border border-border"
          >
            <p className="text-sm leading-relaxed">
              {insight}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}