import { Row, Col, Button, Avatar, Dropdown, Menu } from 'antd';
import { ShoppingCartOutlined, ShopOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import styles from './header.module.css';
import SearchInput from '../searchInput/search';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useLoginStore';

function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={logout}>
        Выйти
      </Menu.Item>
    </Menu>
  );

  return (
    <header className={styles.header}>
      <div className="container">
        <Row style={{ width: '100%', height: '100%' }}>
          <Col span={2} className={styles.col}>
            <Button type='primary' className={styles.logo} onClick={() => navigate('/')} >UStore</Button>
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
            <Button type='primary' icon={<ShoppingCartOutlined />} onClick={() => navigate('/cart')} className={styles.btn}>Корзина</Button>
          </Col>
          <Col span={5} className={styles.col} style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'flex-end' }}>
            {isAuthenticated && user ? (
              <>
                <span style={{ color: '#fff', marginRight: 8 }}>{user.username}</span>
                <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                  <Avatar
                    src={user.image}
                    icon={<UserOutlined />}
                    alt={user.username}
                    style={{ cursor: 'pointer' }}
                  />
                </Dropdown>
              </>
            ) : (
              <>
                <Button className={styles.sign} onClick={() => navigate('/login')} type="primary">Log In</Button>
                <Button className={styles.sign} onClick={() => navigate('/signin')} type='primary' >Sign In</Button>
              </>
            )}
          </Col>
        </Row>
      </div>
    </header>
  );
}

export default Header;