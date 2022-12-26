import type { NextPage } from 'next';
import {
  Flex, useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import Navigation from '../components/Navigation';
import MainWrapper from '../components/MainWrapper';

const Home: NextPage = () => {
  /** ChakraUI */
  const { toggleColorMode } = useColorMode();

  /** Render */
  return (
    <Flex boxShadow="xl" rounded="md" align="center" justifyContent="center" flexDirection="column" width="100%">
      <Navigation />
      <MainWrapper />
    </Flex>
  );
};

export default Home;
