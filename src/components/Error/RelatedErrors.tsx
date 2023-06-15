import styled from '@emotion/styled';
import { IErrorState } from '@src/types/error';
import React from 'react';
import Title from '../Common/Title';

interface IProps {
  relatedErrors: IErrorState[];
}

const RelatedErrors = ({ relatedErrors }: IProps) => {
  console.log(relatedErrors);
  return (
    <StRelatedErrors>
      <StHeader>
        <Title title="관련된 다른 에러" />
      </StHeader>
      <StBody>
        {relatedErrors &&
          relatedErrors.map(({ created_at, error_id, error_type }) => (
            <StErrorBox key={error_id}>
              <StFlexBox>
                <StTitle>Error type : </StTitle>
                <StDescription>{error_type}</StDescription>
              </StFlexBox>
              <StFlexBox>
                <StTitle>Error id : </StTitle>
                <StDescription>{error_id}</StDescription>
              </StFlexBox>
              <StFlexBox>
                <StTitle>Created at : </StTitle>
                <StDescription>{created_at}</StDescription>
              </StFlexBox>
            </StErrorBox>
          ))}
      </StBody>
    </StRelatedErrors>
  );
};

const StRelatedErrors = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const StHeader = styled.header`
  width: 100%;
`;

const StBody = styled.main`
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 300px;
  background: ${({ theme }) => theme.color.white};
  border-radius: 5px;
  overflow: scroll;
`;

const StErrorBox = styled.div`
  padding: 10px;
  width: 100%;
  background: ${({ theme }) => theme.color.white};
  border: ${({ theme }) => `1px solid ${theme.color.gray400}`};
  border-radius: 5px;
  gap: 10px;
`;

const StFlexBox = styled.div`
  width: 100%;
  word-break: break-all;
`;

const StTitle = styled.span`
  color: ${({ theme }) => theme.color.gray700};
  font-size: 14px;
`;

const StDescription = styled.span`
  color: ${({ theme }) => theme.color.main};
  font-size: 14px;
  font-weight: 600;
`;

export default RelatedErrors;
