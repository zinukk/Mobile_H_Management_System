import storeAPI from '@src/api/store';
import DetailNav from '@src/components/Common/DetailNav';
import AvailableRobot from '@src/components/Store/AvailableRobot';
import PeakTime from '@src/components/Store/PeakTime';
import StoreInfo from '@src/components/Store/StoreInfo';
import { TStoreDetail, TStoreInfo } from '@src/types/store';
import styled from '@emotion/styled';

export async function getStaticPaths() {
  const { data: stores } = await storeAPI.getStores();

  console.log(stores);

  const paths = stores.stores.map((store: TStoreInfo) => ({
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
  const { data: storeDetail } = await storeAPI.getStores(params.storeId);

  return {
    props: {
      storeDetail,
    },
  };
}

interface IProps {
  storeDetail: TStoreDetail;
}

const StoreDetail = ({ storeDetail }: IProps) => {
  const store = storeDetail.stores[0];

  const servingCount = storeDetail.week;

  const robots = storeDetail.robot_counts[0];

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
