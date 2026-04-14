import { useEffect } from "react";
import { Cookie, Settings, Eye, BarChart, Shield, X } from "lucide-react";

const CookiePolicy = () => {
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
            <Cookie className="w-16 h-16 text-cyan-500 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Cookie <span className="text-cyan-500">Policy</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
              Learn how we use cookies and similar technologies to enhance your
              experience.
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
                What Are Cookies?
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Cookies are small text files that are placed on your device when
                you visit our website. They help us provide you with a better
                experience by remembering your preferences, understanding how
                you use our site, and improving our services.
              </p>
              <p className="text-gray-300 leading-relaxed">
                This Cookie Policy explains what cookies are, how we use them,
                and how you can manage your cookie preferences.
              </p>
            </div>
          </div>

          {/* Types of Cookies */}
          <div className="scroll-animate fade-in mb-12">
            <div className="flex items-center mb-6">
              <Settings className="w-8 h-8 text-cyan-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">
                Types of Cookies We Use
              </h2>
            </div>

            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-start mb-3">
                  <Shield className="w-6 h-6 text-cyan-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-500 mb-2">
                      Essential Cookies
                    </h3>
                    <p className="text-gray-300 mb-3">
                      These cookies are necessary for the website to function
                      properly. They enable core functionality such as security,
                      network management, and accessibility.
                    </p>
                    <div className="bg-gray-950 rounded p-4 border border-gray-700">
                      <p className="text-sm text-gray-400 mb-2">
                        <strong className="text-white">Examples:</strong>
                      </p>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li className="flex items-start">
                          <span className="text-cyan-500 mr-2">•</span>
                          <span>Authentication cookies for logged-in users</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-500 mr-2">•</span>
                          <span>Security cookies to prevent fraud</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-500 mr-2">•</span>
                          <span>Session cookies for functionality</span>
                        </li>
                      </ul>
                      <p className="text-xs text-gray-400 mt-3">
                        <strong>Note:</strong> These cookies cannot be disabled
                        as they are essential for the website to work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-start mb-3">
                  <BarChart className="w-6 h-6 text-cyan-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-500 mb-2">
                      Analytics and Performance Cookies
                    </h3>
                    <p className="text-gray-300 mb-3">
                      These cookies help us understand how visitors interact
                      with our website by collecting and reporting information
                      anonymously. This helps us improve our services.
                    </p>
                    <div className="bg-gray-950 rounded p-4 border border-gray-700">
                      <p className="text-sm text-gray-400 mb-2">
                        <strong className="text-white">Examples:</strong>
                      </p>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li className="flex items-start">
                          <span className="text-cyan-500 mr-2">•</span>
                          <span>Google Analytics for website traffic analysis</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-500 mr-2">•</span>
                          <span>Page view tracking and user behavior patterns</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-500 mr-2">•</span>
                          <span>Error reporting and performance monitoring</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Functionality Cookies */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-start mb-3">
                  <Eye className="w-6 h-6 text-cyan-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-500 mb-2">
                      Functionality Cookies
                    </h3>
                    <p className="text-gray-300 mb-3">
                      These cookies allow the website to remember choices you
                      make and provide enhanced, personalized features.
                    </p>
                    <div className="bg-gray-950 rounded p-4 border border-gray-700">
                      <p className="text-sm text-gray-400 mb-2">
                        <strong className="text-white">Examples:</strong>
                      </p>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li className="flex items-start">
                          <span className="text-cyan-500 mr-2">•</span>
                          <span>Language preferences and regional settings</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-500 mr-2">•</span>
                          <span>User interface customization</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-500 mr-2">•</span>
                          <span>Form data retention for convenience</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Targeting Cookies */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-start mb-3">
                  <Settings className="w-6 h-6 text-cyan-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-500 mb-2">
                      Targeting and Advertising Cookies
                    </h3>
                    <p className="text-gray-300 mb-3">
                      These cookies may be set through our site by our
                      advertising partners to build a profile of your interests
                      and show you relevant content.
                    </p>
                    <div className="bg-gray-950 rounded p-4 border border-gray-700">
                      <p className="text-sm text-gray-400 mb-2">
                        <strong className="text-white">Examples:</strong>
                      </p>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li className="flex items-start">
                          <span className="text-cyan-500 mr-2">•</span>
                          <span>Social media integration (Facebook, LinkedIn, Twitter)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-500 mr-2">•</span>
                          <span>Remarketing and personalized advertising</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-500 mr-2">•</span>
                          <span>Third-party advertising networks</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Third-Party Cookies */}
          <div className="scroll-animate fade-in mb-12">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                Third-Party Cookies
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                In addition to our own cookies, we may also use various
                third-party cookies to report usage statistics, deliver
                advertisements, and provide enhanced functionality.
              </p>
              <div className="bg-gray-950 rounded p-4 border border-gray-700">
                <p className="text-sm text-gray-400 mb-3">
                  <strong className="text-white">Third-party services we use:</strong>
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>
                      <strong className="text-white">Google Analytics:</strong>{" "}
                      Website traffic and usage analytics
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>
                      <strong className="text-white">Social Media Platforms:</strong>{" "}
                      Social sharing and integration
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>
                      <strong className="text-white">Payment Processors:</strong>{" "}
                      Secure payment handling
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cookie Duration */}
          <div className="scroll-animate fade-in mb-12">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                How Long Do Cookies Last?
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-cyan-500 mb-2">
                    Session Cookies
                  </h3>
                  <p className="text-gray-300">
                    Temporary cookies that are deleted when you close your
                    browser. They help maintain your session while you browse
                    our website.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cyan-500 mb-2">
                    Persistent Cookies
                  </h3>
                  <p className="text-gray-300">
                    Cookies that remain on your device for a set period or until
                    you delete them. They remember your preferences for future
                    visits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Managing Cookies */}
          <div className="scroll-animate fade-in mb-12">
            <div className="flex items-center mb-6">
              <X className="w-8 h-8 text-cyan-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">
                How to Manage Cookies
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Browser Settings
                </h3>
                <p className="text-gray-300 mb-4">
                  Most web browsers allow you to control cookies through their
                  settings. You can set your browser to:
                </p>
                <ul className="space-y-2 text-gray-300 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>Block all cookies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>Accept only first-party cookies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>Delete cookies when you close your browser</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>Notify you when a cookie is being set</span>
                  </li>
                </ul>
                <p className="text-gray-400 text-sm">
                  <strong>Note:</strong> Disabling cookies may affect the
                  functionality of our website and prevent you from accessing
                  certain features.
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Browser-Specific Instructions
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-950 rounded p-4 border border-gray-700">
                    <p className="text-cyan-400 font-semibold mb-2">
                      Google Chrome
                    </p>
                    <p className="text-sm text-gray-300">
                      Settings → Privacy and security → Cookies and other site
                      data
                    </p>
                  </div>
                  <div className="bg-gray-950 rounded p-4 border border-gray-700">
                    <p className="text-cyan-400 font-semibold mb-2">
                      Mozilla Firefox
                    </p>
                    <p className="text-sm text-gray-300">
                      Options → Privacy & Security → Cookies and Site Data
                    </p>
                  </div>
                  <div className="bg-gray-950 rounded p-4 border border-gray-700">
                    <p className="text-cyan-400 font-semibold mb-2">Safari</p>
                    <p className="text-sm text-gray-300">
                      Preferences → Privacy → Cookies and website data
                    </p>
                  </div>
                  <div className="bg-gray-950 rounded p-4 border border-gray-700">
                    <p className="text-cyan-400 font-semibold mb-2">
                      Microsoft Edge
                    </p>
                    <p className="text-sm text-gray-300">
                      Settings → Cookies and site permissions → Manage and
                      delete cookies
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Opt-Out Tools
                </h3>
                <p className="text-gray-300 mb-3">
                  You can also opt out of specific tracking:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>
                      <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        className="text-cyan-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Analytics Opt-out Browser Add-on
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>
                      <a
                        href="https://www.youronlinechoices.com/"
                        className="text-cyan-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Your Online Choices (EU)
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span>
                      <a
                        href="https://www.networkadvertising.org/choices/"
                        className="text-cyan-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Network Advertising Initiative
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Do Not Track */}
          <div className="scroll-animate fade-in mb-12">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                Do Not Track Signals
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Some browsers include a "Do Not Track" (DNT) feature that
                signals to websites that you do not want to be tracked.
                Currently, there is no uniform standard for how DNT signals
                should be interpreted. We do not currently respond to DNT
                signals, but we are committed to respecting your privacy
                preferences.
              </p>
            </div>
          </div>

          {/* Updates */}
          <div className="scroll-animate fade-in mb-12">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                Updates to This Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect
                changes in our practices or for other operational, legal, or
                regulatory reasons. Please revisit this page regularly to stay
                informed about our use of cookies.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="scroll-animate fade-in">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-8 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-white mb-4">
                Questions About Cookies?
              </h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about our use of cookies, please
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

export default CookiePolicy;
