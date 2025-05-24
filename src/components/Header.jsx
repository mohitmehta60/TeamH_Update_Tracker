import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Team', href: '#team' },
    { name: 'Updates', href: '#updates' },
    { name: 'GitHub', href: 'https://github.com/team-h-project' }
  ]

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
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
              <span className={`text-2xl font-bold ${scrolled ? 'text-primary-600' : 'text-primary-600'}`}>
                Team H
              </span>
            </a>
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-gray-800 hover:text-primary-500'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </nav>
          
          <div className="md:hidden">
            <button className={`p-2 focus:outline-none ${scrolled ? 'text-gray-700' : 'text-white'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header