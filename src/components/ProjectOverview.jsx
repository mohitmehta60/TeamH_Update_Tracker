import { motion } from 'framer-motion'

const ProjectOverview = () => {
  const techStack = [
    'React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Framer Motion'
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 gradient-text"
            variants={itemVariants}
          >
            Team H Project
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            variants={itemVariants}
          >
            An innovative web application for collaborative productivity and team management.
            We're building a platform that helps teams organize their work, track progress,
            and achieve their goals together.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-3 text-gray-200">Tech Stack:</h3>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {techStack.map((tech, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 dark-card rounded-full text-sm font-medium text-blue-400 shadow-soft border border-gray-700"
                  whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <a 
              href="#updates" 
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform transition hover:-translate-y-1"
            >
              View Progress Updates
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectOverview