import styled from "styled-components";

export const RoomCode = styled.button`
  height: 40px;
  border-radius: 8px;
  overflow: hidden;

  background-color: #fff;
  border: 1px solid #835afd;
  
  display: flex;

  div {
    height: 100%;
    background-color: #835afd;
    padding: 0 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 1.6rem 0 1.2rem;
    width: 230px;
    font-size: 1.4rem;
    font-weight: 500;
  }
`