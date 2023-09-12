import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { TRobotState } from '@src/types/robot';
import Title from '../Common/Title';
import styled from '@emotion/styled';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IProps {
  robots: Omit<TRobotState, 'map_id' | 'map_name'>;
}

const AvailableRobot = ({ robots }: IProps) => {
  const { error, refair, serving, stay } = robots;

  const available: number = Number(serving) + Number(stay);

  const unavailable: number = Number(error) + Number(refair);

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: true,
    },
  };

  const data = {
    labels: ['사용가능', '사용불가'],
    datasets: [
      {
        data: [available, unavailable],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <StAvailableRobot>
      <StHeader>
        <Title title="로봇 상태" />
      </StHeader>
      <StBody>
        <Doughnut data={data} options={options} />
      </StBody>
    </StAvailableRobot>
  );
};

const StAvailableRobot = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const StHeader = styled.header`
  margin-bottom: 20px;
  width: 100%;
`;

const StBody = styled.main`
  display: flex;
  justify-content: center;
  padding: 30px;
  width: 100%;
  background: ${({ theme }) => theme.color.white};
  border-radius: 5px;
`;

export default AvailableRobot;
