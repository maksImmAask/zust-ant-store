import { Card, Row, Col, Skeleton, Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import styles from './products.module.css';
import { useProductStore } from '@store/storeProducts';
import { useCategoryStore } from '@store/storeCategories';

type ProductsProps = {
  selectedCategory: string | null;
};

function Products({ selectedCategory }: ProductsProps) {
  const { products, loading, getProducts } = useProductStore();
  const { categories } = useCategoryStore();

  useEffect(() => {
    if (products.length === 0) getProducts();
  }, [products.length, getProducts]);
  const skeletonCount = 8;
  if (loading) {
    return (
      <section style={{ padding: '10px' }}>
        <div className="container">
          <h2 className={styles.products_title}>Продукты</h2>
          <Row gutter={[16, 16]}>
            {Array.from({ length: skeletonCount }).map((_, idx) => (
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
            ))}
          </Row>
        </div>
      </section>
    );
  }
  if (selectedCategory && selectedCategory !== 'all') {
    const category = categories.find(c => c.slug === selectedCategory);
    const prods = products.filter(product => product.category === selectedCategory);

    return (
      <section style={{ padding: '10px' }}>
        <div className="container">
          <h2 className={styles.products_title}>{category?.name || 'Продукты'}</h2>
          <Row gutter={[16, 16]}>
            {prods.map(product => (
              <Col span={6} key={product.id} style={{ padding: '10px' }}>
                <Card
                  hoverable
                  cover={
                    <img
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
                        icon={<HeartOutlined style={{ color: '#ff4d4f', fontSize: 18 }} />}
                        style={{ marginLeft: 8 }}
                      />
                    </div>
                  }
                  className="ant-card"
                  style={{ width: '100%', height: '100%' }}
                >
                  <div className={styles.produst_price}>Цена: ${product.price}</div>
                  <div className={styles.product_description}>{product.description}</div>
                  <Button style={{ width: '100%', margin: '3px' }} type='primary'>В Корзину</Button>
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
        <h2 className={styles.products_title}>Продукты</h2>
        {categories.map(category => {
          const prods = products
            .filter(product => product.category === category.slug)
            .slice(0, 4);

          if (prods.length === 0) return null;

          return (
            <div key={category.slug} style={{ marginBottom: 32 }}>
              <h3 className={styles.products_title}>{category.name}</h3>
              <Row gutter={[16, 16]}>
                {prods.map(product => (
                  <Col span={6} key={product.id} style={{ padding: '10px' }}>
                    <Card
                      hoverable
                      cover={
                        <img
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
                            icon={<HeartOutlined style={{ color: '#ff4d4f', fontSize: 18 }} />}
                            style={{ marginLeft: 8 }}
                          />
                        </div>
                      }
                      className="ant-card"
                      style={{ width: '100%', height: '100%' }}
                    >
                      <div className={styles.produst_price}>Цена: ${product.price}</div>
                      <div className={styles.product_description}>{product.description}</div>
                      <Button style={{ width: '100%', margin: '3px' }} type='primary'>В Корзину</Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Products;