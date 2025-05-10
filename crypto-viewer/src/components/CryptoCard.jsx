import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  width: 368px;
  height: 72px;
  padding: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.08);
  transition: box-shadow 0.2s, transform 0.2s;
  position: relative;

  &:hover {
    box-shadow: 0 6px 16px 0 rgba(33, 37, 41, 0.10);
    transform: translateY(-2px) scale(1.01);
  }
`;

const Logo = styled.img`
  position: absolute;
  left: 16px;
  top: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: 72px;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* min-width: 70px; */
  /* max-width: 120px; */
  flex-shrink: 0;
`;

const Name = styled.div`
  font-family: 'Circular Std', 'Inter', 'Arial', sans-serif;
  font-weight: 450;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0;
  color: rgba(33, 37, 41, 1);
  height: 20px;
  white-space: normal;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Symbol = styled.div`
  font-family: 'Circular Std', 'Inter', 'Arial', sans-serif;
  font-weight: 450;
  font-size: 10px;
  line-height: 100%;
  letter-spacing: 0;
  color: rgba(108, 117, 125, 1);
  height: 13px;
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MiniChartWrapper = styled.div`
  position: absolute;
  left: 181px;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 25px;
  border-radius: 4px;
  /* border: 1px solid ${props => props.positive ? 'rgba(33, 191, 115, 1)' : 'rgba(217, 4, 41, 1)'}; */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 90px;
  margin-left: auto;
`;

const Price = styled.div`
  position: absolute;
  top: 17px;
  right: 18px;
  font-family: 'Circular Std', 'Inter', 'Arial', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #232323;
  line-height: 100%;
`;

const PriceChange = styled.div`
  position: absolute;
  top: 42px;
  right: 16px;
  font-size: 14px;
  color: ${props => props.isPositive ? 'rgba(33, 191, 115, 1)' : 'rgba(217, 4, 41, 1)'};
`;

function generateMockChartData(points = 10) {
  // Генерируем случайные данные для графика
  let arr = [Math.random() * 20 + 2];
  for (let i = 1; i < points; i++) {
    arr.push(Math.max(2, Math.min(23, arr[i-1] + (Math.random() - 0.5) * 8)));
  }
  return arr;
}

const MiniChart = ({ positive, sparkline }) => {
  let data = [];
  if (Array.isArray(sparkline) && sparkline.length > 0) {
    // Берём 10 равномерно распределённых точек из sparkline
    const step = Math.max(1, Math.floor(sparkline.length / 10));
    for (let i = 0; i < sparkline.length; i += step) {
      data.push(sparkline[i]);
    }
    // Если вдруг точек меньше 10, дублируем последние
    while (data.length < 10) data.push(data[data.length - 1]);
    // Нормализуем значения для отрисовки в SVG (0..25)
    const min = Math.min(...data);
    const max = Math.max(...data);
    data = data.map(v => max === min ? 12 : ((v - min) / (max - min)) * 21 + 2);
  } else {
    data = generateMockChartData(10);
  }
  const color = positive ? 'rgba(33, 191, 115, 1)' : 'rgba(217, 4, 41, 1)';
  const points = data.map((y, i) => `${i * 5},${25 - y}`).join(' ');
  return (
    <svg width="50" height="25" viewBox="0 0 50 25" fill="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
};

const CryptoCard = ({ crypto, currency, formatNumber }) => {
  const navigate = useNavigate();
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    RUB: '₽'
  };
  const isPositive = crypto.price_change_percentage_24h >= 0;

  // Обрезаем название, если оно длиннее 12 символов
  const displayName = crypto.name && crypto.name.length > 12
    ? crypto.name.slice(0, 11) + '…'
    : crypto.name;

  return (
    <CardContainer onClick={() => navigate(`/crypto/${crypto.id}`)} style={{ cursor: 'pointer' }}>
      <Logo src={crypto.image} alt={`${crypto.name} logo`} />
      <Content>
        <InfoBlock>
          <Name>{displayName}</Name>
          <Symbol>{crypto.symbol.toUpperCase()}</Symbol>
        </InfoBlock>
        <MiniChartWrapper positive={isPositive}>
          <MiniChart positive={isPositive} sparkline={crypto.sparkline_in_7d && crypto.sparkline_in_7d.price} />
        </MiniChartWrapper>
        <PriceContainer>
          <Price>
            {currencySymbols[currency]}{formatNumber(crypto.current_price)}
          </Price>
          <PriceChange isPositive={isPositive}>
            {isPositive ? '+' : ''}
            {crypto.price_change_percentage_24h.toFixed(2)}%
          </PriceChange>
        </PriceContainer>
      </Content>
    </CardContainer>
  );
};

export default CryptoCard; 