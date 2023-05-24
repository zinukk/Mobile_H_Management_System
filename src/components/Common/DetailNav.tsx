import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { MdArrowBackIos } from 'react-icons/md';

interface IProps {
  title: string;
}

const DetailNav = ({ title }: IProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <StDetailNav>
      <StBody>
        <StTitle>{title}</StTitle>
        <StIcon>
          <MdArrowBackIos onClick={handleBackClick} size={25} />
        </StIcon>
      </StBody>
    </StDetailNav>
  );
};

const StDetailNav = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  right: 0;
  transform: translate(-50%, 0%);
  width: 430px;
  height: 8vh;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  z-index: 10;
`;

const StBody = styled.main`
  position: relative;
  width: 100%;
  height: 8vh;
`;

const StTitle = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.color.gray700};
  font-size: 20px;
`;

const StIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translate(-50%, -50%);
`;

export default DetailNav;
