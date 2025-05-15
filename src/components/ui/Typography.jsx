import styled from 'styled-components';

export const Title = styled.div`
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

export const Name = styled.div`
  font-family: 'Circular Std', 'Inter', 'Arial', sans-serif;
  font-weight: 450;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0;
  color: rgba(33, 37, 41, 1);
  height: 20px;
  white-space: normal;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Symbol = styled.div`
  font-family: 'Circular Std', 'Inter', 'Arial', sans-serif;
  font-weight: 450;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0;
  color: rgba(108, 117, 125, 1);
  height: 13px;
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Price = styled.div`
  font-family: 'Circular Std', 'Inter', 'Arial', sans-serif;
  font-weight: 450;
  font-size: 16px;
  color: #232323;
  line-height: 100%;
`;

export const PriceChange = styled.div`
  font-size: 10px;
  font-weight: 500;
  color: ${props => props.isPositive ? 'rgba(33, 191, 115, 1)' : 'rgba(217, 4, 41, 1)'};
`;

export const DropdownButtonText = styled.span`
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