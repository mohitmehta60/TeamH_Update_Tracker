import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    {
      icon: <FaGithub />,
      href: "https://github.com/Nakulsaini07-coder/TeamH_Update_Tracker",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin />,
      href: "https://www.linkedin.com/in/nakul-saini-4ba67328a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      label: "LinkedIn",
    },
    {
      icon: <FaTwitter />,
      href: "https://x.com/Nakulsaini07?t=DlrG2gyPWg4H_480wg9REw&s=08",
      label: "Twitter",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-enhanced pt-16 pb-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-responsive relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Logo & About */}
          <motion.div variants={itemVariants}>
            <div className="footer-section">
              <div className="footer-logo">
                <div className="flex items-center font-bold mb-4">
                  <img
                    src="/media/logo.png"
                    alt="Team H Logo"
                    className="w-12 h-12 rounded-full mr-3 ring-2 ring-blue-400/30"
                  />
                  <span className="text-2xl gradient-text">Team H</span>
                </div>
              </div>
              <p className="text-secondary-enhanced mb-4 leading-relaxed">
                A collaborative project tracking and management application built
                with modern web technologies for seamless team coordination.
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 text-enhanced border-b border-white/20 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-secondary-enhanced hover:text-blue-400 transition-colors font-medium hover:translate-x-1 transform duration-200 inline-block"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-secondary-enhanced hover:text-blue-400 transition-colors font-medium hover:translate-x-1 transform duration-200 inline-block"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#updates"
                  className="text-secondary-enhanced hover:text-blue-400 transition-colors font-medium hover:translate-x-1 transform duration-200 inline-block"
                >
                  Updates
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Nakulsaini07-coder/TeamH_Update_Tracker"
                  className="text-secondary-enhanced hover:text-blue-400 transition-colors font-medium hover:translate-x-1 transform duration-200 inline-block"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 text-enhanced border-b border-white/20 pb-2">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:nakullsaini07@gmail.com"
                  className="text-secondary-enhanced hover:text-blue-400 transition-colors text-sm"
                >
                  nakullsaini07@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:g.mehta1971@gmail.com"
                  className="text-secondary-enhanced hover:text-blue-400 transition-colors text-sm"
                >
                  g.mehta1971@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 text-enhanced border-b border-white/20 pb-2">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-enhanced hover:text-blue-400 transition-all duration-300 text-2xl glass-effect hover:bg-white/10 rounded-full p-3 shadow-lg"
                  whileHover={{ y: -5, scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8"></div>

        {/* Copyright */}
        <motion.div
          className="text-center text-secondary-enhanced text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold gradient-text">
              Team H Project
            </span>
            . All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;