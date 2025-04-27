import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const ProfileContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 12px;
`;

const Header = styled.header`
  background-color: #000;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -20px -20px 20px -20px;
  border-radius: 12px 12px 0 0;
`;

const SiteTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  letter-spacing: 2px;
  cursor: pointer;
  
  span {
    color: #4CAF50;
  }
`;

const UserIcon = styled(FaUser)`
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #4CAF50;
  }
`;

const ProfileTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
  letter-spacing: 2px;
  
  span {
    color: #4CAF50;
  }
`;

const ProfileContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const SectionContent = styled.div`
  color: #666;
`;

function Profile() {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <ProfileContainer>
      <Header>
        <SiteTitle onClick={handleTitleClick}>CRYPTO<span>RR</span></SiteTitle>
        <UserIcon />
      </Header>
      
      <ProfileContent>
        <ProfileSection>
          <SectionTitle>Основная информация</SectionTitle>
          <SectionContent>
            Здесь будет основная информация пользователя
          </SectionContent>
        </ProfileSection>

        <ProfileSection>
          <SectionTitle>Настройки</SectionTitle>
          <SectionContent>
            Здесь будут настройки профиля
          </SectionContent>
        </ProfileSection>
      </ProfileContent>
    </ProfileContainer>
  );
}

export default Profile; 