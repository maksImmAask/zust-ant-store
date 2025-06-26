import { Tabs, Spin } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../../api/api';
import './categories.css';

function Categories() {
  type Category = {
    slug: string;
    name: string;
    url: string;
  };
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Ошибка при загрузке категорий:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spin />;

  return (
    <section style={{ padding: '10px' }}>
      <div className="container">
        <h2 className="categories-title">Категории</h2>
        <Tabs
          tabPosition="top"
          type="line"
          items={categories.map(category => ({
            key: category.slug,
            label: category.name,
            children: null,
          }))}
        />
      </div>
    </section>
  );
}

export default Categories;