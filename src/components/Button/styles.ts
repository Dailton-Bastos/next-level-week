import styled from "styled-components";

export const Button = styled.button`
  margin-top: 6.4rem;
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

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`