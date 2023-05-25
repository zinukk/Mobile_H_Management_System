import Image from 'next/image';
import LogoIcon from 'public/assets/icons/icon_logo.png';
import LogoText from 'public/assets/images/image_logo.png';
import Statistics from '@src/components/Home/Statistics/Statistics';
import homeAPI from '@src/api/home';
import StoreList from '@src/components/Home/StoreList/StoreList';
import KakaoMap from '@src/components/Store/KakaoMap';
import { IServing } from '@src/types/home';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

export async function getServerSideProps() {
  const serving = await homeAPI.getServing();

  const stores = await homeAPI.getStores();

  return {
    props: {
      serving: serving,
      stores: stores,
    },
  };
}

interface IProps {
  serving: IServing;
  stores: IResponse;
}

const Home = ({ serving, stores }: IProps) => {
  return (
    <StHome>
      <StBody>
        <Statistics serving={serving.all} />
        <StoreList stores={stores.stores} />
      </StBody>
    </StHome>
  );
};

const StHome = styled.div`
  padding: 11vh 20px;
  width: 100%;
  background: ${({ theme }) => theme.color.background};
  overflow: scroll;
`;

const StBody = styled.main`
  width: 100%;
`;

export default Home;
