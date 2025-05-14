import { useState, useCallback } from 'react';
import cryptoService from '../services/cryptoService';

export const useCrypto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCoins = useCallback(async (currency = 'USD', limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await cryptoService.getCoinsList(currency, limit);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch coins');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCoins = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await cryptoService.searchCoins(query);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to search coins');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getCoinDetails = useCallback(async (symbol, currency = 'USD') => {
    setLoading(true);
    setError(null);
    try {
      const data = await cryptoService.getCoinDetails(symbol, currency);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch coin details');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getHistoricalData = useCallback(async (symbol, days = 7, currency = 'USD') => {
    setLoading(true);
    setError(null);
    try {
      const data = await cryptoService.getHistoricalData(symbol, days, currency);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch historical data');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getSupportedCurrencies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cryptoService.getSupportedCurrencies();
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch supported currencies');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchCoins,
    searchCoins,
    getCoinDetails,
    getHistoricalData,
    getSupportedCurrencies
  };
}; 