export const metadata = {
  title: "About Us | TechVibe",
  description:
    "Learn more about TechVibe — a modern technology platform delivering scalable and secure digital solutions.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-16 bg-bgs text-gray-800">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About TechVibe</h1>

        <p className="text-lg leading-relaxed mb-6">
          <strong>TechVibe</strong> is a modern technology platform focused on
          building scalable, secure, and user-centric digital solutions. We
          believe technology should simplify complexity and create real impact.
        </p>

        <p className="text-lg leading-relaxed mb-10">
          Founded by passionate developers, TechVibe combines clean design,
          modern architecture, and industry best practices to deliver reliable
          software products.
        </p>

        <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
        <ul className="list-disc pl-6 space-y-2 mb-10">
          <li>Full-stack web application development</li>
          <li>E-commerce and digital platforms</li>
          <li>Secure authentication & payment systems</li>
          <li>Admin dashboards & data-driven systems</li>
          <li>Performance-optimized scalable solutions</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg leading-relaxed mb-10">
          Our mission is to empower businesses and individuals by delivering
          reliable, scalable, and future-ready technology solutions.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Why Choose TechVibe</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Clean, maintainable, and scalable code</li>
          <li>Security-first development approach</li>
          <li>Modern UI/UX standards</li>
          <li>Performance and reliability focused</li>
          <li>Continuous improvement and innovation</li>
        </ul>
      </section>
    </main>
  );
}
