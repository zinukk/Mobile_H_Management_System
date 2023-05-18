import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Image from 'next/image';
import LogoIcon from '../public/assets/icons/icon_logo.png';
import LogoText from '../public/assets/images/image_logo.png';
import Statistics from '@src/components/Home/Statistics/Statistics';
import homeAPI from '@src/api/home';
import { IServing } from '@src/types/home';
import StoreList from '@src/components/Home/StoreList/StoreList';
import KakaoMap from '@src/components/Home/KakaoMap';

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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <StHome>
        <StHeader>
          <StLogo>
            <StImage src={LogoIcon} width={51} height={51} alt="로고 아이콘" />
            <StImage src={LogoText} width={200} height={51} alt="로고 텍스트" />
          </StLogo>
        </StHeader>
        <StBody>
          <Statistics serving={serving.all} />
          <StoreList stores={stores.stores} />
          <KakaoMap stores={stores.stores} />
        </StBody>
      </StHome>
    </motion.div>
  );
};

const StHome = styled.div`
  padding-bottom: 10vh;
  width: 100%;
  background: ${({ theme }) => theme.color.background};
  overflow: scroll;
`;

const StHeader = styled.header`
  margin-bottom: 20px;
  padding: 5px 0;
  width: 100%;
  background: ${({ theme }) => theme.color.white};
  border-bottom: ${({ theme }) => `1px solid ${theme.color.gray300}`};
`;

const StLogo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StImage = styled(Image)`
  filter: invert(35%) sepia(74%) saturate(451%) hue-rotate(201deg) brightness(86%) contrast(90%);
`;

const StBody = styled.main`
  padding: 0 20px;
  width: 100%;
`;

export default Home;
