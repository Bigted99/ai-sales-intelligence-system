"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";



export default function LeadActionsMenu() {
  const [open, setOpen] = useState(false);
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

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <MoreHorizontal size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm">
            View Summary
          </button>

          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm">
            Copy Email
          </button>

          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm">
            Mark Contacted
          </button>

          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm">
            Move to Qualified
          </button>

          <button className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 text-sm">
            Archive Lead
          </button>
        </div>
      )}
    </div>
  );
}