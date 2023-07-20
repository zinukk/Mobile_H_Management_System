import styled from '@emotion/styled';

interface IProps {
  text: string;
  event: () => void;
}

const Modal = ({ text, event }: IProps) => {
  const confirmHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    event();
  };

  return (
    <StModal>
      <StContent>
        <StBody>{text}</StBody>
        <StFooter>
          <StConfirmBtn onClick={confirmHandler}>확인</StConfirmBtn>
        </StFooter>
      </StContent>
    </StModal>
  );
};

const StModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const StContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 300px;
  height: 120px;
  border-radius: 10px;
  background-color: white;
`;

const StBody = styled.main`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StFooter = styled.footer`
  margin: auto;
  width: 90%;
  height: 30%;
`;

const StConfirmBtn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.stroke};
  border-radius: 5px;
`;

export default Modal;
