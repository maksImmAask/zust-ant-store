import './App.css'
import { Layout } from 'antd'
import Categories from './components/secondaryComponents/categories/categories';
import Header from './components/mainComponents/header/header';
import Products from './components/secondaryComponents/products/products';
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
