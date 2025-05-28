import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  const socialLinks = [
    { icon: <FaGithub />, href: 'https://github.com/Nakulsaini07-coder/TeamH_Update_Tracker', label: 'GitHub' },
    { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/nakul-saini-4ba67328a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
    { icon: <FaTwitter />, href: 'https://x.com/Nakulsaini07?t=DlrG2gyPWg4H_480wg9REw&s=08', label: 'Twitter' }
  ]

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Team H Project</h3>
            <p className="text-gray-400 mb-4">
              A collaborative project tracking and management application built with modern web technologies.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-white transition-colors">Team</a></li>
              <li><a href="#updates" className="text-gray-400 hover:text-white transition-colors">Updates</a></li>
              <li><a href="https://github.com/Nakulsaini07-coder/TeamH_Update_Tracker" className="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="flex items-center space-x-2 mb-2">
              <FaEnvelope className="text-gray-400" />
              <a href="mailto:nakullsaini07@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                nakullsaini07@gmail.com
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>© {new Date().getFullYear()} Team H Project. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer