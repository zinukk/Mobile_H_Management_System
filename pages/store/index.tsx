import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MdArrowForwardIos } from 'react-icons/md';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { GetServerSideProps } from 'next';
import { storeNameState } from '@src/store/storeNameState';
import { TStore } from '@src/types/store';
import { TMap } from '@src/types/home';
import { TDropDown } from '@src/types/common';
import homeAPI from '@src/api/home';
import DropDown from '@src/components/Common/DropDown';
import Title from '@src/components/Common/Title';
import KakaoMap from '@src/components/Store/KakaoMap';
import NoriImg from 'public/assets/images/store/nori-image.webp';
import styled from '@emotion/styled';

interface IProps {
  stores: TStore;
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const { data: stores } = await homeAPI.getStores();

  return {
    props: {
      stores,
    },
  };
};

const Store = ({ stores }: IProps) => {
  const router = useRouter();

  const [storeName, setStoreName] = useRecoilState<string>(storeNameState);

  const resetStoreName = useResetRecoilState(storeNameState);

  const dropdownList: TDropDown[] = stores.stores.map(
    ({ map_name: storeName, map_id: storeId }: Pick<TMap, 'map_name' | 'map_id'>) => ({
      id: storeId,
      option: storeName,
    }),
  );

  const pageHandler = (option: string, id: string) => {
    setStoreName(option);
    router.push(`/store/${id}`);
  };

  useEffect(() => {
    resetStoreName();
  }, []);

  return (
    <StStore>
      <StHeader>
        <Title title="매장 리스트" />
        <DropDown selected={storeName} list={dropdownList} event={pageHandler} />
      </StHeader>
      <StBody>
        <KakaoMap storeInfo={stores.stores} />
        {stores.stores.map(({ map_id: storeId, map_name: storeName, descirbe, img_src }) => (
          <StStoreInfo key={storeId} onClick={() => pageHandler(storeName, storeId)}>
            <StInfoBox>
              <StFlexBox>
                <Image src={storeId === '1' ? NoriImg : img_src} width={75} height={50} alt="매장 로고" />
                <StColumnBox>
                  <StStoreName>{storeName}</StStoreName>
                  <StDescribe>{descirbe}</StDescribe>
                </StColumnBox>
              </StFlexBox>
              <StIcon />
            </StInfoBox>
            <StDevider />
            <StImgBox>
              <StMapImg src={`/assets/images/map/map-background-${storeId}-monitoring.webp`} alt="매장이미지" fill />
            </StImgBox>
          </StStoreInfo>
        ))}
      </StBody>
    </StStore>
  );
};

const StStore = styled.div`
  padding: 10vh 20px;
  width: 100%;
  background: ${({ theme }) => theme.color.background};
`;

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 100%;
`;

const StBody = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  width: 100%;
  gap: 20px;
`;

const StStoreInfo = styled.div`
  position: relative;
  padding: 10px;
  width: 100%;
  background: ${({ theme }) => theme.color.white};
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.color.gray100};
  }
`;

const StInfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StFlexBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const StColumnBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
`;

const StIcon = styled(MdArrowForwardIos)`
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.color.gray700};
`;

const StStoreName = styled.h3`
  font-size: 16px;
  color: ${({ theme }) => theme.color.gray700};
  font-weight: 600;
`;

const StDescribe = styled.h4`
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray500};
  font-weight: 500;
`;

const StDevider = styled.hr`
  margin: 10px auto;
  width: 100%;
  border: ${({ theme }) => `0.1px solid ${theme.color.gray400}`};
`;

const StImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StMapImg = styled(Image)`
  position: relative !important;
  object-fit: scale-down;
  width: 80% !important;
  height: 80% !important;
`;

export default Store;
