import { Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromCategory = location.state?.fromCategory;

  const handleClick = () => {
    if (fromCategory) {
      navigate(`/category/${fromCategory}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Button type="primary" onClick={handleClick} style={{ marginBottom: 16 }}>
      Назад
    </Button>
  );
};

export default BackButton;
