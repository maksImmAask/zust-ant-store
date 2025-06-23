import './App.css'
import { Layout, Row, Col, Button, Carousel} from 'antd'
import {
  ShoppingCartOutlined,
  ShopOutlined
} from '@ant-design/icons';
const { Header, Content, Footer} = Layout

function App() {
  return (
    <Layout className="layout">
      <Header className="header">
        <div className="container">
          <Row style={{ width: '100%', height: '100%' }}>
            <Col span={2} className='col'>
              <Button style={{ color: 'white', fontSize: '20px', border: 'none', background: 'transparent' }}>UStore</Button>
            </Col>
            <Col span={2} className='col' style={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
              <ShopOutlined style={{color: 'white', fontSize: '30px'}}/>
            </Col>
            <Col span={4} className='col'></Col>
            <Col span={4} className='col'></Col>
            <Col span={4} className='col'>
              <Button style={{ color: 'white', fontSize: '20px', border: 'none', background: 'transparent' }}>Избранное</Button>
            </Col>
            <Col span={3} className='col' style={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
              <Button style={{border: 'none', background: 'transparent'}}><ShoppingCartOutlined style={{color: 'white', fontSize: '30px'}}/></Button>
            </Col>
            <Col span={5} className='col'>
             <Button type="primary">Log In</Button>
             <Button style={{color: 'white'}} >Sign In</Button>
            </Col>
          </Row>
        </div>
      </Header>
      <Content className="content">
        <section>
          <Carousel autoplay>
            <div className="carousel-item">
              <img style={{width: '100%', height: '100%'}} src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" alt="" />
            </div>
            <div className="carousel-item">
              <img style={{width: '100%', height: '100%'}} src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308" alt="" />
            </div>
            <div className="carousel-item">
              <img style={{width: '100%', height: '100%'}} src="https://images.unsplash.com/photo-1464983953574-0892a716854b" alt="" />
            </div>
          </Carousel>
        </section>
      </Content>
    </Layout>
  )
}

export default App
