import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Image } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useProductStore } from '@store/useProductStore';
import { useCartStore } from '@store/useCartStore';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProductStore();
  const { addToCart, changeQuantity, removeFromCart, getQuantity } = useCartStore();
  const product = products.find(p => String(p.id) === String(id));
  const cartCount = product ? getQuantity(product.id) : 0;

  if (!product) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>Товар не найден</h2>
        <Button type="primary" onClick={() => navigate('/')}>На главную</Button>
      </div>
    );
  }

  return (
    <section style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <Card
        style={{
          width: '100%',
          maxWidth: 900,
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          padding: 24,
        }}
        bodyStyle={{ display: 'flex', gap: 32, alignItems: 'center', padding: 0 }}
      >
        <div style={{ flex: '0 0 320px', display: 'flex', justifyContent: 'center' }}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={300}
            height={300}
            style={{ objectFit: 'contain', borderRadius: 12, background: '#f5f5f5' }}
            preview={false}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: 16 }}>{product.title}</h2>
          <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>
            Цена: <span style={{ color: '#1677ff' }}>{product.price}$</span>
          </div>
          <div style={{ marginBottom: 16, color: '#888' }}>{product.description}</div>
<Button
  type="primary"
  size="large"
  style={{ width: '300px' }}
  onClick={() => {
    if (cartCount === 0) {
      addToCart(product);
    }
  }}
>
  {cartCount === 0 ? (
    <span style={{ fontSize: 18 }}>Добавить в корзину</span>
  ) : (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Button
        icon={<MinusOutlined />}
        size="small"
        style={{ background: 'transparent', border: 'none', color: '#fff' }}
        onClick={(e) => {
          e.stopPropagation();
          if (cartCount - 1 === 0) {
            removeFromCart(product.id);
          } else {
            changeQuantity(product.id, cartCount - 1);
          }
        }}
      />
      <span style={{ minWidth: 32, textAlign: 'center', fontSize: 18 }}>{cartCount}</span>
      <Button
        icon={<PlusOutlined />}
        size="small"
        style={{ background: 'transparent', border: 'none', color: '#fff' }}
        onClick={(e) => {
          e.stopPropagation();
          changeQuantity(product.id, cartCount + 1);
        }}
      />
    </div>
  )}
</Button>

          <Button type='primary' style={{ marginLeft: 16 }} onClick={() => navigate(-1)}>
            Назад
          </Button>
        </div>
      </Card>
    </section>
  );
}

export default ProductPage;