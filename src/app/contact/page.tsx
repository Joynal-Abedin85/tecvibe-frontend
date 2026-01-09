export const metadata = {
  title: "Contact Us | TechVibe",
  description:
    "Get in touch with TechVibe for support, partnerships, or business inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 py-16 bg-bgs text-gray-800">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        <p className="text-lg leading-relaxed mb-10">
          Have questions, feedback, or business inquiries? We’d love to hear
          from you. Reach out to us anytime.
        </p>

        <div className="bg-white shadow rounded-lg p-8 space-y-4">
          <p>
            📧 <strong>Email:</strong>{" "}
            <a
              href="mailto:support@techvibe.com"
              className="text-blue-600 hover:underline"
            >
              support@techvibe.com
            </a>
          </p>

          <p>
            🌐 <strong>Website:</strong>{" "}
            <a
              href="https://www.techvibe.com"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              www.techvibe.com
            </a>
          </p>

          <p>
            📍 <strong>Location:</strong> Remote / Global
          </p>

          <p className="text-sm text-gray-600 mt-6">
            We aim to respond to all inquiries within <strong>24–48 hours</strong>.
          </p>
        </div>
      </section>
    </main>
  );
}
