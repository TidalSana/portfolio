import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      main: '#281d33',
      lightAccent: '#8a7c8e',
      lightAccentShade: '#fbf9fa',
      darkAccent: '#b33e69',
      darkAccentShade: '#281d33',
    },
  },
  fonts: {
    heading: '"Roboto Condensed", sans-serif',
    body: '"Roboto", sans-serif',
  },
});

export default theme;
