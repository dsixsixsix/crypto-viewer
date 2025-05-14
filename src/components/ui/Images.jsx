import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';

export const Logo = styled.img`
  position: absolute;
  left: 16px;
  top: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
`;

export const SearchIconImg = styled.img`
  width: 20px;
  height: 20px;
  opacity: 0.7;
  display: block;
  padding: 10px;
`;

export const DropdownIcon = styled(FaChevronDown)`
  font-size: 8px;
  position: absolute;
  right: 8px;
  transition: transform 0.2s;
  transform: ${props => props.open ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

export const DropdownItemIcon = styled(FaChevronDown)`
  font-size: 8px;
  margin-left: 6px;
  transform: rotate(180deg);
`; 