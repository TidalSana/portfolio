import type { NextPage } from "next";
import styled from "@emotion/styled";
import Navigation from "../components/Navigation";
import Main from "../components/MainWrapper";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Home: NextPage = () => {
  const onClick = () => {};
  return (
    <Container>
      <Navigation onClick={onClick} />
      <Main />
    </Container>
  );
};

export default Home;
