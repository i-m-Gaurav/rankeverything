export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  isFeatured: boolean;
  isTrending: boolean;
  _count?: {
    items: number;
    votes: number;
  };
}

export interface CategoryDetail extends Category {
  createdBy: string;
}

export interface Item {
  id: string;
  name: string;
  imageUrl: string | null;
  categoryId: string;
  createdBy: string;
  createdAt: string;
  voteCount: number;
  totalRank: number;
  averageRank: number;
  recentVotes?: number;
  rank?: number;
  userVote?: number | null;
}

export interface ItemDetail extends Item {
  category: {
    id: string;
    name: string;
    slug: string;
  };
  userVote: number | null;
}

export interface Vote {
  id: string;
  rank: number;
  createdAt: string;
  userId: string;
  itemId: string;
  item: {
    id: string;
    name: string;
    imageUrl: string | null;
    category: {
      id: string;
      name: string;
      slug: string;
    };
  };
}

export interface LeaderboardCategory {
  id: string;
  name: string;
  slug: string;
}

export interface LeaderboardResponse {
  category: LeaderboardCategory;
  items: Item[];
}

export interface AuthResponse {
  user: User;
  token: string;
}
