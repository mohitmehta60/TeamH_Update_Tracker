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
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white pt-14 pb-8">
      <div className="container mx-auto px-4">
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  <img
                    src="/media/logo.png"
                    alt="Team H Logo"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      marginRight: "12px",
                    }}
                  />
                  <span style={{ fontSize: "2rem" }}>Team H</span>
                </div>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                A collaborative project tracking and management application built
                with modern web technologies.
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-400 transition-colors font-medium"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-gray-400 hover:text-indigo-400 transition-colors font-medium"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#updates"
                  className="text-gray-400 hover:text-indigo-400 transition-colors font-medium"
                >
                  Updates
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Nakulsaini07-coder/TeamH_Update_Tracker"
                  className="text-gray-400 hover:text-indigo-400 transition-colors font-medium"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
              Contact
            </h3>
            <div className="flex items-center space-x-3 mb-3">
              <FaEnvelope className="text-indigo-400" />
              <a
                href="mailto:nakullsaini07@gmail.com"
                className="text-gray-300 hover:text-indigo-400 transition-colors"
              >
                nakullsaini07@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <FaEnvelope className="text-indigo-400" />
              <a
                href="mailto:g.mehta1971@gmail.com"
                className="text-gray-300 hover:text-indigo-400 transition-colors"
              >
                g.mehta1971@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
              Follow Us
            </h3>
            <div className="flex space-x-5 mt-2">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-2xl bg-gray-800 hover:bg-gray-700 rounded-full p-2 shadow-md"
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
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright */}
        <motion.div
          className="text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-indigo-400">
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
