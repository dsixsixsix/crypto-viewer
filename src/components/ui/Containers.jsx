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
  margin-top: 0;
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  background: #fff;
  border: 0.5px solid #e0e0e0;
  border-radius: 12px;
  border-top: none;
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
  color: rgba(108, 117, 125, 1);
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  background: #fff;
  position: relative;
  border-bottom: 0.5px solid #e0e0e0;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
    border-radius: 0 0 12px 12px;
  }

  &:hover {
    background: #f5f5f5;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 420px;
  min-width: 0;
  min-height: 72px;
  height: auto;
  padding: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.08);
  transition: box-shadow 0.2s, transform 0.2s;
  position: relative;
  margin: 0 auto;

  &:hover {
    box-shadow: 0 6px 16px 0 rgba(33, 37, 41, 0.10);
    transform: translateY(-2px) scale(1.01);
  }

  @media (max-width: 600px) {
    max-width: 100%;
    min-height: 56px;
    border-radius: 6px;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: 72px;
  position: relative;

  @media (max-width: 600px) {
    margin-left: 56px;
    position: static;
  }
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
  padding-right: 18px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 0;

  @media (max-width: 600px) {
    position: static;
    transform: none;
    padding-right: 8px;
    margin-left: auto;
  }
`;

export const MiniChartWrapper = styled.div`
  position: absolute;
  left: 115px;
  top: 5px;
  width: 50px;
  height: 25px;
  border-radius: 4px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    position: absolute;
    margin: 0 16px 0 8px;
    width: 40px;
    height: 20px;
    top: auto;
    left: auto;
    margin-left: 140px;
  }
`; 