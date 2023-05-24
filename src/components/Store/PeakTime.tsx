import { IServedCounts } from '@src/types/store';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';
import styled from '@emotion/styled';
import Title from '../Common/Title';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

interface IProps {
  servingCount: IServedCounts[];
}

const PeakTime = ({ servingCount }: IProps) => {
  const isValid: boolean = servingCount.length !== 0;

  const times: Array<string> = servingCount.map(({ hours }) => `${hours}시`);

  const counts: Array<string> = servingCount.map(({ avg_cnt }) => avg_cnt);

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#E3E3E3',
        },
      },
    },
  };

  const data = {
    labels: times,
    datasets: [
      {
        label: '서빙 횟수',
        data: counts,
        borderColor: `#5655a5`,
        backgroundColor: '#fff',
      },
    ],
  };

  return (
    <StPeakTime>
      <StHeader>
        <Title title="피크 타임" />
      </StHeader>
      <StBody>
        {isValid ? <Line data={data} options={options} /> : <StNoResult>데이터가 존재하지 않습니다</StNoResult>}
      </StBody>
    </StPeakTime>
  );
};

const StPeakTime = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const StHeader = styled.header`
  margin-bottom: 20px;
  width: 100%;
`;

const StBody = styled.main`
  position: relative;
  margin-top: 10px;
  padding: 15px;
  width: 100%;
  min-height: 100px;
  background: ${({ theme }) => theme.color.white};
  border-radius: 5px;
`;

const StNoResult = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.color.gray500};
  font-size: 16px;
  font-weight: 600;
`;

export default PeakTime;
