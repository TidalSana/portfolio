import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  keyframes,
  Spacer,
  useColorMode,
  // Button,
  // Menu, MenuButton, MenuItem, MenuList,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
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

  const wiggleIconKeyFrames = keyframes`
    0% { transform: rotate(0) }
    25% { transform: rotate(-10deg) }
    75% { transform: rotate(10deg) }
    100% { transform: rotate(0) }
  `;

  const wiggleAnimation = `${wiggleIconKeyFrames} .5s ease-out alternate infinite`;

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
          <Box as={motion.div} whileHover={wiggleAnimation} key={i} _hover={{}}>
            <Icon as={li.icon} >{li.name}</Icon>
          </Box>
        ))}
        <Spacer />
        <Button onClick={(e) => { e.stopPropagation(); toggleColorMode(); }}>Color Mode</Button>
      </HStack>
    </Flex>
  );
};

export default Navigation;
