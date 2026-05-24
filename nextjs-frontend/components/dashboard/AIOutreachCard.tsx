type AIOutreachCardProps = {
  openingMessage: string;
  channel: string;
  status: string;
};

export default function AIOutreachCard({
  openingMessage,
  channel,
  status
}: AIOutreachCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow">
      <p className="text-sm uppercase tracking-wide text-gray-400 mb-2">
        {channel}
      </p>

      <p className="text-lg leading-relaxed">
        {openingMessage}
      </p>

      <p className="text-xs text-muted-foreground mt-3">
        Status: {status} 
      </p>
    </div>
  );
}