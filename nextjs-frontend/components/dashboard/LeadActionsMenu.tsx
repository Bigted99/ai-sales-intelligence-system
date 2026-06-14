"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatStatus } from "@/lib/formatters";
type Props = {
  leadId: string;
  currentStatus: string;
};

const statuses = [
  "qualified",
  "contacted",
  "meeting_booked",
  "proposal_sent",
  "won",
  "lost",
];

export default function LeadActionsMenu({
  leadId,
  currentStatus,
}: Props) {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
const updateStatus = async (status: string) => {
  try {
    setUpdating(true);

    const response = await fetch("/api/lead/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leadId,
        status,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    setOpen(false);
  } catch (error) {
    console.error(error);
    alert("Failed to update status");
  } finally {
    setUpdating(false);
  }
};

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <MoreHorizontal size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-2 text-xs text-gray-500 border-b">
           Current: {formatStatus(currentStatus)}
          </div>

          {statuses.map((status) => (
            <button
              key={status}
              disabled={updating}
              onClick={() => updateStatus(status)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
            >
             {formatStatus(status)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}