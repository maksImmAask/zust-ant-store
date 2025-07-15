import { useParams, useNavigate } from 'react-router-dom';
import Categories from '@components/categories/categories';
import Products from '@components/products/products';

function HomePage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const handleCategorySelect = (categorySlug: string | null) => {
    if (categorySlug) {
      navigate(`/category/${categorySlug}`);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <Categories
        selectedCategory={slug || null}
        onCategorySelect={handleCategorySelect}
      />
      <Products selectedCategory={slug || null} />
    </>
  );
}

export default HomePage;
