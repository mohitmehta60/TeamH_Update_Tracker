import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import ProjectOverview from './components/ProjectOverview'
import TeamMembers from './components/TeamMembers'
import Updates from './components/Updates'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [teamMembers, setTeamMembers] = useState([])
  const [updates, setUpdates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch team members data
    fetch('/team.json')
      .then(response => response.json())
      .then(data => {
        setTeamMembers(data)
      })
      .catch(error => console.error('Error fetching team data:', error))

    // Fetch updates data
    fetch('/updates.json')
      .then(response => response.json())
      .then(data => {
        setUpdates(data)
        setLoading(false)
      })
      .catch(error => console.error('Error fetching updates data:', error))
  }, [])

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
            repeatType: "loop"
          }}
          className="text-2xl font-semibold text-blue-400"
        >
          Loading...
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      
      <main className="flex-grow">
        <ProjectOverview />
        
        <section id="team" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Our Team</h2>
            </motion.div>
            <TeamMembers members={teamMembers} />
          </div>
        </section>
        
        <section id="updates" className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Project Updates</h2>
            </motion.div>
            <Updates updates={updates} teamMembers={teamMembers} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default App