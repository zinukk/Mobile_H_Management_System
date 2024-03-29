import Image from 'next/image';
import { useRouter } from 'next/router';
import { TStatistics, TStatus } from '@src/types/home';
import { TStoreInfo } from '@src/types/store';
import NoriImg from 'public/assets/images/store/nori-image.webp';
import styled from '@emotion/styled';

interface IProps {
  store: TStoreInfo;
}

const Store = ({ store }: IProps) => {
  const router = useRouter();

  const { img_src, map_name, map_id, stay, refair, total, serving_count, error_count } = store;

  const servingCount: number = parseInt(serving_count);

  const errorCount: number = parseInt(error_count);

  const refairCount: number = parseInt(refair);

  const stayCount: number = parseInt(stay);

  const pageHandler = (storeId: string) => {
    router.push(`/store/${storeId}`);
  };

  const widthHandler = (count: number, total: number) => {
    return (count / total) * 100;
  };

  const performanceCalculator = (servingCount: number, errorCount: number) => {
    if (servingCount === 0 && errorCount === 0) return 0;

    return (servingCount / (servingCount + errorCount)).toFixed(2);
  };

  const createStatus = (id: number, color: string, count: number): TStatus => {
    return {
      id,
      color,
      count,
    };
  };

  const STATUS: TStatus[] = [
    createStatus(0, 'main', errorCount),
    createStatus(1, 'sub', servingCount),
    createStatus(2, 'stroke', refairCount),
    createStatus(3, 'light', stayCount),
  ];

  const createStatistics = (id: number, title: string, count: string | number): TStatistics => {
    return {
      id,
      title,
      count,
    };
  };

  const STATISTICS: TStatistics[] = [
    createStatistics(0, '서빙횟수', servingCount),
    createStatistics(1, '에러횟수', errorCount),
    createStatistics(2, '주행효율', performanceCalculator(servingCount, errorCount)),
  ];

  return (
    <StStore
      onClick={() => {
        pageHandler(map_id);
      }}>
      <StBody>
        <StStoreInfo>
          <Image src={map_id === '1' ? NoriImg : img_src} width={60} height={40} alt="매장이미지" />
          <StStoreName>{map_name}</StStoreName>
        </StStoreInfo>
        <StStatisticsBox>
          {STATISTICS.map(({ id, title, count }) => (
            <StStatistics key={id}>
              <StCount>{count}</StCount>
              <StTitle>{title}</StTitle>
            </StStatistics>
          ))}
        </StStatisticsBox>
      </StBody>
      <StFooter>
        {STATUS.map(({ id, color, count }) => (
          <StBarChart key={id} color={color} style={{ width: widthHandler(count, total) }} />
        ))}
      </StFooter>
    </StStore>
  );
};

const StStore = styled.div`
  padding: 15px 5px;
  width: 100%;
  background: white;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.color.gray100};
  }
`;

const StBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StStoreInfo = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-right: ${({ theme }) => `1px solid ${theme.color.gray300}`};
`;

const StStoreName = styled.p`
  margin-top: 5px;
  font-size: 10px;
`;

const StStatisticsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StStatistics = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

const StCount = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const StTitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray600};
`;

const StFooter = styled.footer`
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  width: 90%;
  height: 5px;
  border-radius: 5px;
  background: ${({ theme }) => theme.color.light};
  overflow: hidden;
`;

const StBarChart = styled.div<{ color: string }>`
  height: 5px;
  background: ${({ theme, color }) => theme.color[color]};
`;

export default Store;
