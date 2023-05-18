import styled from '@emotion/styled';
import Image from 'next/image';
import homeAPI from '@src/api/home';
import DropDown from '@src/components/Common/DropDown';
import { storeNameState } from '@src/store/storeNameState';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { MdArrowForwardIos } from 'react-icons/md';

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
  const [storeName, setStoreName] = useRecoilState(storeNameState);

  const router = useRouter();

  console.log(stores);

  const pageHandler = (storeId: number | string, storeName: string) => {
    setStoreName(storeName);
    router.push(`/store/${storeId}`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <StStore>
        <StHeader>
          <StTitle>전체 매장</StTitle>
          <DropDown selected={storeName} list={DROP_DOWN_LIST} event={pageHandler} />
        </StHeader>
        <StBody>
          {stores.stores.map(({ map_id, map_name, descirbe, img_src }) => (
            <StStoreInfo key={map_id} onClick={() => pageHandler(map_id, map_name)}>
              <StInfoBox>
                <StFlexBox>
                  <Image src={img_src} width={75} height={50} alt="매장 로고" />
                  <StColumnBox>
                    <StStoreName>{map_name}</StStoreName>
                    <StDescribe>{descirbe}</StDescribe>
                  </StColumnBox>
                </StFlexBox>
                <StIcon />
              </StInfoBox>
              <StDevider />
              <StImgBox>
                <StMapImg src={`/assets/images/map/map-background-${map_id}-monitoring.png`} alt="매장이미지" fill />
              </StImgBox>
            </StStoreInfo>
          ))}
        </StBody>
      </StStore>
    </motion.div>
  );
};

const DROP_DOWN_LIST = [
  { id: 1, option: '향동 노리 배달쿡' },
  { id: 2, option: '연신내 더피플버거' },
  { id: 3, option: '차세대 융합 기술 연구원' },
  { id: 4, option: '오산 공유주방' },
  { id: 5, option: '더티 프라이' },
  { id: 6, option: '노원 발란' },
];

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
