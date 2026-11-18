import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { useCourses } from "../../hooks/useApi";
import { type Course } from "../../lib/api";
import { trainedPeople, type TrainedPerson } from "../../data/trainedData";

/**
 * FlipTile
 * A single square tile in the Career Flip Wall.
 * Flips on hover on desktop and toggles on tap for touch devices.
 * Shows the previous role → new role, training, and current role on the back.
 */
const FlipTile = ({ person, index }: { person: TrainedPerson; index: number }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="scroll-animate fade-in"
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className={`flip-card block w-full aspect-square text-left ${
          flipped ? "is-flipped" : ""
        }`}
        aria-label={`${person.name}: ${person.previousRole} to ${person.newRole}`}
      >
        <div className="flip-card-inner">
          {/* Front: photo + name */}
          <div className="flip-face rounded-2xl border border-gray-800 bg-gray-900">
            <img
              src={person.photo}
              alt={person.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent p-5">
              <p className="text-white font-bold text-lg">{person.name}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">
                {person.category}
              </p>
            </div>
          </div>

          {/* Back: career transition details */}
          <div className="flip-face flip-face-back rounded-2xl border border-cyan-500/30 bg-gray-950 p-6 flex flex-col justify-center gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-400 line-through">
                {person.previousRole}
              </span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-white">{person.newRole}</span>
            </div>
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-cyan-400">Training:</span>{" "}
              {person.training}
            </p>
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-cyan-400">Current Role:</span>{" "}
              {person.currentRole}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

/**
 * Courses Page
 * - Hero with a slow, soft animated gradient background.
 * - Career Flip Wall built from trainedData.ts.
 * - Courses grouped by school, each card linking to the course detail page.
 */
const Courses = () => {
  const navigate = useNavigate();
  const { data: courses, isLoading } = useCourses();

  // Scroll animation setup using IntersectionObserver (same pattern as Home/Services)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" },
    );

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [courses]);

  // Group courses by school for a clean, sectioned layout.
  const groupedCourses = useMemo(() => {
    const groups = new Map<string, Course[]>();
    (courses || []).forEach((course) => {
      const school = course.school?.trim() || "Other Courses";
      const existing = groups.get(school) || [];
      existing.push(course);
      groups.set(school, existing);
    });
    return Array.from(groups.entries());
  }, [courses]);

  const hasCourses = groupedCourses.length > 0;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero with slow, soft animated gradient */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-cyan-950 animate-gradient-slow">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium scroll-animate fade-in">
            <BookOpen className="w-4 h-4" />
            <span>Invade Tech Solutions Training</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 scroll-animate fade-in">
            Our <span className="text-cyan-400">Courses</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 scroll-animate fade-in">
            Practical, career-focused training designed to help you build
            stronger, faster, and more efficient technology skills.
          </p>
        </div>
      </section>

      {/* Career Flip Wall */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 scroll-animate fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Career <span className="text-cyan-500">Flip Wall</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Real people who reshaped their careers with Invade Tech Solutions.
              Hover or tap a tile to see where they started and where they are
              now.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainedPeople.map((person, index) => (
              <FlipTile key={person.name} person={person} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Courses grouped by school */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? null : hasCourses ? (
            <div className="space-y-16">
              {groupedCourses.map(([school, schoolCourses]) => (
                <div key={school}>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 scroll-animate fade-in">
                    <span className="text-cyan-500">{school}</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {schoolCourses.map((course, index) => (
                      <div
                        key={course.id || course.slug}
                        className="scroll-animate fade-in h-full"
                        style={{ transitionDelay: `${index * 120}ms` }}
                      >
                        <Link
                          to={`/courses/${course.slug}`}
                          className="group flex h-full flex-col rounded-2xl border border-gray-800 bg-gray-900 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-gray-800/60 hover:shadow-lg hover:shadow-cyan-500/10"
                        >
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                            {course.summary}
                          </p>
                          <span className="mt-6 inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                            View Course
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 scroll-animate fade-in">
              <p className="text-2xl font-semibold text-white mb-2">
                Courses are coming soon
              </p>
              <p className="text-gray-400 mb-8">
                We are preparing new training programs. Check back shortly.
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <span>Talk to Us</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
