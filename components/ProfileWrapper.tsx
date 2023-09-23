import {
  Box, Flex, Heading, VStack,
  Image, Text, useColorModeValue,
  forwardRef,
  ComponentWithAs,
  // useColorModeValue,
} from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';
import React from 'react';
import { Breakpoint } from 'react-socks';
import animations from '../styles/animations';

interface IntroHeaderContainerProps {}

const IntroHeaderContainer: React.FC<IntroHeaderContainerProps> = () => {
  /** ChakraUI */
  const oppBg = useColorModeValue('darkMode.color', 'lightMode.color');
  const textColor = useColorModeValue('brand.lightAccentShade', 'brand.darkAccentShade');
  const hOneColor = useColorModeValue('brand.lightAccentShade', 'brand.darkAccentShade');

  /** FramerUI */
  const { headingAnimation, typingAnimation } = animations;

  // !! FINISH LINING UP PROFILE WRAPPER!!

  /** Render */
  return (
    <>
      {/* Desktop View */}
      <Breakpoint large up>
        <Box
          bg={oppBg}
          width="100%"
          className="intro-header-container"
          rounded="lg"
          boxShadow="dark-lg"
          padding="5em"
          as={motion.div}
          animation={headingAnimation}
        >
          <Box
            bg="inherit"
            margin="1em"
            display="inline-block"
          >
            <Box
              bg="inherit"
              overflow="hidden"
              animation={typingAnimation}
              whiteSpace="nowrap"
              borderRight=".5em solid #b33e69"
              width="0"
              rounded="none"
              className="intro-heading-typed-out"
            >
              <Heading
                color={hOneColor}
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
            pl="1em"
          >
            <Text
              as="b"
              mb="15px"
              fontSize="xl"
              color="brand.darkAccent"
            >
              Hafa Adai (Hello)! 🌺
            </Text>
            <Text
              noOfLines={5}
              fontSize="md"
              color={textColor}
            >
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
          rounded="lg"
          boxShadow="dark-lg"
          padding="5em"
          as={motion.div}
          animation={headingAnimation}
          className="intro-header-container"
          bg={oppBg}
        >
          <Box
            bg="inherit"
            display="inline-block"
          >
            <Box
              width="0"
              bg="inherit"
              overflow="hidden"
              animation={typingAnimation}
              whiteSpace="nowrap"
              rounded="none"
              borderRight=".2em solid #b33e69"
              className="intro-heading-typed-out"
            >
              <Heading
                as="h1"
                mb="8px"
                size="2xl"
                color={hOneColor}
              >
                {"What's up!?"}
              </Heading>
            </Box>
          </Box>
          <Flex
            textAlign="left"
            bg="inherit"
            as={motion.div}
            flexDirection="column"
          >
            <Text
              as="b"
              mb="10px"
              color="brand.darkAccent"
              fontSize="lg"
            >
              Hafa Adai (Hello)! 🌺
            </Text>
            <Text
              color={textColor}
              noOfLines={5}
              fontSize="md"
            >
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
          bg={oppBg}
        >
          <Box
            bg="inherit"
            margin="20px"
            display="inline-block"
          >
            <Box
              width="0"
              bg="inherit"
              overflow="hidden"
              whiteSpace="nowrap"
              rounded="none"
              animation={typingAnimation}
              borderRight=".2em solid #b33e69"
              className="intro-heading-typed-out"
            >
              <Heading
                as="h1"
                size="2xl"
                color={textColor}
              >
                {"What's up!?"}
              </Heading>
            </Box>
          </Box>
          <Flex
            bg="inherit"
            as={motion.div}
            flexDirection="column"
          >
            <Text
              as="b"
              mb="8px"
              fontSize="lg"
              color="brand.darkAccent"
            >
              Hafa Adai (Hello)! 🌺
            </Text>
            <Text
              noOfLines={8}
              fontSize="sm"
              color={textColor}
            >
              My name is Josh and I&apos;m a Jr. FullStack Engineer in Bozeman, MT.
              I&apos;m constantly working on my craft (code) and design.
              I&apos;m all about eSports, video games, and custom mechanical keyboards.
            </Text>
          </Flex>
        </Box>
      </Breakpoint>
    </>
  );
};

interface ProfileWrapperProps {
  ref?: any;
}

type ProfileWrapperType = ComponentWithAs<'div', ProfileWrapperProps> & {};

const ProfileWrapper: ProfileWrapperType = forwardRef((props, ref) => {
  /** ChakraUI */
  const bg = useColorModeValue('lightMode.color', 'darkMode.color');

  /** Framer */
  const curve = {
    type: 'spring',
    stiffness: 500,
    damping: 50,
  };

  const profileBannerVariant: Variants = {
    initial: {
      x: -200,
      opacity: 0,
      scale: 0,
      transition: { ...curve, delay: 1 },
    },
    initialMobile: {
      x: -60,
      opacity: 0,
      scale: 0,
      transition: { ...curve, delay: 1 },
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { ...curve, delay: 0 },
    },
  };

  /** Render */
  return (
    <Flex
      ref={ref}
      p="1em"
      m="1em"
      width="80%"
      height="91vh"
      rounded="lg"
      justifyContent="center"
      className="intro-profile-introduction"
    >
      <VStack
        bg={'transparent'}
        className="inner-intro-container"
        align="center"
        pb="1em"
        maxWidth="650px"
      >
        {/* Tablet View and Desktop View */}
        <Breakpoint medium up>
          <Flex
            zIndex={2}
            top="80px"
            align="center"
            bg={bg}
            position="relative"
            boxSize="270px"
            boxShadow="dark-lg"
            borderRadius="full"
            justifyContent="center"
            as={motion.div}
            variants={profileBannerVariant}
            initial="initial"
            whileInView="animate"
            transition=".2s ease-out"
            className="intro-profile-image"
          >
            <Image
              src="/josh.jpeg"
              alt="Joshua Semana"
              objectFit="cover"
              boxSize="250px"
              borderRadius="full"
            />
          </Flex>
        </Breakpoint>
        {/* Mobile view */}
        <Breakpoint small down>
          <Flex
            zIndex={2}
            top="50px"
            align="center"
            bg={bg}
            position="relative"
            boxSize="205px"
            boxShadow="2xl"
            borderRadius="full"
            justifyContent="center"
            as={motion.div}
            variants={profileBannerVariant}
            initial="initialMobile"
            whileInView="animate"
            transition=".2s ease-out"
            className="intro-profile-image"
          >
            <Image
              src="/josh.jpeg"
              alt="Joshua Semana"
              objectFit="cover"
              boxSize="190px"
              borderRadius="full"
            />
          </Flex>
        </Breakpoint>
        <IntroHeaderContainer />
      </VStack>
    </Flex>
  );
});

ProfileWrapper.displayName = 'ProfileWrapper';

export default ProfileWrapper;
