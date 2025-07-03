import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function NFoundPage() {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="Ой..."
      subTitle="Извините, страница не найдена."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          На главную
        </Button>
      }
    />
  );
}

export default NFoundPage;