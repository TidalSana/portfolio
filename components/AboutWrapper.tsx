import {
  ComponentWithAs,
  Flex,
  forwardRef,
  Heading, HStack, Icon, Image, keyframes, Text, useColorModeValue, VStack,
} from '@chakra-ui/react';
// import { motion } from 'framer-motion';
import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { Breakpoint } from 'react-socks';

interface AboutWrapperProps {}
interface AboutContentProps {}
type AboutWrapperType = ComponentWithAs<'div', AboutWrapperProps> & {};

const AboutContent: React.FC<AboutContentProps> = () => {
  /** Hooks */
  const oppBg = useColorModeValue('darkMode.color', 'lightMode.color');
  const invertedBg = useColorModeValue('lightMode.color', 'darkMode.color');
  const textColor = useColorModeValue('brand.lightAccentShade', 'brand.darkAccentShade');
  const darkPurple = useColorModeValue('brand.main', 'lightMode.color');

  /** Animations */
  const bouncingAnimationKeyFrames = keyframes`
  0% { transform: translateY(0px); }
  100% { transform: translateY(5px); }
`;

  const bouncingAnimation = `${bouncingAnimationKeyFrames} 1s ease-in-out alternate infinite`;

  /** Render */
  return (
    <>
      {/* Desktop View */}
      <Breakpoint large up>

        {/* About me description section */}
        <HStack spacing={2}
          justifyContent="space-evenly"
          w="80vw"
          p="5"
          mb="5"
          // bg={oppBg}
        >
          {/* Text Containers */}
          <VStack
            p="5"
            animation={bouncingAnimation}
            // _hover={{ transform: 'scale(2.0)' }}
            bg={invertedBg}
            spacing={3}
            maxW="500px"
            borderRadius="lg"
            boxShadow="2xl"
            >
            <Text
              as="b"
              // color="brand.darkAccent"
              color={oppBg}
              fontSize="xl"
              noOfLines={3}>
              I like my coffee like I like my code - strong, hot, and with no bugs. 😉
            </Text>

            <Text
              color={oppBg}
              fontSize="md"
            >
              Hey! My name is
              {' '}
              <b>Joshua Semana</b>
              , or
              {' '}
              <b>TidalSana</b>
              {' '}
              online for the cool folks.
            </Text>

            <Text
              color={oppBg }
              fontSize="md"
              noOfLines={9}
            >
              I highly value continuous learning and growth,
              both individually and in collaboration with people, teams, and technologies.
            </Text>

            <Text
              color={oppBg }
              fontSize="md"
              noOfLines={9}
              >
              Currently, I&apos;m a full-stack engineer at
              {' '}
              <a href="www.biproxi.com" style={{
                color: '#b33e69',
                fontWeight: 'bolder',
                textDecoration: 'none',
                cursor: 'pointer',
              }}>
                Biproxi
              </a>
              ,
              I have had the opportunity to work collaboratively with the head of engineering,
              and other team members to make significant contributions to the CRE platform.
            </Text>
          </VStack>

          {/* Photo Icon Container */}
          <Flex
            animation={bouncingAnimation}
            bg={invertedBg}
            alignItems="center"
            justifyContent="center"
            boxSize="270px"
            borderRadius="full"
            boxShadow="2xl"
            >
            <Image
              src="/aboutme.jpeg"
              alt="About me profile image"
              objectFit="cover"
              boxSize="250px"
              borderRadius="full"
              />
          </Flex>
        </HStack>

        <HStack
          animation={bouncingAnimation}
          w="80vw"
          justifyContent="center"
          bg={darkPurple}
        >
          <VStack
            p="5"
            maxW="500px"
            textAlign="left"
            bg={invertedBg}
          >
            <Heading size="lg" color={oppBg}>Skills</Heading>
            <Text noOfLines={5} fontSize="md" color={oppBg}>
              Despite my experience with various languages and platforms in the past,
              I now primarily work with and feel most proficient in the following languages,
              and technologies on a daily basis:
            </Text>
          </VStack>
        </HStack>
      </Breakpoint>

      {/* Tablet View */}
      <Breakpoint medium down>
        <VStack spacing={8}
          justifyContent="space-evenly"
          w="80vw"
          p="10"
          // bg={oppBg}
        >
          <VStack
            p="5"
            spacing={3}
            maxW="500px"
      >
            <Text
              as="b"
              color="brand.darkAccent"
              // color={textColor}
              fontSize="md"
              noOfLines={5}>
              I like my coffee like I like my code - strong, hot, and with no bugs. 😉
            </Text>

            <Text
              color={textColor}
              fontSize="sm"
            >
              Hey! My name is Joshua Semana, or
              {' '}
              <b>TidalSana</b>
              {' '}
              online for the cool folks.
            </Text>

            <Text
              color={textColor}
              fontSize="sm"
              noOfLines={9}
        >
              As a full-stack engineer at Biproxi CRE Platform,
              I have had the opportunity to work collaboratively with the head of engineering,
              and other team members to make significant contributions to the platform.
            </Text>
          </VStack>

          <Flex
            bg={invertedBg}
            alignItems="center"
            justifyContent="center"
            boxSize="260px"
            borderRadius="full"
            boxShadow="md"
      >
            <Image
              src="/aboutme.jpeg"
              alt="About me profile image"
              objectFit="cover"
              boxSize="250px"
              borderRadius="full"
      />
          </Flex>
        </VStack>
      </Breakpoint>
    </>
  );
};

const AboutWrapper: AboutWrapperType = forwardRef((props, ref) => {
  const darkPurple = useColorModeValue('brand.main', 'lightMode.color');
  const textColor = useColorModeValue('brand.lightAccentShade', 'brand.darkAccentShade');

  /** Render */
  return (
    <VStack
      id="AboutWrapper"
      ref={ref}
      // w="80vw"
      h="100vh"
      bg={darkPurple}
    >
      {/* Desktop View and larger */}
      <Breakpoint large up>
        <HStack m="1em" spacing="1rem">
          <Heading as="h2" size="xl" color={textColor}>
            About me
          </Heading>
          <Icon color={textColor} boxSize="8" as={BsPersonCircle}></Icon>
        </HStack>
      </Breakpoint>

      {/* Tablet view and smaller */}
      <Breakpoint medium down>
        <HStack m="1em" spacing="1rem">
          <Heading as="h2" size="lg" color={textColor}>
            About me
          </Heading>
          <Icon color={textColor} boxSize="8" as={BsPersonCircle}></Icon>
        </HStack>
      </Breakpoint>

      {/* Content - About Me */}
      <AboutContent />
    </VStack>
  );
});

export default AboutWrapper;
