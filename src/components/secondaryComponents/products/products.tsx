import { Card, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../../api/api';
import './products.css';

function Products() {
  type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    thumbnail: string;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/');
        const data = res.data as { products: Product[] };
        setProducts(data.products);
      } catch (err) {
        console.error('Ошибка при загрузке продуктов:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
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
                title={<span className="ant-card-title">{product.title}</span>}
                className="ant-card"
                style={{ width: '100%', height: '100%' }}
              >
                <div className="product-price">Цена: ${product.price}</div>
                <div className="product-description">{product.description}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default Products;