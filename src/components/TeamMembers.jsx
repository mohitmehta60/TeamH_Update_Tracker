import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const TeamMemberCard = ({ member, index }) => {
  const { name, role, photo, bio, social } = member;

  return (
    <motion.div
      className="dark-card rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 border border-white/10 hover-lift"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="relative flex items-center justify-center py-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
        <img
          src={photo}
          alt={name}
          className="object-cover rounded-full w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 transition-transform duration-500 hover:scale-110 ring-4 ring-blue-400/30 shadow-2xl"
        />
      </div>
      <div className="p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-enhanced">
          {name}
        </h3>
        <p className="text-blue-400 font-semibold mb-4 text-base sm:text-lg">
          {role}
        </p>
        <p className="text-secondary-enhanced mb-6 text-sm sm:text-base leading-relaxed">{bio}</p>
        <div className="flex justify-start space-x-4">
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-enhanced hover:text-blue-400 transition-all duration-300 transform hover:scale-110 p-2 glass-effect rounded-full"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          )}
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-enhanced hover:text-blue-400 transition-all duration-300 transform hover:scale-110 p-2 glass-effect rounded-full"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          )}
          {social.twitter && (
            <a
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-enhanced hover:text-blue-400 transition-all duration-300 transform hover:scale-110 p-2 glass-effect rounded-full"
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
    <section id="team" className="section-spacing bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 gradient-text">
            Our Team
          </h2>
          <p className="text-lg sm:text-xl text-secondary-enhanced max-w-2xl mx-auto leading-relaxed">
            Meet the talented individuals behind our success
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {members.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;