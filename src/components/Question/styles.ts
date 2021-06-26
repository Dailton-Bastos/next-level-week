import styled from "styled-components";

export const Question = styled.div`
  background-color: #fefefe;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0, 0.04);
  padding: 2.4rem;

  & + & {
    margin-top: 8px;
  }

  &.highlighted {
    background-color: #f4f0ff;
    border: 1px solid #835afd;

    footer .user-info span {
      color: #29292e;
    }
  }

  &.answered {
    background-color: #dbdcdd;
  }

  p {
    color: #29292e;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2.4rem;

    > div {
      display: flex;
      align-items: center;
      gap: 1.6rem;
    }

    button {
      border: none;
      background-color: transparent;
      transition: filter 0.2s;

      &.like-button {
        display: flex;
        align-items: flex-end;
        color: #737380;
        gap: 8px;

        &.liked {
          color: #835afd;

          svg path {
            stroke: #835afd;
          }
        }
      }

      &:hover {
        filter: brightness(0.7);
      }
    }
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
    color: #737380;
    font-size: 1.4rem;
  }
`