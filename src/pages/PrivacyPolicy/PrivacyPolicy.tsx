import { useEffect } from "react";
import {
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  FileText,
} from "lucide-react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const animatedElements = document.querySelectorAll(".scroll-animate");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="scroll-animate fade-in text-center">
            <Shield className="w-16 h-16 text-cyan-500 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Privacy <span className="text-cyan-500">Policy</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-400">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-4xl mx-auto px-6">
          {/* Introduction */}
          <div className="scroll-animate fade-in mb-12">
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                Introduction
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Invade Tech Solutions ("we," "our," or "us") is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website, use our services, or interact with us.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Please read this privacy policy carefully. If you do not agree
                with the terms of this privacy policy, please do not access our
                website or use our services.
              </p>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="scroll-animate fade-in mb-12">
            <div className="flex items-center mb-6">
              <Database className="w-8 h-8 text-cyan-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">
                Information We Collect
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-500 mb-3">
                  Personal Information
                </h3>
                <p className="text-gray-300 mb-3">
                  We may collect personal information that you voluntarily
                  provide to us, including:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>
                      Name, email address, phone number, and company name
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>Business information and service requirements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>Communication preferences and feedback</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>
                      Payment and billing information (when applicable)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-cyan-500 mb-3">
                  Automatically Collected Information
                </h3>
                <p className="text-gray-300 mb-3">
                  When you visit our website, we may automatically collect:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>IP address, browser type, and device information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>
                      Pages visited, time spent on pages, and navigation paths
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>Referring website and search terms used</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>Cookies and similar tracking technologies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="scroll-animate fade-in mb-12">
            <div className="flex items-center mb-6">
              <Eye className="w-8 h-8 text-cyan-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">
                How We Use Your Information
              </h2>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <p className="text-gray-300 mb-4">
                We use the information we collect to:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>Provide, maintain, and improve our IT services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>Respond to your inquiries and fulfill service requests</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>
                    Send administrative information, updates, and security
                    alerts
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>Process transactions and manage billing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>Analyze website usage and improve user experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>Comply with legal obligations and protect our rights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>Send marketing communications (with your consent)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="scroll-animate fade-in mb-12">
            <div className="flex items-center mb-6">
              <UserCheck className="w-8 h-8 text-cyan-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">
                Information Sharing and Disclosure
              </h2>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <p className="text-gray-300 mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span>
                    <strong className="text-white">Service Providers:</strong>{" "}
                    With trusted third-party vendors who assist in our
                    operations
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span>
                    <strong className="text-white">Business Transfers:</strong>{" "}
                    In connection with mergers, acquisitions, or asset sales
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span>
                    <strong className="text-white">Legal Requirements:</strong>{" "}
                    When required by law or to protect our rights
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span>
                    <strong className="text-white">With Your Consent:</strong>{" "}
                    When you authorize us to share your information
                  </span>
                </li>
              </ul>
              <p className="text-gray-400 mt-4 text-sm">
                We do not sell your personal information to third parties.
              </p>
            </div>
          </div>

          {/* Data Security */}
          <div className="scroll-animate fade-in mb-12">
            <div className="flex items-center mb-6">
              <Lock className="w-8 h-8 text-cyan-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">Data Security</h2>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <p className="text-gray-300 mb-4">
                We implement appropriate technical and organizational security
                measures to protect your personal information, including:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">🔒</span>
                  <span>Encryption of data in transit and at rest</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">🔒</span>
                  <span>Secure server infrastructure and access controls</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">🔒</span>
                  <span>
                    Regular security audits and vulnerability assessments
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">🔒</span>
                  <span>Employee training on data protection practices</span>
                </li>
              </ul>
              <p className="text-gray-400 mt-4 text-sm">
                However, no method of transmission over the internet is 100%
                secure. We cannot guarantee absolute security of your data.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div className="scroll-animate fade-in mb-12">
            <div className="flex items-center mb-6">
              <FileText className="w-8 h-8 text-cyan-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">
                Your Privacy Rights
              </h2>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <p className="text-gray-300 mb-4">You have the right to:</p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>
                    <strong className="text-white">Access:</strong> Request a
                    copy of your personal information
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>
                    <strong className="text-white">Correction:</strong> Request
                    correction of inaccurate information
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>
                    <strong className="text-white">Deletion:</strong> Request
                    deletion of your personal information
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>
                    <strong className="text-white">Object:</strong> Object to
                    processing of your information
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>
                    <strong className="text-white">Restrict:</strong> Request
                    restriction of processing
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>
                    <strong className="text-white">Portability:</strong> Request
                    transfer of your data
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>
                    <strong className="text-white">Withdraw Consent:</strong>{" "}
                    Withdraw consent for marketing communications
                  </span>
                </li>
              </ul>
              <p className="text-cyan-400 mt-6">
                To exercise these rights, contact us at:{" "}
                <a
                  href="mailto:Admin@invadetechsolutionz.com"
                  className="underline hover:text-cyan-300"
                >
                  Admin@invadetechsolutionz.com
                </a>
              </p>
            </div>
          </div>

          {/* Data Retention */}
          <div className="scroll-animate fade-in mb-12">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                Data Retention
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We retain your personal information only for as long as
                necessary to fulfill the purposes outlined in this policy,
                unless a longer retention period is required by law. When your
                information is no longer needed, we securely delete or
                anonymize it.
              </p>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="scroll-animate fade-in mb-12">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                Children's Privacy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our services are not directed to individuals under the age of
                18. We do not knowingly collect personal information from
                children. If you believe we have collected information from a
                child, please contact us immediately.
              </p>
            </div>
          </div>

          {/* International Data Transfers */}
          <div className="scroll-animate fade-in mb-12">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                International Data Transfers
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Your information may be transferred to and maintained on servers
                located outside of Nigeria. We ensure that appropriate
                safeguards are in place to protect your information in
                accordance with this privacy policy.
              </p>
            </div>
          </div>

          {/* Updates to Policy */}
          <div className="scroll-animate fade-in mb-12">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                Changes to This Policy
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the "Last Updated" date.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We encourage you to review this Privacy Policy periodically for
                any changes. Your continued use of our services after changes
                are posted constitutes acceptance of the updated policy.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="scroll-animate fade-in">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-8 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have questions or concerns about this Privacy Policy,
                please contact us:
              </p>
              <div className="space-y-2 text-gray-300">
                <p>
                  <strong className="text-white">Invade Tech Solutions</strong>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:Admin@invadetechsolutionz.com"
                    className="text-cyan-400 hover:text-cyan-300 underline"
                  >
                    Admin@invadetechsolutionz.com
                  </a>
                </p>
                <p>Location: Lagos, Nigeria</p>
                <p>Phone: +234 123 456 7890</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
