import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Github,
  Home,
  Users,
  TrendingUp,
  Bell,
  GitCommit,
  Video,
} from "lucide-react"; // Added Video icon

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generalized scroll handler
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "video-update") {
      const yOffset = -80; // Adjust for header height if needed
      const section = document.getElementById("video-update");
      if (section) {
        const y =
          section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    {
      name: "Home",
      href: "#",
      onClick: (e) => handleNavClick(e, "home"),
      icon: Home,
    },
    {
      name: "Video Update",
      href: "#video-update",
      onClick: (e) => handleNavClick(e, "video-update"),
      icon: Video,
    },
    {
      name: "Weekly Progress",
      href: "#weekly-progress",
      onClick: (e) => {
        e.preventDefault();
        const yOffset = -80; // Adjust this value to match your header height
        const element = document.getElementById("weekly-progress");
        if (element) {
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      },
      icon: TrendingUp,
    },
    {
      name: "Git Commits",
      href: "#github-commits", // Make sure this matches the section id in App.jsx
      onClick: (e) => {
        e.preventDefault();
        setMenuOpen(false);
        const yOffset = -80; // Adjust this value to match your header height
        const element = document.getElementById("github-commits");
        if (element) {
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      },
      icon: GitCommit,
    },
    {
      name: "Updates",
      href: "#updates",
      onClick: (e) => handleNavClick(e, "updates"),
      icon: Bell,
    },
    {
      name: "Team",
      href: "#team",
      onClick: (e) => {
        e.preventDefault();
        setMenuOpen(false);
        const yOffset = -90; // Adjust this value to match your header height (try -90 for better spacing)
        const element = document.getElementById("team");
        if (element) {
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
          // Optional: Add a highlight effect after scroll
          setTimeout(() => {
            element.classList.add("ring-4", "ring-blue-400");
            setTimeout(() => {
              element.classList.remove("ring-4", "ring-blue-400");
            }, 1200);
          }, 600);
        }
      },
      icon: Users,
    },
    {
      name: "GitHub",
      href: "https://github.com/Nakulsaini07-coder/TeamH_Update_Tracker",
      icon: Github,
      external: true,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-2xl border-b border-slate-700/50"
          : "bg-slate-900/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
          {/* Logo & Title Section */}
          <div className="flex items-center gap-3 sm:gap-4 cursor-pointer select-none">
            {/* Simple Logo */}
            <div className="flex-shrink-0">
              <img
                src="/media/logo.png"
                alt="D-GIT Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain rounded-full"
              />
            </div>
            {/* Title & Subtitle */}
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg sm:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
                  D-GIT
                </span>
                <span className="hidden sm:inline-block w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full opacity-80"></span>
                <span className="text-lg sm:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
                  Team H
                </span>
              </div>
              <span className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-widest bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mt-1 drop-shadow-sm">
                Update Tracker
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={link.onClick}
                  className={`
                    flex items-center space-x-2 px-3 xl:px-4 py-2 rounded-xl text-sm font-medium 
                    transition-all duration-300 hover:bg-slate-800/50 hover:text-blue-400
                    ${link.external ? "text-slate-300" : "text-slate-300"}
                    relative overflow-hidden group
                  `}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="whitespace-nowrap">{link.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 text-slate-300 hover:text-blue-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5 sm:w-6 sm:h-6">
              <Menu
                className={`absolute inset-0 transition-all duration-300 ${
                  menuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`}
                size={20}
              />
              <X
                className={`absolute inset-0 transition-all duration-300 ${
                  menuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`}
                size={20}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out ${
            menuOpen
              ? "max-h-96 opacity-100 pb-4 sm:pb-6"
              : "max-h-0 opacity-0 pb-0"
          } overflow-hidden`}
        >
          <nav className="flex flex-col space-y-1 sm:space-y-2 pt-3 sm:pt-4 border-t border-slate-700/50">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={link.onClick}
                  className="flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 transition-all duration-300 transform hover:translate-x-2"
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
                    transition: `all 0.3s ease ${index * 0.05}s`,
                  }}
                >
                  <Icon size={16} />
                  <span className="font-medium text-sm sm:text-base">
                    {link.name}
                  </span>
                  {link.external && (
                    <div className="ml-auto">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
