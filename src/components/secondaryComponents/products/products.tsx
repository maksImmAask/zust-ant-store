import { Card, Row, Col } from 'antd';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import api from '../../../api/api';
import { useEffect } from 'react';
import './products.css';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
};


const PAGE_SIZE = 4;

function Products() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 0 }) =>
      api
        .get(`?limit=${PAGE_SIZE}&skip=${pageParam * PAGE_SIZE}`)
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.length * PAGE_SIZE;
      return loaded < lastPage.total ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <div>Загрузка...</div>;

  const products: Product[] = data?.pages.flatMap((page) => page.products) ?? [];

  return (
    <section style={{ padding: '10px' }}>
      <div className="container">
        <h2 className="products-title">Продукты</h2>
        <Row gutter={[16, 16]}>
          {products.map((product, idx) => {
            const isLast = idx === products.length - 1;
            return (
              <Col
                span={6}
                key={product.id}
                style={{ padding: '10px' }}
                ref={isLast ? ref : undefined}
              >
                <Card
                  hoverable
                  cover={<img src={product.thumbnail} alt={product.title} />}
                  title={<span className="ant-card-title">{product.title}</span>}
                  style={{ width: '100%', height: '100%' }}
                >
                  <div className="product-price">Цена: ${product.price}</div>
                  <div className="product-description">{product.description}</div>
                </Card>
              </Col>
            );
          })}
        </Row>
        {isFetchingNextPage && <div style={{ textAlign: 'center', margin: 16 }}>Загрузка...</div>}
      </div>
    </section>
  );
}

export default Products;