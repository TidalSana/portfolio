import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Spacer,
  useColorMode,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BsPersonCircle } from 'react-icons/bs';
import { RiHome2Line, RiHardDrive2Fill } from 'react-icons/ri';

interface NavigationProps {
  homeRef?: any;
  projectsRef?: any;
  aboutRef?: any;
}

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
    icon: BsPersonCircle,
    active: false,
  },
};

const Navigation: React.FC<NavigationProps> = ({ homeRef, projectsRef, aboutRef }) => {
  /** ChakraUI */
  const { toggleColorMode } = useColorMode();

  const scrollToWrapper = (e: any, element: string) => {
    e.preventDefault();
    if (element === 'Home') homeRef.current.scrollIntoView({ behaviour: 'smooth' });
    if (element === 'Projects') projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    if (element === 'About') aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  /** Render */
  return (
    <Flex width="80%" justifyContent="center" align="center" py="5" px="6">
      <HStack as="nav" spacing="10">
        {Object.values(mapNavItems).map((li, i) => (
          <Box
            as={motion.div}
            key={i}
            onClick={(e) => scrollToWrapper(e, li.name)}
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
