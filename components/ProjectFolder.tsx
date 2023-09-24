import {
  Box,
  Flex, Heading, HStack, Icon, Image, keyframes, useColorMode, useColorModeValue, VStack,
} from '@chakra-ui/react';
import { motion, useInView, Variants } from 'framer-motion';
import React from 'react';
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/ai';
import { Breakpoint } from 'react-socks';

interface ProjectCardProps {
  project: string,
}

interface InnerImageContainerProps {
  project: string,
}

const InnerImageContainer: React.FC<InnerImageContainerProps> = ({ project }) => {
  /** State */
  const [openIcon, setOpenIcon] = React.useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  /** ChakraUI */
  const { colorMode } = useColorMode();
  const headingColor = useColorModeValue('brand.lightAccentShade', 'brand.darkAccentShade');

  /** Framer UI */
  const bouncingAnimationKeyFrames = keyframes`
    0% { transform: translateY(0px); }
    100%   { transform: translateY(20px); }
  `;
  const bouncingBaitAnimationKeyFrames = keyframes`
    0%  { transform: translateY(0px); }
    50% { transform: translateY(10px); }
    75% { transform: translateY(0px); }
    100% { transform: translateY(10px); }
  `;

  const bouncingAnimation = `${bouncingAnimationKeyFrames} 1s ease-in-out alternate infinite`;
  const bouncingBaitAnimation = `${bouncingBaitAnimationKeyFrames} 2.4s ease-out alternate infinite`;

  const curve = {
    type: 'spring',
    stiffness: 500,
    damping: 50,
  };

  const cardVariants: Variants = {
    /** Tablet view and above */
    initial: {
      zIndex: 8,
      x: 50,
      y: -10,
      rotate: -20,
      scale: 0.7,
      transition: { ...curve, delay: 2 },
    },
    animate: {
      zIndex: 10,
      x: 200,
      y: -150,
      rotate: 10,
      scale: 1,
      position: 'absolute',
      transition: { ...curve, delay: 0 },
    },

    /** Mobile View */
    initialMobile: {
      zIndex: 9,
      x: -150,
      y: -100,
      rotate: 0,
      opacity: 0,
      scale: 0,
      transition: { ...curve, delay: 2 },
    },
    animateMobile: {
      zIndex: 11,
      x: 150,
      y: -130,
      rotate: 10,
      scale: 1,
      opacity: 1,
      position: 'absolute',
      transition: { ...curve, delay: 0 },
    },
  };

  /** Render */
  return (
    <VStack
      p=".4em"
      // w="80vw"
      spacing="1em"
      boxShadow="dark-lg"
      className="inner-project-card-container"
      bg={colorMode === 'dark' ? 'brand.lightAccentShade' : 'brand.darkAccentShade'}
    >
      {/* Desktop View and up */}
      <Breakpoint large up>
        <Box
          bgGradient={colorMode === 'dark' ? 'radial(brand.main, brand.darkAccentShade)' : 'radial(brand.darkAccentShade, brand.main)' }
          className="project-image-icon-container"
          rounded="3xl"
          boxSize="300px"
        >
          <HStack
            bg="transparent"
            as={motion.div}
            initial="initial"
            whileHover="animate"
            onMouseEnter={() => setOpenIcon(true)}
            onMouseLeave={() => setOpenIcon(false)}
            className="horizontal-stack-project-folder"
          >
            <Icon
              zIndex={9}
              boxSize="100%"
              bg="transparent"
              color="brand.darkAccent"
              as={!openIcon ? AiFillFolder : AiFillFolderOpen}
            >
            </Icon>
            <Box
              position="absolute"
              bg="transparent"
              as={motion.div}
              variants={cardVariants}
              className="motion-project-image-div"
            >
              <Image
                animation={openIcon ? bouncingAnimation : bouncingBaitAnimation}
                width="200px"
                height="200px"
                src="/cat.jpg"
                alt="Joshua Semana"
                objectFit="cover"
                borderRadius="xl"
                _hover={{
                  cursor: 'pointer',
                }}
              />
            </Box>
          </HStack>
        </Box>
      </Breakpoint>
      {/* Tablet view and smaller */}
      <Breakpoint medium only>
        <Box
          bgGradient={colorMode === 'dark' ? 'radial(brand.main, brand.darkAccentShade)' : 'radial(brand.darkAccentShade, brand.main)' }
          className="project-image-icon-container"
          rounded="3xl"
          boxSize="400px"
        >
          <HStack
            bg="transparent"
            as={motion.div}
            initial="initial"
            whileInView="animate"
            ref={ref}
            className="horizontal-stack-project-folder"
          >
            <Icon
              zIndex={10}
              boxSize="100%"
              bg="transparent"
              color="brand.darkAccent"
              as={!isInView ? AiFillFolder : AiFillFolderOpen}
            >
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
                borderRadius="xl"
                _hover={{
                  cursor: 'pointer',
                }}
              />
            </Box>
          </HStack>
        </Box>
      </Breakpoint>
      {/* Mobiile view and smaller */}
      <Breakpoint small down>
        <Box
          bgGradient={colorMode === 'dark' ? 'radial(brand.main, brand.darkAccentShade)' : 'radial(brand.darkAccentShade, brand.main)' }
          className="project-image-icon-container"
          rounded="3xl"
          boxSize="200px"
        >
          <HStack
            bg="transparent"
            as={motion.div}
            initial="initialMobile"
            whileInView="animateMobile"
            ref={ref}
            className="horizontal-stack-project-folder"
          >
            <Icon
              zIndex={10}
              boxSize="100%"
              bg="transparent"
              color="brand.darkAccent"
              as={!isInView ? AiFillFolder : AiFillFolderOpen}
            >
            </Icon>
            <Box
              bg="transparent"
              as={motion.div}
              variants={cardVariants}
              className="motion-project-image-div"
            >
              <Image
                animation={bouncingAnimation}
                width="120px"
                height="120px"
                src="/cat.jpg"
                alt="Joshua Semana"
                objectFit="cover"
                borderRadius="xl"
              />
            </Box>
          </HStack>
        </Box>
      </Breakpoint>
      <Heading
        as="h4"
        pb="12px"
        size="md"
        className="project-header-name"
        color={headingColor}
      >
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

  /** Render */
  return (
    <Flex
      w="100%"
      align="center"
      rounded="2xl"
      overflowX="hidden"
      flexDirection="column"
      justifyContent="center"
      className="project-card-item"
      boxShadow={colorMode === 'dark' ? 'dark-lg' : '2xl'}
    >
      <InnerImageContainer project={project} />
    </Flex>
  );
};

export default ProjectCard;
