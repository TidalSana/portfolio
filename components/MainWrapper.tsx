import styled from "@emotion/styled";

type MainProps = {};

const MainWrapper = styled.div`
  display: flex;
  width: 80%;
  border: 1px solid red;
`;

const Main: React.FC<MainProps> = () => {
  return <MainWrapper>testing</MainWrapper>;
};

export default Main;
