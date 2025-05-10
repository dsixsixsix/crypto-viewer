import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import dayjs from 'dayjs';

// ВСТАВЬТЕ СЮДА СВОЙ КЛЮЧ (можно временно без ключа, но лучше получить бесплатный на https://min-api.cryptocompare.com/)
const CRYPTOCOMPARE_API_KEY = '';

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 410px;
  margin-top: 32px;
  background: rgba(248, 249, 250, 1);
  border-radius: 16px;
  padding: 0;
  box-sizing: border-box;
`;

const RangeSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 20px;
  margin-bottom: 8px;
  width: 100%;
  max-width: 368px;
  margin-left: auto;
  margin-right: auto;
`;

const RangeButton = styled.button`
  background: ${props => props.active ? '#f5f6fa' : 'transparent'};
  color: ${props => props.active ? 'rgba(0, 99, 245, 1)' : '#8b949e'};
  border: 0.5px solid ${props => props.active ? '#dbeafe' : 'rgba(223, 226, 228, 1)'};
  border-radius: 16px;
  padding: 6px 0;
  width: 48px;
  font-size: 12px;
  font-family: inherit;
  font-weight: 450;
  cursor: pointer;
  outline: none;
  transition: background 0.2s, border 0.2s, color 0.2s;
  &:hover {
    background: rgba(236, 244, 255, 1);
    border: 1px solid rgba(0, 99, 245, 1);
    color: rgba(0, 99, 245, 1);
  }
`;

const ChartSvg = styled.svg`
  width: 100%;
  max-width: 410px;
  height: 220px;
  display: block;
`;

const PriceLabel = styled.text`
  font-size: 16px;
  fill: #8b949e;
`;

const PriceValue = styled.text`
  font-family: 'Circular Std', 'Inter', 'Arial', sans-serif;
  font-weight: 450;
  font-size: 12px;
  line-height: 100%;
  fill: rgba(108, 117, 125, 1);
`;

const RangeContainer = styled.div`
  width: 100%;
  max-width: 368px;
  margin: 0 auto;
  margin-top: 8px;
  display: flex;
  justify-content: center;
`;

const MinMaxRow = styled.div`
  width: 100%;
  max-width: 410px;
  margin: 0 auto 8px auto;
  display: flex;
  justify-content: center;
  gap: 120px;
  font-family: 'Circular Std', 'Inter', 'Arial', sans-serif;
  font-size: 12px;
  font-weight: 450;
  color: rgba(108, 117, 125, 1);
`;

const ranges = [
  { label: '1 H', value: '1h', limit: 60, endpoint: 'histominute', aggregate: 1 },
  { label: '24 H', value: '24h', limit: 24, endpoint: 'histohour', aggregate: 1 },
  { label: '1 W', value: '7', limit: 7, endpoint: 'histoday', aggregate: 1 },
  { label: '1 M', value: '30', limit: 30, endpoint: 'histoday', aggregate: 1 },
  { label: '6 M', value: '180', limit: 180, endpoint: 'histoday', aggregate: 1 },
  { label: '1 Y', value: '365', limit: 365, endpoint: 'histoday', aggregate: 1 },
  { label: 'All', value: 'max', limit: 2000, endpoint: 'histoday', aggregate: 1 },
];

function formatNumber(number) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number);
}

const Timeline = ({ data, width, padding, range }) => {
  if (!data || data.length < 2) return null;
  // Определяем количество меток (3-7)
  let ticks = 5;
  if (range === '1h') ticks = 3;
  if (range === '24h') ticks = 5;
  if (range === '7' || range === '30') ticks = 7;
  if (range === '180' || range === '365' || range === 'max') ticks = 7;

  const step = (width - 2 * padding) / (ticks - 1);
  const indexes = Array.from({ length: ticks }, (_, i) => Math.round(i * (data.length - 1) / (ticks - 1)));
  const times = indexes.map(idx => data[idx]?.time ? data[idx].time : null);

  // Формат времени в зависимости от диапазона
  const formatTime = (t) => {
    if (!t) return '';
    if (range === '1h') return dayjs.unix(t).format('HH:mm');
    if (range === '24h') return dayjs.unix(t).format('HH:mm');
    if (range === '7' || range === '30') return dayjs.unix(t).format('D MMM');
    if (range === '180' || range === '365' || range === 'max') return dayjs.unix(t).format('MMM YY');
    return '';
  };

  return (
    <div style={{ width: width, margin: '0 auto', position: 'relative', height: 32 }}>
      <svg width={width} height={24} style={{ display: 'block' }}>
        {/* Линия timeline */}
        <line x1={padding} y1={8} x2={width - padding} y2={8} stroke="#DFE2E4" strokeWidth={2} />
        {/* Черточки */}
        {indexes.map((idx, i) => {
          const x = padding + i * step;
          return <line key={i} x1={x} y1={2} x2={x} y2={14} stroke="#DFE2E4" strokeWidth={2} />;
        })}
      </svg>
      {/* Подписи */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: width, position: 'absolute', top: 14 }}>
        {times.map((t, i) => (
          <span key={i} style={{ fontSize: 10, color: '#8b949e', fontFamily: 'Circular Std, Inter, Arial, sans-serif', fontWeight: 450, minWidth: 32, textAlign: 'center' }}>{formatTime(t)}</span>
        ))}
      </div>
    </div>
  );
};

