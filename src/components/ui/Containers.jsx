import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0;
`;

export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 24px;
`;

export const DropdownList = styled.ul`
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

export const DropdownItem = styled.li`
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

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  width: 368px;
  height: 72px;
  padding: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.08);
  transition: box-shadow 0.2s, transform 0.2s;
  position: relative;

  &:hover {
    box-shadow: 0 6px 16px 0 rgba(33, 37, 41, 0.10);
    transform: translateY(-2px) scale(1.01);
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: 72px;
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 90px;
  margin-left: auto;
  padding-right: 18px;
`;

export const MiniChartWrapper = styled.div`
  position: absolute;
  left: 181px;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 25px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
`; 