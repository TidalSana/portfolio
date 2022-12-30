import {
  Grid, GridItem, Heading, HStack, Icon, useColorMode, VStack,
} from '@chakra-ui/react';
import { RiCalendarTodoFill } from 'react-icons/ri';
import { Breakpoint } from 'react-socks';
import ProjectCard from './ProjectFolder';

interface ProjectsWrapperProps {}
interface ProjectGridProps {}

const ProjectGrid: React.FC<ProjectGridProps> = () => {
  const { colorMode } = useColorMode();
  const gridItemBg = 'transparent';

  /** Render */
  return (
    <>
      {/* Desktop View */}
      <Breakpoint large up>
        <Grid
          p="20px"
          justifyContent="center"
          alignItems="center"
          rowGap="10"
          columnGap="20"
          className="project-grid"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat (5, 1fr)"
          bg={colorMode === 'dark' ? 'brand.main' : 'brand.lightAccent'}>
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
      </Breakpoint>
      {/* Tablet View */}
      <Breakpoint medium only>
        <Grid
          width="100vw"
          justifyContent="center"
          alignItems="center"
          rowGap="10"
          columnGap="20"
          className="project-grid"
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat (1, 1fr)"
          bg={colorMode === 'dark' ? 'brand.main' : 'brand.lightAccent'}>
          <GridItem rounded="xl" className="grid-item" rowStart={1} colStart={1} bg={gridItemBg} width="100%">
            <ProjectCard project="Library" />
          </GridItem>
          <GridItem rounded="xl" className="grid-item" rowStart={2} colStart={1} bg={gridItemBg} width="100%">
            <ProjectCard project="Shopping Cart" />
          </GridItem>
          <GridItem rounded="xl" className="grid-item" rowStart={3} colStart={1} bg={gridItemBg} width="100%">
            <ProjectCard project="Miyoo Mini Tracker" />
          </GridItem>
          <GridItem rounded="xl" className="grid-item" rowStart={4} colStart={1} bg={gridItemBg} width="100%">
            <ProjectCard project="BattleShip" />
          </GridItem>
        </Grid>
      </Breakpoint>
      {/* Phone View */}
      <Breakpoint small down>
        <Grid
          width="100vw"
          justifyContent="center"
          alignItems="center"
          rowGap="10"
          columnGap="20"
          className="project-grid"
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat (1, 1fr)"
          bg={colorMode === 'dark' ? 'brand.main' : 'brand.lightAccent'}>
          <GridItem rounded="xl" className="grid-item" rowStart={1} colStart={1} bg={gridItemBg} width="100%">
            <ProjectCard project="Library" />
          </GridItem>
          <GridItem rounded="xl" className="grid-item" rowStart={2} colStart={1} bg={gridItemBg} width="100%">
            <ProjectCard project="Shopping Cart" />
          </GridItem>
          <GridItem rounded="xl" className="grid-item" rowStart={3} colStart={1} bg={gridItemBg} width="100%">
            <ProjectCard project="Miyoo Mini Tracker" />
          </GridItem>
          <GridItem rounded="xl" className="grid-item" rowStart={4} colStart={1} bg={gridItemBg} width="100%">
            <ProjectCard project="BattleShip" />
          </GridItem>
        </Grid>
      </Breakpoint>
    </>
  );
};

const ProjectsWrapper: React.FC<ProjectsWrapperProps> = () => {
  /** ChakraUI */
  const { colorMode } = useColorMode();

  /** Render */
  return (
    <VStack
      m="1em"
      width="100%"
      align="center"
      spacing="1em"
      justifyContent="center"
      className="project-wrapper-outer-wrapper"
      rounded="none"
      bg={colorMode === 'dark' ? 'brand.main' : 'brand.lightAccent'}>
      {/* Desktop view and bigger */}
      <Breakpoint large up>
        <HStack m="1em" bg="transparent">
          <Heading
            mr="3px"
            as="h2"
            size="xl"
            alignSelf="left"
            color="brand.lightAccentShade">
            Projects
          </Heading>
          <Icon color="brand.lightAccentShade" boxSize="8" as={RiCalendarTodoFill}></Icon>
        </HStack>
      </Breakpoint>
      {/* Tablet view and smaller */}
      <Breakpoint medium down>
        <HStack m="5em" bg="transparent">
          <Heading
            mr="3px"
            as="h2"
            size="xl"
            color="brand.lightAccentShade">
            Projects
          </Heading>
          <Icon color="brand.lightAccentShade" boxSize="8" as={RiCalendarTodoFill}></Icon>
        </HStack>
      </Breakpoint>
      <ProjectGrid />
    </VStack>
  );
};

export default ProjectsWrapper;
