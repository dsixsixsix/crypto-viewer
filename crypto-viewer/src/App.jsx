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
  gap: 8px;
  margin-top: 16px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
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
  const [searchTerm, setSearchTerm] = useState('')
  const [cryptoList, setCryptoList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCrypto, setSelectedCrypto] = useState(null)
  const [cryptoDetails, setCryptoDetails] = useState(null)

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const loadPopularCryptos = async () => {
    setLoading(true)
    setError(null)
    
    try {
      console.log('Starting to load popular cryptos...')
      
      // Добавляем задержку перед запросом
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            ids: popularCryptos.join(','),
            order: 'market_cap_desc',
            per_page: 100,
            page: 1,
            sparkline: false
          },
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0'
          },
          timeout: 10000 // 10 секунд таймаут
        }
      )

      console.log('API Response:', response)

      if (!response.data) {
        throw new Error('No data received from API')
      }

      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format: expected array')
      }

      if (response.data.length === 0) {
        throw new Error('Empty response from API')
      }

      const results = response.data.map(crypto => ({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol.toUpperCase(),
        price: crypto.current_price,
        priceChange: crypto.price_change_percentage_24h,
        logo: crypto.image,
        marketCap: crypto.market_cap,
        volume: crypto.total_volume,
        high24h: crypto.high_24h,
        low24h: crypto.low_24h
      }))

      console.log('Successfully processed cryptos:', results.length)
      setCryptoList(results)
      
    } catch (err) {
      console.error('Error loading cryptos:', err)
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        code: err.code
      })
      
      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Please check your internet connection and try again.')
      } else if (err.response?.status === 429) {
        setError('API rate limit exceeded. Please wait a minute and try again.')
      } else if (err.response?.status === 404) {
        setError('API endpoint not found. Please try again later.')
      } else if (err.message === 'Network Error') {
        setError('Network error. Please check your internet connection and try again.')
      } else {
        setError(`Failed to load cryptocurrencies: ${err.message}. Please try again later.`)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPopularCryptos()
  }, [])

  // Add new useEffect to select first crypto when list is loaded
  useEffect(() => {
    if (cryptoList.length > 0 && !selectedCrypto) {
      setSelectedCrypto(cryptoList[0])
      setCryptoDetails(cryptoList[0])
    }
  }, [cryptoList, selectedCrypto])

  const handleCryptoClick = (crypto) => {
    setSelectedCrypto(crypto)
    setCryptoDetails(crypto)
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a cryptocurrency name')
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${searchTerm.toLowerCase()}`
      )
      
      if (!response.data) {
        setError('Cryptocurrency not found')
        return
      }

      const newCrypto = {
        id: response.data.id,
        name: response.data.name,
        symbol: response.data.symbol.toUpperCase(),
        price: response.data.market_data.current_price.usd,
        priceChange: response.data.market_data.price_change_percentage_24h,
        logo: response.data.image.small,
        marketCap: response.data.market_data.market_cap.usd,
        volume: response.data.market_data.total_volume.usd,
        high24h: response.data.market_data.high_24h.usd,
        low24h: response.data.market_data.low_24h.usd
      }

      setCryptoList(prevList => {
        const exists = prevList.some(crypto => crypto.id === newCrypto.id)
        if (exists) {
          setError('This cryptocurrency is already in the list')
          return prevList
        }
        return [...prevList, newCrypto]
      })
    } catch (err) {
      setError('Cryptocurrency not found')
    } finally {
      setLoading(false)
    }
  }

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={loading}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            
            {loading && <p>Loading...</p>}
            {error && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'red' }}>{error}</p>
                <RetryButton onClick={loadPopularCryptos}>
                  Попробовать снова
                </RetryButton>
              </div>
            )}
          </SearchContainer>
          
          <CardsList>
            {cryptoList.length > 0 ? (
              cryptoList.map(crypto => (
                <div 
                  key={crypto.id}
                  onClick={() => handleCryptoClick(crypto)}
                  style={{ cursor: 'pointer' }}
                >
                  <CryptoCard {...crypto} />
                </div>
              ))
            ) : (
              !loading && <p style={{ textAlign: 'center' }}>No cryptocurrencies loaded</p>
            )}
          </CardsList>
        </MainContent>

        <RightPanel>
          <SidePanel show={selectedCrypto !== null}>
            {selectedCrypto && (
              <>
                <SidePanelHeader>
                  <SidePanelLogo src={selectedCrypto.logo} alt={`${selectedCrypto.name} logo`} />
                  <div>
                    <SidePanelTitle>{selectedCrypto.name}</SidePanelTitle>
                    <SidePanelSymbol>{selectedCrypto.symbol}</SidePanelSymbol>
                  </div>
                </SidePanelHeader>

                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>Price</InfoLabel>
                    <InfoValue>${selectedCrypto.price.toLocaleString()}</InfoValue>
                    <PriceChange isPositive={selectedCrypto.priceChange >= 0}>
                      {selectedCrypto.priceChange >= 0 ? '+' : ''}{selectedCrypto.priceChange.toFixed(2)}%
                    </PriceChange>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Market Cap</InfoLabel>
                    <InfoValue>${(selectedCrypto.marketCap / 1000000000).toFixed(2)}B</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>24h Volume</InfoLabel>
                    <InfoValue>${(selectedCrypto.volume / 1000000).toFixed(2)}M</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>24h High</InfoLabel>
                    <InfoValue>${selectedCrypto.high24h.toLocaleString()}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>24h Low</InfoLabel>
                    <InfoValue>${selectedCrypto.low24h.toLocaleString()}</InfoValue>
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
            <InfoTitle>О нас</InfoTitle>
            <InfoText>Мы работаем с 2010 года, предоставляя актуальную информацию о криптовалютах и рынке.</InfoText>
            <InfoText>Наша миссия - сделать криптовалюты доступными и понятными для всех.</InfoText>
            <InfoText>Наш сайт предлагает широкий спектр услуг, включая отслеживание курсов криптовалют,</InfoText>
            <InfoText>аналитику рынка и образовательные материалы.</InfoText>
            <InfoText>Мы гордимся тем, что помогаем нашим пользователям принимать обоснованные решения в мире криптовалют.</InfoText>
            <InfoText>Наша команда состоит из опытных специалистов, которые следят за последними тенденциями в мире криптовалют.</InfoText>
            <InfoText>Мы стремимся предоставлять нашим пользователям самую актуальную и полезную информацию.</InfoText>
            
            <ContactInfo>
              <ContactItem>Главный офис: ул. Криптовалютная, 123, г. Криптоград</ContactItem>
              <ContactItem>Телефон поддержки: +1 (234) 567-890</ContactItem>
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
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
