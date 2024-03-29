import styled from '@emotion/styled';
import { TRobot, TRobotType } from '@src/types/robot';
import Image from 'next/image';

interface IProps {
  robotInfo: TRobot;
  ROBOT_TYPE: TRobotType[];
}

const RobotCard = ({ robotInfo, ROBOT_TYPE }: IProps) => {
  const { k_map_name, serving_count, distance, state, battery, serial_number, robot_state } = robotInfo;

  const getColorById = (id: string) => {
    if (id === null) return '#000';

    return ROBOT_TYPE.filter((robot) => robot.id === id)[0].color;
  };

  return (
    <StRobotCard>
      <StHeader>
        <StStore>{k_map_name ? k_map_name : '정보없음'}</StStore>
        <StGapBox>
          <StState color={getColorById(state)}>{robot_state}</StState>
          <StImg
            src={`/assets/icons/robot/icon-robot-state-${state ? state : 6}.webp`}
            alt="로봇이미지"
            width={50}
            height={50}
          />
        </StGapBox>
      </StHeader>
      <StBody>
        <StSerialNumber>S/N. {serial_number ? serial_number : 'virtual'}</StSerialNumber>
        <StGapBox>
          <StGray>서빙횟수</StGray>
          <StBlack>{serving_count ? serving_count : 0}회</StBlack>
        </StGapBox>
        <StGapBox>
          <StGray>이동거리</StGray>
          <StBlack>{distance ? distance : 0}m</StBlack>
        </StGapBox>
      </StBody>
      <StFooter>
        <StBatteryBox>
          <StBatteryBar width={Number(battery) > 0 ? Number(battery) : 0} />
        </StBatteryBox>
        <StBatteryPercent>{Math.sign(Number(battery)) === -1 ? 0 : battery}%</StBatteryPercent>
      </StFooter>
    </StRobotCard>
  );
};

const StRobotCard = styled.div`
  width: 100%;
  padding: 15px;
  background: white;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const StHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StStore = styled.p`
  font-size: 14px;
`;

const StGapBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StState = styled.p<{ color: string | undefined }>`
  color: ${({ color }) => color};
  font-size: 13px;
  font-weight: 600;
`;

const StImg = styled(Image)`
  width: 25px;
  height: 25px;
`;

const StBody = styled.div`
  width: 100%;
`;

const StSerialNumber = styled.p`
  margin: 3px 0;
  text-align: right;
  font-size: 11px;
`;

const StGray = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray600};
`;

const StBlack = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.color.black};
`;

const StFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const StBatteryBox = styled.div`
  margin-top: 5px;
  position: relative;
  width: 100%;
  height: 5px;
  background: #e8e6f0;
  border-radius: 5px;
  overflow: hidden;
`;

const StBatteryBar = styled.span<{ width: number | undefined }>`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: ${({ width }) => `${width}%`};
  background: ${({ theme }) => theme.color.sub};
  opacity: 0.7;
  height: 100%;
  transition: width 0.5s ease-in-out;
`;

const StBatteryPercent = styled.p`
  margin-top: 5px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.black};
`;

export default RobotCard;
