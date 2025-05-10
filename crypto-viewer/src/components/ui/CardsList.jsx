import styled from 'styled-components';

const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
`;

export default CardsList; 