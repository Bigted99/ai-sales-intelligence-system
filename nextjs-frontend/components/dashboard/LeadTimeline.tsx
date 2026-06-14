import { formatStatus } from "@/lib/formatters";

type ActivityItem = {
  id?: string;
  type: string;
  message: string;
  created_at?: string;
};

type LeadTimelineProps = {
  activities: ActivityItem[];
};

export default function LeadTimeline({ activities }: LeadTimelineProps) {
  return (
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Activity Timeline</h2>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={activity.id || index} className="flex gap-4">
            {/* Dot */}
            <div className="mt-2">
              <div className="w-3 h-3 rounded-full bg-black" />
            </div>

            {/* Content */}
            <div>
              <p className="font-medium">
                {activities.length === 0 && (
                  <p className="text-muted-foreground">
                    No activity recorded yet.
                  </p>
                )}
                {activity.type === "status_change"
                  ? activity.message
                      .replace(/QUALIFIED/g, formatStatus("qualified"))
                      .replace(/CONTACTED/g, formatStatus("contacted"))
                      .replace(
                        /MEETING_BOOKED/g,
                        formatStatus("meeting_booked"),
                      )
                      .replace(/PROPOSAL_SENT/g, formatStatus("proposal_sent"))
                      .replace(/WON/g, formatStatus("won"))
                      .replace(/LOST/g, formatStatus("lost"))
                  : activity.message}
              </p>

              <p className="text-sm text-muted-foreground mt-1">
                {activity.created_at
                  ? new Date(activity.created_at).toLocaleString()
                  : "Just now"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
