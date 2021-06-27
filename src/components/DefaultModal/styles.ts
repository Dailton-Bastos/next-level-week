import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    height: 48px;

    path {
      stroke: #e73f5d;
    }
  }

  h2 {
    font-size: 2.4rem;
    margin: 2.4rem 0 1.2rem;
    color: #29292e;
    font-family: 'Poppins', sans-serif;
  }

  p {
    font-size: 1.6rem;
    color: #737380;
    line-height: 26px;
  }

  div {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 40px;

    button {
      border: none;
      background-color: #dbdcdd;
      height: 50px;
      width: 132px;
      border-radius: 8px;
      color: #737380;
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }

      &.modal-action {
        background-color: #e73f5d;
        color: #fff;
      }
    }
  }
`