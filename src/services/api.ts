import type { Category, CategoryDetail, Item, ItemDetail, LeaderboardResponse, Vote, AuthResponse, User } from '../types';

const API_BASE = 'http://localhost:3001/api';

const getToken = () => localStorage.getItem('token');

const headers = (includeAuth = false): HeadersInit => {
  const h: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (includeAuth) {
    const token = getToken();
    if (token) {
      h['Authorization'] = `Bearer ${token}`;
    }
  }
  return h;
};

// Auth
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Login failed');
  }
  return res.json();
};

export const register = async (username: string, email: string, password: string): Promise<AuthResponse> => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ username, email, password }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Registration failed');
  }
  return res.json();
};

export const getMe = async (): Promise<User> => {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: headers(true),
  });
  if (!res.ok) {
    throw new Error('Failed to get user');
  }
  return res.json();
};

// Categories
export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${API_BASE}/categories`, { headers: headers() });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const getFeaturedCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${API_BASE}/categories/featured`, { headers: headers() });
  if (!res.ok) throw new Error('Failed to fetch featured categories');
  return res.json();
};

export const getTrendingCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${API_BASE}/categories/trending`, { headers: headers() });
  if (!res.ok) throw new Error('Failed to fetch trending categories');
  return res.json();
};

export const getCategoryBySlug = async (slug: string): Promise<CategoryDetail> => {
  const res = await fetch(`${API_BASE}/categories/${slug}`, { headers: headers() });
  if (!res.ok) throw new Error('Failed to fetch category');
  return res.json();
};

export const createCategory = async (name: string, description?: string, imageUrl?: string): Promise<Category> => {
  const res = await fetch(`${API_BASE}/categories`, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify({ name, description, imageUrl }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create category');
  }
  return res.json();
};

// Items
export const getItemsByCategory = async (categoryId: string): Promise<Item[]> => {
  const res = await fetch(`${API_BASE}/items/category/${categoryId}`, { headers: headers() });
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
};

export const getItemById = async (id: string): Promise<ItemDetail> => {
  const res = await fetch(`${API_BASE}/items/${id}`, { headers: headers() });
  if (!res.ok) throw new Error('Failed to fetch item');
  return res.json();
};

export const createItem = async (name: string, categoryId: string, imageUrl?: string): Promise<Item> => {
  const res = await fetch(`${API_BASE}/items`, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify({ name, categoryId, imageUrl }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create item');
  }
  return res.json();
};

// Votes
export const castVote = async (itemId: string, rank: number): Promise<any> => {
  const res = await fetch(`${API_BASE}/votes`, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify({ itemId, rank }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to cast vote');
  }
  return res.json();
};

export const removeVote = async (itemId: string): Promise<any> => {
  const res = await fetch(`${API_BASE}/votes/item/${itemId}`, {
    method: 'DELETE',
    headers: headers(true),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to remove vote');
  }
  return res.json();
};

export const getMyVotes = async (): Promise<Vote[]> => {
  const res = await fetch(`${API_BASE}/votes/me`, { headers: headers(true) });
  if (!res.ok) throw new Error('Failed to fetch votes');
  return res.json();
};

// Leaderboards
export const getLeaderboard = async (categorySlug: string, sort?: string): Promise<LeaderboardResponse> => {
  const params = sort ? `?sort=${sort}` : '';
  const res = await fetch(`${API_BASE}/leaderboards/category/${categorySlug}${params}`, { headers: headers() });
  if (!res.ok) throw new Error('Failed to fetch leaderboard');
  return res.json();
};

export const getGlobalLeaderboard = async (limit = 20): Promise<any> => {
  const res = await fetch(`${API_BASE}/leaderboards/global?limit=${limit}`, { headers: headers() });
  if (!res.ok) throw new Error('Failed to fetch global leaderboard');
  return res.json();
};
