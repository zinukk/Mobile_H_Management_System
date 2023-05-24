import styled from '@emotion/styled';

interface IProps {
  title: string;
}

const Title = ({ title }: IProps) => {
  return <StTitle>{title}</StTitle>;
};

const StTitle = styled.header`
  color: ${({ theme }) => theme.color.gray700};
  font-size: 18px;
  font-weight: 600;
`;

export default Title;
