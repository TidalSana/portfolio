import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  HStack,
  Menu, MenuButton, MenuItem, MenuList,
} from '@chakra-ui/react';

interface NavigationProps {}

enum NavItems {
  home = 'Home',
  about = 'About',
  projects = 'Projects',
}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    // <Menu>
    //   <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
    //     Menu
    //   </MenuButton>
    //   <MenuList>
    //     <MenuItem>Home</MenuItem>
    //     <MenuItem>About</MenuItem>
    //     <MenuItem>Projects</MenuItem>
    //   </MenuList>
    // </Menu>
    <Flex width="100" justifyContent="space-between" align="center" py="5" px="6">
      <HStack as="nav" spacing="5">
        {Object.values(NavItems).map((li, i) => (
          <Flex key={i}>{li}</Flex>
        ))}
      </HStack>
    </Flex>
  );
};

export default Navigation;
