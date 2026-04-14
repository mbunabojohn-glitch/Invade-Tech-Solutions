import { useEffect } from "react";
import {
  FileText,
  AlertTriangle,
  Scale,
  Shield,
  Users,
  Ban,
} from "lucide-react";

const TermsOfService = () => {
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
            <Scale className="w-16 h-16 text-cyan-500 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Terms of <span className="text-cyan-500">Service</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
              Please read these terms carefully before using our services.
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
          {/* Agreement */}
          <div className="scroll-animate fade-in mb-12">
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                Agreement to Terms
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                These Terms of Service ("Terms") constitute a legally binding
                agreement between you and Invade Tech Solutions ("Company,"
                "we," "us," or "our") concerning your access to and use of our
                website, services, and products.
              </p>
              <p className="text-gray-300 leading-relaxed">
                By accessing or using our services, you agree to be bound by
                these Terms. If you do not agree to these Terms, you may not
                access or use our services.
              </p>
            </div>
          </div>

          {/* Services Description */}
          <div className="scroll-animate fade-in mb-12">
            <div className="flex items-center mb-6">
              <FileText className="w-8 h-8 text-cyan-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">
                Services Description
              </h2>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <p className="text-gray-300 mb-4">
                Invade Tech Solutions provides the following services:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span>IT and Hardware Support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span>Cloud Infrastructure Solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span>Procurement of Hardware</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span>IT Training & Career Development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span>IT/Project Outsourcing</span>
                </li>
              </ul>
              <p className="text-gray-400 mt-4 text-sm">
                We reserve the right to modify, suspend, or discontinue any
                aspect of our services at any time.
              </p>
            </div>
          </div>

          {/* User Responsibilities */}
          <div className="scroll-animate fade-in mb-12">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-cyan-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">
                User Responsibilities
              </h2>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <p className="text-gray-300 mb-4">
                By using our services, you agree to:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>Provide accurate, current, and complete information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>Maintain the security of your account credentials</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>
                    Use our services in compliance with all applicable laws
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>Notify us immediately of any unauthorized use</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>Respect intellectual property rights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>Not interfere with or disrupt our services</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Prohibited Activities */}
          <div className="scroll-animate fade-in mb-12">
            <div className="flex items-center mb-6">
              <Ban className="w-8 h-8 text-cyan-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">
                Prohibited Activities
              </h2>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <p className="text-gray-300 mb-4">You may not:</p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>
                    Use our services for any illegal or unauthorized purpose
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Violate any laws, regulations, or third-party rights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>
                    Transmit malicious code, viruses, or harmful software
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Attempt to gain unauthorized access to our systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Harass, abuse, or harm other users</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Reverse engineer or decompile our software</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>
                    Use automated systems to access our services without
                    permission
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="scroll-animate fade-in mb-12">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                Intellectual Property Rights
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                All content, features, and functionality of our services,
                including but not limited to text, graphics, logos, icons,
                images, audio clips, video clips, data compilations, and
                software, are the exclusive property of Invade Tech Solutions
                and are protected by Nigerian and international copyright,
                trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-300 leading-relaxed">
                You may not reproduce, distribute, modify, create derivative
                works of, publicly display, or exploit any of our content
                without our prior written permission.
              </p>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="scroll-animate fade-in mb-12">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                Payment and Billing
              </h2>
              <div className="space-y-3 text-gray-300">
                <p>
                  <strong className="text-white">Fees:</strong> You agree to pay
                  all fees associated with the services you purchase according
                  to the pricing and payment terms presented at the time of
                  purchase.
                </p>
                <p>
                  <strong className="text-white">Payment Methods:</strong> We
                  accept payment via bank transfer, credit/debit cards, and
                  other methods as specified.
                </p>
                <p>
                  <strong className="text-white">Late Payments:</strong> Late
                  payments may result in suspension of services and may incur
                  additional charges.
                </p>
                <p>
                  <strong className="text-white">Refunds:</strong> Refund
                  policies vary by service type and will be communicated at the
                  time of purchase.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="scroll-animate fade-in mb-12">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-8 h-8 text-cyan-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">
                Disclaimers and Limitations
              </h2>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-cyan-500 mb-2">
                    "As Is" and "As Available"
                  </h3>
                  <p className="text-gray-300">
                    Our services are provided on an "as is" and "as available"
                    basis without warranties of any kind, either express or
                    implied. We do not guarantee that our services will be
                    uninterrupted, timely, secure, or error-free.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-cyan-500 mb-2">
                    No Warranty
                  </h3>
                  <p className="text-gray-300">
                    We disclaim all warranties, including but not limited to
                    merchantability, fitness for a particular purpose, and
                    non-infringement.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-cyan-500 mb-2">
                    Limitation of Liability
                  </h3>
                  <p className="text-gray-300">
                    To the maximum extent permitted by law, Invade Tech
                    Solutions shall not be liable for any indirect, incidental,
                    special, consequential, or punitive damages, or any loss of
                    profits or revenues.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Indemnification */}
          <div className="scroll-animate fade-in mb-12">
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                Indemnification
              </h2>
              <p className="text-gray-300 leading-relaxed">
                You agree to defend, indemnify, and hold harmless Invade Tech
                Solutions and its officers, directors, employees, and agents
                from and against any claims, damages, obligations, losses,
                liabilities, costs, or debt arising from: (a) your use of our
                services; (b) your violation of these Terms; or (c) your
                violation of any third-party rights.
              </p>
            </div>
          </div>

          {/* Service Level Agreement */}
          <div className="scroll-animate fade-in mb-12">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-cyan-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">
                Service Level Agreement
              </h2>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <p className="text-gray-300 mb-4">
                For specific services, we commit to:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span>
                    <strong className="text-white">Uptime:</strong> 99.9% system
                    uptime (excluding scheduled maintenance)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span>
                    <strong className="text-white">Support:</strong> 24/7
                    technical support for critical issues
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span>
                    <strong className="text-white">Response Time:</strong>{" "}
                    Initial response within specified timeframes
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span>
                    <strong className="text-white">Data Security:</strong>{" "}
                    Industry-standard security measures
                  </span>
                </li>
              </ul>
              <p className="text-gray-400 mt-4 text-sm">
                Detailed SLA terms are provided in individual service
                agreements.
              </p>
            </div>
          </div>

          {/* Termination */}
          <div className="scroll-animate fade-in mb-12">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                Termination
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We reserve the right to suspend or terminate your access to our
                services at any time, without notice, for conduct that we
                believe violates these Terms or is harmful to other users, us,
                or third parties, or for any other reason at our sole
                discretion.
              </p>
              <p className="text-gray-300 leading-relaxed">
                You may terminate your account at any time by contacting us.
                Upon termination, your right to use our services will
                immediately cease.
              </p>
            </div>
          </div>

          {/* Governing Law */}
          <div className="scroll-animate fade-in mb-12">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                Governing Law and Dispute Resolution
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance
                with the laws of the Federal Republic of Nigeria, without
                regard to its conflict of law provisions.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Any disputes arising from these Terms or your use of our
                services shall be resolved through arbitration in Lagos,
                Nigeria, in accordance with the Arbitration and Conciliation
                Act.
              </p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="scroll-animate fade-in mb-12">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                Changes to These Terms
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We reserve the right to modify these Terms at any time. If we
                make material changes, we will notify you by email or by
                posting a notice on our website prior to the effective date of
                the changes.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Your continued use of our services after the effective date of
                the revised Terms constitutes your acceptance of the changes.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="scroll-animate fade-in">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-8 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please
                contact us:
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

export default TermsOfService;
