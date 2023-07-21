import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { MdErrorOutline, MdError } from 'react-icons/md';
import { AiOutlineRobot, AiFillRobot } from 'react-icons/ai';
import { IoStorefrontOutline, IoStorefrontSharp } from 'react-icons/io5';
import { INav } from '@src/types/common';

export const NAV: INav[] = [
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
    path: '/error',
    active: <MdError size={25} color="#5655a5" />,
    disabled: <MdErrorOutline size={25} />,
  },
];
