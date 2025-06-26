import { useState } from 'react';
import { Row, Col, Button, notification, Modal, Form, Input } from 'antd';
import { ShoppingCartOutlined, ShopOutlined, HeartOutlined } from '@ant-design/icons';
import './header.css';
import SearchInput from '../../secondaryComponents/searchInput/search';
function Header() {
  const [Login, setLogin] = useState(false);
  const [SignIn, setSignIn] = useState(false);
  const showLoginModal = () => setLogin(true);
  const showSignInModal = () => setSignIn(true);
  const handleCancel = () => {
    setLogin(false);
    setSignIn(false);
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: 'Ой...',
      description: 'Эта функция еще не работает...',
      duration: 0,
    });
  };

  return (
    <header className="header">
      <div className="container">
        <Row style={{ width: '100%', height: '100%' }}>
          <Col span={2} className='col'>
            <Button onClick={openNotification} style={{ color: 'white', fontSize: '20px', border: 'none', background: 'transparent' }}>UStore</Button>
          </Col>
          <Col span={2} className='col' style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <ShopOutlined style={{ color: 'white', fontSize: '30px' }} />
          </Col>
          <Col span={8} className='col'>
            <SearchInput />
          </Col>
          <Col span={5} className='col'>
            <Button onClick={openNotification} style={{ color: 'white', fontSize: '20px', border: 'none', background: 'transparent' }}>Избранное<HeartOutlined style={{ color: 'white', fontSize: '30px', marginLeft: '10px' }} /></Button>
          </Col>
          <Col span={2} className='col' style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            {contextHolder}
            <Button onClick={openNotification} style={{ border: 'none', background: 'transparent' }}><ShoppingCartOutlined style={{ color: 'white', fontSize: '30px' }} /></Button>
          </Col>
          <Col span={5} className='col'>
            <Button style={{ background: 'transparent' }} onClick={showLoginModal} type="primary">Log In</Button>
            <Button style={{ background: 'transparent', color: 'white' }} onClick={showSignInModal}>Sign In</Button>
          </Col>
        </Row>
        <Modal open={Login} onCancel={handleCancel} footer={null} title="Вход">
          <Form>
            <Form.Item name="username" label="Логин" rules={[{ required: true, message: 'Введите логин!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Пароль" rules={[{ required: true, message: 'Введите пароль!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={handleCancel} block>Войти</Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal open={SignIn} onCancel={handleCancel} footer={null} title="Регистрация">
          <Form>
            <Form.Item name="username" label="Логин" rules={[{ required: true, message: 'Введите логин!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Введите email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Пароль" rules={[{ required: true, message: 'Введите пароль!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={handleCancel} block>Зарегистрироваться</Button>
            </Form.Item>
          </Form>
        </Modal>
       </div>
      </header>
)}
export default Header;