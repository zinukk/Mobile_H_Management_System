import Image from 'next/image';
import { IStoreInfo } from '@src/types/store';
import styled from '@emotion/styled';

interface IProps {
  store: IStore;
}

const StoreInfo = ({ store }: IProps) => {
  const { img_src, map_name, descirbe, map_id, login, start_node, start_dir, wifi_id, wifi_pw, home } = store;

  const storeInfo = { map_id, login: login.split(',').join(', '), start_node, start_dir, wifi_id, wifi_pw, home };

  const isValid = (value: string) => {
    return value ? value : 'No data';
  };

  const STORE_INFO: IStoreInfo[] = Object.entries(storeInfo).map(([key, value], index) => ({
    id: index,
    title: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '),
    description: isValid(value),
  }));

  return (
    <StStoreInfo>
      <StHeader>
        <StFlexBox>
          <Image src={img_src} width={75} height={50} alt="매장 로고" />
          <StColumnBox>
            <StStoreName>{map_name}</StStoreName>
            <StDescribe>{descirbe}</StDescribe>
          </StColumnBox>
        </StFlexBox>
      </StHeader>
      <StDevider />
      <StBody>
        {STORE_INFO.map(({ id, title, description }) => (
          <StDetailInfo key={id}>
            <StTitle>{title}</StTitle>
            <StDescription>{description}</StDescription>
          </StDetailInfo>
        ))}
      </StBody>
    </StStoreInfo>
  );
};

const StStoreInfo = styled.div`
  padding: 15px;
  width: 100%;
  background: ${({ theme }) => theme.color.white};
  border-radius: 5px;
`;

const StHeader = styled.header`
  width: 100%;
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

const StBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  gap: 20px;
`;

const StDetailInfo = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  word-wrap: break-word;
`;

const StTitle = styled.p`
  color: ${({ theme }) => theme.color.gray600};
  font-size: 18px;
`;

const StDescription = styled.p`
  color: ${({ theme }) => theme.color.gray900};
  font-size: 18px;
  word-wrap: break-word;
`;

export default StoreInfo;
