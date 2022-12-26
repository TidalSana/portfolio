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
      accent: '##8a7c8e',
      accentShade: '#fbf9fa',
      darkAccent: '#b33e69',
      darkAccentShade: '#281d33',
    },
  },
  fonts: {
    heading: '"Roboto Condensed", sans-serif',
    body: '"Roboto", sans-serif',
  },
  // styles: {
  //   global: {
  //     body: {
  //       bg: 'brand.main',
  //       color: 'white',
  //     },
  //   },
  // },
});

export default theme;
