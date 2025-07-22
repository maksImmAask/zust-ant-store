import { Card, Row, Col, Button, Empty, Image } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useCartStore } from '@store/useCartStore';
import '../global.css'
import BackButton from '@components/backButton/backButton';

function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useCartStore();
  return (
    <section style={{ padding: '10px' }}>
      <div className="container">
        <div style={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16
}}>
  <BackButton />

  {cart.length > 0 && (
    <h3 style={{ margin: 0 }}>
      Итого: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
    </h3>
  )}
</div>
        <h2 className='title'>Корзина</h2>
        {cart.length === 0 ? (
          <Empty description="Корзина пуста" />
        ) : (
          <Row gutter={[0, 16]}>
            {cart.map(item => (
              <Col span={24} key={item.id}>
                <Card
                  hoverable
                  style={{ width: '100%' }}
                  bodyStyle={{ display: 'flex', alignItems: 'center', gap: 24 }}
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className='title' style={{ fontWeight: 500 }}>{item.title}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Button
                          icon={<MinusOutlined />}
                          onClick={() => {
                            if (item.quantity === 1) removeFromCart(item.id);
                            else changeQuantity(item.id, item.quantity - 1);
                          }}
                        />
                        <span>{item.quantity}</span>
                        <Button
                          icon={<PlusOutlined />}
                          onClick={() => changeQuantity(item.id, item.quantity + 1)}
                        />
                      </div>
                    </div>
                  }
                  actions={[
                    <Button
                      danger
                      type="text"
                      onClick={() => removeFromCart(item.id)}
                      key="remove"
                    >
                      Удалить
                    </Button>,
                  ]}
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={120}
                    height={120}
                    style={{ objectFit: 'cover', borderRadius: 8, marginRight: 24 }}
                    preview={false}
                  />
                  <div style={{ flex: 1 }}>
                    <div className='product_price' style={{ fontWeight: 500, marginBottom: 8 }}>Цена: ${item.price}</div>
                    <div className='product_description' style={{ color: '#888', marginBottom: 8 }}>{item.description}</div>
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

export default CartPage;