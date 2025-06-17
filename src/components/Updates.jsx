import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UpdateCard from './UpdateCard'
import SearchBar from './SearchBar'

const Updates = ({ updates, teamMembers }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMember, setSelectedMember] = useState('all')
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }
  
  const filteredUpdates = useMemo(() => {
    return updates.filter(update => {
      const matchesSearch = update.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            update.memberName.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesMember = selectedMember === 'all' || update.memberName === selectedMember
      
      return matchesSearch && matchesMember
    })
  }, [updates, searchTerm, selectedMember])
  
  const groupedUpdates = useMemo(() => {
    const groups = {}
    
    filteredUpdates.forEach(update => {
      const date = formatDate(update.date)
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(update)
    })
    
    return Object.entries(groups)
      .map(([date, updates]) => ({ date, updates }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [filteredUpdates])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }
  
  const handleMemberFilter = (memberName) => {
    setSelectedMember(memberName)
  }

  return (
    <section id="updates" className="section-spacing bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-responsive relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            Project Updates
          </h2>
          <p className="text-lg sm:text-xl text-secondary-enhanced max-w-2xl mx-auto leading-relaxed">
            Stay up to date with our latest progress and achievements
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <SearchBar 
          searchTerm={searchTerm} 
          onSearch={handleSearch} 
          selectedMember={selectedMember}
          onMemberFilter={handleMemberFilter}
          members={teamMembers}
        />
        
        <AnimatePresence>
          {groupedUpdates.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {groupedUpdates.map(group => (
                <div key={group.date} className="mb-12">
                  <motion.h3 
                    className="text-xl sm:text-2xl font-semibold mb-6 pb-3 border-b border-white/20 text-enhanced"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {group.date}
                  </motion.h3>
                  
                  <div className="space-y-6">
                    {group.updates.map((update, index) => (
                      <UpdateCard 
                        key={update.id} 
                        update={update} 
                        index={index}
                        member={teamMembers.find(m => m.name === update.memberName)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-16 text-muted-enhanced"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <p className="text-xl font-medium text-enhanced mb-2">No updates found</p>
                <p className="text-secondary-enhanced">Try adjusting your search criteria</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Updates