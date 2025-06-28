import { Tabs, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import { useCategoryStore } from '../../store';

type Category = {
  slug: string;
  name: string;
  url: string;
};


function Categories() {
  const { categories, setCategories } = useCategoryStore();
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const Categories = async () => {
      try {
        const res = await api.get('/categories');
        console.log('Категории:', res.data);
        setCategories(res.data as Category[]);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      } finally {
        setLoading(false);
      }
    };
    if (categories.length === 0) Categories();
    else setLoading(false);
  }, [categories.length, setCategories]);

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
      <style>
        {`
          .ant-tabs-nav-more {
            display: none !important;
          }
        `}
      </style>
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