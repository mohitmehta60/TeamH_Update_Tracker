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
      <div className="relative aspect-square overflow-hidden flex items-center justify-center">
        <img
          src={photo}
          alt={name}
          className="object-cover w-[400px] h-[400px] rounded-full transform transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1 text-gray-100">{name}</h3>
        <p className="text-blue-400 font-medium mb-4">{role}</p>
        <p className="text-gray-300 mb-5">{bio}</p>

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member, index) => (
        <TeamMemberCard key={member.id} member={member} index={index} />
      ))}
    </div>
  );
};

export default TeamMembers;
