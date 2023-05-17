import { css } from '@emotion/react';

const global = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul,
  li {
    list-style: none;
  }

  a {
    color: #333;
    text-decoration: none;
  }

  input,
  button {
    outline: none;
  }

  body,
  html {
    height: 100%;
    background-color: $background-color;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  ::selection {
    background-color: transparent;
  }
`;

export default global;
