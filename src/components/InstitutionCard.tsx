import React from 'react';
import { Star, Globe, Calendar, Users } from 'lucide-react';
import { Institution } from '../types';

interface InstitutionCardProps {
  institution: Institution;
  onViewReviews: (id: number) => void;
  onAddReview: (id: number) => void;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({
  institution,
  onViewReviews,
  onAddReview,
}) => {
  const averageRating = institution.totalReviews > 0 
    ? (institution.totalRating / institution.totalReviews).toFixed(1)
    : '0.0';

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2"></div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{institution.name}</h3>
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {institution.category}
              </span>
              {!institution.isActive && (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Inactive
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-lg font-semibold text-gray-900">{averageRating}</span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{institution.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{institution.totalReviews} reviews</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(institution.timestamp)}</span>
            </div>
          </div>
          
          {institution.website && (
            <a
              href={institution.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>Website</span>
            </a>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => onViewReviews(institution.id)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            View Reviews
          </button>
          <button
            onClick={() => onAddReview(institution.id)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Add Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstitutionCard;