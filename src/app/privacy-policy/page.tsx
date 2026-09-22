import { getConfig } from '@/lib/stats';

export default function PrivacyPolicy() {
  const siteName = getConfig().siteName;
  return (
    <div className="min-h-screen bg-gray-50 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 text-center">
          {siteName} Privacy Policy
        </h1>
        <p className="text-center text-gray-500 mb-10 font-medium">
          Effective Date: September 23, 2026
        </p>
        
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <p className="mb-4">
              At {siteName}, we respect your privacy and are committed to protecting the personal information you may share with us through our website and services. This Privacy Policy explains how we collect, use, store, and protect your information when you visit or use our online video downloading services.
            </p>
            <p>
              By accessing or using {siteName}, you agree to the terms of this Privacy Policy. If you do not agree with this policy, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Information We Do Not Collect</h2>
            <p className="mb-4">
              We believe in maintaining maximum user privacy and providing a seamless experience.
            </p>
            <ul className="space-y-3">
              <li>
                <span className="font-semibold text-gray-800">No Registration or Account Required:</span> {siteName} is completely free to use without logging in, creating an account, or registering any personal profile.
              </li>
              <li>
                <span className="font-semibold text-gray-800">No App Installation Tracking:</span> Our service operates directly in your web browser, requiring no software or application installation on your device.
              </li>
              <li>
                <span className="font-semibold text-gray-800">No Storage of Downloaded Content:</span> We do not host, store, or archive any videos or files downloaded through our service. Videos are fetched and processed in real time and saved directly to your device.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Information We May Collect Automatically</h2>
            <p className="mb-4">
              When you access {siteName}, certain non-personally identifiable technical information may be collected automatically by our servers or third-party service providers to ensure security and optimize performance:
            </p>
            <ul className="space-y-3">
              <li>
                <span className="font-semibold text-gray-800">Log & Technical Data:</span> Basic request details such as IP address, browser type, operating system (e.g., iOS, Android, Windows, Mac), referring URLs, and access timestamps.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Usage Data:</span> Aggregated usage statistics, such as total download counts or page views, to help us monitor server load and service stability.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Cookies and Third-Party Technologies</h2>
            <p className="mb-4">
              We may use cookies or similar tracking technologies to enhance user experience, analyze traffic, and ensure site security:
            </p>
            <ul className="space-y-3">
              <li>
                <span className="font-semibold text-gray-800">Essential Cookies:</span> Required for standard website functionality and smooth performance across different web browsers.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Analytics & Performance:</span> Tools used to understand general traffic trends and help us maintain server health.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Security & Verification:</span> Third-party security services (such as Norton Safe Web verification) may collect anonymous signals to ensure safety and prevent abuse.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. How We Use Information</h2>
            <p className="mb-4">
              Any information collected is strictly used for the following operational purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To deliver, operate, and maintain the {siteName} website and services.</li>
              <li>To monitor system security, prevent fraud, and protect server infrastructure from malicious activity.</li>
              <li>To optimize browser compatibility across platforms (iPhone, iPad, Android, Windows, Mac).</li>
              <li>To respond to user inquiries, technical support requests, or copyright notices.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Sharing and Disclosure of Information</h2>
            <p className="mb-4">
              We do not sell, trade, rent, or lease any personal user information to third parties. We may disclose technical or log data only under the following circumstances:
            </p>
            <ul className="space-y-3">
              <li>
                <span className="font-semibold text-gray-800">Legal Requirements:</span> If required to do so by applicable law, regulation, subpoena, or governmental request.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Service Protection:</span> To enforce our Terms of Service, protect our system security, or prevent illegal activity.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Third-Party Links & Platforms</h2>
            <p>
              Our website processes video links from third-party platforms (e.g., social media or video sharing sites). Once you click or follow external links, this Privacy Policy no longer applies. We encourage you to review the privacy policies of any third-party sites you visit or link to.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to safeguard our platform against unauthorized access, alteration, or disclosure. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Children's Privacy</h2>
            <p>
              {siteName} is a general audience online service and does not knowingly collect any personal identifiable information from children under the age of 13 (or under the age of majority in your jurisdiction).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Changes to This Privacy Policy</h2>
            <p>
              We reserve the right to update or modify this Privacy Policy at any time without prior notice. Any updates will be posted on this page with an updated "Effective Date." Continued use of {siteName} after changes are posted constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Contact Us</h2>
            <p className="mb-4">
              If you have any questions, feedback, or concerns regarding this Privacy Policy or our practices, please reach out to us:
            </p>
            <p className="font-medium text-gray-900 bg-gray-50 p-4 rounded-lg inline-block">
              Email: {siteName}@gmail.com
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
