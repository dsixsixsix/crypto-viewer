import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

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

const InputField = styled.input`
  width: 400px;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 10px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4CAF50;
  }
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
  width: 400px;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 0;
  
  &:hover {
    color: #333;
  }
`;

function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '');
  const [password, setPassword] = useState(() => localStorage.getItem('password') || '');
  const [savedUsername, setSavedUsername] = useState(() => localStorage.getItem('savedUsername') || '');
  const [savedPassword, setSavedPassword] = useState(() => localStorage.getItem('savedPassword') || '');
  const [hasChanges, setHasChanges] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Загружаем сохраненные данные при монтировании компонента
    const savedUsername = localStorage.getItem('savedUsername');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedUsername) setSavedUsername(savedUsername);
    if (savedPassword) setSavedPassword(savedPassword);
  }, []);

  const handleTitleClick = () => {
    navigate('/');
  };

  const handleSubmit = () => {
    setSavedUsername(username);
    setSavedPassword(password);
    setHasChanges(false);
    
    // Сохраняем данные в localStorage
    localStorage.setItem('savedUsername', username);
    localStorage.setItem('savedPassword', password);
  };

  const handleInputChange = (setter, value) => {
    setter(value);
    setHasChanges(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            <InputLabel htmlFor="username">Имя пользователя</InputLabel>
            <InputField
              id="username"
              type="text"
              value={username}
              onChange={(e) => handleInputChange(setUsername, e.target.value)}
              placeholder={savedUsername ? `Текущее имя: ${savedUsername}` : "Введите имя пользователя"}
            />
          </SectionContent>
        </ProfileSection>

        <ProfileSection>
          <SectionTitle>Настройки</SectionTitle>
          <SectionContent>
            <InputLabel htmlFor="password">Пароль</InputLabel>
            <PasswordContainer>
              <InputField
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => handleInputChange(setPassword, e.target.value)}
                placeholder="Введите пароль"
                style={{ width: '100%' }}
              />
              <TogglePasswordButton
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </TogglePasswordButton>
            </PasswordContainer>
            {savedPassword && (
              <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>
                Пароль сохранен
              </p>
            )}
          </SectionContent>
        </ProfileSection>

        <SubmitButton 
          onClick={handleSubmit}
          disabled={!hasChanges}
        >
          Подтвердить
        </SubmitButton>
      </ProfileContent>
    </ProfileContainer>
  );
}

export default Profile; 