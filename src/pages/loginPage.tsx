import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card, Alert } from 'antd';
import { useAuthStore } from '../store/useLoginStore';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error} = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login({ username, password });
    if (useAuthStore.getState().isAuthenticated) {
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Card title="Вход" style={{ width: 350 }}>
        <Input
          placeholder="Имя пользователя"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Input.Password
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}
        <Button
          type="primary"
          loading={loading}
          block
          onClick={handleLogin}
          disabled={!username || !password}
        >
          Войти
        </Button>
      </Card>
    </div>
  );
}

export default LoginPage;