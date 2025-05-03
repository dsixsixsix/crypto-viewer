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
  margin-top: 4px;
`;

const CryptoCard = ({ name, symbol, price, priceChange, image, currency = 'rub' }) => {
  const currencySymbols = {
    rub: '₽',
    usd: '$',
    eur: '€'
  };

  const formatNumber = (number) => {
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <CardContainer>
      <Logo src={image} alt={`${name} logo`} />
      <InfoContainer>
        <Name>{name}</Name>
        <Symbol>{symbol.toUpperCase()}</Symbol>
      </InfoContainer>
      <PriceContainer>
        <Price>{currencySymbols[currency]}{formatNumber(price)}</Price>
        <PriceChange isPositive={priceChange >= 0}>
          {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
        </PriceChange>
      </PriceContainer>
    </CardContainer>
  );
};

export default CryptoCard; 