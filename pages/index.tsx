import type { NextPage } from 'next';
import styled from '@emotion/styled';
import Navigation from '../components/Navigation';
import MainWrapper from '../components/MainWrapper';
import { useColorMode } from '@chakra-ui/react';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container>
      <Navigation />
      <MainWrapper />
      <button onClick={toggleColorMode}>testing</button>
    </Container>
  );
};

export default Home;
