import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-image: url('./assets/img_1.png');
    background-repeat: repeat-y;
    font-family: Helvetica;
  }

  h1, h2, h3, h4, p {
    color: white;
    
  }

  h1 {
    font-size: 50px;
  }

  p {
    font-size: 20px;
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <link href="./fonts/PoorStory-Regular.ttf" rel="stylesheet" />
        <link href="./fonts/PressStart2P.ttf" rel="stylesheet" />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
