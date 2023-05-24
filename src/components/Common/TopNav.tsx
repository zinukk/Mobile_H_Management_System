import Image from 'next/image';
import LogoIcon from 'public/assets/icons/icon_logo.png';
import LogoText from 'public/assets/images/image_logo.png';
import styled from '@emotion/styled';

const TopNav = () => {
  return (
    <StTopNav>
      <StHeader>
        <StLogo>
          <StImage src={LogoIcon} width={51} height={51} alt="로고 아이콘" />
          <StImage src={LogoText} width={200} height={51} alt="로고 텍스트" />
        </StLogo>
      </StHeader>
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
  height: 8vh;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  z-index: 10;
`;

const StHeader = styled.header`
  position: relative;
  width: 100%;
  height: 8vh;
`;

const StLogo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
`;

const StImage = styled(Image)`
  filter: invert(35%) sepia(74%) saturate(451%) hue-rotate(201deg) brightness(86%) contrast(90%);
`;

export default TopNav;
