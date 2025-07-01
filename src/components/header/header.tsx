import { useState } from 'react';
import { Row, Col, Button, notification } from 'antd';
import { ShoppingCartOutlined, ShopOutlined, HeartOutlined } from '@ant-design/icons';
import styles from './header.module.css';
import SearchInput from '../searchInput/search';
import AuthModals from '../modal/modal';

function Header() {
  const [modalType, setModalType] = useState<"login" | "signin" | null>(null);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: 'Ой...',
      description: 'Эта функция еще не работает...',
      duration: 0,
    });
  };

  const showLoginModal = () => setModalType("login");
  const showSignInModal = () => setModalType("signin");
  const handleCancel = () => setModalType(null);

  return (
    <header className={styles.header}>
      <div className="container">
        <Row style={{ width: '100%', height: '100%' }}>
          <Col span={2} className={styles.col}>
            <Button onClick={openNotification} style={{ color: 'white', fontSize: '20px', border: 'none', background: 'transparent' }}>UStore</Button>
          </Col>
          <Col span={2} className={styles.col} style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <ShopOutlined style={{ color: 'white', fontSize: '30px' }} />
          </Col>
          <Col span={8} className={styles.col}>
            <SearchInput />
          </Col>
          <Col span={5} className={styles.col}>
            <Button onClick={openNotification} style={{ color: 'white', fontSize: '20px', border: 'none', background: 'transparent' }}>Избранное<HeartOutlined style={{ color: 'white', fontSize: '30px', marginLeft: '10px' }} /></Button>
          </Col>
          <Col span={2} className={styles.col} style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            {contextHolder}
            <Button onClick={openNotification} style={{ color: 'white', fontSize: '20px', border: 'none', background: 'transparent' }}>Корзина<ShoppingCartOutlined style={{ color: 'white', fontSize: '30px' }} /></Button>
          </Col>
          <Col span={5} className={styles.col}>
            <Button style={{ background: 'transparent' }} onClick={showLoginModal} type="primary">Log In</Button>
            <Button style={{ background: 'transparent', color: 'white' }} onClick={showSignInModal}>Sign In</Button>
          </Col>
        </Row>
        <AuthModals
          modalType={modalType}
          onClose={handleCancel}
        />
      </div>
    </header>
  );
}

export default Header;