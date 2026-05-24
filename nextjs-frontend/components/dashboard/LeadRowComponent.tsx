import Link from "next/link";

type LeadRowProps = {
  id: string;
  name: string;
  message: string;
  intent: "high" | "medium" | "low";
  score: number;
};

export default function LeadRow({
  id,
  name,
  message,
  intent,
  score,
}: LeadRowProps) {
  return (
    <div className="border-b border-border py-4 ">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold capitalize">{name}</h3>

        <span
          className={`
            text-sm font-semibold px-3 py-1 rounded-full
            ${intent === "high" && "bg-green-100 text-green-700"}
            ${intent === "medium" && "bg-yellow-100 text-yellow-700"}
            ${intent === "low" && "bg-red-100 text-red-700"}
          `}
        >
          {intent}
        </span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">AI Score: {score}</span>

        <div className="flex gap-3 text-sm">
          <Link
            href={`/dashboard/leads/${id}`}
            className="text-sm text-blue-600 hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
