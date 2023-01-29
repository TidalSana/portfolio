import type { NextPage } from 'next';
import {
  Flex, Spinner, useColorMode,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import Navigation from '../components/Navigation';
import MainWrapper from '../components/MainWrapper';

const Home: NextPage = () => {
  /** State */
  const [loading, setLoading] = React.useState(true);
  const homeRef = React.useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);

  /** ChakraUI */
  const { colorMode } = useColorMode();

  /** Loading Spinner */
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  /** Render */
  return (
    <Flex
      width="100%"
      boxShadow="xl"
      rounded="md"
      align="center"
      overflowX="hidden"
      justifyContent="center"
      flexDirection="column"
      className="main-page-layout"
      >
      {!loading
        ? (
          <>
            <Navigation
              homeRef={homeRef}
              projectsRef={projectsRef}
              aboutRef={aboutRef}
               />
            <MainWrapper
              homeRef={homeRef}
              projectsRef={projectsRef}
              aboutRef={aboutRef} />
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
