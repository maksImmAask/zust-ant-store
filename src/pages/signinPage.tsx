import { useState } from 'react';
import { Input, Button, Card } from 'antd';

function SigninPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Card title="Регистрация (макет)" style={{ width: 350 }}>
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
          disabled={!username || !password || !email}
        >
          Зарегистрироваться
        </Button>
      </Card>
    </div>
  );
}

export default SigninPage;
