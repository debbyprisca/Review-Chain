export interface Institution {
  id: number;
  name: string;
  category: string;
  description: string;
  website: string;
  owner: string;
  totalReviews: number;
  totalRating: number;
  timestamp: number;
  isActive: boolean;
}

export interface Review {
  id: number;
  institutionId: number;
  reviewer: string;
  rating: number;
  title: string;
  content: string;
  timestamp: number;
  isVerified: boolean;
}

export interface User {
  address: string;
  isConnected: boolean;
}

export interface Web3Error {
  code: number;
  message: string;
}