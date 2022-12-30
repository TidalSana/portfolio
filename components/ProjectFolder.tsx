import {
  Box,
  Flex, Heading, HStack, Icon, Image, keyframes, useColorMode, VStack,
} from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';
import React from 'react';
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/ai';

interface ProjectCardProps {
  project: string,
}

interface InnerImageContainerProps {
  project: string,
}

const InnerImageContainer: React.FC<InnerImageContainerProps> = ({ project }) => {
  /** State */
  const [openIcon, setOpenIcon] = React.useState(false);

  /** ChakraUI */
  const { colorMode } = useColorMode();

  /** Framer UI */
  const bouncingAnimationKeyFrames = keyframes`
    0% { trasnform: translateY(0px); }
    100%   { transform: translateY(20px); }
  `;

  const bouncingAnimation = `${bouncingAnimationKeyFrames} 1s ease-in-out alternate infinite`;

  const curve = {
    type: 'spring',
    stiffness: 500,
    damping: 30,
  };

  const cardVariants: Variants = {
    intial: {
      zIndex: 9,
      x: 0,
      y: -100,
      rotate: 0,
      opacity: 0,
      scale: 0,
      transition: { ...curve, delay: 2 },
    },

    animate: {
      zIndex: 11,
      x: 300,
      y: -150,
      rotate: 10,
      scale: 1,
      opacity: 1,
      position: 'absolute',
      transition: { ...curve, delay: 0 },
    },
  };

  /** Render */
  return (
    <VStack className="inner-project-card-container" bg="transparent" spacing="1em">
      <Box
        className="project-image-icon-container"
        rounded="lg"
        boxSize="400px"
          >
        <HStack
          className="horizontal-stack-project-folder"
          bg="transparent"
          rounded="xl"
          as={motion.div}
          initial="initial"
          whileHover="animate"
          onMouseEnter={() => setOpenIcon(true)}
          onMouseLeave={() => setOpenIcon(false)}>
          <Icon
            zIndex={10}
            bg="transparent"
            boxSize="100%"
            color="brand.darkAccent"
            as={!openIcon ? AiFillFolder : AiFillFolderOpen}>
          </Icon>
          <Box

            bg="transparent"
            as={motion.div}
            variants={cardVariants}
            className="motion-project-image-div"
            >
            <Image
              animation={bouncingAnimation}
              width="200px"
              height="200px"
              src="/cat.jpg"
              alt="Joshua Semana"
              objectFit="cover"
              borderRadius="xl"/>
          </Box>
        </HStack>
      </Box>
      <Heading
        className="project-header-name"
        pb="12px"
        color={colorMode === 'dark' ? 'brand.lightAccent' : 'brand.lightAccentShade'}
        as="h4"
        size="md">
        {project}
      </Heading>
    </VStack>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
}) => {
  /** ChakraUi */
  const { colorMode } = useColorMode();

  // TODO: ADD OPPSITE COLOR shadow for project, also separate items into components

  /** Render */
  return (
    <Flex
      overflowX="hidden"
      align="center"
      rounded="xl"
      boxShadow={colorMode === 'dark' ? 'dark-lg' : '2xl'}
      justifyContent="center"
      flexDirection="column"
      className="project-card-item"
      bg={colorMode === 'dark' ? 'brand.lightAccentShade' : 'brand.darkAccentShade'}
      w="100%">
      <InnerImageContainer project={project} />
    </Flex>
  );
};

export default ProjectCard;
