import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
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

const SearchBar = ({ value, onChange, disabled, onKeyPress }) => {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search cryptocurrency..."
        value={value}
        onChange={onChange}
        disabled={disabled}
        onKeyPress={onKeyPress}
      />
    </SearchContainer>
  );
};

export default SearchBar; 