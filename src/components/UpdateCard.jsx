import { motion } from 'framer-motion'
import { FaUser } from 'react-icons/fa'

const UpdateCard = ({ update, member, index }) => {
  const { content, date, media } = update

  return (
    <motion.div
      className="bg-white rounded-lg shadow-soft p-6 border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          {member && member.photo ? (
            <img 
              src={member.photo} 
              alt={member.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <FaUser className="text-primary-500" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h4 className="text-lg font-medium text-gray-900">{update.memberName}</h4>
          <p className="text-sm text-gray-500 mb-3">
            {new Date(date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          
          <p className="text-gray-700 mb-4">{content}</p>
          
          {media && media.type === 'image' && (
            <div className="mt-4 rounded-lg overflow-hidden">
              <img 
                src={media.url} 
                alt="Update media"
                className="w-full h-auto rounded-lg transform transition-transform duration-500 hover:scale-105"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default UpdateCard