import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-3xl w-full text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4  bg-linear-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent animate-gradient ">
          Submit Your Request
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Every submission is automatically analyzed by our AI engine to
          determine intent, urgency, and recommended next steps.
        </p>

        <p className="text-sm text-gray-500">
          Your information is securely processed and reviewed before
          our team reaches out.
        </p>
      </div>

      <ContactForm />
    </main>
    
  );
}