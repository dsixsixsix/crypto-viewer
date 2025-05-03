import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import CryptoCard from './components/CryptoCard'
import styled from 'styled-components'
import { FaUser } from 'react-icons/fa'
import Profile from './pages/Profile'

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 12px;
`

const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  position: relative;
`

const MainContent = styled.div`
  flex: 1;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`

const SearchContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #f5f5f5;
  padding: 20px 0;
  margin: -20px -20px 0 -20px;
  width: calc(100% + 40px);
`

const SidePanel = styled.div`
  width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: ${props => props.show ? 'block' : 'none'};
  position: sticky;
  top: 20px;
  height: fit-content;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
`

const SidePanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`

const SidePanelLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

const SidePanelTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`

const SidePanelSymbol = styled.div`
  font-size: 16px;
  color: #666;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`

const InfoItem = styled.div`
  background: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
`

const InfoLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`

const InfoValue = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`

const PriceChange = styled.div`
  color: ${props => props.isPositive ? '#4CAF50' : '#F44336'};
  font-size: 14px;
`

const ChartPlaceholder = styled.div`
  height: 200px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 14px;
`

const ChartContainer = styled.div`
  width: 400px;
  height: 300px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: ${props => props.show ? 'block' : 'none'};
  position: sticky;
  top: 430px;
  overflow: hidden;
`

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
`

const RetryButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;
  
  &:hover {
    background-color: #45a049;
  }
`

const InfoWindow = styled.div`
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 20px;
  left: 860px;
  overflow: hidden;
`

const InfoTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`

const InfoText = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  overflow-y: auto;
  max-height: 200px;
  word-wrap: break-word;
  white-space: normal;
  width: 100%;
  box-sizing: border-box;
  text-align: justify;
`

const ContactInfo = styled.div`
  margin-top: 20px;
  position: absolute;
  bottom: 60px;
  width: 100%;
`

const ContactItem = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  position: absolute;
  bottom: 20px;
  width: 100%;
`

const SocialLink = styled.a`
  color: #4CAF50;
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin: 20px auto;
  display: block;
`

const Header = styled.header`
  background-color: #000;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -20px -20px 20px -20px;
  border-radius: 12px 12px 0 0;
`

const SiteTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  letter-spacing: 2px;
  
  span {
    color: #4CAF50;
  }
`

const UserIcon = styled(FaUser)`
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #4CAF50;
  }
`

const popularCryptos = [
  'bitcoin',
  'ethereum',
  'binancecoin',
  'cardano',
  'solana',
  'ripple',
  'polkadot',
  'dogecoin',
  'avalanche-2',
  'polygon',
  'chainlink',
  'uniswap',
  'litecoin',
  'near',
  'stellar',
  'monero',
  'cosmos',
  'algorand',
  'vechain',
  'tron',
  'filecoin',
  'aave',
  'theta-token',
  'fantom',
  'tezos'
]

