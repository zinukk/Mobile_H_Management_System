import styled from '@emotion/styled';
import { useState } from 'react';
import { ERROR_STATUS } from '@src/mocks/ERROR_STATUS';
import { IErrorStatus } from '@src/types/home';
import Store from './Store';

interface IProps {
  stores: IStore[];
}

const StoreList = ({ stores }: IProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const end = showMore ? 6 : 3;

  const buttonText = showMore ? '접기' : '더 보기 ';

  const organizedStores = stores.slice(0, end).map((store: IStore) => ({
    ...store,
    total: parseInt(store.error) + parseInt(store.serving) + parseInt(store.stay) + parseInt(store.refair),
  }));

  const lengthHandler = () => {
    setShowMore(!showMore);
  };

  return (
    <StStoreList>
      <StHeader>
        <StTitle>전체 매장</StTitle>
        <StStatusBox>
          {ERROR_STATUS.map(({ id, status, color }: IErrorStatus) => (
            <StFlexBox key={id}>
              <StColor status={status} color={color} />
              <StStatus>{status}</StStatus>
            </StFlexBox>
          ))}
        </StStatusBox>
      </StHeader>
      <StBody>
        {organizedStores.map((store: IStore, idx: number) => (
          <Store key={idx} store={store} />
        ))}
      </StBody>
      <StFooter onClick={lengthHandler}>{buttonText}</StFooter>
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

const StTitle = styled.h1`
  color: ${({ theme }) => theme.color.gray700};
  font-size: 18px;
  font-weight: 600;
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
