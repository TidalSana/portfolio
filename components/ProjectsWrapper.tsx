import {
  Grid, GridItem, Heading, HStack, Icon, useColorMode, VStack,
} from '@chakra-ui/react';
import { Variants } from 'framer-motion';
import { RiCalendarTodoFill } from 'react-icons/ri';
import ProjectCard from './ProjectFolder';

interface ProjectsWrapperProps {}

/** Framer Motion */
const projectVariants: Variants = {
  offScreen: {
    // TODO: Figure out animation
    y: 300,
  },
};

const ProjectsWrapper: React.FC<ProjectsWrapperProps> = () => {
  /** Color Mode config */
  const { colorMode } = useColorMode();
  const gridItemBg = 'transparent';

  /** Render */
  return (
    // <Grid width="100%" bg={colorMode === 'dark' ? 'brand.lightAccentShade' : 'brand.main'}>
    //   test
    // </Grid>
    <VStack
      width="100%"
      bg={colorMode === 'dark' ? 'brand.main' : 'brand.lightAccent'}
      spacing="1em"
      m="1em">
      <HStack m="1em" bg="transparent">
        <Heading
          mr="3px"
          alignSelf="left"
          as="h2"
          size="xl"
          color="brand.lightAccentShade">
          Projects
        </Heading>
        <Icon color="brand.lightAccentShade" boxSize="8" as={RiCalendarTodoFill}></Icon>
      </HStack>
      <Grid
        justifyContent="center"
        alignItems="center"
        width="80%"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat (5, 1fr)"
        bg={colorMode === 'dark' ? 'brand.main' : 'brand.lightAccent'}
        rowGap="10"
        columnGap="10"
        p="20px"
        rounded="md">
        <GridItem rounded="xl" className="grid-item" rowStart={1} colStart={1} colEnd={3} bg={gridItemBg} width="100%">
          <ProjectCard project="Library" />
        </GridItem>
        <GridItem rounded="xl" className="grid-item" rowStart={2} colStart={1} colEnd={3} bg={gridItemBg} width="100%">
          <ProjectCard project="Shopping Cart" />
        </GridItem>

        <GridItem rounded="xl" className="grid-item" rowStart={1} colStart={4} colEnd={6} bg={gridItemBg} width="100%">
          <ProjectCard project="Miyoo Mini Tracker" />
        </GridItem>
        <GridItem rounded="xl" className="grid-item" rowStart={2} colStart={4} colEnd={6} bg={gridItemBg} width="100%">
          <ProjectCard project="BattleShip" />
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default ProjectsWrapper;
