import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import CryptoCard from '../components/CryptoCard'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { FiChevronLeft } from 'react-icons/fi'
import Chart from '../components/Chart'

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const MainContent = styled.div`
  width: 420px;
  min-height: 100vh;
  max-height: 100vh;
  background: rgba(248, 249, 250, 1);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//   padding: 20px;
  box-sizing: border-box;
`

const SearchContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`

const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 368px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
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

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-top: 17px;
  margin-left: 0;
  margin-bottom: 0;
`

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 20px;
  margin-right: 12px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  padding: 0;
`

const CryptoLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
  margin-top: 6px;
`

const NameBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
`

const CryptoName = styled.div`
  font-family: 'Circular Std', 'Inter', 'Arial', sans-serif;
  font-weight: 450;
  font-size: 16px;
  color: rgba(33, 37, 41, 1);
  margin-right: 8px;
`

const CryptoSymbol = styled.div`
  font-family: 'Circular Std', 'Inter', 'Arial', sans-serif;
  font-weight: 450;
  font-size: 10px;
  color: #8b949e;
`

const PriceRow = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 20px;
  margin-top: 24px;
`

const PriceBig = styled.div`
  font-family: 'Circular Std', 'Inter', 'Arial', sans-serif;
  font-weight: bold;
  font-size: 24px;
  color: #232323;
  margin-right: 16px;
`

const PriceChange = styled.div`
  font-family: 'Circular Std', 'Inter', 'Arial', sans-serif;
  font-size: 16px;
  font-weight: 450;
  margin-bottom: 3px;
  color: ${props => props.isPositive ? 'rgba(33, 191, 115, 1)' : 'rgba(217, 4, 41, 1)'};
`

const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY
const API_BASE_URL = 'https://api.coingecko.com/api/v3'

function CryptoPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cryptos, setCryptos] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(`${API_BASE_URL}/search?query=${searchQuery}`, {
        headers: {
          'x-cg-api-key': API_KEY
        }
      })
      const cryptoIds = response.data.coins.map(coin => coin.id).join(',')
      const pricesResponse = await axios.get(
        `${API_BASE_URL}/simple/price?ids=${cryptoIds}&vs_currencies=${selectedCurrency.toLowerCase()}&include_24hr_change=true`,
        {
          headers: {
            'x-cg-api-key': API_KEY
          }
        }
      )
      const cryptosWithPrices = response.data.coins.map(coin => ({
        ...coin,
        price: pricesResponse.data[coin.id]?.[selectedCurrency.toLowerCase()],
        priceChange24h: pricesResponse.data[coin.id]?.[`${selectedCurrency.toLowerCase()}_24h_change`]
      }))
      setCryptos(cryptosWithPrices)
    } catch (err) {
      setError('Failed to fetch cryptocurrency data. Please try again.')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadPopularCryptos = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(`${API_BASE_URL}/coins/markets`, {
        params: {
          vs_currency: selectedCurrency.toLowerCase(),
          order: 'market_cap_desc',
          per_page: 20,
          page: 1,
          sparkline: true
        },
        headers: {
          'x-cg-api-key': API_KEY
        }
      })
      setCryptos(response.data)
    } catch (err) {
      setError('Failed to fetch cryptocurrency data. Please try again.')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPopularCryptos()
  }, [selectedCurrency])

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(number)
  }

  const selected = id && cryptos.find(crypto => crypto.id === id)
  const isPositive = selected && selected.price_change_percentage_24h >= 0
  const priceChangeAbs = selected && selected.price_change_24h
  const priceChangePerc = selected && selected.price_change_percentage_24h
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    RUB: '₽',
    TRY: '₺',
    INR: '₹'
  }

  return (
    <AppContainer>
      <MainContent>
        {error && (
          <div>
            <p style={{ color: 'red' }}>{error}</p>
            <RetryButton onClick={loadPopularCryptos}>Retry</RetryButton>
          </div>
        )}
        {loading ? (
          <p>Loading...</p>
        ) : (
          selected && (
            <>
              <Header>
                <BackButton onClick={() => navigate('/')}> <FiChevronLeft size={20} color="#232323" /> </BackButton>
                <CryptoLogo src={selected.image} alt={selected.name} />
                <NameBlock>
                  <CryptoName>{selected.name}</CryptoName>
                  <CryptoSymbol>({selected.symbol.toUpperCase()})</CryptoSymbol>
                </NameBlock>
              </Header>
              <PriceRow>
                <PriceBig>
                  {currencySymbols[selectedCurrency] || ''}{formatNumber(selected.current_price)}
                </PriceBig>
                <PriceChange isPositive={isPositive}>
                  {isPositive ? '+ ' : '- '}{formatNumber(Math.abs(priceChangeAbs))} ({priceChangePerc ? priceChangePerc.toFixed(2) : '0.00'}%)
                </PriceChange>
              </PriceRow>
              <Chart symbol={selected.id} currency={selectedCurrency} />
            </>
          )
        )}
      </MainContent>
    </AppContainer>
  )
}

export default CryptoPage 