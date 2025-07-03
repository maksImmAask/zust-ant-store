import { Layout } from 'antd'
import Categories from '@components/categories/categories';
import Header from '@components/header/header';
import Products from '@components/products/products';
import { useState } from 'react';

const { Content } = Layout

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <Layout className="layout">
      <Header />
      <Content>
        <Categories selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
        <Products selectedCategory={selectedCategory} />
      </Content>
    </Layout>
  )
}

export default HomePage;
