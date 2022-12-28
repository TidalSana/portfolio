import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';

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
      /** White */
      lightAccentShade: '#fbf9fa',
      darkAccent: '#b33e69',
      /** Dark */
      darkAccentShade: '#393543',
    },
    darkMode: {
      color: '#393543',
    },
    lightMode: {
      color: '#ffffff',
    },
  },
  fonts: {
    heading: '"Roboto Condensed", sans-serif',
    body: '"Roboto", sans-serif',
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      html: {
        /** This stays respect to the color mode */
        bg: props.colorMode === 'dark' ? 'darkMode.color' : 'lightMode.color',
      },
      div: {
        /** Opposite respect to the color mode */
        color: props.colorMode === 'dark' ? 'brand.lightAccentShade' : 'brand.darkAccentShade',
        bg: props.colorMode === 'dark' ? 'darkMode.color' : 'lightMode.color',
      },
    }),
  },
  // components: {
  //   Text: {
  //     variants: (props: StyleFunctionProps) => ({
  //       /** If dark background use this */
  //       darkBackground: {
  //         color: props.colorMode === 'dark' ? 'brand.lightAccentShade' : 'brand.darkAccentShade',
  //       },
  //       /** If light background use this */
  //       lightBackground: {
  //         color: props.colorMode === 'dark' ? 'brand.darkAccentShade' : 'brand.lightAccentShade',
  //       },
  //     }),
  //   },
  // },
});

export default theme;
