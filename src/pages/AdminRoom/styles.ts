import styled from "styled-components";

export const Container = styled.div`
  header {
    padding: 2.4rem;
    border-bottom: 1px solid #e2e2e2;

    .content {
      max-width: 1120px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;

      > a svg {
        max-height: 45px;

        @media (max-width: 820px) {
          margin-bottom: 15px;
        } 
      }

      > div {
        display: flex;
        gap: 1.6rem;

        @media (max-width: 620px) {
          width: 100%;
          flex-direction: column;
        }

        button {
          height: 40px;
        }
      }

      @media (max-width: 820px) {
        flex-direction: column;
      }
    }
  }

`

export const MainContent = styled.main`
  max-width: 800px;
  margin: 0 auto;

  .room-title {
    margin: 3.2rem 0 2.4rem;
    display: flex;
    align-items: center;

    h1 {
      font-family: 'Poppins', sans-serif;
      font-size: 2.4rem;
      color: #29292e;
    }

    span {
      margin-left: 1.6rem;
      background-color: #e559f9;
      border-radius: 9999px;
      padding: 8px 16px;
      color: #fff;
      font-weight: 500;
      font-size: 1.4rem;
    }

    @media (max-width: 620px) {
      flex-direction: column;
    }
  }

  .question-list {
    margin: 3.2rem 0;
  }

  @media (max-width: 820px) {
    padding: 0 2.4rem;
  }
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    box-shadow: 3px 1px 6px -4px #000;
    border: 1px solid #fff;
  }

  span {
    margin-left: 8px;
    color: #29292e;
    font-weight: 500;
    font-size: 1.4rem;
  }
`