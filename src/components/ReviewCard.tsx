import React from 'react';
import { Star, Calendar, Shield } from 'lucide-react';
import { Review } from '../types';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">{review.title}</h4>
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center space-x-1">
              {renderStars(review.rating)}
            </div>
            <span className="text-sm text-gray-500">({review.rating}/5)</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {review.isVerified && (
            <div className="flex items-center space-x-1 text-green-600">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-medium">Verified</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <span>By {formatAddress(review.reviewer)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(review.timestamp)}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;