import React from "react";

const services = [
  {
    title: "Custom LMS Development",
    description:
      "Create an LMS that fits your business instead of forcing your business into a template. Deliver learning, manage users, and track performance from one platform.",
    features: [
      "Course and content management",
      "Learner and instructor dashboards",
      "Assessments and certifications",
      "Progress tracking",
      "Subscriptions and payments",
      "Reporting and analytics",
      "Gamification",
      "Third-party integrations",
    ],
    icon: "💻",
  },
  {
    title: "eLearning Platform Development",
    description:
      "Turn your knowledge, courses, or training programs into a scalable digital product. Make content easier to sell, deliver, and manage.",
    features: [
      "Online course platforms",
      "Cohort-based learning products",
      "Membership portals",
      "Course marketplaces",
      "Instructor-led programs",
      "Certification platforms",
    ],
    icon: "🌐",
  },
  {
    title: "Mobile Learning Apps",
    description:
      "Give learners access wherever they are. Increase accessibility, engagement, and course completion.",
    features: [
      "Video and audio lessons",
      "Offline access",
      "Quizzes and practice tools",
      "Push reminders",
      "Progress tracking",
      "Personalized learning paths",
    ],
    icon: "📱",
  },
  {
    title: "Virtual Classroom Platforms",
    description:
      "Bring live teaching, interaction, and collaboration into one branded experience. Deliver live learning without relying on disconnected tools.",
    features: [
      "Live video sessions",
      "Interactive whiteboards",
      "Breakout rooms",
      "Screen sharing",
      "Attendance tracking",
      "Live quizzes and chat",
      "Session recordings",
    ],
    icon: "🎥",
  },
  {
    title: "Corporate Training Platforms",
    description:
      "Make employee learning easier to deliver and measure. Reduce manual training work and gain clear visibility into employee progress.",
    features: [
      "Employee onboarding",
      "Compliance training",
      "Skills development",
      "Leadership programs",
      "Sales enablement",
      "Certifications",
      "Manager dashboards",
      "Training reports",
    ],
    icon: "🏢",
  },
  {
    title: "Online Tutoring Platforms",
    description:
      "Connect learners and tutors through one seamless platform. Manage discovery, booking, learning, and payments in one place.",
    features: [
      "Tutor profiles",
      "Search and matching",
      "Lesson booking",
      "Video sessions",
      "Messaging",
      "Payments",
      "Reviews",
      "Parent dashboards",
    ],
    icon: "👩‍🏫",
  },
  {
    title: "Student Management Systems",
    description:
      "Simplify academic and administrative workflows. Save administrative time and keep student data organized.",
    features: [
      "Admissions",
      "Enrollment",
      "Attendance",
      "Timetables",
      "Grades",
      "Student records",
      "Fees and payments",
      "Parent communication",
    ],
    icon: "📊",
  },
  {
    title: "Assessment and Grading Software",
    description:
      "Create faster, more consistent assessment experiences. Reduce grading effort and improve visibility into learner performance.",
    features: [
      "Question banks",
      "Timed tests",
      "Automated grading",
      "Rubrics",
      "Performance analytics",
      "Feedback workflows",
      "Certificates",
    ],
    icon: "✅",
  },
  {
    title: "Education CRM Software",
    description:
      "Turn more inquiries into enrollments. Keep every prospect, conversation, and next step in one system.",
    features: [
      "Admissions leads",
      "Applications",
      "Student communication",
      "Follow-ups",
      "Counselor tasks",
      "Marketing workflows",
      "Enrollment reports",
    ],
    icon: "🤝",
  },
];

export default function ServicesOverview() {
  return (
    <section className="relative w-full py-16 lg:py-24 bg-gray-200 overflow-hidden font-jakarta">
      <div className="mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[linear-gradient(104.04deg,#00235A_8.33%,#004BC0_93.33%)]" />
            <span className="text-[#0CBF83] text-[18px] md:text-[22px] font-bold tracking-[1px]">
              Services Overview
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] lg:leading-[58px] font-bold tracking-[1px] capitalize text-navy max-w-[800px]">
            Custom EdTech Software Development That Moves Your Business Forward
          </h2>
          <p className="text-base md:text-lg text-grey font-medium max-w-[700px]">
            From early-stage MVPs to established learning platforms, we help you
            build products that are easier to use, manage, and scale.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative flex flex-col bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(12,191,131,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0CBF83]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="w-14 h-14 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-3xl mb-6 text-green group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-green transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-grey text-sm leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>

              <div className="pt-6 border-t border-gray-50">
                <ul className="space-y-2.5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <svg
                        className="w-5 h-5 text-green shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-dark font-medium leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
