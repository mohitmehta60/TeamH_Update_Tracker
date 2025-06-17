import { motion } from "framer-motion";

const ProjectOverview = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
  };

  return (
    <section className="section-spacing bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-responsive relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 gradient-text leading-tight">
              Update Tracker
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-enhanced">
              (d-Git)
            </h2>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-secondary-enhanced mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            A comprehensive project tracking and management application built with modern web technologies for seamless collaboration and progress monitoring.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#updates"
              className="btn-primary w-full sm:w-auto text-center px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              View Progress Updates
            </a>
            <a
              href="#team"
              className="glass-effect w-full sm:w-auto text-center px-8 py-4 text-lg font-semibold rounded-xl text-enhanced border border-white/20 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              Meet Our Team
            </a>
          </motion.div>

          {/* Stats section */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {[
              { number: "6", label: "Team Members" },
              { number: "40+", label: "Updates" },
              { number: "4", label: "Weeks Progress" },
              { number: "100%", label: "Commitment" }
            ].map((stat, index) => (
              <div key={index} className="glass-effect p-6 rounded-xl text-center hover-lift">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-secondary-enhanced font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectOverview;