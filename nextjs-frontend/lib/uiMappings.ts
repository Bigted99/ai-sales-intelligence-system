export const intentConfig = {
  high: {
    label: "High",
    color: "text-green-600",
    bg: "bg-green-100",
  },

  medium: {
    label: "Medium",
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },

  low: {
    label: "Low",
    color: "text-red-600",
    bg: "bg-red-100",
  },
};

export const statusConfig = {
  new: {
    label: "New",
    color: "text-blue-700",
    bg: "bg-blue-100",
  },

  qualified: {
    label: "Qualified",
    color: "text-purple-700",
    bg: "bg-purple-100",
  },

  contacted: {
    label: "Contacted",
    color: "text-cyan-700",
    bg: "bg-cyan-100",
  },

  meeting_booked: {
    label: "Meeting Booked",
    color: "text-amber-700",
    bg: "bg-amber-100",
  },

  proposal_sent: {
    label: "Proposal Sent",
    color: "text-orange-700",
    bg: "bg-orange-100",
  },

  won: {
    label: "Won",
    color: "text-green-700",
    bg: "bg-green-100",
  },

  lost: {
    label: "Lost",
    color: "text-red-700",
    bg: "bg-red-100",
  },
};

export const activityConfig = {
  lead_created: {
    label: "Lead Created",
    color: "bg-blue-500",
  },

  ai_analysis: {
    label: "AI Analysis",
    color: "bg-purple-500",
  },

  status_change: {
    label: "Status Change",
    color: "bg-amber-500",
  },

  outreach: {
    label: "Outreach",
    color: "bg-green-500",
  },
};


export function getStatusConfig(status?: string) {
  return (
    statusConfig[status as keyof typeof statusConfig] ?? {
      label: "Unknown",
      color: "text-gray-700",
      bg: "bg-gray-100",
    }
  );
}

export function getIntentConfig(intent?: string) {
  return (
    intentConfig[intent as keyof typeof intentConfig] ?? {
      label: "Unknown",
      color: "text-gray-700",
      bg: "bg-gray-100",
    }
  );
}

export function getActivityConfig(type?: string) {
  return (
    activityConfig[type as keyof typeof activityConfig] ?? {
      label: "Activity",
      color: "bg-gray-400",
    }
  );
}

export const getSenderStyles = (
  senderType?: string
) => {
  switch (senderType?.toLowerCase()) {
    case "ai":
      return {
        bg: "bg-blue-50",
        label: "AI",
      };

    case "lead":
      return {
        bg: "bg-gray-100",
        label: "Lead",
      };

    case "human":
      return {
        bg: "bg-green-50",
        label: "Human",
      };

    default:
      return {
        bg: "bg-slate-100",
        label: "Unknown",
      };
  }
};