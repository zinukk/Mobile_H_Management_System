import { IServeErrorCount } from '@src/types/error';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import Title from '../Common/Title';
import Spinner from '../Common/Spinner';
import styled from '@emotion/styled';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);

interface IProps {
  serveErrorCount: IServeErrorCount;
  mutateLoading: boolean;
}

const ServingErrorChart = ({ serveErrorCount, mutateLoading }: IProps) => {
  const data = {
    labels: serveErrorCount && serveErrorCount.date,
    datasets: [
      {
        type: 'line' as const,
        label: '에러횟수',
        borderColor: '#303D60',
        borderWidth: 2,
        fill: false,
        data: serveErrorCount && serveErrorCount.error_count,
      },
      {
        type: 'bar' as const,
        label: '서빙횟수',
        backgroundColor: '#8887c0',
        data: serveErrorCount && serveErrorCount.serving_count,
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };
  return (
    <StServingErrorChart>
      <StHeader>
        <Title title="서빙 시 에러 발생 횟수" />
      </StHeader>
      <StBody>{mutateLoading ? <Spinner /> : <Chart type="bar" data={data} />}</StBody>
    </StServingErrorChart>
  );
};

const StServingErrorChart = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const StHeader = styled.header`
  width: 100%;
`;

const StBody = styled.main`
  position: relative;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  min-height: 220px;
  background: ${({ theme }) => theme.color.white};
  border-radius: 5px;
  overflow: scroll;
  :last-child {
    margin-bottom: 0;
  }
`;

export default ServingErrorChart;
