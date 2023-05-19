import styled from '@emotion/styled';
import storeAPI from '@src/api/store';
import TopNav from '@src/components/Common/TopNav';
import StoreInfo from '@src/components/Store/StoreInfo';
import { IStoreDetail } from '@src/types/store';
import React from 'react';

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

  console.log(store);

  return (
    <StStoreDetail>
      <StHeader>
        <TopNav text={store.map_name} />
      </StHeader>
      <StBody>
        <StoreInfo store={store} />
      </StBody>
    </StStoreDetail>
  );
};

const StStoreDetail = styled.div`
  padding: 8vh 20px;
  width: 100%;
`;

const StHeader = styled.header`
  width: 100%;
`;

const StBody = styled.main`
  width: 100%;
`;

export default StoreDetail;
