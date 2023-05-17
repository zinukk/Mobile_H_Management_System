import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Image from 'next/image';
import LogoIcon from '../public/assets/icons/icon_logo.png';
import LogoText from '../public/assets/images/image_logo.png';

const Home = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <StHome>
        <StHeader>
          <StLogo>
            <StImage src={LogoIcon} width={51} height={51} alt="로고 아이콘" />
            <StImage src={LogoText} width={200} height={51} alt="로고 텍스트" />
          </StLogo>
        </StHeader>
        <StBody></StBody>
        <StFooter></StFooter>
      </StHome>
    </motion.div>
  );
};

const StHome = styled.div`
  width: 100%;
`;

const StHeader = styled.header`
  padding: 5px 0;
  width: 100%;
  border-bottom: ${({ theme }) => `1px solid ${theme.color.gray300}`};
`;

const StLogo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StImage = styled(Image)`
  filter: invert(35%) sepia(74%) saturate(451%) hue-rotate(201deg) brightness(86%) contrast(90%);
`;

const StBody = styled.main`
  width: 100%;
`;

const StFooter = styled.footer`
  width: 100%;
`;

export default Home;
