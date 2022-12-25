import styled from '@emotion/styled';

interface MainProps {}

const Main = styled.div`
  display: flex;
  width: 80%;
  border: 1px solid red;
`;

const MainWrapper: React.FC<MainProps> = () => {
  return <Main>testing</Main>;
};

export default MainWrapper;
