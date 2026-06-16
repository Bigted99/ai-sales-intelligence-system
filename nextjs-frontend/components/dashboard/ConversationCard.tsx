"use client";

import { useRouter } from "next/navigation";

type ConversationCardProps = {
  conversation: any;
};

const formatLeadName = (name?: string) => {
  if (!name) return "Unknown Lead";

  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const formatPreview = (message?: string) => {
  if (!message) return "";

  return message.length > 50 ? `${message.slice(0, 40)}...` : message;
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
      onClick={() => router.push(`/dashboard/messages/${conversation.id}`)}
      className="
    bg-white
    rounded-xl
    shadow-sm
    hover:shadow-md
    transition-all
    duration-200
    cursor-pointer
    p-5
  "
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold text-lg">
            {formatLeadName(conversation.leads?.name)}
          </h2>
          
      <div className="mt-3">
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
          {formatChannel(
            conversation.channel
          )}
        </span>
      </div>
          {conversation.unread_count > 0 && (
            <div className="mt-1">
              <span
                className="
      bg-red-500
      text-white
      text-xs
      px-2
      py-1
      rounded-full
    "
              >
                New Reply
              </span>
            </div>
          )}

          <p className="text-muted-foreground mt-2">
            {formatPreview(conversation.message)}
          </p>
        </div>

        <div className="text-xs text-muted-foreground whitespace-nowrap">
          {new Date(conversation.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
