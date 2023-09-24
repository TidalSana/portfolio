import type { NextPage } from 'next';
import {
  Flex, Spinner, useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import Navigation from '../components/Navigation';
import MainWrapper from '../components/MainWrapper';
import FooterComponent from '../components/FooterComponent';

const Home: NextPage = () => {
  /** State */
  const [loading, setLoading] = React.useState(true);
  const homeRef = React.useRef<HTMLDivElement | null>(null);
  const projectsRef = React.useRef<HTMLDivElement | null>(null);
  const aboutRef = React.useRef<HTMLDivElement | null>(null);

  /** ChakraUI */
  const { colorMode } = useColorMode();

  /** Scroll to top */
  const scrollToTop = () => {
    homeRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
      rounded="md"
      boxShadow="xl"
      align="center"
      overflowX="hidden"
      flexDirection="column"
      justifyContent="center"
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
              aboutRef={aboutRef}
            />
            <FooterComponent scrollToHome={scrollToTop} />
          </>
        )
        : (
          <Flex width="100vw" height="100vh" justifyContent="center" align="center">
            <Spinner
              size="xl"
              speed="0.65s"
              thickness="8px"
              color={colorMode === 'dark' ? 'brand.lightAccentShade' : 'brand.darkAccentShade'}
            />
          </Flex>
        )
          }
    </Flex>
  );
};

export default Home;
