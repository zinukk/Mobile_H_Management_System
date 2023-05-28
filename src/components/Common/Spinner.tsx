import styled from '@emotion/styled';
import React from 'react';

const Spinner = () => {
  return (
    <StSpinner>
      <StDot />
      <StDot />
      <StDot />
    </StSpinner>
  );
};

const StSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  --uib-size: 2.0833vw;
  --uib-speed: 0.8s;
  --uib-color: ${({ theme }) => theme.color.main};
  display: inline-block;
  height: var(--uib-size);
  width: var(--uib-size);
  animation: spin78236 calc(var(--uib-speed) * 2.5) infinite linear;
`;

const StDot = styled.div`
  position: absolute;
  height: 100%;
  width: 30%;

  ::after {
    content: '';
    position: absolute;
    height: 0%;
    width: 100%;
    padding-bottom: 100%;
    background-color: var(--uib-color);
    border-radius: 50%;
  }

  :nth-of-type(1) {
    bottom: 5%;
    left: 0;
    transform: rotate(60deg);
    transform-origin: 50% 85%;

    ::after {
      bottom: 0;
      left: 0;
      animation: wobble1 var(--uib-speed) infinite ease-in-out;
      animation-delay: calc(var(--uib-speed) * -0.3);
    }
  }

  :nth-of-type(2) {
    bottom: 5%;
    right: 0;
    transform: rotate(-60deg);
    transform-origin: 50% 85%;

    ::after {
      bottom: 0;
      left: 0;
      animation: wobble1 var(--uib-speed) infinite calc(var(--uib-speed) * -0.15) ease-in-out;
    }
  }

  :nth-of-type(3) {
    bottom: -5%;
    left: 0;
    transform: translateX(116.666%);

    ::after {
      top: 0;
      left: 0;
      animation: wobble2 var(--uib-speed) infinite ease-in-out;
    }
  }

  @keyframes spin78236 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes wobble1 {
    0%,
    100% {
      transform: translateY(0%) scale(1);
      opacity: 1;
    }

    50% {
      transform: translateY(-66%) scale(0.65);
      opacity: 0.8;
    }
  }

  @keyframes wobble2 {
    0%,
    100% {
      transform: translateY(0%) scale(1);
      opacity: 1;
    }

    50% {
      transform: translateY(66%) scale(0.65);
      opacity: 0.8;
    }
  }
`;

export default Spinner;
