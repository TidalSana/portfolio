import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Spacer,
  useColorMode,
  // Button,
  // Menu, MenuButton, MenuItem, MenuList,
} from '@chakra-ui/react';
import { RiHome2Line, RiHardDrive2Fill, RiMailLine } from 'react-icons/ri';

interface NavigationProps {}

const mapNavItems = {
  home: {
    name: 'Home',
    icon: RiHome2Line,
    active: false,
  },
  projects: {
    name: 'Projects',
    icon: RiHardDrive2Fill,
    active: false,
  },
  about: {
    name: 'About',
    icon: RiMailLine,
    active: false,
  },
};

const Navigation: React.FC<NavigationProps> = () => {
  const { toggleColorMode } = useColorMode();

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
      <HStack as="nav" spacing="8">
        {Object.values(mapNavItems).map((li, i) => (
          <Box key={i} _hover={{
            // background: 'colors.grey',
          }}>
            <Icon as={li.icon} >{li.name}</Icon>
          </Box>
        ))}
        <Spacer />
        <Button onClick={toggleColorMode}>Color Mode</Button>
      </HStack>
    </Flex>
  );
};

export default Navigation;
