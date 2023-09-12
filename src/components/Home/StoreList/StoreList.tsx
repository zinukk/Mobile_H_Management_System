import { useState } from 'react';
import { TRobotState } from '@src/types/home';
import { TStoreInfo } from '@src/types/store';
import Title from '@src/components/Common/Title';
import Store from './Store';
import styled from '@emotion/styled';

interface IProps {
  storeInfo: TStoreInfo[];
}

const StoreList = ({ storeInfo }: IProps) => {
  const [isOpen, setisOpen] = useState<boolean>(false);

  const end: number = isOpen ? 6 : 3;

  const buttonText: string = isOpen ? '접기' : '더 보기 ';

  const organizedStores: TStoreInfo[] = storeInfo.slice(0, end).map((store: TStoreInfo) => ({
    ...store,
    total: parseInt(store.error) + parseInt(store.serving) + parseInt(store.stay) + parseInt(store.refair),
  }));

  const openHandler = () => {
    setisOpen(!isOpen);
  };

  const createRobotState = (id: number, state: string, color: string): TRobotState => {
    return {
      id,
      state,
      color,
    };
  };

  const ERROR_STATE: TRobotState[] = [
    createRobotState(0, '에러', 'main'),
    createRobotState(1, '서빙', 'sub'),
    createRobotState(2, '대기', 'stroke'),
    createRobotState(3, '수리', 'light'),
  ];

  return (
    <StStoreList>
      <StHeader>
        <Title title="전체 매장" />
        <StStatusBox>
          {ERROR_STATE.map(({ id, state, color }: TRobotState) => (
            <StFlexBox key={id}>
              <StColor status={state} color={color} />
              <StStatus>{state}</StStatus>
            </StFlexBox>
          ))}
        </StStatusBox>
      </StHeader>
      <StBody>
        {organizedStores.map((store: TStoreInfo, idx: number) => (
          <Store key={idx} store={store} />
        ))}
      </StBody>
      <StFooter onClick={openHandler}>{buttonText}</StFooter>
    </StStoreList>
  );
};

const StStoreList = styled.div`
  margin-top: 60px;
  width: 100%;
`;

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StStatusBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
  gap: 20px;
`;

const StFlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StColor = styled.div<{ color: string; status: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: ${({ status }) => status === '수리' && '1px solid black'};
  background: ${({ theme, color }) => theme.color[color]};
`;

const StStatus = styled.p`
  margin-top: 1px;
  font-size: 10px;
`;

const StBody = styled.main`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

const StFooter = styled.button`
  display: block;
  margin: 0 auto;
  margin-top: 10px;
  width: 100px;
  height: 30px;
  color: ${({ theme }) => theme.color.gray500};
  background: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: 30px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.color.gray100};
  }
`;

export default StoreList;
