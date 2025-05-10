import styled from 'styled-components';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  width: 280px;
  padding: 12px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  background-color: white;

  &:hover {
    border-color: #666;
  }

  &:focus {
    border-color: #4CAF50;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0;
`;

const CoinsTitle = styled.div`
  font-family: 'Circular Std', 'Inter', 'Arial', sans-serif;
  font-weight: bold;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0;
  color: rgba(0, 0, 0, 1);
  height: 23px;
  width: 48px;
  padding-top: 25px;
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 24px;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 98px;
  height: 24px;
  padding: 0 12px;
  background: rgba(248, 249, 250, 1);
  border: 0.5px solid rgba(223, 226, 228, 1);
  border-radius: 12px;
  font-size: 16px;
  color: #495057;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  transition: border 0.2s, background 0.2s;
  box-shadow: none;
  justify-content: space-between;
  position: relative;

  &:hover, &:focus {
    border: 0.5px solid #bdbdbd;
    background: #fff;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 110%;
  right: 0;
  left: 0;
  background: #fff;
  border: 0.5px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 10;
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 12px;
  border-radius: 12px;
  color: #495057;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  background: #fff;
  position: relative;
  border-bottom: 0.5px solid #e0e0e0;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f5f5f5;
  }
`;

const DropdownItemIcon = styled(FaChevronDown)`
  font-size: 8px;
  margin-left: 6px;
  transform: rotate(180deg);
`;

const DropdownIcon = styled(FaChevronDown)`
  font-size: 8px;
  position: absolute;
  right: 8px;
  transition: transform 0.2s;
  transform: ${props => props.open ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const SearchButton = styled.button`
  width: 43px;
  height: 43px;
  padding: 0;
  background-color: rgba(223, 226, 228, 1);
  color: #333;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(203, 206, 208, 1);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const SearchIcon = styled(FaSearch)`
  width: 23px;
  height: 23px;
  opacity: 0.7;
`;

const DropdownButtonText = styled.span`
  font-family: 'Circular Std', 'Inter', 'Arial', sans-serif;
  font-weight: 450;
  font-size: 12px;
  line-height: 100%;
  color: rgba(108, 117, 125, 1);
  width: 66px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

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
          <SearchIcon />
        </SearchButton>
      </SearchRow>
      <ControlsContainer>
        <CoinsTitle>Coins</CoinsTitle>
        <DropdownWrapper ref={ref}>
          <DropdownButton onClick={() => setOpen(o => !o)}>
            <DropdownButtonText>Market - INR</DropdownButtonText>
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