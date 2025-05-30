import { motion } from 'framer-motion'
import { FaUser } from 'react-icons/fa'

const UpdateCard = ({ update, member, index }) => {
  const { content, date, media } = update

  const renderMedia = () => {
    if (!media) return null

    if (media.type === 'image') {
      return (
        <div className="mt-4 rounded-lg overflow-hidden max-w-lg mx-auto">
          <img 
            src={media.url} 
            alt={media.caption || "Update media"}
            className="w-full h-auto rounded-lg transform transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          {media.caption && (
            <p className="text-sm text-gray-400 mt-2 text-center">{media.caption}</p>
          )}
        </div>
      )
    }

    if (media.type === 'video') {
      return (
        <div className="mt-4 rounded-lg overflow-hidden max-w-lg mx-auto">
          <div className="relative pb-[56.25%] h-0">
            <iframe
              src={media.url}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          {media.caption && (
            <p className="text-sm text-gray-400 mt-2 text-center">{media.caption}</p>
          )}
        </div>
      )
    }

    return null
  }

  return (
    <motion.div
      className="dark-card rounded-lg shadow-soft p-6 border border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          {member && member.photo ? (
            <img 
              src={member.photo} 
              alt={member.name}
              className="w-12 h-12 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
              <FaUser className="text-blue-400" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h4 className="text-lg font-medium text-gray-100">{update.memberName}</h4>
          <p className="text-sm text-gray-400 mb-3">
            {new Date(date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          
          <p className="text-gray-300 mb-4">{content}</p>
          
          {renderMedia()}
        </div>
      </div>
    </motion.div>
  )
}

export default UpdateCard