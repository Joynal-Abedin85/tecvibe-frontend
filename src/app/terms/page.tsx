"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-10">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-4xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">📜 Terms & Conditions</h1>
        <p className="mt-3 text-gray-600">
          Please read these terms and conditions carefully before using our website.
        </p>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl space-y-6">
        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-sm text-gray-600">
              By accessing and using this website, you agree to be bound by these Terms & Conditions.
              If you do not agree, please discontinue using our services.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">2. User Accounts</h2>
            <p className="text-sm text-gray-600">
              You are responsible for maintaining the confidentiality of your account information
              and for all activities that occur under your account.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">3. Orders & Payments</h2>
            <p className="text-sm text-gray-600">
              All orders are subject to availability and confirmation. Prices and payment terms
              may change without prior notice.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">4. Shipping & Delivery</h2>
            <p className="text-sm text-gray-600">
              Delivery timelines are estimates and may vary due to unforeseen circumstances.
              We are not responsible for delays beyond our control.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">5. Returns & Refunds</h2>
            <p className="text-sm text-gray-600">
              Returns and refunds are governed by our Return Policy. Products must meet
              eligibility criteria to qualify for a return or refund.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">6. Prohibited Activities</h2>
            <p className="text-sm text-gray-600">
              Users must not misuse the website, attempt unauthorized access, or engage
              in any activity that disrupts the platform.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">7. Limitation of Liability</h2>
            <p className="text-sm text-gray-600">
              We are not liable for any indirect, incidental, or consequential damages
              arising from the use of our website or services.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">8. Changes to Terms</h2>
            <p className="text-sm text-gray-600">
              We reserve the right to update or modify these Terms & Conditions at any time.
              Continued use of the website constitutes acceptance of the updated terms.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-xl font-semibold">9. Contact Information</h2>
            <p className="text-sm text-gray-600">
              For any questions regarding these Terms & Conditions, please contact us at
              <span className="font-medium"> support@yourstore.com</span>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
