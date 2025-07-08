import { Menu, Skeleton } from 'antd';
import { useEffect } from 'react';
import { useCategoryStore } from '@store/useCategoryStore';
import  style from './categories.module.css';

type CategoriesProps = {
  selectedCategory: string | null;
  onCategorySelect: (slug: string | null) => void;
};

function Categories({ selectedCategory, onCategorySelect }: CategoriesProps) {
  const { categories, loading, getCategories } = useCategoryStore();

  useEffect(() => {
    if (categories.length === 0) getCategories();
  }, [categories.length, getCategories]);

  if (loading) {
    return (
      <section style={{ padding: '10px' }}>
        <div className="container">
          <Skeleton active paragraph={{ rows: 1 }} />
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '10px' }}>
      <div className="container">
        <h2 className={style.category_title}>Категории</h2>
        <Menu
          mode="horizontal"
          selectable
          selectedKeys={selectedCategory ? [selectedCategory] : []}
          onClick={e => onCategorySelect(e.key === selectedCategory ? null : e.key)}
        >
          {categories.map(category => (
            <Menu.Item key={category.slug}>{category.name}</Menu.Item>
          ))}
        </Menu>
      </div>
    </section>
  );
}

export default Categories;