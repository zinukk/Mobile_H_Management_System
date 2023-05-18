import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';

interface IProps {
  store: IStore;
}

const Store = ({ store }: IProps) => {
  const { img_src, map_name, stay, refair, total, serving_count, error_count, performance } = store;

  const STATUS = [
    { id: 0, color: 'main', count: parseInt(error_count) },
    { id: 1, color: 'sub', count: parseInt(serving_count) },
    { id: 2, color: 'stroke', count: parseInt(refair) },
    { id: 3, color: 'light', count: parseInt(stay) },
  ];

  const STATISTICS = [
    { id: 0, title: '서빙횟수', count: serving_count },
    { id: 1, title: '에러횟수', count: error_count },
    { id: 2, title: '주행효율', count: performance ? performance : '측정불가' },
  ];

  const widthHandler = (count: number, total: number) => {
    return (count / total) * 100;
  };

  return (
    <StStore>
      <StBody>
        <StStoreInfo>
          <Image src={img_src} width={60} height={40} alt="매장이미지" />
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
