import { VStack } from '@chakra-ui/react';
import { RefObject } from 'react';
import AboutWrapper from './AboutWrapper';
import ProfileWrapper from './ProfileWrapper';
import ProjectsWrapper from './ProjectsWrapper';

interface MainProps {
  homeRef: RefObject<HTMLDivElement>;
  projectsRef: RefObject<HTMLDivElement>;
  aboutRef: RefObject<HTMLDivElement>;
}

const Main: React.FC<MainProps> = ({
  homeRef,
  projectsRef,
  aboutRef,
}) => {
  /** Render */
  return (
    <VStack width="100%" align="center" justifyContent="center">
      <ProfileWrapper ref={homeRef} />
      <ProjectsWrapper ref={projectsRef} />
      <AboutWrapper ref={aboutRef} />
    </VStack>
  );
};

export default Main;
