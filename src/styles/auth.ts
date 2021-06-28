import styled from "styled-components";

export const Auth = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;

  aside {
    flex: 7;

    @media (max-width: 820px) {
      display: none;
    }

    background-color: #835afd;
    color: #fff;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 12rem 8rem;

    svg {
      max-width: 320px;
    }

    strong {
      font: 700 3.6rem 'Poppins', sans-serif;
      line-height: 42px;
      margin-top: 1rem;
    }

    p {
      font-size: 2.4rem;
      line-height: 32px;
      margin-top: 1rem;
      color: #f8f8f8;
    }
  }

  main {
    flex: 8;
    padding: 0 3.2rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  width: 100%;
  align-items: stretch;
  text-align: center;

  > img {
    align-self: center;
  }

  .create-room {
    margin-top: 6.4rem;
    height: 50px;
    border-radius: 8px;
    font-weight: 500;
    background-color: #ea4335;
    color: #fff;

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }

    svg {
      margin-right: 8px;
    }
  }

  .separator {
    font-size: 1.4rem;
    color: #a8a8b3;

    margin: 3.2rem 0;
    display: flex;
    align-items: center;

    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background-color: #a8a8b3;
    }

    &::before {
      margin-right: 1.6rem;
    }

    &::after {
      margin-left: 1.6rem;
    }
  }

  h2 {
    font-size: 2.4rem;
    margin: 6.4rem 0 2.4rem;
    font-family: 'Poppins', sans-serif;
  }

  form {
    input {
      height: 50px;
      border-radius: 8px;
      padding: 0 1rem;
      background-color: #fff;
      border: 1px solid #a8a8b3;

      &.has-error {
        border-color: #ea4335;
      }
    }

    button, input {
      width: 100%;
    }

    button {
      margin-top: 1rem;
    }
  }

  p {
    font-size: 1.4rem;
    color: #737380;
    margin-top: 1rem;

    a {
      color: #e559f9;
    }
  }

`