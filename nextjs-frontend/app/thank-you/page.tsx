import "../globals.css";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20 animate-fadeIn">
      <div  className="max-w-2xl mx-auto bg-secondary/10 backdrop-blur-md shadow-xl rounded-2xl p-10 text-center animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-4">
          You're All Set 🎉
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Our AI has received your submission and is now analyzing
          intent, urgency, and recommended next steps.
        </p>

        <div className="text-left text-gray-700 space-y-3 mb-8">
          <p>✔ AI qualification in progress</p>
          <p>✔ Lead priority assigned</p>
          <p>✔ Team notified (if high intent)</p>
        </div>

        <p  className="text-sm text-gray-500 mt-6 animate-subtle-pulse">
          A member of our team will reach out shortly.
        </p>

        <Link
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}