import { Link } from "react-router-dom";

// Styles
import "./category-preview.styles.scss";

// Components
import ProductCard from "../product-card/product-card.component";

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <Link className="category-route-redirect" to={title}>
      <h2>
        <span className="title">{title.toUpperCase()}</span>
      </h2>
      </Link>
      <div className="preview">
        {
          products.filter((_, index) => index < 4)
            .map(product =>
              <ProductCard key={product.id} product={product} />
            )
        }
      </div>
    </div>
  )
}

export default CategoryPreview;