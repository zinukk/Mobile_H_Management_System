import styled from '@emotion/styled';

const Null = () => {
  return <StNull>No Result</StNull>;
};

const StNull = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.color.gray600};
  font-size: 20px;
`;

export default Null;