const Chart = ({ symbol = '', currency = 'usd' }) => {
  const [range, setRange] = useState('1h');
  const [prices, setPrices] = useState([]);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!symbol) return;
    const selectedRange = ranges.find(r => r.value === range) || ranges[0];
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = selectedRange.endpoint;
        const limit = selectedRange.limit;
        const aggregate = selectedRange.aggregate;
        const url = `https://min-api.cryptocompare.com/data/v2/${endpoint}`;
        const params = {
          fsym: symbol.toUpperCase(),
          tsym: currency.toUpperCase(),
          limit,
          aggregate
        };
        const headers = CRYPTOCOMPARE_API_KEY ? { authorization: `Apikey ${CRYPTOCOMPARE_API_KEY}` } : {};
        const res = await axios.get(url, { params, headers });
        const data = res.data.Data.Data;
        setChartData(data);
        const priceArr = data.map(p => p.close);
        setPrices(priceArr);
        setMin(Math.min(...priceArr));
        setMax(Math.max(...priceArr));
      } catch (e) {
        setPrices([]);
        setMin(null);
        setMax(null);
        setError(e.message || (e.response && e.response.data && e.response.data.Message) || 'Unknown error');
        console.error('Chart API error:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol, currency, range]);

  const width = 410;
  const height = 220;
  const padding = 0;
  let points = '';
  let maxIndex = -1;
  let minIndex = -1;
  let maxX = null, maxY = null, minX = null, minY = null;
  if (prices && prices.length > 1) {
    const step = (width - 2 * padding) / (prices.length - 1);
    const minPrice = min;
    const maxPrice = max;
    maxIndex = prices.indexOf(maxPrice);
    minIndex = prices.indexOf(minPrice);
    points = prices.map((price, i) => {
      const x = padding + i * step;
      const y = height - padding - ((price - minPrice) / (maxPrice - minPrice || 1)) * (height - 2 * padding);
      if (i === maxIndex) { maxX = x; maxY = y; }
      if (i === minIndex) { minX = x; minY = y; }
      return `${x},${y}`;
    }).join(' ');
  }

  return (
    <>
      <ChartWrapper>
        {loading && <div style={{textAlign:'center', color:'#8b949e'}}>Loading chart…</div>}
        {error && <div style={{textAlign:'center', color:'red'}}>Ошибка: {error}</div>}
        {!loading && !error && prices.length <= 1 && <div style={{textAlign:'center', color:'#8b949e'}}>Нет данных для графика</div>}
        <ChartSvg width={width} height={height}>
          {prices && prices.length > 1 && (
            <polyline
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              points={points}
            />
          )}
          {/* Max price label над пиком */}
          {prices && prices.length > 1 && maxX !== null && maxY !== null && (
            <PriceValue x={maxX} y={maxY - 8} textAnchor="middle">
              {`High: ${formatNumber(max)}`}
            </PriceValue>
          )}
          {/* Min price label над впадиной */}
          {prices && prices.length > 1 && minX !== null && minY !== null && (
            <PriceValue x={minX} y={minY + 16} textAnchor="middle">
              {`Low: ${formatNumber(min)}`}
            </PriceValue>
          )}
        </ChartSvg>
        <Timeline data={chartData} width={width} padding={padding} range={range} />
        <MinMaxRow>
          <span style={{ minWidth: 90, textAlign: 'left' }}>Low: {prices && prices.length > 1 ? formatNumber(min) : '-'}</span>
          <span style={{ minWidth: 90, textAlign: 'right' }}>High: {prices && prices.length > 1 ? formatNumber(max) : '-'}</span>
        </MinMaxRow>
      </ChartWrapper>
      <RangeContainer>
        <RangeSelector>
          {ranges.map(r => (
            <RangeButton
              key={r.value}
              active={range === r.value}
              onClick={() => setRange(r.value)}
            >
              {r.label}
            </RangeButton>
          ))}
        </RangeSelector>
      </RangeContainer>
    </>
  );
};

export default Chart; 