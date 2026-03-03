import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useAuth } from '../context/AuthContext';
import './Category.css';

const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();

  const [sortBy, setSortBy] = useState<'votes' | 'recent' | 'alphabetical'>('votes');
  const [voting, setVoting] = useState<string | null>(null);

  const category = useQuery(api.categories.getBySlug, slug ? { slug } : "skip");
  const leaderboardItems = useQuery(api.votes.getLeaderboard, category ? { categoryId: category._id } : "skip");
  const userVotes = useQuery(api.votes.getUserVotes, category ? { categoryId: category._id } : "skip");
  const castVote = useMutation(api.votes.castVote);

  const loading = category === undefined || leaderboardItems === undefined;

  const handleVote = async (itemId: string, value: number) => {
    if (!user || !category) {
      alert('Please login to vote!');
      return;
    }

    setVoting(itemId);
    try {
      await castVote({
        itemId: itemId as Id<"items">,
        categoryId: category._id,
        value,
      });
    } catch (err: Error | unknown) {
      alert(err instanceof Error ? err.message : 'Failed to vote');
    } finally {
      setVoting(null);
    }
  };

  if (loading) {
    return (
      <div className="category-page">
        <div className="loading">
          <div className="loading-spinner" />
          <span>Loading rankings...</span>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="category-page">
        <div className="error">Category not found</div>
      </div>
    );
  }

  const items = [...(leaderboardItems || [])].sort((a, b) => {
    if (sortBy === 'votes') return b.score - a.score;
    if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
    return (b._creationTime || 0) - (a._creationTime || 0);
  });

  const totalVotes = items.reduce((sum, item) => sum + item.upvotes + item.downvotes, 0);

  return (
    <div className="category-page">
      <div className="category-header">
        <div className="category-header-content">
          {category.imageUrl && (
            <img src={category.imageUrl} alt={category.name} className="category-header-image" />
          )}
          <div className="category-header-info">
            <h1 className="category-title">{category.name}</h1>
            <p className="category-description">{category.description}</p>
            <div className="category-stats">
              <span className="category-stat-pill">
                <strong>{items.length}</strong> items
              </span>
              <span className="category-stat-pill">
                <strong>{totalVotes}</strong> total votes
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h2>Leaderboard</h2>
          <div className="sort-buttons">
            <button
              className={`sort-btn ${sortBy === 'votes' ? 'active' : ''}`}
              onClick={() => setSortBy('votes')}
            >
              Top Ranked
            </button>
            <button
              className={`sort-btn ${sortBy === 'recent' ? 'active' : ''}`}
              onClick={() => setSortBy('recent')}
            >
              Recent
            </button>
            <button
              className={`sort-btn ${sortBy === 'alphabetical' ? 'active' : ''}`}
              onClick={() => setSortBy('alphabetical')}
            >
              A–Z
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="no-items">
            <p>No items in this category yet.</p>
            {user && (
              <Link to={`/category/${slug}/add`} className="btn btn-primary">
                Add First Item
              </Link>
            )}
          </div>
        ) : (
          <div className="leaderboard">
            {items.map((item, index) => {
              const userVote = userVotes?.[item._id];
              return (
                <div
                  key={item._id}
                  className="leaderboard-item"
                  style={{ animationDelay: `${Math.min(index * 0.03, 1)}s` }}
                >
                  <div className="item-rank">
                    {index < 3 ? (
                      <span className={`rank-medal rank-${index + 1}`}>
                        {index + 1}
                      </span>
                    ) : (
                      <span className="rank-number">{index + 1}</span>
                    )}
                  </div>
                  <div className="item-image">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} />
                    ) : (
                      <div className="item-placeholder">{item.name.charAt(0)}</div>
                    )}
                  </div>
                  <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <div className="item-stats">
                      <span className="vote-count">
                        <span className="vote-count-value">{item.score}</span> pts
                      </span>
                      <span className="vote-detail">↑{item.upvotes} ↓{item.downvotes}</span>
                    </div>
                  </div>
                  <div className="item-actions">
                    {user ? (
                      <div className="vote-buttons-group">
                        <button
                          className={`vote-arrow-btn vote-up-btn ${userVote === 1 ? 'voted' : ''}`}
                          onClick={() => handleVote(item._id, 1)}
                          disabled={voting === item._id}
                          title="Upvote"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="18 15 12 9 6 15" />
                          </svg>
                        </button>
                        <button
                          className={`vote-arrow-btn vote-down-btn ${userVote === -1 ? 'voted' : ''}`}
                          onClick={() => handleVote(item._id, -1)}
                          disabled={voting === item._id}
                          title="Downvote"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <Link to="/login" className="btn btn-outline btn-sm">
                        Login to vote
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
