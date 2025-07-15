import { Card, Row, Col, Skeleton, Button, Image, Empty, notification } from 'antd';
import { HeartOutlined, HeartFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@store/useLoginStore';
import styles from './products.module.css';
import { useProductStore } from '@store/useProductStore';
import { useCategoryStore } from '@store/useCategoryStore';
import { useFavoritesStore } from '@store/useFavStore';
import { useCartStore } from '@store/useCartStore';

type ProductsProps = {
  selectedCategory: string | null;
};

function Products({ selectedCategory }: ProductsProps) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const { addFavorite, favorites, removeFavorite } = useFavoritesStore();
  const { products, loading, getProducts, search } = useProductStore();
  const { categories } = useCategoryStore();
  const {
    addToCart,
    getQuantity,
    changeQuantity,
    removeFromCart
  } = useCartStore();

  const [visibleCountByCategory, setVisibleCountByCategory] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) getProducts();
  }, [products.length, getProducts]);

  const skeletonCount = 8;

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCategory === null || selectedCategory === 'all' || product.category === selectedCategory)
  );

  if (!loading && filteredProducts.length === 0) {
    return (
      <div style={{ padding: 40 }}>
        <Empty description="Продуктов с таким названием не найдено" />
      </div>
    );
  }

  if (loading) {
    return (
      <section style={{ padding: '10px' }}>
        <div className="container">
          <h2 className='title'>Продукты</h2>
          <Row gutter={[16, 16]}>
            {Array.from({ length: skeletonCount }).map((_, idx) => (
              <Col span={6} key={idx} style={{ padding: '10px' }}>
                <Card
                  hoverable
                  cover={<Skeleton.Image style={{ width: '100%', height: 300 }} active />}
                  title={<Skeleton.Input style={{ width: 120 }} active size="small" />}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Skeleton active paragraph={{ rows: 2 }} title={false} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '10px' }}>
      <div className="container">
        <h2 className='title'>Продукты</h2>
        {categories.map(category => {
          const allProds = filteredProducts.filter(product => product.category === category.slug);
          const visibleCount = visibleCountByCategory[category.slug] || 4;
          const prods = allProds.slice(0, visibleCount);

          if (prods.length === 0) return null;

          return (
            <div key={category.slug} style={{ marginBottom: 32 }}>
              <h3 className='title'>{category.name}</h3>
              <Row gutter={[16, 16]}>
                {prods.map(product => {
                  const isFav = favorites.some(fav => fav.product.id === product.id);
                  const cartCount = getQuantity(product.id);

                  return (
                    <Col span={6} key={product.id} style={{ padding: '10px' }}>
                      <Card
                        hoverable
                        onClick={() => navigate(`/product/${product.id}`)}
                        cover={
                          <Image
                            src={product.thumbnail}
                            alt={product.title}
                            className={styles.product_image}
                            preview={false}
                          />
                        }
                        title={
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className={styles.ant_card_title}>{product.title}</span>
                            <Button
                              type="text"
                              shape="circle"
                              icon={
                                isFav
                                  ? <HeartFilled style={{ color: '#ff4d4f', fontSize: 18 }} />
                                  : <HeartOutlined style={{ color: '#ff4d4f', fontSize: 18 }} />
                              }
                              style={{ marginLeft: 8 }}
                              onClick={e => {
                                e.stopPropagation();
                                if (isFav) {
                                  removeFavorite(product.id);
                                  notification.success({
                                    message: 'Удалено из избранного',
                                    placement: 'topRight',
                                  });
                                } else {
                                  addFavorite(product);
                                  notification.success({
                                    message: 'Добавлено в избранное',
                                    placement: 'topRight',
                                  });
                                }
                              }}
                            />
                          </div>
                        }
                        className="ant-card"
                        style={{ width: '100%', height: '100%' }}
                      >
                        <div className={styles.produst_price}>
                          Цена<h1 className={styles.title}>{product.price}$</h1>
                        </div>
                        <div className={styles.product_description}>{product.description}</div>
<Button
  type="primary"
  style={{ width: '100%', margin: '3px' }}
  onClick={e => {
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (cartCount === 0) {
      addToCart(product);
      notification.success({
        message: 'Добавлено в корзину',
        placement: 'topRight',
      });
    }
  }}
>
  {cartCount === 0 ? (
    'В корзину'
  ) : (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      <Button
        icon={<MinusOutlined />}
        size="small"
        style={{ background: 'transparent', border: 'none', color: '#fff' }}
        onClick={(e) => {
          e.stopPropagation();
          const newQty = cartCount - 1;
          if (newQty === 0) removeFromCart(product.id);
          else changeQuantity(product.id, newQty);
        }}
      />
      <span >{cartCount}</span>
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

                      </Card>
                    </Col>
                  );
                })}
              </Row>
              {prods.length < allProds.length && (
                <div style={{ textAlign: 'center', marginTop: 12 }}>
                  <button
                    onClick={() =>
                      setVisibleCountByCategory(prev => ({
                        ...prev,
                        [category.slug]: (prev[category.slug] || 4) + 4,
                      }))
                    }
                    style={{
                      padding: '8px 24px',
                      borderRadius: 4,
                      border: '1px solid #1677ff',
                      background: '#1677ff',
                      color: '#fff',
                      cursor: 'pointer',
                      fontWeight: 500,
                    }}
                  >
                    Ещё
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Products;
