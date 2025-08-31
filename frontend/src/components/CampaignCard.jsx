import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Heart } from 'lucide-react';

const CampaignCard = ({ campaign, onJoin }) => {
  const getStatusBadge = () => {
    switch (campaign.status) {
      case 'upcoming':
        return <span className="badge-blood-type">Upcoming</span>;
      case 'ongoing':
        return <span className="badge-success animate-pulse">Live Now</span>;
      case 'completed':
        return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">Completed</span>;
    }
  };

  const progressPercentage = (campaign.participants / campaign.maxParticipants) * 100;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="card-campaign group"
    >
      {/* Campaign Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={campaign.image} 
          alt={campaign.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          {getStatusBadge()}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
          {campaign.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{campaign.date}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{campaign.location}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <Heart className="w-4 h-4 mr-2" />
            <span className="text-sm">By {campaign.organizer}</span>
          </div>
        </div>

        {/* Participation Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Participants
            </span>
            <span className="text-sm font-bold text-primary">
              {campaign.participants}/{campaign.maxParticipants}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full"
            />
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onJoin(campaign.id)}
          disabled={campaign.status === 'completed' || campaign.participants >= campaign.maxParticipants}
          className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 ${
            campaign.status === 'completed' || campaign.participants >= campaign.maxParticipants
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          {campaign.status === 'completed' 
            ? 'Campaign Completed'
            : campaign.participants >= campaign.maxParticipants
            ? 'Campaign Full'
            : campaign.status === 'ongoing'
            ? 'Join Now'
            : 'Register to Join'
          }
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CampaignCard;
