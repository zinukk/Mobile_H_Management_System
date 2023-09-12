import { useRef, useState } from 'react';
import useOnClickOutside from '@src/hooks/useOnClickOutside';
import { TDropDown } from '@src/types/common';
import styled from '@emotion/styled';

interface IProps {
  selected: string;
  list: TDropDown[];
  event: (arg1: string, arg2: string) => void;
}

const DropDown = ({ selected, list, event }: IProps) => {
  const [isOpen, setisOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const dropdownHandler = () => {
    setisOpen(!isOpen);
  };

  useOnClickOutside(ref, () => {
    setisOpen(false);
  });

  const filteredList = list.filter((cur) => cur.option !== selected);

  return (
    <StDropdown ref={ref}>
      <StSelected isOpen={isOpen} onClick={dropdownHandler}>
        {selected}
      </StSelected>
      <StSelect isOpen={isOpen}>
        {filteredList.map(({ id, option }: TDropDown) => (
          <StOption
            key={id}
            onClick={() => {
              event(option, id);
              setisOpen(false);
            }}>
            {option}
          </StOption>
        ))}
      </StSelect>
    </StDropdown>
  );
};

const StDropdown = styled.div`
  position: relative;
`;

const StSelected = styled.button<{ isOpen: boolean }>`
  position: relative;
  padding: 0 5px;
  width: 115px;
  height: 30px;
  background: ${({ theme, isOpen }) => (isOpen ? theme.color.main : theme.color.sub)};
  color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: 5px;
  border-bottom-left-radius: ${({ isOpen }) => (isOpen ? '0px' : '5px')};
  border-bottom-right-radius: ${({ isOpen }) => (isOpen ? '0px' : '5px')};
  font-size: 11px;
  z-index: 20;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.color.main};
  }
`;

const StSelect = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 30px;
  left: 0px;
  width: 115px;
  border-radius: 5px;
  border-top-left-radius: ${({ isOpen }) => (isOpen ? '0px' : '5px')};
  border-top-right-radius: ${({ isOpen }) => (isOpen ? '0px' : '5px')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  translate: ${({ isOpen }) => (isOpen ? '0' : '0 -30px')};
  transition: 0.4s;
  overflow: hidden;
  z-index: 20;
`;

const StOption = styled.button`
  padding: 0 5px;
  width: 115px;
  height: 30px;
  background: ${({ theme }) => theme.color.sub};
  color: ${({ theme }) => theme.color.white};
  border: 0;
  border-bottom: ${({ theme }) => `0.1px solid ${theme.color.white}`};
  cursor: pointer;
  font-size: 10px;
  z-index: 20;

  :hover {
    background: ${({ theme }) => theme.color.main};
  }
`;

export default DropDown;
