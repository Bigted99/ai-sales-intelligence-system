import { getIntentConfig } from "@/lib/uiMappings";

type MetricCardProps = {
  title: string;
  value: number | string;
  intent?: "high" | "medium" | "low";
};

export default function MetricCard({
  title,
  value,
  intent,
}: MetricCardProps) {
  const intentUi = getIntentConfig(intent);

  return (
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>

      <h2 className={`text-2xl font-semibold ${intentUi.color}`}>
        {value}
      </h2>
    </div>
  );
}