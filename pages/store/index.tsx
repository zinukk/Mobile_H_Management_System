import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MdArrowForwardIos } from 'react-icons/md';
import { useRecoilState, useResetRecoilState } from 'recoil';
import homeAPI from '@src/api/home';
import DropDown from '@src/components/Common/DropDown';
import { storeNameState } from '@src/store/storeNameState';
import styled from '@emotion/styled';

export async function getServerSideProps() {
  const stores = await homeAPI.getStores();

  return {
    props: {
      stores: stores,
    },
  };
}

interface IProps {
  stores: IResponse;
}

const Store = ({ stores }: IProps) => {
  const router = useRouter();

  const [storeName, setStoreName] = useRecoilState(storeNameState);

  const resetStoreName = useResetRecoilState(storeNameState);

  useEffect(() => {
    resetStoreName();
  }, []);

  const dropdownList: IDropDownList[] = stores.stores.map(({ map_name: storeName, map_id: storeId }) => ({
    id: storeId,
    option: storeName,
  }));

  const pageHandler = (storeId: string, storeName: string) => {
    setStoreName(storeName);
    router.push(`/store/${storeId}`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <StStore>
        <StHeader>
          <StTitle>전체 매장</StTitle>
          <DropDown selected={storeName} list={dropdownList} event={pageHandler} />
        </StHeader>
        <StBody>
          {stores.stores.map(({ map_id: storeId, map_name: storeName, descirbe, img_src }) => (
            <StStoreInfo key={storeId} onClick={() => pageHandler(storeId, storeName)}>
              <StInfoBox>
                <StFlexBox>
                  <Image src={img_src} width={75} height={50} alt="매장 로고" />
                  <StColumnBox>
                    <StStoreName>{storeName}</StStoreName>
                    <StDescribe>{descirbe}</StDescribe>
                  </StColumnBox>
                </StFlexBox>
                <StIcon />
              </StInfoBox>
              <StDevider />
              <StImgBox>
                <StMapImg src={`/assets/images/map/map-background-${storeId}-monitoring.png`} alt="매장이미지" fill />
              </StImgBox>
            </StStoreInfo>
          ))}
        </StBody>
      </StStore>
    </motion.div>
  );
};

const StStore = styled.div`
  padding: 0 20px;
  padding-bottom: 10vh;
  width: 100%;
  background: ${({ theme }) => theme.color.background};
`;

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StTitle = styled.h1`
  color: ${({ theme }) => theme.color.gray700};
  font-size: 18px;
  font-weight: 600;
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
