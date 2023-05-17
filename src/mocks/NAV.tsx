import { Nav } from '@src/components/BottomNav/types';
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { MdErrorOutline, MdError } from 'react-icons/md';
import { AiOutlineRobot, AiFillRobot } from 'react-icons/ai';
import { IoStorefrontOutline, IoStorefrontSharp } from 'react-icons/io5';

export const NAV: Nav[] = [
  {
    id: 0,
    name: 'Home',
    path: '/',
    active: <AiFillHome size={25} color="#5655a5" />,
    disabled: <AiOutlineHome size={25} />,
  },
  {
    id: 1,
    name: 'Store',
    path: '/store',
    active: <IoStorefrontSharp size={25} color="#5655a5" />,
    disabled: <IoStorefrontOutline size={25} />,
  },
  {
    id: 2,
    name: 'Robot',
    path: '/robot',
    active: <AiFillRobot size={25} color="#5655a5" />,
    disabled: <AiOutlineRobot size={25} />,
  },
  {
    id: 3,
    name: 'Error',
    path: '/error',
    active: <MdError size={25} color="#5655a5" />,
    disabled: <MdErrorOutline size={25} />,
  },
];
