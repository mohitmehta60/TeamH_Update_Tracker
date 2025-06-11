import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const TeamMemberCard = ({ member, index }) => {
  const { name, role, photo, bio, social } = member;

  return (
    <motion.div
      className="dark-card rounded-lg shadow-card overflow-hidden transform transition-all duration-300 hover:-translate-y-2 border border-gray-700"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="relative flex items-center justify-center py-6">
        <img
          src={photo}
          alt={name}
          className="object-cover rounded-full w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-1 text-gray-100">
          {name}
        </h3>
        <p className="text-blue-400 font-medium mb-2 sm:mb-4 text-sm sm:text-base">
          {role}
        </p>
        <p className="text-gray-300 mb-3 sm:mb-5 text-sm sm:text-base">{bio}</p>
        <div className="flex justify-start space-x-4">
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          )}
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          )}
          {social.twitter && (
            <a
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const TeamMembers = ({ members }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {members.map((member, index) => (
        <TeamMemberCard key={member.id} member={member} index={index} />
      ))}
    </div>
  );
};

export default TeamMembers;
