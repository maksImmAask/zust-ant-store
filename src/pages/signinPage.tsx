import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card } from 'antd';
import { useAuthStore } from '../store/useLoginStore'; 

function SigninPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const register = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const handleRegister = async () => {
    await register({ username, password, email });
    if (useAuthStore.getState().isAuthenticated) {
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Card title="Регистрация" style={{ width: 350 }}>
        <Input
          placeholder="Имя пользователя"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Input.Password
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Button
          type="primary"
          block
          disabled={!username || !password || !email || loading}
          onClick={handleRegister}
        >
          {loading ? 'Загрузка...' : 'Зарегистрироваться'}
        </Button>
        {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      </Card>
    </div>
  );
}

export default SigninPage;
