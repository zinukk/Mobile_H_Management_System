import storeAPI from '@src/api/store';
import DetailNav from '@src/components/Common/DetailNav';
import AvailableRobot from '@src/components/Store/AvailableRobot';
import PeakTime from '@src/components/Store/PeakTime';
import StoreInfo from '@src/components/Store/StoreInfo';
import { IStoreDetail } from '@src/types/store';
import styled from '@emotion/styled';

export async function getStaticPaths() {
  const response: any = await storeAPI.getStores();

  const paths = response.stores.map((store: IStore) => ({
    params: {
      storeId: store.map_id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const stores = await storeAPI.getStores(params.storeId);

  return {
    props: {
      stores: stores,
    },
  };
}

interface IProps {
  stores: IStoreDetail;
}

const StoreDetail = ({ stores }: IProps) => {
  const store = stores.stores[0];

  const servingCount = stores.week;

  const robots = stores.robot_counts[0];

  return (
    <StStoreDetail>
      <StHeader>
        <DetailNav title={store.map_name} />
      </StHeader>
      <StBody>
        <StoreInfo store={store} />
        <PeakTime servingCount={servingCount} />
        <AvailableRobot robots={robots} />
      </StBody>
    </StStoreDetail>
  );
};

const StStoreDetail = styled.div`
  padding: 10vh 20px;
  padding-bottom: 10vh;
  width: 100%;
  background: ${({ theme }) => theme.color.background};
`;

const StHeader = styled.header`
  width: 100%;
`;

const StBody = styled.main`
  width: 100%;
`;

export default StoreDetail;
