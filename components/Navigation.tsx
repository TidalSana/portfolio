import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  keyframes,
  Spacer,
  useColorMode,
} from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';
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
  /** ChakraUI */
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
    <Flex width="80%" justifyContent="center" align="center" py="5" px="6">
      <HStack as="nav" spacing="10">
        {Object.values(mapNavItems).map((li, i) => (
          <Box
            as={motion.div}
            key={i}
            whileHover={{ cursor: 'pointer', scale: 1.2 }}
            >
            <Icon as={li.icon}>{li.name}</Icon>
          </Box>
        ))}
        <Spacer />
        <Button onClick={(e) => { e.stopPropagation(); toggleColorMode(); }}>Color Mode</Button>
      </HStack>
    </Flex>
  );
};

export default Navigation;
