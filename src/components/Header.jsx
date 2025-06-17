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
} from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const yOffset = -100;
      const section = document.getElementById(sectionId);
      if (section) {
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
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
      onClick: (e) => handleNavClick(e, "weekly-progress"),
      icon: TrendingUp,
    },
    {
      name: "Git Commits",
      href: "#github-commits",
      onClick: (e) => handleNavClick(e, "github-commits"),
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
      onClick: (e) => handleNavClick(e, "team"),
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
          ? "glass-effect shadow-2xl border-b border-white/10"
          : "bg-slate-900/60 backdrop-blur-sm"
      }`}
    >
      <div className="container-responsive">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo & Title Section */}
          <div className="flex items-center gap-3 sm:gap-4 cursor-pointer select-none">
            <div className="flex-shrink-0">
              <img
                src="/media/logo.png"
                alt="D-GIT Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain rounded-full ring-2 ring-blue-400/30"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-extrabold gradient-text tracking-tight">
                  D-GIT
                </span>
                <span className="hidden sm:inline-block w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full opacity-80"></span>
                <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-extrabold gradient-text tracking-tight">
                  Team H
                </span>
              </div>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-secondary-enhanced mt-1">
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
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:text-blue-400 text-secondary-enhanced relative overflow-hidden group"
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  <Icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
                  <span className="whitespace-nowrap">{link.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl glass-effect hover:bg-white/10 transition-all duration-300 text-secondary-enhanced hover:text-blue-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 transition-all duration-300 ${
                  menuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`}
                size={24}
              />
              <X
                className={`absolute inset-0 transition-all duration-300 ${
                  menuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`}
                size={24}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out ${
            menuOpen
              ? "max-h-96 opacity-100 pb-6"
              : "max-h-0 opacity-0 pb-0"
          } overflow-hidden`}
        >
          <nav className="flex flex-col space-y-2 pt-4 border-t border-white/10">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={link.onClick}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-secondary-enhanced hover:text-blue-400 hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2"
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  <Icon size={18} />
                  <span className="font-medium">{link.name}</span>
                  {link.external && (
                    <div className="ml-auto">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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