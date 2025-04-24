import styled from 'styled-components';

const CardContainer = styled.div`
  width: 343px;
  height: 72px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0 16px;
  margin: 10px 0;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

const Symbol = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: #666;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const CryptoCard = ({ name, symbol, price, logo }) => {
  console.log('Rendering CryptoCard with props:', { name, symbol, price, logo });
  
  return (
    <CardContainer>
      <Logo src={logo} alt={`${name} logo`} />
      <InfoContainer>
        <Name>{name}</Name>
        <Symbol>{symbol}</Symbol>
      </InfoContainer>
      <Price>${price.toLocaleString()}</Price>
    </CardContainer>
  );
};

export default CryptoCard; 