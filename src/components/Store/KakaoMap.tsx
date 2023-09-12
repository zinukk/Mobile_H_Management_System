import { useState } from 'react';
import { useRouter } from 'next/router';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { TMap } from '@src/types/home';
import { TStoreInfo } from '@src/types/store';
import styled from '@emotion/styled';

interface IProps {
  storeInfo: TStoreInfo[];
}

const KakaoMap = ({ storeInfo }: IProps) => {
  const router = useRouter();

  const [isOpen, setisOpen] = useState<boolean>(false);

  const pageHandler = (mapId: string) => {
    router.push(`/store/${mapId}`);
  };

  const [info, setInfo] = useState<TMap>({
    map_id: '',
    map_name: '',
    store_lat: '',
    store_lng: '',
  });

  return (
    <StKakaoMap>
      <StBody>
        <Map
          center={{
            lat: 37.541,
            lng: 126.986,
          }}
          style={{
            height: '100%',
            borderRadius: '5px',
          }}
          level={12}>
          {storeInfo.map(({ map_id, map_name, store_lat, store_lng }) => (
            <div key={map_id}>
              <MapMarker
                key={map_id}
                clickable={true}
                onMouseOver={() => {
                  setisOpen(true);
                  console.log('호버');
                  setInfo({ map_id, map_name, store_lat, store_lng });
                }}
                onMouseOut={() => {
                  setisOpen(false);
                }}
                position={{
                  lat: Number(store_lat),
                  lng: Number(store_lng),
                }}
                onClick={() => pageHandler(map_id)}
              />
              {isOpen && info.map_id === map_id && (
                <CustomOverlayMap
                  position={{
                    lat: Number(store_lat),
                    lng: Number(store_lng),
                  }}
                  yAnchor={2.7}
                  xAnchor={0.5}>
                  <StCustomOverlay>
                    <StStore>{map_name}</StStore>
                  </StCustomOverlay>
                </CustomOverlayMap>
              )}
            </div>
          ))}
        </Map>
      </StBody>
    </StKakaoMap>
  );
};

const StKakaoMap = styled.div`
  width: 100%;
`;

const StBody = styled.main`
  width: 100%;
  height: 200px;
  background: ${({ theme }) => theme.color.white};
  border-radius: 5px;
`;

const StCustomOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 5px;
  width: 100%;
  background: ${({ theme }) => theme.color.main};
  color: ${({ theme }) => theme.color.white};
  border-radius: 3px;
  font-size: 12px;
  font-weight: 600;
`;

const StStore = styled.div`
  color: ${({ theme }) => theme.color.white};
  border-radius: 3px;
  font-size: 12px;
  font-weight: 600;
`;

export default KakaoMap;
