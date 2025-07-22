import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card } from 'antd';
import { useAuthStore } from '../store/useLoginStore';

function SigninPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');

  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const handleRegister = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedEmail = email.trim();

    if (!trimmedUsername || !trimmedPassword || !trimmedEmail) {
      setLocalError('Пожалуйста, заполните все поля без пробелов.');
      return;
    }

    setLocalError('');
    await register({
      username: trimmedUsername,
      password: trimmedPassword,
      email: trimmedEmail,
    });

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
          disabled={
            !username.trim() ||
            !password.trim() ||
            !email.trim() ||
            loading
          }
          onClick={handleRegister}
        >
          {loading ? 'Загрузка...' : 'Зарегистрироваться'}
        </Button>
        {(error || localError) && (
          <div style={{ color: 'red', marginTop: 10 }}>
            {localError || error}
          </div>
        )}
      </Card>
    </div>
  );
}

export default SigninPage;

