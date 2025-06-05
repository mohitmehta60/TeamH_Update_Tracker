import { motion } from "framer-motion";

const Header = () => {
  // Generalized scroll handler
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    { name: "Home", href: "#", onClick: (e) => handleNavClick(e, "home") },
    {
      name: "Weekly Progress",
      href: "#weekly-progress",
      onClick: (e) => handleNavClick(e, "weekly-progress"),
    },
    { name: "Team", href: "#team", onClick: (e) => handleNavClick(e, "team") },
    { name: "Updates", href: "#updates", onClick: (e) => handleNavClick(e, "updates") },
    {
      name: "GitHub",
      href: "https://github.com/Nakulsaini07-coder/TeamH_Update_Tracker",
      // No onClick for external link
    },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a href="#" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">
                Team H
              </span>
            </a>
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={link.onClick}
                className="text-sm font-medium transition-colors text-gray-700 hover:text-primary-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                target={link.name === "GitHub" ? "_blank" : undefined}
                rel={link.name === "GitHub" ? "noopener noreferrer" : undefined}
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          <div className="md:hidden">
            <button className="p-2 focus:outline-none text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
