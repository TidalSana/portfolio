import {
  Grid, GridItem, Heading, HStack, Icon, useColorMode, VStack,
} from '@chakra-ui/react';
import { RiCalendarTodoFill } from 'react-icons/ri';
import ProjectCard from './ProjectFolder';

interface ProjectsWrapperProps {}

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
      m="1em"
      justifyContent="center"
      align="center"
      spacing="1em"
      className="project-wrapper-outer-wrapper"
      bg={colorMode === 'dark' ? 'brand.main' : 'brand.lightAccent'}>
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
        p="20px"
        width="80%"
        rounded="md"
        justifyContent="center"
        alignItems="center"
        rowGap="10"
        columnGap="20"
        className="project-grid"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat (5, 1fr)"
        bg={colorMode === 'dark' ? 'brand.main' : 'brand.lightAccent'}
        >
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
