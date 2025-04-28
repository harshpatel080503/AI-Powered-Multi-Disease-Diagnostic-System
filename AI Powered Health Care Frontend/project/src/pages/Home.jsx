import React from 'react';
import { Link } from 'react-router-dom';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Harsh Patel',
    position: 'Data Scientist',
    image: 'src/assets/Team/Harsh.jpg',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    name: 'Vraj Patel',
    position: 'Data Scientist',
    image: 'src/assets/Team/Vraj.jpg',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    name: 'Vishwa Patel',
    position: 'Full Stack Web Developer',
    image: 'src/assets/Team/Vishwa.jpg',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    name: 'Charmi Rupareliya',
    position: 'Full Stack Web Developer',
    image: 'src/assets/Team/Charmi.jpg',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  }
];

const Home = () => {
  const [typewriterText] = useTypewriter({
    words: ['Diabetes', 'Heart Disease', 'Parkinson\'s', 'Breast Cancer', 'Tuberculosis', 'Brain Tumor'],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen relative bg-gradient-to-b from-primary-50 to-white flex items-center justify-center py-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url("https://raw.githubusercontent.com/yourusername/your-repo/main/medical-ai-bg.jpg")',
            backgroundBlendMode: 'overlay'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Next Generation</span>
              <span className="block text-primary-600">
                AI Medical{' '}
                <span className="inline-block">
                  {typewriterText}
                  <Cursor cursorStyle="_" />
                </span>
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Advanced AI-powered diagnostic system for multiple diseases. Fast, accurate, and reliable medical analysis at your fingertips.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link
                to="/diabetes"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="min-h-screen bg-white flex items-center justify-center py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Services</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 perspective-1000">
            {[
              {
                title: 'Diabetes Analysis',
                description: 'Advanced diabetes risk assessment using multiple health parameters.',
                icon: '💉'
              },
              {
                title: 'Heart Disease Detection',
                description: 'Comprehensive heart health analysis using AI algorithms.',
                icon: '❤️'
              },
              {
                title: "Parkinson's Disease",
                description: 'Early detection of Parkinson disease symptoms.',
                icon: '🧠'
              },
              {
                title: 'Breast Cancer Screening',
                description: 'AI-powered breast cancer risk assessment.',
                icon: '🎗️'
              },
              {
                title: 'Tuberculosis Detection',
                description: 'Advanced TB screening using chest X-ray analysis.',
                icon: '🫁'
              },
              {
                title: 'Brain Tumor Detection',
                description: 'MRI-based brain tumor detection and analysis.',
                icon: '🔬'
              }
            ].map((feature) => (
              <article
                key={feature.title}
                className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-xl group"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <span className="text-4xl mb-2">{feature.icon}</span>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="relative group">
                <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:blur-sm"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-white font-bold text-xl mb-2">{member.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{member.position}</p>
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
    </div>
  );
};

export default Home;