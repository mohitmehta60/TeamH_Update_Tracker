import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UpdateCard from './UpdateCard'
import SearchBar from './SearchBar'

const Updates = ({ updates, teamMembers }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMember, setSelectedMember] = useState('all')
  
  // Format dates to display in a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }
  
  // Filter updates based on search term and selected member
  const filteredUpdates = useMemo(() => {
    return updates.filter(update => {
      const matchesSearch = update.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            update.memberName.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesMember = selectedMember === 'all' || update.memberName === selectedMember
      
      return matchesSearch && matchesMember
    })
  }, [updates, searchTerm, selectedMember])
  
  // Group updates by date
  const groupedUpdates = useMemo(() => {
    const groups = {}
    
    filteredUpdates.forEach(update => {
      const date = formatDate(update.date)
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(update)
    })
    
    // Convert to array sorted by date (newest first)
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
    <div>
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
                  className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200"
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
            className="text-center py-10 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No updates found matching your search.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Updates