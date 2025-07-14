import React, { useState, useEffect } from 'react';
import { X, Star, Calendar } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';
import { Review } from '../types';
import ReviewCard from './ReviewCard';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  institutionId: number;
  institutionName: string;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  institutionId,
  institutionName,
}) => {
  const { contract } = useWeb3();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && contract && institutionId) {
      loadReviews();
    }
  }, [isOpen, contract, institutionId]);

  const loadReviews = async () => {
    if (!contract) return;
    
    setLoading(true);
    try {
      const reviewIds = await contract.getInstitutionReviews(institutionId);
      const reviewPromises = reviewIds.map((id: number) => contract.getReview(id));
      const reviewsData = await Promise.all(reviewPromises);
      
      setReviews(reviewsData.map((review: any) => ({
        id: Number(review.id),
        institutionId: Number(review.institutionId),
        reviewer: review.reviewer,
        rating: Number(review.rating),
        title: review.title,
        content: review.content,
        timestamp: Number(review.timestamp),
        isVerified: review.isVerified,
      })));
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
            <p className="text-gray-600 mt-1">{institutionName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No reviews yet</p>
              <p className="text-gray-500 text-sm mt-2">Be the first to review this institution</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;