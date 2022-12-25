import styled from '@emotion/styled';

interface MainProps {}

const MainWrapper = styled.div`
  display: flex;
  width: 80%;
  border: 1px solid red;
`;

const Main: React.FC<MainProps> = () => {
  return <MainWrapper>Main stuff</MainWrapper>;
};

export default Main;
