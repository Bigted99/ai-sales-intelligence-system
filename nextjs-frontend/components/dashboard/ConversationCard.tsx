"use client";

import { useRouter } from "next/navigation";

type ConversationCardProps = {
  conversation: any;
};

const formatLeadName = (name?: string) => {
  if (!name) return "Unknown Lead";

  return name
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
    )
    .join(" ");
};

const formatPreview = (message?: string) => {
  if (!message) return "";

  return message.length > 120
    ? `${message.slice(0, 120)}...`
    : message;
};

const formatChannel = (channel?: string) => {
  if (!channel) return "UNKNOWN";

  return channel.toUpperCase();
};

export default function ConversationCard({
  conversation,
}: ConversationCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(
          `/dashboard/messages/${conversation.id}`
        )
      }
      className="
        bg-white/70
        backdrop-blur-md
        p-6
        rounded-xl
        shadow
        hover:bg-muted/5
        hover:shadow-md
        cursor-pointer
        transition-all
        duration-200
      "
    >
      <h2 className="font-semibold text-lg">
        {formatLeadName(
          conversation.leads?.name
        )}
      </h2>

    

      <div className="mt-3">
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
          {formatChannel(
            conversation.channel
          )}
        </span>
      </div>

      <p className="mt-4 text-gray-700">
        {formatPreview(
          conversation.message
        )}
      </p>

      <p className="text-xs text-muted-foreground mt-4">
        {new Date(
          conversation.created_at
        ).toLocaleString()}
      </p>
    </div>

    
  );
}