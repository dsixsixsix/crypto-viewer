import styled from 'styled-components';

export const SearchInput = styled.input`
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