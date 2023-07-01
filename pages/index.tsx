import dynamic from 'next/dynamic';
import { IServing } from '@src/types/home';
import homeAPI from '@src/api/home';
import Statistics from '@src/components/Home/Statistics/Statistics';
import StoreList from '@src/components/Home/StoreList/StoreList';
import Spinner from '@src/components/Common/Spinner';
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

const RecentError = dynamic(() => import('@src/components/Home/RecentError/RecentError'), {
  loading: () => <Spinner />,
});

const Home = ({ serving, stores }: IProps) => {
  return (
    <StHome>
      <StBody>
        <Statistics serving={serving.all} />
        <StoreList stores={stores.stores} />
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
