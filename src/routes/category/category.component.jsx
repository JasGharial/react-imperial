// Dependencies
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CategoriesContext } from "../../contexts/categories.context";

// Components
import ProductCard from "../../components/product-card/product-card.component";

// Styles
import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap])

  return (
    <>
      <h2 className="title">{category.toLocaleUpperCase()}</h2>
      <div className="category-container">
        {
          products && products.map(product => <ProductCard key={product.id} product={product} />)
        }
      </div>
    </>
  )
}

export default Category;