import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Users, MapPin, Clock } from 'lucide-react';
import heroImage from '../assets/image.png';

const HeroSection = () => {
  const stats = [
    { icon: Users, label: 'Active Donors', value: '25,000+' },
    { icon: Heart, label: 'Lives Saved', value: '50,000+' },
    { icon: MapPin, label: 'Cities Covered', value: '150+' },
    { icon: Clock, label: 'Avg Response Time', value: '< 30min' },
  ];

  return (
    <section className="hero-section relative pt-16">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-primary-glow/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Save Lives Through
              <span className="block text-gradient-hero">
                Smart Blood Matching
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect blood donors with recipients in real-time. Location-based matching, 
              verified donors, and emergency response for life-saving donations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/signup" className="btn-hero">
                  <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                  Become a Donor
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/matching" className="btn-hero">
                  <Users className="w-5 h-5 mr-2" />
                  Find Blood Donors
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <stat.icon className="h-8 w-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Static decorative elements */}
      <div className="absolute top-1/4 left-1/12 hidden lg:block">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Heart className="w-8 h-8 text-white" fill="currentColor" />
        </div>
      </div>

      <div className="absolute bottom-1/4 right-1/12 hidden lg:block">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Users className="w-6 h-6 text-white" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
