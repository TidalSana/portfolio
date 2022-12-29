import {
  Box, Flex, Heading, VStack, Image, keyframes, Text, useColorMode,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface ProfileWrapperProps {}

/** Framer Motion */
const imageKeyFrames = keyframes`
  0%   { opacity: 0; scale: 0; }
  25%  { opacity: 0.7; }
  50%  { opacity: 1; scale: 1 }
`;

const bioAnimationKeyFrames = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const typingKeyFrames = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blinkKeyFrames = keyframes`
  from { border-color: transparent }
  to   { border-color:  '#b33e69'}
`;

const imageAnimation = `${imageKeyFrames} 1s ease-out`;
const headingAnimation = `${bioAnimationKeyFrames} 0.5s ease-in`;
const typingAnimation = `${typingKeyFrames} 1s steps(20, end) forwards, ${blinkKeyFrames} 1s infinite`;

const ProfileWrapper: React.FC<ProfileWrapperProps> = () => {
  const { colorMode } = useColorMode();
  /** Render */
  return (
    <Flex
      className="intro-profile-introduction"
      width="80%"
      justifyContent="center"
      p="1em" m="1em"
      rounded="lg"
      >
      <VStack
        bg={'transparent'}
        className="inner-intro-container"
        align="center"
        pb="1em"
        maxWidth="650px">
        <Flex
          top="80px"
          position="relative"
          justifyContent="center"
          bg="colors.white"
          align="center"
          zIndex={2}
          as={motion.div}
          animation={imageAnimation}
          initial={{ x: -200 }}
          animate={ { x: 0 } }
          transition=".2s ease-out"
          boxSize="270px"
          borderRadius="full"
          boxShadow="dark-lg"
          className="intro-profile-image">
          <Image
            src="/josh.jpeg"
            alt="Joshua Semana"
            objectFit="cover"
            boxSize="250px"
            borderRadius="full"/>
        </Flex>
        <Box
          width="100%"
          className="intro-header-container"
          rounded="lg"
          boxShadow="dark-lg"
          bg={colorMode === 'dark' ? 'lightMode.color' : 'darkMode.color'}
          padding="5em"
          as={motion.div}
          animation={headingAnimation}>
          <Box
            bg="inherit"
            margin="1em"
            display="inline-block">
            <Box
              bg="inherit"
              overflow="hidden"
              animation={typingAnimation}
              whiteSpace="nowrap"
              borderRight=".5em solid #b33e69"
              width="0"
              className="intro-heading-typed-out">
              <Heading
                color={colorMode === 'dark' ? 'brand.darkAccentShade' : 'brand.lightAccentShade'}
                as="h1" size="4xl"
                >
                {"What's up!?"}
              </Heading>
            </Box>
          </Box>
          <Flex
            bg="inherit"
            as={motion.div}
            flexDirection="column"
            pl="1em">
            <Text
              color={colorMode === 'dark' ? 'brand.darkAccentShade' : 'brand.lightAccentShade'}
              as="b"
              fontSize="xl">
              Hafa Adai (Hello)! 🌺
            </Text>
            <Text
              color={colorMode === 'dark' ? 'brand.darkAccentShade' : 'brand.lightAccentShade'}
              noOfLines={4}
              fontSize="md">
              My name is Josh and I&apos;m a Jr. FullStack Engineer from Bozeman, MT.
              I&apos;m constantly working on my craft (code) and design.
              I&apos;m all about eSports, video games, and custom mechanical keyboards.
            </Text>
          </Flex>
        </Box>
      </VStack>
    </Flex>
  );
};

export default ProfileWrapper;
