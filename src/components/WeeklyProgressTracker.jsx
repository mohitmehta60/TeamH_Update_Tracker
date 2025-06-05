import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, GitBranch } from "lucide-react";

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
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-blue-600">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="h-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
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
    <div className="w-full px-0 py-16 bg-gradient-to-br from-slate-50 to-blue-50 pb-[15px]">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <GitBranch className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DGit Weekly Progress Traker Tracker
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Track our weekly development progress
          </p>
        </motion.div>
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevWeek}
          className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-blue-50 transition-colors duration-200 group"
          disabled={currentWeek === 0}
        >
          <ChevronLeft
            className={`w-6 h-6 ${
              currentWeek === 0
                ? "text-gray-300"
                : "text-blue-600 group-hover:text-blue-700"
            }`}
          />
        </button>

        <button
          onClick={nextWeek}
          className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-blue-50 transition-colors duration-200 group"
          disabled={currentWeek === weeklyData.length - 1}
        >
          <ChevronRight
            className={`w-6 h-6 ${
              currentWeek === weeklyData.length - 1
                ? "text-gray-300"
                : "text-blue-600 group-hover:text-blue-700"
            }`}
          />
        </button>
        {/* Progress Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWeek}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="p-8"
            >
              {/* Week Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <h3 className="text-3xl font-bold text-gray-800">
                    Week {currentData.week}
                  </h3>
                </div>
                <h4 className="text-xl font-semibold text-gray-700 mb-2">
                  {currentData.title}
                </h4>
                <p className="text-gray-600">{currentData.description}</p>
              </div>

              {/* Overall Progress */}
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">
                    Overall Progress
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    {currentData.overallProgress}%
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-4 overflow-hidden shadow-inner">
                  <motion.div
                    className="h-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${currentData.overallProgress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </div>

              {/* Task Progress Bars */}
              <div className="space-y-1">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">
                  Task Breakdown
                </h5>
                {currentData.tasks.map((task, index) => (
                  <ProgressBar
                    key={task.label}
                    label={task.label}
                    percentage={task.percentage}
                    delay={index * 200 + 400}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Week Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {weeklyData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentWeek(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentWeek
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyProgressTracker;
