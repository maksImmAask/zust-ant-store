import { useState } from 'react';
import { Row, Col, Button, notification } from 'antd';
import { ShoppingCartOutlined, ShopOutlined, HeartOutlined } from '@ant-design/icons';
import styles from './header.module.css';
import SearchInput from '../searchInput/search';
import AuthModals from '../modal/modal';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
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
            <Button  onClick={openNotification} className={styles.button}>UStore</Button>
          </Col>
          <Col span={2} className={styles.col} style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <ShopOutlined style={{ color: 'white', fontSize: '30px' }} />
          </Col>
          <Col span={8} className={styles.col}>
            <SearchInput />
          </Col>
          <Col span={5} className={styles.col}>
            <Button type='primary' className={styles.btn} icon={<HeartOutlined />} onClick={() => navigate('/favourites')} >Избранное</Button>
          </Col>
          <Col span={2} className={styles.col}>
            {contextHolder}
            <Button type='primary' icon={<ShoppingCartOutlined />} onClick={() => navigate('/cart')} className={styles.btn}>Корзина</Button>
          </Col>
          <Col span={5} className={styles.col}>
            <Button className={styles.sign} onClick={showLoginModal} type="primary">Log In</Button>
            <Button className={styles.sign} type='primary' onClick={showSignInModal}>Sign In</Button>
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