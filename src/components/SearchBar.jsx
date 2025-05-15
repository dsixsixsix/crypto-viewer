import { useState, useRef, useEffect } from 'react';
import { SearchContainer, SearchRow, ControlsContainer, DropdownWrapper, DropdownList, DropdownItem } from './ui/Containers';
import { SearchInput } from './ui/Input';
import { SearchButton, DropdownButton } from './ui/Button';
import { Title, DropdownButtonText } from './ui/Typography';
import { SearchIconImg, DropdownIcon } from './ui/Images';

const currencyOptions = [
  { value: 'RUB', label: 'Market - RUB' },
  { value: 'USD', label: 'Market - USD' },
  { value: 'EUR', label: 'Market - EUR' },
  { value: 'TRY', label: 'Market - TRY' },
];

const SearchBar = ({ value, onChange, onSearch, selectedCurrency, onCurrencyChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = currencyOptions.find(opt => opt.value === selectedCurrency) || currencyOptions[0];

  return (
    <SearchContainer>
      <SearchRow>
        <SearchInput
          type="text"
          placeholder="Search cryptocurrency..."
          value={value}
          onChange={onChange}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        />
        <SearchButton onClick={onSearch}>
          <SearchIconImg src="/SearchBarTool.svg" alt="search" />
        </SearchButton>
      </SearchRow>
      <ControlsContainer>
        <Title>Coins</Title>
        <DropdownWrapper ref={ref}>
          <DropdownButton open={open} onClick={() => setOpen(o => !o)}>
            <DropdownButtonText>{selectedOption.label}</DropdownButtonText>
            <DropdownIcon open={open} />
          </DropdownButton>
          {open && (
            <DropdownList>
              {currencyOptions.map(opt => (
                <DropdownItem
                  key={opt.value}
                  onClick={() => {
                    onCurrencyChange(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </DropdownWrapper>
      </ControlsContainer>
    </SearchContainer>
  );
};

export default SearchBar; 

