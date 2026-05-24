"use client"

import  Link  from "next/link";           


export default function NavbarComponent() {

    return(
             <nav className="bg-white/70 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="font-bold text-lg">
              LeadAI
            </Link>

            <div className="space-x-6">
              <Link href="/" className="hover:text-gray-600">
                Home
              </Link>

              <Link href="/contact">
                <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </nav>
    )
}