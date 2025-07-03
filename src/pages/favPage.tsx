import { Card, Row, Col, Button, Empty, Image } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useFavoritesStore } from '@store/useFavStore';
import { useNavigate } from 'react-router-dom';

function FavPage() {
  const { favorites, removeFavorite } = useFavoritesStore();
  const navigate = useNavigate();

  return (
    <section style={{ padding: '10px' }}>
      <div className="container">
        <Button type="primary" onClick={() => navigate('/')} style={{ marginBottom: 16 }}>
          Назад на главную
        </Button>
        <h2>Избранное</h2>
        {favorites.length === 0 ? (
          <Empty description="Нет избранных товаров" />
        ) : (
          <Row gutter={[0, 16]}>
            {favorites.map(product => (
              <Col span={24} key={product.id}>
                <Card
                  hoverable
                  style={{ width: '100%' }}
                  bodyStyle={{ display: 'flex', alignItems: 'center', gap: 24 }}
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 500 }}>{product.title}</span>
                      <HeartFilled style={{ color: '#ff4d4f', fontSize: 20 }} />
                    </div>
                  }
                  actions={[
                    <Button
                      danger
                      type="text"
                      onClick={() => removeFavorite(product.id)}
                      key="remove"
                    >
                      Удалить
                    </Button>,
                  ]}
                >
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={120}
                    height={120}
                    style={{ objectFit: 'cover', borderRadius: 8, marginRight: 24 }}
                    preview={false}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, marginBottom: 8 }}>Цена: ${product.price}</div>
                    <div style={{ color: '#888', marginBottom: 8 }}>{product.description}</div>
                    <Button type="primary" style={{ width: 180 }}>
                      В корзину
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </section>
  );
}

export default FavPage;