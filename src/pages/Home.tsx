import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import type { Id } from "../../convex/_generated/dataModel";
import './Home.css';

const Home: React.FC = () => {
  const allCategories = useQuery(api.categories.getAll);
  const trending = useQuery(api.categories.getTrending);
  const featured = useQuery(api.categories.getFeatured);
  const hated = useQuery(api.categories.getHated);

  // Default to first category (Movies)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loading = allCategories === undefined;

  // Pick the selected category
  const activeCategory = selectedCategoryId
    ? allCategories?.find((c) => c._id === selectedCategoryId)
    : allCategories?.[0];

  const leaderboard = useQuery(
    api.votes.getLeaderboard,
    activeCategory ? { categoryId: activeCategory._id as Id<"categories"> } : "skip"
  );

  if (loading) {
    return (
      <div className="home-loading">
        <div className="loading-spinner" />
        <span>Loading rankings...</span>
      </div>
    );
  }

  // Filter leaderboard items by search
  const filteredItems = leaderboard
    ? leaderboard.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Most voted category (trending)
  const hotCategory = trending?.[0];

  return (
    <div className="home-layout">
      {/* ─── Left Sidebar: Categories ─── */}
      <aside className="sidebar sidebar-left">
        <div className="sidebar-section">
          <h3 className="sidebar-title">Categories</h3>
          <div className="category-list">
            {allCategories?.map((cat) => (
              <button
                key={cat._id}
                className={`category-pill ${activeCategory?._id === cat._id ? "active" : ""}`}
                onClick={() => setSelectedCategoryId(cat._id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ─── Center: Leaderboard ─── */}
      <main className="main-feed">
        {/* Search + Hot Category Bar */}
        <div className="feed-topbar">
          <div className="search-box">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          {hotCategory && (
            <div className="hot-badge">
              <span className="hot-label">Most voted category in 24hr</span>
              <Link to={`/category/${hotCategory.slug}`} className="hot-category-name">
                {hotCategory.name}
              </Link>
            </div>
          )}
        </div>

        {/* Leaderboard Title */}
        <div className="feed-header">
          <h2 className="feed-title">
            Rank <span className="feed-title-accent">{activeCategory?.name || "..."}</span>
          </h2>
        </div>

        {/* Item List */}
        {leaderboard === undefined ? (
          <div className="feed-loading">
            <div className="loading-spinner" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="feed-empty">
            <p>{searchQuery ? "No items match your search" : "No items in this category yet"}</p>
          </div>
        ) : (
          <div className="leaderboard-list">
            {filteredItems.map((item, index) => (
              <LeaderboardRow
                key={item._id}
                item={item}
                rank={index + 1}
                categoryId={activeCategory!._id}
              />
            ))}
          </div>
        )}
      </main>

      {/* ─── Right Sidebar: Trending / Featured / Hated ─── */}
      <aside className="sidebar sidebar-right">
        {trending && trending.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-title">Trending Categories</h3>
            <div className="sidebar-category-list">
              {trending.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/category/${cat.slug}`}
                  className="sidebar-category-item"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {featured && featured.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-title">Featured Categories</h3>
            <div className="sidebar-category-list">
              {featured.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/category/${cat.slug}`}
                  className="sidebar-category-item"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {hated && hated.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-title sidebar-title-hated">Hated Categories</h3>
            <div className="sidebar-category-list">
              {hated.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/category/${cat.slug}`}
                  className="sidebar-category-item hated"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

/* ─── Leaderboard Row Component ─── */
interface LeaderboardRowProps {
  item: {
    _id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    upvotes: number;
    downvotes: number;
    score: number;
  };
  rank: number;
  categoryId: string;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ item, rank }) => {
  return (
    <div className={`lb-row ${rank <= 3 ? `lb-top-${rank}` : ""}`}>
      <div className="lb-rank">
        {rank <= 3 ? (
          <span className={`lb-medal medal-${rank}`}>{rank}</span>
        ) : (
          <span className="lb-rank-num">{rank}</span>
        )}
      </div>

      <div className="lb-image">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} />
        ) : (
          <div className="lb-image-placeholder">
            {item.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="lb-info">
        <h3 className="lb-name">{item.name}</h3>
        {item.description && (
          <p className="lb-desc">{item.description}</p>
        )}
      </div>

      <div className="lb-votes">
        <button className="vote-arrow vote-up" title="Upvote">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
          <span className="vote-count-num">{item.upvotes}</span>
        </button>
        <button className="vote-arrow vote-down" title="Downvote">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <span className="vote-count-num">{item.downvotes}</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
