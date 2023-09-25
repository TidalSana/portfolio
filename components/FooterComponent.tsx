import React, { MouseEventHandler } from 'react';
import {
  Flex,
  Icon,
  Text,
  LinkOverlay,
  LinkBox,
  Link,
  Image,
} from '@chakra-ui/react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

interface FooterComponentProps {
  scrollToHome: MouseEventHandler<HTMLParagraphElement>
}
const FooterComponent: React.FC<FooterComponentProps> = ({
  scrollToHome,
}) => {
  /** Render */
  return (
    <Flex
      p="5"
      gap="3"
      fontSize="xs"
      align="center"
      textAlign="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Text
        fontSize="sm"
        color="teal.500"
        onClick={scrollToHome}
        _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
      >
        back to the top
      </Text>

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

      {/* Logo */}
      <Image src="/js-logo.svg" alt="logo" boxSize="50px" borderRadius="full" />

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
