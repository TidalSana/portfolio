import {
  Box, Flex, Heading, VStack, Image, Text, useColorMode,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Breakpoint } from 'react-socks';
import animations from '../styles/animations';

interface ProfileWrapperProps {}
interface IntroHeaderContainerProps {}

const IntroHeaderContainer: React.FC<IntroHeaderContainerProps> = () => {
  /** ChakraUI */
  const { colorMode } = useColorMode();
  const { headingAnimation, typingAnimation } = animations;

  /** Render */
  return (
    <>
      {/* Desktop View */}
      <Breakpoint large up>
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
      </Breakpoint>
      {/* Tablet View */}
      <Breakpoint medium only>
        <Box
          width="80vw"
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
                as="h1" size="2xl"
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
              fontSize="lg">
              Hafa Adai (Hello)! 🌺
            </Text>
            <Text
              color={colorMode === 'dark' ? 'brand.darkAccentShade' : 'brand.lightAccentShade'}
              noOfLines={5}
              fontSize="md">
              My name is Josh and I&apos;m a Jr. FullStack Engineer from Bozeman, MT.
              I&apos;m constantly working on my craft (code) and design.
              I&apos;m all about eSports, video games, and custom mechanical keyboards.
            </Text>
          </Flex>
        </Box>
      </Breakpoint>
      {/* Phone View */}
      <Breakpoint small down>
        <Box
          width="80vw"
          padding="1.2em"
          bottom="50px"
          rounded="lg"
          boxShadow="dark-lg"
          as={motion.div}
          animation={headingAnimation}
          className="intro-header-container"
          bg={colorMode === 'dark' ? 'lightMode.color' : 'darkMode.color'}
          >
          <Box
            bg="inherit"
            margin="20px"
            display="inline-block">
            <Box
              width="0"
              bg="inherit"
              overflow="hidden"
              whiteSpace="nowrap"
              animation={typingAnimation}
              borderRight=".5em solid #b33e69"
              className="intro-heading-typed-out">
              <Heading
                as="h1"
                size="2xl"
                color={colorMode === 'dark' ? 'brand.darkAccentShade' : 'brand.lightAccentShade'}>
                {"What's up!?"}
              </Heading>
            </Box>
          </Box>
          <Flex
            bg="inherit"
            as={motion.div}
            flexDirection="column">
            <Text
              as="b"
              mb="8px"
              fontSize="lg"
              color={colorMode === 'dark' ? 'brand.darkAccentShade' : 'brand.lightAccentShade'}>
              Hafa Adai (Hello)! 🌺
            </Text>
            <Text
              color={colorMode === 'dark' ? 'brand.darkAccentShade' : 'brand.lightAccentShade'}
              noOfLines={8}
              fontSize="sm">
              My name is Josh and I&apos;m a Jr. FullStack Engineer from Bozeman, MT.
              I&apos;m constantly working on my craft (code) and design.
              I&apos;m all about eSports, video games, and custom mechanical keyboards.
            </Text>
          </Flex>
        </Box>
      </Breakpoint>
    </>
  );
};

const ProfileWrapper: React.FC<ProfileWrapperProps> = () => {
  const { imageAnimation } = animations;

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
        {/* Tablet View and Desktop View */}
        <Breakpoint medium up>
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
        </Breakpoint>
        {/* Mobile view */}
        <Breakpoint small down>
          <Flex
            zIndex={2}
            top="50px"
            align="center"
            bg="colors.white"
            position="relative"
            boxSize="220px"
            boxShadow="dark-lg"
            borderRadius="full"
            justifyContent="center"
            as={motion.div}
            animation={imageAnimation}
            initial={{ x: -200 }}
            animate={ { x: 0 } }
            transition=".2s ease-out"
            className="intro-profile-image">
            <Image
              src="/josh.jpeg"
              alt="Joshua Semana"
              objectFit="cover"
              boxSize="190px"
              borderRadius="full"/>
          </Flex>
        </Breakpoint>
        <IntroHeaderContainer />
      </VStack>
    </Flex>
  );
};

export default ProfileWrapper;
