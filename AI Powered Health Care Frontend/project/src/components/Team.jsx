import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Harsh Patel',
    position: 'Lead AI Researcher',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah&backgroundColor=b6e3f4',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    name: 'Dr. James Wilson',
    position: 'Medical Director',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james&backgroundColor=c0aede',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    name: 'Dr. Maya Patel',
    position: 'ML Engineer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maya&backgroundColor=ffd5dc',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    name: 'Dr. Alex Thompson',
    position: 'Data Scientist',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex&backgroundColor=d1f7c4',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  }
];

const Team = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="relative group">
              <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square">
                {/* Image */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:blur-sm"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-white font-bold text-xl mb-2">{member.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{member.position}</p>
                  
                  {/* Social Links */}
                  <div className="flex space-x-4">
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary-400 transition-colors"
                    >
                      <FaGithub className="w-6 h-6" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary-400 transition-colors"
                    >
                      <FaLinkedin className="w-6 h-6" />
                    </a>
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary-400 transition-colors"
                    >
                      <FaTwitter className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;