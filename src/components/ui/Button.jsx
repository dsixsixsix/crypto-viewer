import styled from 'styled-components';

export const Button = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #646cff;
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

export const SearchButton = styled(Button)`
  width: 43px;
  height: 43px;
  padding: 0;
  background-color: rgba(223, 226, 228, 1);
  color: #333;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(203, 206, 208, 1);
  }

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: none;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const DropdownButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 98px;
  height: 24px;
  padding: 0 12px;
  background: rgba(248, 249, 250, 1);
  border: ${({ open }) => open ? 'none' : '0.5px solid rgba(223, 226, 228, 1)'};
  border-radius: ${({ open }) => open ? '12px 12px 0 0' : '12px'};
  font-size: 16px;
  color: #495057;
  font-family: inherit;
  font-weight: 500;
  // transition: border 0.2s, background 0.2s, border-radius 0.2s;
  box-shadow: none;
  justify-content: space-between;
  position: relative;

  &:hover, &:focus {
    border: ${({ open }) => open ? 'none' : '0.5px solid #bdbdbd'};
    background: #fff;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
  &:active {
    outline: none;
    box-shadow: none;
  }
  &:hover {
    background: #fff;
  }
`; 