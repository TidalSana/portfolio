import {
  ComponentWithAs,
  forwardRef,
  Heading, HStack, Icon, VStack,
} from '@chakra-ui/react';
import { BsPersonCircle } from 'react-icons/bs';
import { Breakpoint } from 'react-socks';

interface AboutWrapperProps {}
type AboutWrapperType = ComponentWithAs<'div', AboutWrapperProps> & {};

const AboutWrapper: AboutWrapperType = forwardRef((props, ref) => {
  /** Render */
  return (
    <VStack ref={ref}>
      {/* Desktop View and larger */}
      <Breakpoint large up>
        <HStack m="1em" spacing="1rem">
          <Heading as="h2" size="xl">
            About me
          </Heading>
          <Icon color="" boxSize="8" as={BsPersonCircle}></Icon>
        </HStack>
      </Breakpoint>
    </VStack>
  );
});

export default AboutWrapper;
