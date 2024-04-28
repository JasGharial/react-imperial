// Styles
import './categories-menu.styles.scss';

// Components
import DirectoryItem from '../directory-item/directory-item.component';

export default function CategoriesMenu({categories}) {

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <DirectoryItem category={category} key={category.id} />
      ))
      }
    </div>
  );
}
