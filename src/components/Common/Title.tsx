import styled from '@emotion/styled';
import { MdArrowForwardIos } from 'react-icons/md';

interface IProps {
  title: string;
  event: () => void;
}

const Title = ({ title, event }: IProps) => {
  return (
    <StTitle>
      <StText>{title}</StText>
      <StIcon onClick={event} />
    </StTitle>
  );
};

const StTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StText = styled.p`
  margin-top: 1px;
  color: ${({ theme }) => theme.color.gray700};
  font-size: 18px;
  font-weight: 600;
`;

const StIcon = styled(MdArrowForwardIos)`
  width: 25px;
  height: 25px;
  color: ${({ theme }) => theme.color.gray500};
`;

export default Title;
