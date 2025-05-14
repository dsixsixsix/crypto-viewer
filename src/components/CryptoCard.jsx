import { useNavigate } from 'react-router-dom';
import { CardContainer, Content, InfoBlock, PriceContainer, MiniChartWrapper } from './ui/Containers';
import { Logo } from './ui/Images';
import { Name, Symbol, Price, PriceChange } from './ui/Typography';

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