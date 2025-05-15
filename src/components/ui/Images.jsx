import styled from 'styled-components';
import { FaAngleDown } from 'react-icons/fa';

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

export const DropdownIcon = styled.img.attrs({ src: '/dropdownicon.svg', alt: 'dropdown' })`
  width: 7px;
  height: 4px;
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%) ${props => props.open ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s;
`;

export const DropdownItemIcon = styled.img.attrs({ src: '/dropdownicon.svg', alt: 'dropdown' })`
  width: 14px;
  height: 8px;
  margin-left: 6px;
  transform: rotate(180deg);
`; 