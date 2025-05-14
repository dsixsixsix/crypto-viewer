import styled from 'styled-components';

const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
  margin-top: 20px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default CardsList; 