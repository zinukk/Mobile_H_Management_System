import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { navState } from '@src/store/navState';
import { useEffect } from 'react';
import { NAV } from '@src/mocks/NAV';

const BottomNav = () => {
  const router = useRouter();

  const [nav, setNav] = useRecoilState(navState);

  const currentPath = router.pathname.split('/')[1];

  const navHandler = () => {
    currentPath === '' ? setNav('/') : setNav(`/${currentPath}`);
  };

  const pageHandler = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    navHandler();
  }, [currentPath]);

  return (
    <StBottomNav>
      <StBody>
        {NAV.map(({ id, name, path, active, disabled }) => (
          <StFlexBox key={id} onClick={() => pageHandler(path)}>
            {nav === path ? active : disabled}
            <StName isSame={nav === path}>{name}</StName>
          </StFlexBox>
        ))}
      </StBody>
    </StBottomNav>
  );
};

const StBottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  right: 0;
  transform: translate(-50%, 0%);
  width: 430px;
  height: 8vh;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 12px;
`;

const StBody = styled.main`
  padding: 0 70px;
  margin: 0 auto;
  width: 430px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
`;

const StFlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StName = styled.p<{ isSame: boolean }>`
  color: ${({ theme, isSame }) => (isSame ? theme.color.main : theme.color.black)};
  font-size: 12px;
`;

export default BottomNav;
