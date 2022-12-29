import {
  Box,
  Flex, Heading, Icon, useColorMode, VStack,
} from '@chakra-ui/react';
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/ai';

interface ProjectCardProps {
  project: string,
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
}) => {
  /** ChakraUi */
  const { colorMode } = useColorMode();

  /** Render */
  return (
    <Flex
      rounded="lg"
      className="project-card-item"
      bg="transparent"
      align="center"
      justifyContent="center"
      flexDirection="column"
      w="100%">
      <VStack bg="transparent">
        <Box
          rounded="2xl"
          boxSize="300px"
          bg={colorMode === 'dark' ? 'brand.lightAccentShade' : 'brand.darkAccentShade'}>
            {/* TODO: Add a swap when hovering */}
          <Icon boxSize="100%" color="brand.darkAccent" as={AiFillFolder}></Icon>
        </Box>
        <Heading
          mb="px"
          color="brand.lightAccentShade"
          as="h4"
          size="sm">
          {project}
        </Heading>
      </VStack>
    </Flex>
  );
};

export default ProjectCard;
