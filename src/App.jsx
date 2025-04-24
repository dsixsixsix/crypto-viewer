import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import CryptoCard from './components/CryptoCard';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
  margin-top: 20px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 400px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SearchResults = styled.div`
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// Mock data for testing
const mockCryptoData = [
  {
    name: 'Tether',
    symbol: 'USDT',
    price: 1.00,
    logo: 'https://assets.coingecko.com/coins/images/325/small/Tether.png'
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2000.00,
    logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
  },
  {
    name: 'Mantle',
    symbol: 'MNT',
    price: 0.50,
    logo: 'https://assets.coingecko.com/coins/images/30980/small/mantle.jpg'
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cryptoData, setCryptoData] = useState(null);
  const [defaultCryptos, setDefaultCryptos] = useState(mockCryptoData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Component mounted');
    const fetchDefaultCryptos = async () => {
      console.log('Starting to fetch cryptos');
      setLoading(true);
      try {
        const cryptos = ['tether', 'ethereum', 'mantle'];
        const promises = cryptos.map(crypto => 
          axios.get(`https://api.coingecko.com/api/v3/coins/${crypto}`)
        );
        
        const responses = await Promise.all(promises);
        console.log('API responses:', responses);
        
        const cryptoData = responses.map(response => ({
          name: response.data.name,
          symbol: response.data.symbol.toUpperCase(),
          price: response.data.market_data.current_price.usd,
          logo: response.data.image.small
        }));
        
        console.log('Processed crypto data:', cryptoData);
        setDefaultCryptos(cryptoData);
      } catch (err) {
        console.error('Error fetching default cryptocurrencies:', err);
        setError('Failed to load default cryptocurrencies');
        // Keep mock data if API fails
        setDefaultCryptos(mockCryptoData);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultCryptos();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setCryptoData(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${searchTerm.toLowerCase()}`
      );
      
      setCryptoData({
        name: response.data.name,
        symbol: response.data.symbol.toUpperCase(),
        price: response.data.market_data.current_price.usd,
        logo: response.data.image.small
      });
    } catch (err) {
      setError('Cryptocurrency not found');
      setCryptoData(null);
    } finally {
      setLoading(false);
    }
  };

  console.log('Current defaultCryptos:', defaultCryptos);

  return (
    <AppContainer>
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={loading}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      
      <MainContent>
        <CardsContainer>
          <h2>Available Cryptocurrencies</h2>
          {defaultCryptos && defaultCryptos.length > 0 ? (
            defaultCryptos.map((crypto, index) => (
              <CryptoCard key={index} {...crypto} />
            ))
          ) : (
            <p>No cryptocurrencies loaded</p>
          )}
        </CardsContainer>
        
        <SearchResults>
          <h2>Search Results</h2>
          {cryptoData && <CryptoCard {...cryptoData} />}
        </SearchResults>
      </MainContent>
    </AppContainer>
  );
}

export default App; 