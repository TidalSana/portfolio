import {
  Grid, Heading, useColorMode, VStack,
} from '@chakra-ui/react';
import { Variants } from 'framer-motion';

interface ProjectsWrapperProps {}

/** Framer Motion */
const projectVariants: Variants = {
  offScreen: {
    // TODO: Figure out animation
    y: 300
  },
};

const ProjectsWrapper: React.FC<ProjectsWrapperProps> = () => {
  const { colorMode } = useColorMode();

  return (
    // <Grid width="100%" bg={colorMode === 'dark' ? 'brand.lightAccentShade' : 'brand.main'}>
    //   test
    // </Grid>
    <VStack width="100%" bg={colorMode === 'dark' ? 'brand.lightAccentShade' : 'brand.main'} spacing="1em">
      <Heading as="h2"color={colorMode === 'dark' ? 'brand.darkAccentShade' : 'brand.lightAccentShade'}>
        Projects
      </Heading>
      <Grid width="80%" bg={colorMode === 'dark' ? 'brand.main' : 'brand.lightAccentShade'} rounded="md">
      </Grid>
    </VStack>
  );
};

export default ProjectsWrapper;
