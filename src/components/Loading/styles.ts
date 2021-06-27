import styled, { keyframes } from 'styled-components';

const movingGradient = keyframes`
  0% {
    background-position: left bottom;
  }
  100% {
    background-position: right bottom;
  }
`;

export const AjaxBusy = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 5px;
  width: 100%;
  z-index: 999;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: 200%;
    background: linear-gradient(
        to left,
        #835afd,
        25%,
        #fff 50%,
        #1b1d29 75%,
        #835afd 100%
      )
      repeat;
    background-size: 50% 100%;
    animation: ${movingGradient} 2s infinite linear;
  }
`;
