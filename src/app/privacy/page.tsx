"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-10">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-4xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">🔒 Privacy Policy</h1>
        <p className="mt-3 text-gray-600">
          Your privacy is important to us. This policy explains how we collect, use, and protect your information.
        </p>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl space-y-6">
        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p className="text-gray-600 text-sm">
              We collect personal information such as your name, email address, phone number, shipping address,
              and payment details when you place an order or create an account.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
            <p className="text-gray-600 text-sm">
              Your information is used to process orders, deliver products, provide customer support,
              improve our services, and send important updates or promotional offers.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">3. Cookies & Tracking</h2>
            <p className="text-gray-600 text-sm">
              We use cookies and similar technologies to enhance your browsing experience,
              analyze website traffic, and personalize content and advertisements.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">4. Data Security</h2>
            <p className="text-gray-600 text-sm">
              We implement industry-standard security measures to protect your personal information
              from unauthorized access, disclosure, or misuse.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">5. Third-Party Services</h2>
            <p className="text-gray-600 text-sm">
              We may share your information with trusted third-party service providers
              such as payment gateways, delivery partners, and analytics services
              only when necessary to fulfill our services.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">6. Your Rights</h2>
            <p className="text-gray-600 text-sm">
              You have the right to access, update, or delete your personal information.
              You may also opt out of marketing communications at any time.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">7. Policy Updates</h2>
            <p className="text-gray-600 text-sm">
              We may update this Privacy Policy from time to time. Any changes will be
              posted on this page with an updated effective date.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">8. Contact Us</h2>
            <p className="text-gray-600 text-sm">
              If you have any questions about this Privacy Policy, please contact us at
              <span className="font-medium"> support@yourstore.com</span>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
