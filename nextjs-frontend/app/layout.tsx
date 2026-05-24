import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "AI Lead Automation",
  description: "AI-powered lead qualification system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>

      <body className="min-h-screen text-foreground font-sans flex flex-col">
        {/* Navbar */}
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

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} LeadAI. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}