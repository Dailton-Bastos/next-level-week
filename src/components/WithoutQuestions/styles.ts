import styled from "styled-components";

export const Container = styled.div`
  max-width: 284px;
  width: 100%;
  margin: 64px auto 100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 1.8rem;
    font-family: 'Poppins', sans-serif;
    color: #29292e;
    margin: 16px 0 8px;
    font-weight: 500;
  }

  p {
    font-size: 1.4rem;
    color: #737380;
    text-align: center;
  }
`