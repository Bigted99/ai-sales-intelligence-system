"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Leads",
    href: "/dashboard/leads",
    icon: Users,
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  return (
    <aside className="hidden md:flex w-72 border-r border-primary/10 bg-text/5 flex-col p-6 sticky top-0 h-screen overflow-auto">

      {/* LOGO */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-primary">
          LeadAI
        </h1>

        <p className="text-sm text-text/50 mt-1">
          Communication Intelligence
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition"
            >
              <Icon size={20} />

              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="mt-auto pt-10">
        <div className="bg-primary/10 rounded-xl p-4">
          <p className="text-sm text-text/70">
            AI-powered workflow intelligence.
          </p>
        </div>
      </div>

    </aside>
  );
}