import { Card, Row, Col, Skeleton, Button, Image, Empty, notification } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './products.module.css';
import { useProductStore } from '@store/useProductStore';
import { useCategoryStore } from '@store/useCategoryStore';
import { useFavoritesStore } from '@store/useFavStore';
import { useCartStore } from '@store/useCartStore';

type ProductsProps = {
  selectedCategory: string | null;
};

function Products({ selectedCategory }: ProductsProps) {
  const { addFavorite, favorites, removeFavorite } = useFavoritesStore();
  const { products, loading, getProducts, search } = useProductStore();
  const { categories } = useCategoryStore();
  const { addToCart } = useCartStore();

  const [openedCategories, setOpenedCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) getProducts();
  }, [products.length, getProducts]);
  const skeletonCount = 8;

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
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
          <h2 className={styles.products_title}>Продукты</h2>
          <Row gutter={[16, 16]}>
            {Array.from({ length: skeletonCount }).map((_, idx) => {
              return (
                <Col span={6} key={idx} style={{ padding: '10px' }}>
                  <Card
                    hoverable
                    cover={<Skeleton.Image style={{ width: '100%', height: 180 }} active />}
                    title={<Skeleton.Input style={{ width: 120 }} active size="small" />}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <Skeleton active paragraph={{ rows: 2 }} title={false} />
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </section>
    );
  }
  if (selectedCategory && selectedCategory !== 'all') {
    const category = categories.find(c => c.slug === selectedCategory);
    const prods = filteredProducts.filter(product => product.category === selectedCategory);

    return (
      <section style={{ padding: '10px' }}>
        <div className="container">
          <h2 className={styles.products_title}>{category?.name || 'Продукты'}</h2>
          <Row gutter={[16, 16]}>
            {prods.map(product => {
              const isFav = favorites.some(fav => fav.id === product.id);
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
                    <div className={styles.produst_price}>Цена<h1 className={styles.title}>{product.price}$</h1></div>
                    <div className={styles.product_description}>{product.description}</div>
                    <Button
                      onClick={e => {
                        e.stopPropagation();
                        addToCart(product);
                        notification.success({
                          message: 'Добавлено в корзину',
                          placement: 'topRight',
                        });
                      }}
                      style={{ width: '100%', margin: '3px' }}
                      type='primary'
                    >
                      В Корзину
                    </Button>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '10px' }}>
      <div className="container">
        <h2 className={styles.products_title}>Продукты</h2>
        {categories.map(category => {
          const isOpened = openedCategories.includes(category.slug);
          const allProds = filteredProducts.filter(product => product.category === category.slug);
          const prods = isOpened ? allProds : allProds.slice(0, 4);

          if (prods.length === 0) return null;

          return (
            <div key={category.slug} style={{ marginBottom: 32 }}>
              <h3 className={styles.products_title}>{category.name}</h3>
              <Row gutter={[16, 16]}>
                {prods.map(product => {
                  const isFav = favorites.some(fav => fav.id === product.id);
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
                        <div className={styles.produst_price}>Цена<h1 className={styles.title}>{product.price}$</h1></div>
                        <div className={styles.product_description}>{product.description}</div>
                        <Button
                          onClick={e => {
                            e.stopPropagation();
                            addToCart(product);
                            notification.success({
                              message: 'Добавлено в корзину',
                              placement: 'topRight',
                            });
                          }}
                          style={{ width: '100%', margin: '3px' }}
                          type='primary'
                        >
                          В Корзину
                        </Button>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
              {!isOpened && allProds.length > 4 && (
                <div style={{ textAlign: 'center', marginTop: 12 }}>
                  <button
                    onClick={() => setOpenedCategories(prev => [...prev, category.slug])}
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