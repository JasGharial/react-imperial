// Styles
import './categories-menu.styles.scss';

// Components
import CategoryItem from '../category-item/category-item.component';

export default function CategoriesMenu({categories}) {

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))
      }
    </div>
  );
}