function AppContent() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [isLoading, setIsLoading] = useState(false);
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [showSidePanel, setShowSidePanel] = useState(false);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${searchQuery}`
      );
      const cryptoIds = response.data.coins.map(coin => coin.id).join(',');
      const priceResponse = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=${selectedCurrency}&include_24hr_change=true`
      );
      const cryptoData = response.data.coins.map(coin => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.large,
        current_price: priceResponse.data[coin.id]?.[selectedCurrency] || 0,
        price_change_percentage_24h: priceResponse.data[coin.id]?.[`${selectedCurrency}_24h_change`] || 0,
        market_cap: 0,
        total_volume: 0,
        high_24h: 0,
        low_24h: 0
      }));
      setCryptoData(cryptoData);
      if (cryptoData.length > 0) {
        setSelectedCrypto(cryptoData[0]);
      }
    } catch (error) {
      console.error('Ошибка при поиске криптовалют:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPopularCryptos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: selectedCurrency,
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false
          }
        }
      );
      const cryptoData = response.data.map(coin => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        current_price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        market_cap: coin.market_cap,
        total_volume: coin.total_volume,
        high_24h: coin.high_24h,
        low_24h: coin.low_24h
      }));
      setCryptoData(cryptoData);
      if (cryptoData.length > 0) {
        setSelectedCrypto(cryptoData[0]);
      }
    } catch (error) {
      console.error('Error loading popular cryptos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPopularCryptos();
  }, [selectedCurrency]);

  const handleCryptoClick = (crypto) => {
    setSelectedCrypto(crypto);
  };

  const formatNumber = (number) => {
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatLargeNumber = (number, suffix) => {
    const value = number / (suffix === 'B' ? 1000000000 : 1000000);
    return `${value.toFixed(2)}${suffix}`;
  };

  return (
    <AppContainer>
      <Header>
        <SiteTitle>CRYPTO<span>RR</span></SiteTitle>
        <UserIcon onClick={handleProfileClick} />
      </Header>
      <ContentWrapper>
        <MainContent>
          <SearchContainer>
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              disabled={isLoading}
              currency={selectedCurrency}
              onCurrencyChange={(e) => setSelectedCurrency(e.target.value)}
            />
            {isLoading && <p style={{ textAlign: 'center' }}>Загрузка...</p>}
          </SearchContainer>
          
          <CardsList>
            {cryptoData.length > 0 ? (
              cryptoData.map(crypto => (
                <div 
                  key={crypto.id}
                  onClick={() => handleCryptoClick(crypto)}
                  style={{ cursor: 'pointer' }}
                >
                  <CryptoCard
                    name={crypto.name}
                    symbol={crypto.symbol}
                    price={crypto.current_price}
                    priceChange={crypto.price_change_percentage_24h}
                    image={crypto.image}
                    currency={selectedCurrency}
                  />
                </div>
              ))
            ) : (
              !isLoading && <p style={{ textAlign: 'center' }}>Криптовалюты не найдены</p>
            )}
          </CardsList>
        </MainContent>

        <RightPanel>
          <SidePanel show={selectedCrypto !== null}>
            {selectedCrypto && (
              <>
                <SidePanelHeader>
                  <SidePanelLogo src={selectedCrypto.image} alt={`${selectedCrypto.name} logo`} />
                  <div>
                    <SidePanelTitle>{selectedCrypto.name}</SidePanelTitle>
                    <SidePanelSymbol>{selectedCrypto.symbol.toUpperCase()}</SidePanelSymbol>
                  </div>
                </SidePanelHeader>

                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>Price</InfoLabel>
                    <InfoValue>
                      {selectedCurrency.toUpperCase()} {formatNumber(selectedCrypto.current_price)}
                    </InfoValue>
                    <PriceChange isPositive={selectedCrypto.price_change_percentage_24h >= 0}>
                      {selectedCrypto.price_change_percentage_24h >= 0 ? '+' : ''}
                      {selectedCrypto.price_change_percentage_24h.toFixed(2)}%
                    </PriceChange>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Market Cap</InfoLabel>
                    <InfoValue>
                      {selectedCurrency.toUpperCase()} {formatLargeNumber(selectedCrypto.market_cap, 'B')}
                    </InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>24h Volume</InfoLabel>
                    <InfoValue>
                      {selectedCurrency.toUpperCase()} {formatLargeNumber(selectedCrypto.total_volume, 'M')}
                    </InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>24h High</InfoLabel>
                    <InfoValue>
                      {selectedCurrency.toUpperCase()} {formatNumber(selectedCrypto.high_24h)}
                    </InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>24h Low</InfoLabel>
                    <InfoValue>
                      {selectedCurrency.toUpperCase()} {formatNumber(selectedCrypto.low_24h)}
                    </InfoValue>
                  </InfoItem>
                </InfoGrid>
              </>
            )}
          </SidePanel>

          <ChartContainer show={selectedCrypto !== null}>
            {selectedCrypto && (
              <iframe
                src={`https://www.tradingview.com/widgetembed/?frameElementId=tradingview_${selectedCrypto.symbol}&symbol=${selectedCrypto.symbol}USD&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=0&toolbarbg=f1f3f6&studies=%5B%5D&theme=light&style=1&timezone=exchange&withdateranges=1&showpopupbutton=1&popupwidth=1000&popupheight=650&locale=en`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title={`${selectedCrypto.name} price chart`}
              />
            )}
          </ChartContainer>

          <InfoWindow>
            <InfoTitle>About Us</InfoTitle>
            <InfoText>We provide up-to-date information about cryptocurrencies and the market.</InfoText>
            <InfoText>Our mission is to make cryptocurrencies accessible and understandable for everyone.</InfoText>
            <InfoText>Our website offers a wide range of services, including cryptocurrency price tracking,</InfoText>
            <InfoText>market analysis, and educational materials.</InfoText>
            <InfoText>We are proud to help our users make informed decisions in the world of cryptocurrencies.</InfoText>
            <InfoText>Our team consists of experienced specialists who follow the latest trends in the cryptocurrency world.</InfoText>
            <InfoText>We strive to provide our users with the most relevant and useful information.</InfoText>
            
            <ContactInfo>
              <ContactItem>Head Office: Crypto Street, 123, Cryptograd</ContactItem>
              <ContactItem>Support Phone: +1 (234) 567-890</ContactItem>
              <ContactItem>Email: support@cryptoviewer.com</ContactItem>
            </ContactInfo>
            
            <SocialLinks>
              <SocialLink href="https://twitter.com" target="_blank">Twitter</SocialLink>
              <SocialLink href="https://instagram.com" target="_blank">Instagram</SocialLink>
              <SocialLink href="https://facebook.com" target="_blank">Facebook</SocialLink>
            </SocialLinks>
          </InfoWindow>
        </RightPanel>
      </ContentWrapper>
    </AppContainer>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;