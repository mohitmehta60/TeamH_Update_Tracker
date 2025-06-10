import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import ProjectOverview from "./components/ProjectOverview";
import TeamMembers from "./components/TeamMembers";
import Updates from "./components/Updates";
import Footer from "./components/Footer";
import WeeklyProgressTracker from "./components/WeeklyProgressTracker";
import GitHubCommitTracker from "./components/GitHubCommitTracker"; // Add this import
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
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="text-2xl font-semibold text-blue-400"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="mt-16 md:mt-20">
        <ProjectOverview />
        <section
          id="weekly-progress"
          className="pt-10 pb-2 bg-gradient-to-br from-gray-800 via-gray-800 to-gray-800"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            ></motion.div>
            <WeeklyProgressTracker />
          </div>
        </section>

        <section
          id="team"
          className="py-10 bg-gradient-to-br from-gray-800 via-gray-800 to-gray-800"
        >
          <div className="container mx-auto px-4">
            <GitHubCommitTracker /> {/* Now above the heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-4xl font-bold mb-2 text-center gradient-text"
                style={{ fontSize: "4rem", lineHeight: "8rem" }}
              >
                Our Team
              </h2>
            </motion.div>
            <TeamMembers members={teamMembers} />
          </div>
        </section>

        <section
          id="updates"
          className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-12 text-center gradient-text">
                Project Updates
              </h2>
            </motion.div>
            <Updates updates={updates} teamMembers={teamMembers} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
