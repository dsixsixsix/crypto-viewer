import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import CryptoCard from './components/CryptoCard'
import AppContainer from './components/ui/AppContainer'
import MainContent from './components/ui/MainContent'
import SearchContainer from './components/ui/SearchContainer'
import CardsList from './components/ui/CardsList'
import RetryButton from './components/ui/RetryButton'

function App() {
  const [cryptos, setCryptos] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${searchQuery}`)
      const cryptoIds = response.data.coins.map(coin => coin.id).join(',')
      const pricesResponse = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=${selectedCurrency.toLowerCase()}&include_24hr_change=true`
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
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: selectedCurrency.toLowerCase(),
          order: 'market_cap_desc',
          per_page: 20,
          page: 1,
          sparkline: true
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