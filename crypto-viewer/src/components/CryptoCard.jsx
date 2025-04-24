import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 72px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: #f8f9fa;
  }
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 14px;
  color: #333;
`;

const Symbol = styled.p`
  margin: 2px 0 0;
  font-size: 12px;
  color: #666;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Price = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const PriceChange = styled.div`
  font-size: 12px;
  color: ${props => props.isPositive ? '#4CAF50' : '#F44336'};
  margin-top: 2px;
`;

const CryptoCard = ({ name, symbol, price, priceChange, logo }) => {
  const isPositive = priceChange >= 0;
  const formattedPriceChange = `${isPositive ? '+' : ''}${priceChange.toFixed(2)}%`;

  return (
    <CardContainer>
      <Logo src={logo} alt={`${name} logo`} />
      <InfoContainer>
        <Name>{name}</Name>
        <Symbol>{symbol}</Symbol>
      </InfoContainer>
      <PriceContainer>
        <Price>${price.toLocaleString()}</Price>
        <PriceChange isPositive={isPositive}>{formattedPriceChange}</PriceChange>
      </PriceContainer>
    </CardContainer>
  );
};

export default CryptoCard; 