import { useState, useEffect } from "react";

const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
    <path d="M18.901 2H22l-6.77 7.74L23.3 22h-6.11l-4.77-6.98L6.68 22H3.57l7.24-8.28L.7 2h6.27l4.31 6.46L18.9 2Zm-1.07 18h1.69L7.16 3.9H5.38L17.83 20Z" />
  </svg>
);

const AboutMe = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState<Record<number, boolean>>(
    {},
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 1;

  const togglePost = (index: number) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setFormStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const attemptSubmit = async (attempt: number): Promise<boolean> => {
      try {
        setFormStatus("loading");
        setErrorMessage("");

        // Send email to your email address
        const response = await fetch("https://formspree.io/f/mbgjgoyy", {
          method: "POST",
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setRetryCount(0);

        // Reset success message after 5 seconds
        setTimeout(() => setFormStatus("idle"), 5000);
        return true;
      } catch (error) {
        if (attempt < maxRetries) {
          setRetryCount(attempt + 1);
          // Retry after 1 second
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return attemptSubmit(attempt + 1);
        } else {
          setFormStatus("error");
          setErrorMessage(
            "Failed to send message. Please try again later or contact me directly at levilexkilobytes@gmail.com",
          );
          return false;
        }
      }
    };

    await attemptSubmit(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ===== NAVIGATION ===== */}
      <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex justify-between items-center h-[60px]">
          <div className="flex-shrink-0">
            <span className="brand-name text-lg md:text-xl text-dark transition-colors duration-300">
              Levi Monda
            </span>
          </div>

          <ul className="hidden md:flex list-none gap-8 items-center m-0 p-0">
            <li>
              <a
                href="#about"
                className="nav-links text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="nav-links text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="nav-links text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="nav-links text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#blog"
                className="nav-links text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="nav-links text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact
              </a>
            </li>
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="mailto:levilexkilobytes@gmail.com"
              className="nav-email text-xs text-gray-500 flex items-center gap-1.5 transition-colors duration-300 hover:text-primary"
            >
              <i className="fas fa-envelope text-primary text-xs"></i>
              levilexkilobytes@gmail.com
            </a>
            <span className="nav-status flex items-center gap-2 text-xs font-medium text-green-500 bg-green-500/10 px-3 py-1 rounded-full uppercase tracking-wider transition-all duration-300">
              <span className="status-dot"></span>
              Available for work
            </span>
          </div>

          <div
            className="hamburger md:hidden flex flex-col gap-1 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="w-6 h-0.5 bg-dark transition-all duration-300"></span>
            <span className="w-6 h-0.5 bg-dark transition-all duration-300"></span>
            <span className="w-6 h-0.5 bg-dark transition-all duration-300"></span>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-white/98 border-b border-black/5`}
        >
          <ul className="flex flex-col p-8 gap-4 list-none m-0">
            <li>
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#skills"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#blog"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-16 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(180, 120, 80, 0.45), rgba(180, 120, 80, 0.45)), url('/me.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#d4a574",
          }}
        ></div>

        <div className="relative z-2 max-w-5xl mx-auto text-center">
          <h1 className="text-sm font-semibold text-red-100/90 uppercase tracking-[4px] mb-5">
            SOFTWARE DEVELOPER
          </h1>

          <div className="space-y-1.5 mb-6 text-white uppercase tracking-[-0.04em] leading-[0.9]">
            <p className="text-3xl md:text-5xl lg:text-6xl font-black">
              <span className="text-[#ffd7d7]">BUILDING</span> IDEAS
            </p>
            <p className="text-3xl md:text-5xl lg:text-6xl font-black">
              <span className="text-[#ffd7d7]">SOLVING</span> PROBLEMS
            </p>
            <p className="text-3xl md:text-5xl lg:text-6xl font-black">
              <span className="text-[#ffd7d7]">CREATING</span> IMPACT
            </p>
          </div>

          <p className="text-base md:text-lg text-red-50/90 max-w-2xl mx-auto leading-relaxed mb-8">
            I build modern web apps, backend systems, and APIs that turn
            real-world problems into practical solutions.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#projects"
              className="btn btn-primary uppercase tracking-wider"
            >
              <i className="fas fa-eye"></i> View My Projects
            </a>
            <a
              href="#contact"
              className="btn btn-outline uppercase tracking-wider"
            >
              <i className="fas fa-comment"></i> Let's Connect
            </a>
          </div>
        </div>
      </section>
      {/* ===== ABOUT ===== */}
      <section id="about" className="py-16 md:py-20 bg-gray-50">
        <div className="w-full px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1.85fr] gap-8 md:gap-12 items-stretch">
            <div className="md:col-span-1 h-full">
              <div className="relative h-full min-h-[420px] overflow-hidden rounded-[28px] border border-amber-100 bg-[#faf7f2] shadow-[0_20px_50px_rgba(180,120,80,0.12)]">
                <img
                  src="/me.png"
                  alt="Levi Monda"
                  className="w-full h-full object-cover object-center scale-[1.12]"
                />
              </div>
            </div>
            <div className="md:col-span-1 flex flex-col justify-between h-full">
              <div>
                <span className="section-label">About Me</span>
                <h2 className="section-title-accent text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Engineering Digital Experiences With Purpose
                </h2>

                <p className="text-gray-500 leading-relaxed mb-4">
                  I'm{" "}
                  <strong className="text-primary font-bold">Levi Monda</strong>
                  , a software developer based in Kenya, focused on designing
                  and engineering modern web applications that solve meaningful
                  problems and deliver tangible value.
                </p>

                <p className="text-gray-500 leading-relaxed mb-4">
                  I approach development as more than simply writing code. I
                  enjoy taking complex requirements, breaking them down into
                  well-defined problems, and transforming them into{" "}
                  <strong className="text-primary font-bold">
                    scalable, intuitive, and maintainable software
                  </strong>
                  . My work spans frontend experiences, backend architecture,
                  APIs, databases, and the engineering decisions that connect
                  them into reliable products.
                </p>

                <p className="text-gray-500 leading-relaxed mb-6">
                  I place strong emphasis on{" "}
                  <strong className="text-primary font-bold">
                    clarity, performance, maintainability, and user experience
                  </strong>
                  . Whether I'm developing a business website, an internal
                  platform, or a SaaS application, my objective is to create
                  technology that is purposeful rather than unnecessarily
                  complicated.
                </p>

                <div className="space-y-5">
                  <div>
                    <p className="text-lg font-semibold text-dark mb-2">
                      Engineering Principles
                    </p>
                    <div className="space-y-3 text-gray-500">
                      <p>
                        <strong className="text-primary font-bold">
                          Simplicity With Intent
                        </strong>
                        <br />
                        Complexity should be introduced only when it provides
                        meaningful value.
                      </p>
                      <p>
                        <strong className="text-primary font-bold">
                          Solve the Right Problem
                        </strong>
                        <br />
                        Great software begins with understanding the problem
                        before designing the solution.
                      </p>
                      <p>
                        <strong className="text-primary font-bold">
                          Build for the Long Term
                        </strong>
                        <br />
                        Clean architecture, maintainable code, and thoughtful
                        decisions create software that can evolve.
                      </p>
                      <p>
                        <strong className="text-primary font-bold">
                          Continuous Improvement
                        </strong>
                        <br />
                        Every project is an opportunity to learn, refine my
                        craft, and become a better engineer.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/5">
                    <p className="text-sm text-gray-500">
                      <strong className="text-primary font-bold">
                        Current Focus:
                      </strong>{" "}
                      Building modern web applications, strengthening my
                      expertise in software engineering, exploring backend
                      architecture, and continuously turning ideas into
                      practical digital products.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-black/5 mt-6">
                <a
                  href="/resume.pdf"
                  download="Levi_Monda_Resume.pdf"
                  className="btn btn-primary inline-flex"
                >
                  <i className="fas fa-download"></i> Download My Resume →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section id="skills" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label">Skills & Tools</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              A collection of technologies and tools I use to build scalable,
              modern software solutions.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Technologies",
                items: [
                  "TypeScript",
                  "JavaScript",
                  "React",
                  "Next.js",
                  "Node.js",
                  "Express",
                  "PostgreSQL",
                  "SQL",
                  "HTML5",
                  "CSS3",
                  "Tailwind CSS",
                ],
              },
              {
                title: "Backend & Engineering",
                items: [
                  "REST APIs",
                  "Database Design",
                  "Authentication",
                  "Authorization",
                  "Business Logic",
                  "API Integration",
                  "Testing",
                  "System Architecture",
                ],
              },
              {
                title: "Tools & Platforms",
                items: [
                  "Git",
                  "GitHub",
                  "VS Code",
                  "Figma",
                  "Postman",
                  "Docker",
                  "RabbitMQ",
                  "Linux",
                  "macOS",
                  "Windows",
                  "Terminal / CLI",
                ],
              },
            ].map((skill, idx) => (
              <div
                key={idx}
                className="bg-black/5 rounded-2xl p-6 border border-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-4">{skill.title}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-gray-500 text-sm pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-primary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="section-label">Selected Projects</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              A curated selection of software solutions engineered to address
              real-world challenges.
            </h2>
            <a
              href="https://github.com/levilex-kilobytes?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-primary font-medium hover:translate-x-1 transition-transform"
            >
              All GitHub Repositories →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-black/5 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="text-4xl font-bold text-primary/20">01</div>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  ✅ Complete
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Log Ingestion Engine
              </h3>
              <p className="text-gray-500 leading-relaxed mb-4">
                A robust backend system engineered to ingest, process, and
                manage high-volume log data with efficient data pipeline
                architecture, supporting real-time analytics and historical log
                retrieval across distributed systems.
              </p>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                Backend Engineering
              </p>
              <a
                href="https://github.com/levilex-kilobytes/-Log-Ingestion-Engine"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-primary font-medium hover:translate-x-1 transition-transform"
              >
                View on GitHub →
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 border border-black/5 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="text-4xl font-bold text-primary/20">02</div>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  ✅ Complete
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Feature Flag System
              </h3>
              <p className="text-gray-500 leading-relaxed mb-4">
                An advanced feature flagging platform designed for controlled
                feature rollouts, A/B testing, and progressive deployment
                strategies. Enables teams to decouple deployment from release
                and manage feature visibility across different user segments.
              </p>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                Full-Stack Development
              </p>
              <a
                href="https://github.com/levilex-kilobytes/feature-flag-system"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-primary font-medium hover:translate-x-1 transition-transform"
              >
                View on GitHub →
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 border border-black/5 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="text-4xl font-bold text-primary/20">03</div>
                <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
                  🚧 In Progress
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Travel Planner Dashboard
              </h3>
              <p className="text-gray-500 leading-relaxed mb-4">
                A comprehensive, all-in-one travel management application
                designed to streamline the entire trip planning process. It
                empowers users to discover destinations, check real-time weather
                conditions, and build detailed itineraries all from a single,
                intuitive interface.
              </p>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                Full-Stack Development
              </p>
              <a
                href="https://github.com/levilex-kilobytes?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-primary font-medium hover:translate-x-1 transition-transform"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="section-label">What I Do</span>
            <h2 className="section-title-accent text-3xl md:text-4xl font-bold tracking-tight">
              I engineer modern digital solutions that combine performance,
              reliability, and exceptional user experience.
            </h2>
            <p className="text-gray-500 mt-4 leading-relaxed">
              My approach centers on transforming complex requirements into
              well-structured, maintainable software that delivers measurable
              value. From business applications and backend infrastructure to
              intuitive interfaces, I focus on building solutions that are
              purposeful, scalable, and built to last.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "fa-globe",
                title: "Web Application Development",
                desc: "Engineering responsive, high-performance web applications with modern technologies, clean architecture, and a strong emphasis on usability.",
              },
              {
                icon: "fa-building",
                title: "Business Systems",
                desc: "Developing tailored digital systems that streamline workflows, optimize operations, and enable organizations to manage their processes more effectively.",
              },
              {
                icon: "fa-paint-brush",
                title: "Interface Engineering",
                desc: "Transforming design concepts into polished, responsive, and accessible interfaces that balance visual quality with functional performance.",
              },
              {
                icon: "fa-lightbulb",
                title: "Technical Consulting",
                desc: "Analysing requirements, evaluating technical approaches, and helping shape practical technology strategies before development begins.",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-black/5 rounded-2xl p-6 text-center border border-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <i
                  className={`fas ${service.icon} text-4xl text-primary mb-4`}
                ></i>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section id="blog" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <span className="section-label">Writing & Insights</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Perspectives on software engineering, technology,
              entrepreneurship, and continuous personal development.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                tag: "Journey",
                date: "5 min read",
                title:
                  "From Writing My First Line of Code to Building Real Systems",
                shortDesc:
                  "What started as curiosity gradually became a commitment to understanding how software actually works.",
                fullDesc:
                  "This story follows my transition from learning basic programming concepts to building APIs, databases, backend systems, and complete applications. I share the challenges that forced me to think differently, the mistakes that taught me the most, and the moments that made me realize that becoming a developer is less about knowing everything and more about continuously learning.",
                bullets: [
                  "Learning from scratch",
                  "Overcoming difficult concepts",
                  "Building real projects",
                  "Lessons from failure",
                  "Developing a problem-solving mindset",
                ],
              },
              {
                tag: "Engineering",
                date: "7 min read",
                title:
                  "What Building Backend Systems Has Taught Me About Software",
                shortDesc:
                  "Backend development changed the way I think about software, and the systems behind an application matter as much as the interface.",
                fullDesc:
                  "In this article, I explore lessons I've learned while working with REST APIs, databases, authentication, middleware, queues, validation, testing, and system architecture. A working application is not enough. The system behind it needs to be structured, reliable, secure, testable, and capable of handling failure.",
                bullets: [
                  "API design",
                  "Database architecture",
                  "Error handling",
                  "Testing",
                  "Scalability",
                  "Maintainable code",
                ],
              },
              {
                tag: "Learning",
                date: "6 min read",
                title:
                  "Learning to Think Like a Developer, Not Just Write Like One",
                shortDesc:
                  "There is a difference between writing code that works and understanding why it works.",
                fullDesc:
                  "Throughout my development journey, I've learned that debugging, researching, breaking down problems, and asking the right questions are just as important as programming itself. This is about developing the mindset behind the code and learning how to approach unfamiliar problems without immediately looking for someone else's solution.",
                bullets: [
                  "Problem solving",
                  "Debugging",
                  "Critical thinking",
                  "Documentation",
                  "Asking better questions",
                  "Independent learning",
                ],
              },
              {
                tag: "Growth",
                date: "5 min read",
                title:
                  "Building in Public: The Uncomfortable Side of Becoming a Developer",
                shortDesc:
                  "Software development isn't always clean commits and successful builds; growth often happens in the messy middle.",
                fullDesc:
                  "I've learned that these moments are not evidence of failure. They are part of the process. This article explores how documenting the journey, sharing what I learn, and being honest about the difficult parts has changed the way I approach growth.",
                bullets: [
                  "Failure",
                  "Consistency",
                  "Self-improvement",
                  "Learning in public",
                  "Overcoming frustration",
                  "Staying committed",
                ],
              },
            ].map((post, idx) => {
              const isExpanded = !!expandedPosts[idx];

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase">
                      {post.tag}
                    </span>
                    <span className="text-gray-400 text-xs">{post.date}</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {isExpanded ? post.fullDesc : post.shortDesc}
                  </p>

                  {isExpanded && (
                    <div className="mt-4 rounded-xl bg-black/5 p-4 border border-black/5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-dark mb-3">
                        Inside this story:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {post.bullets.map((bullet, bulletIdx) => (
                          <span
                            key={bulletIdx}
                            className="bg-white text-gray-700 border border-black/5 px-2.5 py-1.5 rounded-full text-xs"
                          >
                            {bullet}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => togglePost(idx)}
                    className="mt-5 text-primary font-medium hover:translate-x-1 transition-transform inline-flex items-center"
                  >
                    {isExpanded ? "Explore Less" : "Explore More"} →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <span className="section-label">Let's Connect</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Have an idea worth building? Let's turn it into something
                meaningful.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Whether you have a project in mind, a technical challenge to
                discuss, or simply want to connect, I'd be glad to hear from
                you.
              </p>
              <a
                href="mailto:levilexkilobytes@gmail.com"
                className="flex items-center gap-4 py-4 border-y border-black/5 mb-6 text-dark hover:text-primary transition-colors"
              >
                <i className="fas fa-envelope text-primary text-lg"></i>
                <span>levilexkilobytes@gmail.com</span>
              </a>
              <div className="flex gap-3">
                <a
                  href="https://github.com/levilex-kilobytes"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/levi-monda-7081a1403/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="https://x.com/Itzlevi005"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <XIcon />
                </a>
              </div>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
              {formStatus === "success" && (
                <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {formStatus === "error" && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-2">
                  <i className="fas fa-exclamation-circle"></i>
                  {errorMessage}
                </div>
              )}
              {retryCount > 0 && formStatus === "loading" && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium flex items-center gap-2">
                  <i className="fas fa-spinner animate-spin"></i>
                  Retrying... (Attempt {retryCount + 1} of {maxRetries + 1})
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <label className="font-medium text-sm text-dark">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleFormChange}
                  disabled={formStatus === "loading"}
                  className="px-4 py-3 rounded-xl border border-black/10 bg-black/5 text-sm transition-all duration-300 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(200,30,30,0.06)] focus:bg-white w-full disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-medium text-sm text-dark">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleFormChange}
                  disabled={formStatus === "loading"}
                  className="px-4 py-3 rounded-xl border border-black/10 bg-black/5 text-sm transition-all duration-300 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(200,30,30,0.06)] focus:bg-white w-full disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-medium text-sm text-dark">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Project Inquiry"
                  value={formData.subject}
                  onChange={handleFormChange}
                  disabled={formStatus === "loading"}
                  className="px-4 py-3 rounded-xl border border-black/10 bg-black/5 text-sm transition-all duration-300 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(200,30,30,0.06)] focus:bg-white w-full disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-medium text-sm text-dark">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="How can I help you?"
                  value={formData.message}
                  onChange={handleFormChange}
                  disabled={formStatus === "loading"}
                  className="px-4 py-3 rounded-xl border border-black/10 bg-black/5 text-sm transition-all duration-300 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(200,30,30,0.06)] focus:bg-white w-full resize-y disabled:opacity-50 disabled:cursor-not-allowed"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="btn btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus === "loading" ? (
                  <>
                    <i className="fas fa-spinner animate-spin"></i> Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Send Message →
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-dark text-gray-300 py-12 px-4 md:px-8 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center pb-6 border-b border-white/10 mb-6">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-2xl font-bold text-white">
                Let's Build Something Exceptional.
              </h3>
              <p className="text-gray-500 mt-1">
                Ready to turn an idea into reality?
              </p>
            </div>
            <a href="#contact" className="btn btn-primary">
              Get in Touch →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-6 border-b border-white/10">
            <div>
              <h4 className="name-script text-3xl text-white mb-2">
                Levi Monda
              </h4>
              <p className="text-gray-500 text-sm">Software Developer</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="bg-white/5 px-3 py-1 rounded-full text-xs text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></span>
                  Building Software
                </span>
                <span className="bg-white/5 px-3 py-1 rounded-full text-xs text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-lg shadow-blue-400/50"></span>
                  Exploring Technology
                </span>
                <span className="bg-white/5 px-3 py-1 rounded-full text-xs text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-lg shadow-purple-400/50"></span>
                  Continuous Growth
                </span>
              </div>
              <div className="flex items-center gap-2 mt-3 text-gray-400 text-sm">
                <i className="fas fa-map-marker-alt text-primary"></i>
                <span>Nairobi, Kenya</span>
              </div>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Connect</h4>
              <div className="flex gap-3">
                <a
                  href="https://github.com/levilex-kilobytes"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/levi-monda-7081a1403/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="https://x.com/Itzlevi005"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <XIcon />
                </a>
                <a
                  href="mailto:levilexkilobytes@gmail.com"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-6 text-center text-sm text-gray-500">
            <span>© 2026 Levi Monda. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AboutMe;
