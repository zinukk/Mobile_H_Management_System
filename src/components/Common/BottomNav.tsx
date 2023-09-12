import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { MdErrorOutline, MdError } from 'react-icons/md';
import { AiOutlineRobot, AiFillRobot } from 'react-icons/ai';
import { IoStorefrontOutline, IoStorefrontSharp } from 'react-icons/io5';
import { TNav } from '@src/types/common';
import { navState } from '@src/store/navState';
import styled from '@emotion/styled';

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

  const NAV: TNav[] = [
    {
      id: 0,
      name: '홈',
      path: '/',
      active: <AiFillHome size={25} color="#5655a5" />,
      disabled: <AiOutlineHome size={25} />,
    },
    {
      id: 1,
      name: '매장',
      path: '/store',
      active: <IoStorefrontSharp size={25} color="#5655a5" />,
      disabled: <IoStorefrontOutline size={25} />,
    },
    {
      id: 2,
      name: '로봇',
      path: '/robot',
      active: <AiFillRobot size={25} color="#5655a5" />,
      disabled: <AiOutlineRobot size={25} />,
    },
    {
      id: 3,
      name: '에러',
      path: '/robotError',
      active: <MdError size={25} color="#5655a5" />,
      disabled: <MdErrorOutline size={25} />,
    },
  ];

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
  background: ${({ theme }) => theme.color.white};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 12px;
  z-index: 100;
`;

const StBody = styled.main`
  padding: 0 50px;
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
  gap: 5px;
  cursor: pointer;
`;

const StName = styled.p<{ isSame: boolean }>`
  color: ${({ theme, isSame }) => (isSame ? theme.color.main : theme.color.black)};
  font-size: 12px;
`;

export default BottomNav;
