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
import { RefObject } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { RiHome2Line, RiHardDrive2Fill } from 'react-icons/ri';

interface NavigationProps {
  homeRef?: RefObject<HTMLDivElement | null>;
  projectsRef?: RefObject<HTMLDivElement | null>;
  aboutRef?: RefObject<HTMLDivElement | null>;
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
    if (element === 'Home' && homeRef !== undefined && homeRef.current !== null) homeRef.current.scrollIntoView({ behavior: 'smooth' });
    if (element === 'Projects' && projectsRef !== undefined && projectsRef.current !== null) projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    if (element === 'About' && aboutRef !== undefined && aboutRef.current !== null) aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  /** Render */
  return (
    <Flex width="80%" justifyContent="center" align="center" py="5" px="6">
      <HStack as="nav" spacing="10" alignItems="center" justifyContent="center">
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
