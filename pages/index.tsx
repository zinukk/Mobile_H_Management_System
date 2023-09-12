import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { TPerformance } from '@src/types/home';
import { TStore } from '@src/types/store';
import homeAPI from '@src/api/home';
import RobotPerformance from '@src/components/Home/RobotPerformance/RobotPerformance';
import StoreList from '@src/components/Home/StoreList/StoreList';
import Spinner from '@src/components/Common/Spinner';
import styled from '@emotion/styled';

interface IProps {
  performance: TPerformance;
  stores: TStore;
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const { data: performance } = await homeAPI.getRobotPerformance();

  const { data: stores } = await homeAPI.getStores();

  return {
    props: {
      performance,
      stores,
    },
  };
};

const RecentError = dynamic(() => import('@src/components/Home/RecentError/RecentError'), {
  loading: () => <Spinner />,
});

const Home = ({ performance, stores }: IProps) => {
  console.log(stores);
  return (
    <StHome>
      <StBody>
        <RobotPerformance performance={performance.all} />
        <StoreList storeInfo={stores.stores} />
        <RecentError />
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
