import type { NextPage } from 'next';
import {
  Flex, Spinner, useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import Navigation from '../components/Navigation';
import MainWrapper from '../components/MainWrapper';

const Home: NextPage = () => {
  /** State */
  const [loading, setLoading] = React.useState(true);

  /** ChakraUI */
  const { colorMode } = useColorMode();

  /** Loading Spinner */
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  /** Render */
  return (
    <Flex
      className="main-page-layout"
      boxShadow="xl"
      rounded="md"
      align="center"
      justifyContent="center"
      flexDirection="column"
      width="100%"
      >
      {!loading
        ? (
          <>
            <Navigation />
            <MainWrapper />
          </>
        )
        : (
          <Flex width="100vw" height="100vh" justifyContent="center" align="center">
            <Spinner
              size="xl"
              speed="0.65s"
              thickness="8px"
              color={colorMode === 'dark' ? 'brand.lightAccentShade' : 'brand.darkAccentShade'}/>
          </Flex>
        )
          }
    </Flex>
  );
};

export default Home;
