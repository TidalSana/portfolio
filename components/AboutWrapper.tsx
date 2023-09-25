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
import Skills from './SkillsComponent';

interface AboutWrapperProps {}
interface AboutContentProps {}
type AboutWrapperType = ComponentWithAs<'div', AboutWrapperProps> & {};

const AboutContent: React.FC<AboutContentProps> = () => {
  /** Hooks */
  const oppBg = useColorModeValue('darkMode.color', 'lightMode.color');
  const invertedBg = useColorModeValue('lightMode.color', 'darkMode.color');
  // const textColor = useColorModeValue('brand.lightAccentShade', 'brand.darkAccentShade');
  const darkPurple = useColorModeValue('brand.main', 'lightMode.color');

  /** Animations */
  const bouncingAnimationKeyFrames = keyframes`
  0% { transform: translateY(0px); }
  100% { transform: translateY(7px); }
`;

  const bouncingAnimation = `${bouncingAnimationKeyFrames} 1.5s ease-in-out alternate infinite 1s`;
  const bouncingAnimationOne = `${bouncingAnimationKeyFrames} 1.5s ease-in-out alternate infinite 2s`;
  const bouncingAnimationThree = `${bouncingAnimationKeyFrames} 1.5s ease-in-out alternate infinite 2.5s`;

  /** Render */
  return (
    <>
      {/* Desktop View */}
      <Breakpoint large up>
        <VStack
          p="10"
          w="80vw"
          spacing={8}
          id="AboutContent"
          justifyContent="space-evenly"
          // bg={oppBg}
        >
          {/* About me description section */}
          <HStack spacing={2}
            justifyContent="center"
            gap="4em"
            w="80vw"
            mb="5"
          >
            {/* Text Containers */}
            <VStack
              p="5"
              animation={bouncingAnimation}
              bg={invertedBg}
              spacing={3}
              maxW="500px"
              borderRadius="lg"
            >
              <Text
                as="b"
              // color="brand.darkAccent"
                color={oppBg}
                fontSize="xl"
                noOfLines={3}
              >
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
                color={oppBg}
                fontSize="md"
                noOfLines={9}
              >
                I highly value continuous learning and growth,
                both individually and in collaboration with people, teams, and technologies.
              </Text>

              <Text
                color={oppBg}
                fontSize="md"
                noOfLines={9}
              >
                Currently, I&apos;m a full-stack engineer at
                {' '}
                <a href="https://www.biproxi.com" style={{
                  color: '#b33e69',
                  fontWeight: 'bolder',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
                >
                  Biproxi
                </a>
                , and
                {' '}
                <a href="https://www.officespace.com" style={{
                  color: '#b33e69',
                  fontWeight: 'bolder',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
                >
                  OfficeSpace.
                </a>
                &nbsp;
                I&apos;ve had the opportunity to work collaboratively with the head of engineering,
                and other team members to make significant contributions to both CRE platforms.
              </Text>
            </VStack>

            {/* Photo Icon Container */}
            <Flex
              animation={bouncingAnimationOne}
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
            w="80vw"
            bg={darkPurple}
            justifyContent="center"
            animation={bouncingAnimationThree}
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
                I now primarily work with, and feel most proficient in the following languages,
                and technologies on a daily basis:
              </Text>

              {/* Skills Components */}
              <Skills />
            </VStack>
          </HStack>
        </VStack>
      </Breakpoint>

      {/* Tablet View and smaller */}
      <Breakpoint medium down>
        <VStack
          p="4"
          w="80vw"
          spacing={8}
          id="AboutContentMobile"
          justifyContent="space-evenly"
          // bg={oppBg}
        >
          <VStack
            p="5"
            spacing={3}
            maxW="500px"
            bg={invertedBg}
          >
            <Text
              as="b"
              color="brand.darkAccent"
              // color={textColor}
              fontSize="md"
              noOfLines={5}
            >
              I like my coffee like I like my code - strong, hot, and with no bugs. 😉
            </Text>

            <Text
              color={oppBg}
              fontSize="sm"
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
              color={oppBg}
              fontSize="sm"
              noOfLines={9}
            >
              I highly value continuous learning and growth,
              both individually and in collaboration with people, teams, and technologies.
            </Text>

            <Text
              color={oppBg}
              fontSize="sm"
              noOfLines={9}
            >
              Currently, I&apos;m a full-stack engineer at
              {' '}
              <a href="https://www.biproxi.com" style={{
                color: '#b33e69',
                fontWeight: 'bolder',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              >
                Biproxi
              </a>
              , and
              {' '}
              <a href="https://www.officespace.com" style={{
                color: '#b33e69',
                fontWeight: 'bolder',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              >
                OfficeSpace.
              </a>
              &nbsp;
              I&apos;ve had the opportunity to work collaboratively with the head of engineering,
              and other team members to make significant contributions to both CRE platforms.
            </Text>
          </VStack>

          <Flex
            boxShadow="md"
            boxSize="260px"
            bg={invertedBg}
            alignItems="center"
            borderRadius="full"
            justifyContent="center"
          >
            <Image
              src="/aboutme.jpeg"
              alt="About me profile image"
              objectFit="cover"
              boxSize="250px"
              borderRadius="full"
            />
          </Flex>

          {/* Skills Components */}
          <Skills />
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
      ref={ref}
      id="AboutWrapper"
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
