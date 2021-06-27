import { createGlobalStyle, keyframes } from "styled-components";

const animeModal = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -30px, 0)
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0)
  }
`

export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background: #f8f8f8;
    color: #29292e;
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: 400 1.6rem 'Roboto', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  .react-modal-overlay {
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content {
    max-width: 590px;
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    padding: 64px;

    animation: ${animeModal} 0.3s forwards;
  }
`