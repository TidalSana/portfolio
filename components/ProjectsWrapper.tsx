import { Grid, useColorMode } from '@chakra-ui/react';

interface ProjectsWrapperProps {}

const ProjectsWrapper: React.FC<ProjectsWrapperProps> = () => {
  const { colorMode } = useColorMode();

  return (
    <Grid width="100%" bg={colorMode === 'dark' ? 'brand.lightAccentShade' : 'brand.main'}>
      test
    </Grid>
  );
};

export default ProjectsWrapper;
