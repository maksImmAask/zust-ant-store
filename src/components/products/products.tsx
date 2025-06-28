import { Card, Row, Col, Skeleton, Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import './products.css';
import { useProductStore } from '../../store'; 

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
};

function Products() {
  const { products, setProducts } = useProductStore(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get('?limit=0');
        const data = res.data as { products: Product[] };
        setProducts(data.products); 
      } catch (err) {
        console.error('Ошибка при загрузке продуктов:', err);
      } finally {
        setLoading(false);
      }
    };
    if (products.length === 0) getProducts();
    else setLoading(false);
  }, [products.length, setProducts]);

  if (loading) {
    return (
      <section style={{ padding: '10px' }}>
        <div className="container">
          <Skeleton active paragraph={{ rows: 8 }} />
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '10px' }}>
      <div className="container">
        <h2 className="products-title">Продукты</h2>
        <Row gutter={[16, 16]}>
          {products.map(product => (
            <Col span={6} key={product.id} style={{ padding: '10px' }}>
              <Card
                hoverable
                cover={
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="ant-card-cover"
                  />
                }
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="ant-card-title ant-card-title-truncate">{product.title}</span>
                    <Button
                      type="text"
                      shape="circle"
                      icon={<HeartOutlined style={{ color: '#ff4d4f', fontSize: 18 }} />}
                      style={{ marginLeft: 8 }}
                    />
                  </div>
                }
                className="ant-card"
                style={{ width: '100%', height: '100%' }}
              >
                <div className="product-price">Цена: ${product.price}</div>
                <div className="product-description">{product.description}</div>
                <Button style={{ width: '100%', margin: '3px' }} type='primary'>В Корзину</Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default Products;