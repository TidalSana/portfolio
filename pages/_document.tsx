import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, {
  Html, Head, Main, NextScript,
} from 'next/document';
import theme from '../themes/theme';

export default class Document extends NextDocument {
  static render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
