import styled from '@emotion/styled';
import BoxShadows from '../styles/BoxShadows';

interface NavigationProps {
  onClick?: () => void;
}

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-shadow: ${BoxShadows.Standard};
`;

const NavItems = styled.div`
  margin: 1em;
`;

const Navigation: React.FC<NavigationProps> = ({ onClick }) => {
  return (
    <NavigationWrapper onClick={onClick}>
      <NavItems>Home</NavItems>
      <NavItems>About</NavItems>
      <NavItems>Contact</NavItems>
    </NavigationWrapper>
  );
};

export default Navigation;
