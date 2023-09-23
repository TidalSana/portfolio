import {
  Box,
  Text,
  useColorMode,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaReact } from 'react-icons/fa';
import { SiCircleci } from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';
import { BiLogoTypescript, BiLogoMongodb, BiLogoPostgresql } from 'react-icons/bi';

interface SkillsProps {}
const Skills: React.FC<SkillsProps> = () => {
  const { colorMode } = useColorMode();
  const oppBg = useColorModeValue('brand.main', 'lightMode.color');
  const blackWhiteIcon = useColorModeValue('black', 'white');
  const blackWhiteBg = useColorModeValue('white', 'black');

  const technologies = [
    { name: 'React', icon: <Icon as={FaReact} color="blue.200" boxSize={8} /> },
    { name: 'TypeScript', icon: <Icon as={BiLogoTypescript} color="blue.500" boxSize={8} /> },
    { name: 'Mongo', icon: <Icon as={BiLogoMongodb} color="green.500" boxSize={8} /> },
    { name: 'PostGres', icon: <Icon as={BiLogoPostgresql} color="blue.500" boxSize={8} /> },
    { name: 'NextJs', icon: <Icon as={TbBrandNextjs} color={blackWhiteIcon} backgroundColor={blackWhiteBg} borderRadius="full" boxSize={8} /> },
    { name: 'CircleCi', icon: <Icon as={SiCircleci} color={blackWhiteIcon} backgroundColor={blackWhiteBg} borderRadius="full" boxSize={8} /> },
  ];

  /** Render */
  return (
    <SimpleGrid columns={3} spacing={4}>
      {technologies.map((tech, index) => (
        <Box
          p={4}
          key={index}
          rounded="md"
          boxShadow="sm"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          bg={colorMode === 'dark' ? 'brand.main' : 'brand.lightAccent'}
        >
          {tech.icon}
          <Text
            fontSize="xs"
            color={oppBg}
          >
            {tech.name}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default Skills;
