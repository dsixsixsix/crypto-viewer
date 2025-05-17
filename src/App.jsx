import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import CryptoCard from './components/CryptoCard'
import AppContainer from './components/ui/AppContainer'
import MainContent from './components/ui/MainContent'
import SearchContainer from './components/ui/SearchContainer'
import CardsList from './components/ui/CardsList'
import RetryButton from './components/ui/RetryButton'

const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY
const API_BASE_URL = 'https://api.coingecko.com/api/v3'

function App() {
  const [cryptos, setCryptos] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadPopularCryptos()
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      // Получаем список криптовалют по поисковому запросу
      const response = await axios.get(`${API_BASE_URL}/search?query=${searchQuery.trim()}`, {
        headers: {
          'x-cg-api-key': API_KEY
        }
      })

      if (!response.data.coins || response.data.coins.length === 0) {
        setCryptos([])
        setError('No cryptocurrencies found matching your search.')
        return
      }

      // Получаем ID найденных криптовалют
      const cryptoIds = response.data.coins.map(coin => coin.id).join(',')

      // Получаем актуальные цены и данные для графика
      const pricesResponse = await axios.get(
        `${API_BASE_URL}/coins/markets?vs_currency=${selectedCurrency.toLowerCase()}&ids=${cryptoIds}&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h`,
        {
          headers: {
            'x-cg-api-key': API_KEY
          }
        }
      )

      // Объединяем данные поиска с актуальными ценами и графиком
      const searchResults = response.data.coins.map(coin => {
        const marketData = pricesResponse.data.find(market => market.id === coin.id) || {}
        return {
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.large,
          current_price: marketData.current_price || 0,
          price_change_percentage_24h: marketData.price_change_percentage_24h || 0,
          market_cap: marketData.market_cap || 0,
          market_cap_rank: coin.market_cap_rank || 0,
          sparkline_in_7d: marketData.sparkline_in_7d || { price: [] }
        }
      })

      setCryptos(searchResults)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to fetch cryptocurrency data. Please try again.')
      setCryptos([])
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
      console.error('Error fetching data:', err)
      setError('Failed to fetch cryptocurrency data. Please try again.')
      setCryptos([])
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

  return (
    <AppContainer>
      <MainContent>
        <SearchContainer>
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
            selectedCurrency={selectedCurrency}
            onCurrencyChange={setSelectedCurrency}
          />
        </SearchContainer>
        
        {error && (
          <div>
            <p style={{ color: 'red' }}>{error}</p>
            <RetryButton onClick={loadPopularCryptos}>Retry</RetryButton>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <CardsList>
            {cryptos
              .filter(crypto => crypto.name !== 'Wrapped stETH')
              .map((crypto) => (
                <CryptoCard
                  key={crypto.id}
                  crypto={crypto}
                  currency={selectedCurrency}
                  formatNumber={formatNumber}
                />
              ))}
          </CardsList>
        )}
      </MainContent>
    </AppContainer>
  )
}

export default App