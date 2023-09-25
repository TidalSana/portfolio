import React from 'react';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { BreakpointProvider } from 'react-socks';
import theme from '../themes/theme';

type ColorMode = 'light' | 'dark' | undefined;
const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [iconColorMode, setIconColorMode] = React.useState<ColorMode>(undefined);

  React.useEffect(() => {
    // Dark mode is preferred by the user
    // You can apply dark mode styles or logic here
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      setIconColorMode('light');
    } else {
      // Light mode is preferred by the user
      // You can apply light mode styles or logic here
      setIconColorMode('dark');
    }
  }, []);

  /** Render */
  return (
    <>
      <Head>
        <title>Joshua Semana</title>
        <meta name="description" content="Software Engineer Engineer" />
        {iconColorMode !== undefined && iconColorMode === 'light'
          ? <link rel="icon" href="/js-white-favicon.ico" />
          : <link rel="icon" href="/js-dark-favicon.ico" />
        }
      </Head>
      <BreakpointProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </BreakpointProvider>
    </>
  );
};

export default MyApp;
