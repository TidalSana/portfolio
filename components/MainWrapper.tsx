import { VStack } from '@chakra-ui/react';
import AboutWrapper from './AboutWrapper';
import ProfileWrapper from './ProfileWrapper';
import ProjectsWrapper from './ProjectsWrapper';

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  /** Render */
  return (
    <VStack width="100%" align="center" justifyContent="center">
      <ProfileWrapper />
      <ProjectsWrapper />
      <AboutWrapper />
    </VStack>
  );
};

export default Main;
