import { Modal, Form, Input, Button } from 'antd';

type AuthModalProps = {
  modalType: "login" | "signin" | null;
  onClose: () => void;
};

function AuthModal({ modalType, onClose }: AuthModalProps) {
  const isLogin = modalType === "login";
  const isSignIn = modalType === "signin";

  return (
    <Modal
      open={!!modalType}
      onCancel={onClose}
      footer={null}
      title={isLogin ? "Вход" : isSignIn ? "Регистрация" : ""}
    >
      <Form>
        <Form.Item
          name="username"
          label="Логин"
          rules={[{ required: true, message: 'Введите логин!' }]}
        >
          <Input />
        </Form.Item>
        {isSignIn && (
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Введите email!' }]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          name="password"
          label="Пароль"
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={onClose}
            block
          >
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AuthModal;