import './App.css'
import { Layout } from 'antd'
import Categories from '@components/categories/categories';
import Header from '@components/header/header';
import Products from '@components/products/products';
const { Content } = Layout

function App() {
  return (
    <Layout className="layout">
      <Header />
      <Content>
        <Categories />
        <Products />
      </Content>
    </Layout>
  )
}

export default App
