import { Card, Row, Col, Button, Empty, Image } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useFavoritesStore } from '@store/useFavStore';
import BackButton from '@components/backButton/backButton';
import '../global.css';

function FavPage() {
  const { favorites, removeFavorite } = useFavoritesStore();
  return (
    <section style={{ padding: '10px' }}>
      <div className="container">
        <BackButton />
        <h2 className='title'>Избранное</h2>
        {favorites.length === 0 ? (
          <Empty description="Нет избранных товаров" />
        ) : (
          <Row gutter={[0, 16]}>
            {favorites.map(item => (
              <Col span={24} key={item.product.id}>
                <Card
                  hoverable
                  style={{ width: '100%' }}
                  bodyStyle={{ display: 'flex', alignItems: 'center', gap: 24 }}
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className='title' style={{ fontWeight: 500 }}>{item.product.title}</span>
                      <Button
                        icon={<HeartFilled style={{ color: '#ff4d4f', fontSize: 20 }} />}
                        onClick={() => removeFavorite(item.product.id)}
                      />
                    </div>
                  }
                  actions={[
                    <Button
                      danger
                      type="text"
                      onClick={() => removeFavorite(item.product.id)}
                      key="remove"
                    >
                      Удалить
                    </Button>,
                  ]}
                >
                  <Image
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    width={120}
                    height={120}
                    style={{ objectFit: 'cover', borderRadius: 8, marginRight: 24 }}
                    preview={false}
                  />
                  <div style={{ flex: 1 }}>
                    <div className='product_price' style={{ fontWeight: 500, marginBottom: 8 }}>Цена: ${item.product.price}</div>
                    <div className='product_description' style={{ color: '#888', marginBottom: 8 }}>{item.product.description}</div>
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