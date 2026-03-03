import { Link } from 'react-router-dom';
import type { Category } from '../types';
import './CategoryCard.css';

interface CategoryCardProps {
  category: Category;
  style?: React.CSSProperties;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, style }) => {
  return (
    <Link to={`/category/${category.slug}`} className="category-card" style={style}>
      <div className="category-image">
        {category.imageUrl ? (
          <img src={category.imageUrl} alt={category.name} />
        ) : (
          <div className="category-placeholder">🎬</div>
        )}
        {category.isTrending && <span className="badge trending">🔥 Trending</span>}
        {category.isFeatured && <span className="badge featured">⭐ Featured</span>}
      </div>
      <div className="category-info">
        <h3 className="category-name">{category.name}</h3>
        <p className="category-description">{category.description}</p>
        <div className="category-stats">
          <span>{category._count?.items ?? 0} items</span>
          <span>{category._count?.votes ?? 0} votes</span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
