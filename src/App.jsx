import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import ProjectOverview from "./components/ProjectOverview";
import TeamMembers from "./components/TeamMembers";
import Updates from "./components/Updates";
import Footer from "./components/Footer";
import WeeklyProgressTracker from "./components/WeeklyProgressTracker";
import GitHubCommitTracker from "./components/GitHubCommitTracker";
import VideoUpdateTracker from "./components/VideoUpdateTracker";
import "./App.css";

function App() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch team members data
    fetch("/team.json")
      .then((response) => response.json())
      .then((data) => {
        setTeamMembers(data);
      })
      .catch((error) => console.error("Error fetching team data:", error));

    // Fetch updates data
    fetch("/updates.json")
      .then((response) => response.json())
      .then((data) => {
        setUpdates(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching updates data:", error));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="text-xl font-semibold gradient-text"
          >
            Loading Team H Updates...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="mt-16 lg:mt-20">
        <ProjectOverview />
        <VideoUpdateTracker />
        <WeeklyProgressTracker />
        
        <section id="github-commits">
          <div className="container-responsive">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <GitHubCommitTracker />
            </motion.div>
          </div>
        </section>

        <Updates updates={updates} teamMembers={teamMembers} />
        <TeamMembers members={teamMembers} />
      </main>

      <Footer />
    </div>
  );
}

export default App;