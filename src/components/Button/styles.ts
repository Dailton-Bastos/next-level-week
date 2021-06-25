import styled from "styled-components";

export const Button = styled.button`
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background-color: #835afd;
  color: #fff;
  padding: 0 3.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;

  transition: filter 0.2s;

  &.outlined {
    background-color: #fff;
    border: 1px solid #835afd;
    color: #835afd;
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`