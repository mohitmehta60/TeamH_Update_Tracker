import { motion } from "framer-motion";

const ProjectOverview = () => {
  const techStack = [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
    "Framer Motion",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="pt-12 sm:pt-20 md:pt-32 pb-6 sm:pb-12 md:pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 md:mb-6 gradient-text"
            variants={itemVariants}
          >
            Update Tracker
          </motion.h1>
          <motion.h1
            className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 md:mb-6 gradient-text"
            variants={itemVariants}
          >
            (d-Git)
          </motion.h1>

          {/* <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-8"
            variants={itemVariants}
          >
            An innovative web application for collaborative productivity and team management.
            We're building a platform that helps teams organize their work, track progress,
            and achieve their goals together.
          </motion.p> */}

          {/* <motion.div variants={itemVariants}>
            <h3 className="text-base sm:text-lg font-semibold mb-2 md:mb-3 text-gray-800">Tech Stack:</h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 md:mb-8">
              {techStack.map((tech, index) => (
                <motion.span
                  key={index}
                  className="px-3 sm:px-4 py-1 sm:py-2 dark-card rounded-full text-xs sm:text-sm font-medium text-blue-400 shadow-soft border border-gray-700"
                  whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div> */}

          <motion.div variants={itemVariants}>
            <a
              href="#updates"
              className="inline-block w-full sm:w-auto px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-md sm:rounded-lg shadow-md hover:shadow-lg transform transition hover:-translate-y-1 text-center mb-2"
            >
              View Progress Updates
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectOverview;
