import { Card, Row, Col, Button, Empty, Image, InputNumber } from 'antd';
import { useCartStore } from '@store/useCartStore';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { cart, removeFromCart, clearCart, changeQuantity } = useCartStore();
  const navigate = useNavigate();

  return (
    <section style={{ padding: '10px' }}>
      <div className="container">
        <Button type="primary" onClick={() => navigate('/')} style={{ marginBottom: 16 }}>
          Назад на главную
        </Button>
        <h2>Корзина</h2>
        {cart.length === 0 ? (
          <Empty description="Корзина пуста" />
        ) : (
          <>
            <Button danger style={{ marginBottom: 16 }} onClick={clearCart}>
              Очистить корзину
            </Button>
            <Row gutter={[0, 16]}>
              {cart.map(product => (
                <Col span={24} key={product.id}>
                  <Card
                    hoverable
                    style={{ width: '100%' }}
                    bodyStyle={{ display: 'flex', alignItems: 'center', gap: 24 }}
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 500 }}>{product.title}</span>
                      </div>
                    }
                    actions={[
                      <Button
                        danger
                        type="text"
                        onClick={() => removeFromCart(product.id)}
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
                      <div style={{ fontWeight: 500, marginBottom: 8 }}>
                        Цена: ${product.price}
                      </div>
                      <div style={{ color: '#888', marginBottom: 8 }}>
                        {product.description}
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        Количество:{' '}
                        <InputNumber
                          min={1}
                          value={product.quantity}
                          onChange={value => changeQuantity(product.id, Number(value))}
                        />
                      </div>
                      <div>
                        Сумма: <b>${product.price * product.quantity}</b>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    </section>
  );
}

export default CartPage;