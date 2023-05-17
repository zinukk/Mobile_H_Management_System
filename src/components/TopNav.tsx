import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { IoArrowBack } from 'react-icons/io5';

interface IProps {
  text: string;
}

const TopNav = ({ text }: IProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <StTopNav>
      <StBody>
        <StTitle>{text}</StTitle>
        <StIcon>
          <IoArrowBack onClick={handleBackClick} size={30} />
        </StIcon>
      </StBody>
    </StTopNav>
  );
};

const StTopNav = styled.nav`
  position: fixed;
  top: 0;
  left: 50%;
  right: 0;
  transform: translate(-50%, 0%);
  width: 430px;
  height: 7vh;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const StBody = styled.main`
  position: relative;
  width: 100%;
  height: 7vh;
`;

const StTitle = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
`;

const StIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translate(-50%, -50%);
`;

export default TopNav;
