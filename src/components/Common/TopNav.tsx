import Image from 'next/image';
import LogoIcon from 'public/assets/icons/nav/icon_logo.png';
import LogoText from 'public/assets/images/nav/image_logo.png';
import styled from '@emotion/styled';

const TopNav = () => {
  return (
    <StTopNav>
      <StHeader>
        <StLogo>
          <Image src={LogoIcon} width={26.75} height={31.25} alt="로고 아이콘" priority />
          <Image src={LogoText} width={240} height={21.75} alt="로고 텍스트" priority />
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
  z-index: 100;
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
  align-items: center;
  gap: 10px;
`;

export default TopNav;
