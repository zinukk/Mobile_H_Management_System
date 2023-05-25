import Statistics from '@src/components/Home/Statistics/Statistics';
import homeAPI from '@src/api/home';
import StoreList from '@src/components/Home/StoreList/StoreList';
import { IRecentErrors, IServing } from '@src/types/home';
import styled from '@emotion/styled';
import RecentError from '@src/components/Home/RecentError/RecentError';

export async function getServerSideProps() {
  const serving = await homeAPI.getServing();

  const stores = await homeAPI.getStores();

  const errors = await homeAPI.getRecentErrors();

  return {
    props: {
      serving: serving,
      stores: stores,
      errors: errors,
    },
  };
}

interface IProps {
  serving: IServing;
  stores: IResponse;
  errors: IRecentErrors;
}

const Home = ({ serving, stores, errors }: IProps) => {
  console.log(errors);

  return (
    <StHome>
      <StBody>
        <Statistics serving={serving.all} />
        <StoreList stores={stores.stores} />
        <RecentError errors={errors.error_notice} />
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
