import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, GitBranch } from "lucide-react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  return matches;
}

const weeklyData = [
  {
    week: 1,
    title: "Project Foundation",
    description: "Setting up core infrastructure and initial components",
    tasks: [
      { label: "Frontend UI", percentage: 85 },
      { label: "Backend Integration", percentage: 60 },
      { label: "Testing", percentage: 40 },
      { label: "Deployment", percentage: 30 },
    ],
    overallProgress: 54,
  },
  {
    week: 2,
    title: "Feature Development",
    description: "Building main features and user interactions",
    tasks: [
      { label: "Frontend UI", percentage: 95 },
      { label: "Backend Integration", percentage: 80 },
      { label: "Testing", percentage: 65 },
      { label: "Deployment", percentage: 50 },
    ],
    overallProgress: 73,
  },
  {
    week: 3,
    title: "Integration & Testing",
    description: "Connecting systems and comprehensive testing",
    tasks: [
      { label: "Frontend UI", percentage: 100 },
      { label: "Backend Integration", percentage: 95 },
      { label: "Testing", percentage: 85 },
      { label: "Deployment", percentage: 70 },
    ],
    overallProgress: 88,
  },
  {
    week: 4,
    title: "Final Polish",
    description: "Final touches and deployment preparation",
    tasks: [
      { label: "Frontend UI", percentage: 100 },
      { label: "Backend Integration", percentage: 100 },
      { label: "Testing", percentage: 95 },
      { label: "Deployment", percentage: 90 },
    ],
    overallProgress: 96,
  },
];

const ProgressBar = ({ percentage, label, delay = 0 }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, delay);

    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-enhanced">{label}</span>
        <span className="text-sm font-bold text-blue-400">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner">
        <motion.div
          className="h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-sm"
          initial={{ width: 0 }}
          animate={{ width: `${animatedPercentage}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const WeeklyProgressTracker = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const nextWeek = () => {
    setCurrentWeek((prev) => (prev + 1) % weeklyData.length);
  };

  const prevWeek = () => {
    setCurrentWeek(
      (prev) => (prev - 1 + weeklyData.length) % weeklyData.length
    );
  };

  const currentData = weeklyData[currentWeek];

  return (
    <section id="weekly-progress" className="section-spacing bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-40 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-40 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-responsive relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <GitBranch className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
              Weekly Progress Tracker
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-secondary-enhanced max-w-2xl mx-auto leading-relaxed">
            Track our weekly development progress and milestones
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons - Desktop only */}
          {!isTablet && (
            <>
              <button
                onClick={prevWeek}
                className="absolute left-[-80px] top-1/2 transform -translate-y-1/2 z-10 glass-effect shadow-lg rounded-full p-4 hover:bg-white/10 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentWeek === 0}
              >
                <ChevronLeft
                  className={`w-6 h-6 ${
                    currentWeek === 0
                      ? "text-muted-enhanced"
                      : "text-blue-400 group-hover:text-blue-300"
                  }`}
                />
              </button>
              <button
                onClick={nextWeek}
                className="absolute right-[-80px] top-1/2 transform -translate-y-1/2 z-10 glass-effect shadow-lg rounded-full p-4 hover:bg-white/10 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentWeek === weeklyData.length - 1}
              >
                <ChevronRight
                  className={`w-6 h-6 ${
                    currentWeek === weeklyData.length - 1
                      ? "text-muted-enhanced"
                      : "text-blue-400 group-hover:text-blue-300"
                  }`}
                />
              </button>
            </>
          )}

          {/* Progress Cards */}
          {isMobile ? (
            // Mobile: horizontal scroll
            <div className="flex overflow-x-auto gap-6 px-4 snap-x snap-mandatory scrollbar-hide">
              {weeklyData.map((week, idx) => (
                <motion.div
                  key={week.week}
                  className="min-w-[85vw] dark-card rounded-2xl overflow-hidden shadow-2xl snap-center hover-lift"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  viewport={{ once: true }}
                >
                  <div className="p-6 sm:p-8">
                    {/* Week Header */}
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <Calendar className="w-6 h-6 text-blue-400" />
                        <h3 className="text-2xl sm:text-3xl font-bold text-enhanced">
                          Week {week.week}
                        </h3>
                      </div>
                      <h4 className="text-lg sm:text-xl font-semibold text-secondary-enhanced mb-3">
                        {week.title}
                      </h4>
                      <p className="text-muted-enhanced leading-relaxed">{week.description}</p>
                    </div>

                    {/* Overall Progress */}
                    <div className="mb-8 p-6 glass-effect rounded-xl border border-white/10">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-base font-semibold text-enhanced">
                          Overall Progress
                        </span>
                        <span className="text-2xl font-bold gradient-text">
                          {week.overallProgress}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden shadow-inner">
                        <motion.div
                          className="h-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${week.overallProgress}%` }}
                          transition={{
                            duration: 1.5,
                            ease: "easeOut",
                            delay: 0.2,
                          }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>

                    {/* Task Progress Bars */}
                    <div className="space-y-2">
                      <h5 className="text-base font-semibold text-enhanced mb-4">
                        Task Breakdown
                      </h5>
                      {week.tasks.map((task, index) => (
                        <ProgressBar
                          key={task.label}
                          label={task.label}
                          percentage={task.percentage}
                          delay={index * 200 + 400}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Desktop/Tablet: single card with navigation
            <div className="dark-card rounded-2xl shadow-2xl overflow-hidden hover-lift">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWeek}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="p-8 lg:p-12"
                >
                  {/* Week Header */}
                  <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Calendar className="w-8 h-8 text-blue-400" />
                      <h3 className="text-3xl lg:text-4xl font-bold text-enhanced">
                        Week {currentData.week}
                      </h3>
                    </div>
                    <h4 className="text-xl lg:text-2xl font-semibold text-secondary-enhanced mb-4">
                      {currentData.title}
                    </h4>
                    <p className="text-muted-enhanced text-lg leading-relaxed max-w-2xl mx-auto">
                      {currentData.description}
                    </p>
                  </div>

                  {/* Overall Progress */}
                  <div className="mb-10 p-8 glass-effect rounded-xl border border-white/10">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl font-semibold text-enhanced">
                        Overall Progress
                      </span>
                      <span className="text-3xl font-bold gradient-text">
                        {currentData.overallProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-5 overflow-hidden shadow-inner">
                      <motion.div
                        className="h-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${currentData.overallProgress}%` }}
                        transition={{
                          duration: 1.5,
                          ease: "easeOut",
                          delay: 0.2,
                        }}
                      />
                    </div>
                  </div>

                  {/* Task Progress Bars */}
                  <div className="space-y-2">
                    <h5 className="text-xl font-semibold text-enhanced mb-6">
                      Task Breakdown
                    </h5>
                    <div className="grid gap-4">
                      {currentData.tasks.map((task, index) => (
                        <ProgressBar
                          key={task.label}
                          label={task.label}
                          percentage={task.percentage}
                          delay={index * 200 + 400}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Week indicators for mobile/tablet */}
          {(isMobile || isTablet) && (
            <div className="flex justify-center mt-8 gap-2">
              {weeklyData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentWeek(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentWeek
                      ? "bg-blue-400 scale-125"
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WeeklyProgressTracker;