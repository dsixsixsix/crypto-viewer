import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 12px 20px;
  border: 2px solid #ccc;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;

  &:hover {
    border-color: #666;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const CurrencyLabel = styled.label`
  font-size: 14px;
  color: #666;
  margin-bottom: -8px;
`;

const CurrencySelect = styled.select`
  width: 100px;
  padding: 12px 20px;
  border: 2px solid #ccc;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  background-color: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 20px center;
  background-size: 15px;

  &:hover {
    border-color: #666;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const SearchBar = ({ value, onChange, disabled, onKeyPress, currency, onCurrencyChange }) => {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Поиск криптовалюты..."
        value={value}
        onChange={onChange}
        disabled={disabled}
        onKeyPress={onKeyPress}
      />
      <CurrencyLabel>Выбрана валюта: {currency.toUpperCase()}</CurrencyLabel>
      <CurrencySelect
        value={currency}
        onChange={onCurrencyChange}
        disabled={disabled}
      >
        <option value="usd">USD</option>
        <option value="rub">RUB</option>
        <option value="eur">EUR</option>
      </CurrencySelect>
    </SearchContainer>
  );
};

export default SearchBar; 