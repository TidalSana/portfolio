import React from 'react';
import {
  Flex,
  Icon,
  Text,
  LinkOverlay,
  LinkBox,
  Link,
} from '@chakra-ui/react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const FooterComponent: React.FC = () => {
  /** Render */
  return (
    <Flex
      p="5"
      fontSize="xs"
      align="center"
      textAlign="center"
      flexDirection="column"
      justifyContent="center"
    >
      <LinkBox>
        <Flex gap="2" p="2">
          {/* Github */}
          <LinkOverlay href="https://github.com/TidalSana">
            <Icon as={AiFillGithub} boxSize={8} />
          </LinkOverlay>

          {/* Linkedin */}
          <LinkOverlay href="https://www.linkedin.com/in/joshua-semana/">
            <Icon as={AiFillLinkedin} boxSize={8} />
          </LinkOverlay>
        </Flex>
      </LinkBox>

      <Text>
        Made with ❤️ by
        {' '}
        <b>Joshua Semana</b>
        {' '}
        © 2023
        {' '}
        -
        {' '}
        <Link href="https://github.com/TidalSana/portfolio" isExternal color="teal.500">
          code
        </Link>
      </Text>
    </Flex>
  );
};

export default FooterComponent;
