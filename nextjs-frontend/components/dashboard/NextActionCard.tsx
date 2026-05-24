type NextActionCardProps = {
  nextAction: string;
  confidence?: string;
  urgency?: string;
};

const confidenceStyles = {
  high: "bg-green-500/20 text-green-400",
  medium: "bg-yellow-500/20 text-yellow-300",
  low: "bg-red-500/20 text-red-300",
};

const urgencyStyles = {
  immediate: "bg-red-500/20 text-red-300",
  medium: "bg-yellow-500/20 text-yellow-300",
  low: "bg-blue-500/20 text-blue-300",
};

export default function NextActionCard({
  nextAction,
  confidence,
  urgency,
}: NextActionCardProps) {
  return (
    <div className="bg-black text-white rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm uppercase tracking-wide text-white/50">
          Next Action
        </p>

        <div className="flex gap-2">
          {confidence && (
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                confidenceStyles[
                  confidence.toLowerCase() as keyof typeof confidenceStyles
                ]
              }`}
            >
              {confidence} Confidence
            </span>
          )}

          {urgency && (
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                urgencyStyles[
                  urgency.toLowerCase() as keyof typeof urgencyStyles
                ]
              }`}
            >
              {urgency} Urgency
            </span>
          )}
        </div>
      </div>

      {/* Main Recommendation */}
      <div className="mt-5">
        <h3 className="text-2xl font-semibold leading-relaxed break-words">{nextAction}</h3>
      </div>

      {/* Footer */}
      <div className="mt-6 border-t border-white/10 pt-4">
        <p className="text-sm text-white/40">
          AI-generated operational recommendation based on lead qualification
          and engagement signals.
        </p>
      </div>
    </div>
  );
}
