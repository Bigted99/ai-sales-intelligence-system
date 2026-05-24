type KpiCardProps = {
  title: string;
  value: number | string;
  subtitle?: string;
};

export default function KpiCard({
  title,
  value,
  subtitle,
}: KpiCardProps) {
  return (
    <div className="bg-text/5 border border-primary/10 rounded-2xl p-6">
      <p className="text-text/60 text-sm">
        {title}
      </p>

      <h3 className="text-4xl font-bold mt-2">
        {value}
      </h3>

      {subtitle && (
        <p className="text-text/50 text-sm mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}