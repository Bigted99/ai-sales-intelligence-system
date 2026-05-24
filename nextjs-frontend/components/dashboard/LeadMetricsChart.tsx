"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", leads: 12 },
  { day: "Tue", leads: 19 },
  { day: "Wed", leads: 8 },
  { day: "Thu", leads: 24 },
  { day: "Fri", leads: 17 },
  { day: "Sat", leads: 10 },
  { day: "Sun", leads: 14 },
];

export default function LeadMetricsChart() {
  return (
    <div className="bg-text/5 border border-primary/10 rounded-2xl p-6">
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Lead Activity
        </h2>

        <p className="text-text/50 text-sm">
          Weekly inbound lead trends
        </p>
      </div>

      <div className="h-75">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />%

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="leads"
              stroke="#8884d8"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}