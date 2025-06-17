import { motion } from 'framer-motion'
import { FaUser } from 'react-icons/fa'

const UpdateCard = ({ update, member, index }) => {
  const { content, date, media } = update

  const renderMedia = () => {
    if (!media) return null

    if (media.type === 'image') {
      return (
        <div className="mt-6 rounded-lg overflow-hidden max-w-lg mx-auto">
          <img 
            src={media.url} 
            alt={media.caption || "Update media"}
            className="w-full h-auto rounded-lg transform transition-transform duration-500 hover:scale-105 shadow-lg"
            loading="lazy"
          />
          {media.caption && (
            <p className="text-sm text-secondary-enhanced mt-3 text-center font-medium">{media.caption}</p>
          )}
        </div>
      )
    }

    if (media.type === 'video') {
      return (
        <div className="mt-6 rounded-lg overflow-hidden max-w-lg mx-auto shadow-lg">
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
            <p className="text-sm text-secondary-enhanced mt-3 text-center font-medium">{media.caption}</p>
          )}
        </div>
      )
    }

    return null
  }

  return (
    <motion.div
      className="dark-card rounded-xl shadow-2xl p-6 sm:p-8 border border-white/10 overflow-hidden hover-lift"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4 sm:mr-6">
          {member && member.photo ? (
            <img 
              src={member.photo} 
              alt={member.name}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-blue-400/30 shadow-lg"
              loading="lazy"
            />
          ) : (
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass-effect flex items-center justify-center ring-2 ring-blue-400/30">
              <FaUser className="text-blue-400" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h4 className="text-lg sm:text-xl font-semibold text-enhanced mb-1">{update.memberName}</h4>
          <p className="text-sm text-secondary-enhanced mb-4 font-medium">
            {new Date(date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          
          <p className="text-secondary-enhanced mb-4 leading-relaxed text-base">{content}</p>
          
          {renderMedia()}
        </div>
      </div>
    </motion.div>
  )
}

export default UpdateCard