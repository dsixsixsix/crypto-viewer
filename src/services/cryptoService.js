import api from './api.config';

class CryptoService {
  // Получение списка криптовалют
  async getCoinsList(currency = 'USD', limit = 10) {
    try {
      const response = await api.get('/top/totalvolfull', {
        params: {
          limit: limit,
          tsym: currency,
          api_key: '64da8895c1a77f050b3a5a01a4c52a883d81e6472bd6efc67b7bace55eea0214'
        }
      });
      return response.data.Data.map(coin => ({
        id: coin.CoinInfo.Id,
        symbol: coin.CoinInfo.Name,
        name: coin.CoinInfo.FullName,
        image: `https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`,
        current_price: coin.RAW[currency].PRICE,
        price_change_percentage_24h: coin.RAW[currency].CHANGEPCT24HOUR,
        market_cap: coin.RAW[currency].MKTCAP,
        total_volume: coin.RAW[currency].TOTALVOLUME24H,
        sparkline_in_7d: {
          price: await this.getHistoricalData(coin.CoinInfo.Name, 7, currency)
        }
      }));
    } catch (error) {
      throw error;
    }
  }

  // Поиск криптовалют
  async searchCoins(query) {
    try {
      const response = await api.get('/all/coinlist');
      const coins = response.data.Data;
      return Object.values(coins)
        .filter(coin => 
          coin.FullName.toLowerCase().includes(query.toLowerCase()) ||
          coin.Name.toLowerCase().includes(query.toLowerCase())
        )
        .map(coin => ({
          id: coin.Id,
          symbol: coin.Name,
          name: coin.FullName,
          image: `https://www.cryptocompare.com${coin.ImageUrl}`
        }));
    } catch (error) {
      throw error;
    }
  }

  // Получение детальной информации о криптовалюте
  async getCoinDetails(symbol, currency = 'USD') {
    try {
      const response = await api.get('/v2/coin/generalinfo', {
        params: {
          fsyms: symbol,
          tsym: currency
        }
      });
      const coinInfo = response.data.Data[0].CoinInfo;
      const priceInfo = await api.get('/v2/histohour', {
        params: {
          fsym: symbol,
          tsym: currency,
          limit: 24
        }
      });
      
      return {
        id: coinInfo.Id,
        symbol: coinInfo.Name,
        name: coinInfo.FullName,
        image: `https://www.cryptocompare.com${coinInfo.ImageUrl}`,
        current_price: priceInfo.data.Data[priceInfo.data.Data.length - 1].close,
        price_change_percentage_24h: ((priceInfo.data.Data[priceInfo.data.Data.length - 1].close - 
          priceInfo.data.Data[0].close) / priceInfo.data.Data[0].close) * 100,
        market_cap: priceInfo.data.Data[priceInfo.data.Data.length - 1].marketCap,
        total_volume: priceInfo.data.Data[priceInfo.data.Data.length - 1].volumeto,
        description: coinInfo.Description
      };
    } catch (error) {
      throw error;
    }
  }

  // Получение исторических данных
  async getHistoricalData(symbol, days = 7, currency = 'USD') {
    try {
      const response = await api.get('/v2/histohour', {
        params: {
          fsym: symbol,
          tsym: currency,
          limit: days * 24
        }
      });
      return response.data.Data.Data.map(item => item.close);
    } catch (error) {
      throw error;
    }
  }

  // Получение списка поддерживаемых валют
  async getSupportedCurrencies() {
    try {
      const response = await api.get('/v2/currencies');
      return response.data.Data.map(currency => currency.symbol);
    } catch (error) {
      throw error;
    }
  }
}

export default new CryptoService(); 