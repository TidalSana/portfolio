import {
  ComponentWithAs,
  forwardRef,
  Grid, GridItem, Heading, HStack, Icon, useColorMode, VStack,
} from '@chakra-ui/react';
import { RiCalendarTodoFill } from 'react-icons/ri';
import { Breakpoint } from 'react-socks';
import ProjectCard from './ProjectFolder';

interface ProjectsWrapperProps {}
interface ProjectGridProps {}

type ProjectsWrapperType = ComponentWithAs<'div', ProjectsWrapperProps> & {};

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
          className="project-grid"
          templateRows="1fr"
          templateColumns="1fr"
          bg={colorMode === 'dark' ? 'brand.main' : 'brand.lightAccent'}
        >
          <GridItem rounded="xl" className="grid-item" bg={gridItemBg} width="100%">
            <ProjectCard
              project="ExtrasOnly"
              description="A global keycap extras registry solving the 'browser tab fatigue' of hunting across dozens of vendor sites. Features an idempotent TypeScript scraping pipeline aggregating Shopify data, a custom 4-gate classification algorithm integrated with Claude 4.5 Haiku API for intelligent product categorization, and full-stack implementation from Prisma to Next.js."
              image="/extrasonly-screenshot-1.png"
              link="https://github.com/TidalSana/extras-only"
            />
          </GridItem>
        </Grid>
      </Breakpoint>
      {/* Tablet View */}
      <Breakpoint medium only>
        <Grid
          p="1em"
          width="100vw"
          justifyContent="center"
          alignItems="center"
          className="project-grid"
          templateRows="1fr"
          templateColumns="1fr"
          bg={colorMode === 'dark' ? 'brand.main' : 'brand.lightAccent'}
        >
          <GridItem rounded="xl" className="grid-item" bg={gridItemBg} width="100%">
            <ProjectCard
              project="ExtrasOnly"
              description="A global keycap extras registry solving the 'browser tab fatigue' of hunting across dozens of vendor sites. Features an idempotent TypeScript scraping pipeline aggregating Shopify data, a custom 4-gate classification algorithm integrated with Claude 4.5 Haiku API for intelligent product categorization, and full-stack implementation from Prisma to Next.js."
              image="/extrasonly-screenshot-1.png"
              link="https://github.com/TidalSana/extras-only"
            />
          </GridItem>
        </Grid>
      </Breakpoint>
      {/* Phone View */}
      <Breakpoint small down>
        <Grid
          p="1em"
          width="100vw"
          justifyContent="center"
          alignItems="center"
          className="project-grid"
          templateRows="1fr"
          templateColumns="1fr"
          bg={colorMode === 'dark' ? 'brand.main' : 'brand.lightAccent'}
        >
          <GridItem rounded="xl" className="grid-item" bg={gridItemBg} width="100%">
            <ProjectCard
              project="ExtrasOnly"
              description="A global keycap extras registry solving the 'browser tab fatigue' of hunting across dozens of vendor sites. Features an idempotent TypeScript scraping pipeline aggregating Shopify data, a custom 4-gate classification algorithm integrated with Claude 4.5 Haiku API for intelligent product categorization, and full-stack implementation from Prisma to Next.js."
              image="/extrasonly-screenshot-1.png"
              link="https://github.com/TidalSana/extras-only"
            />
          </GridItem>
        </Grid>
      </Breakpoint>
    </>
  );
};

const ProjectsWrapper: ProjectsWrapperType = forwardRef((props, ref) => {
  /** ChakraUI */
  const { colorMode } = useColorMode();

  /** Render */
  return (
    <VStack
      ref={ref}
      m="1em"
      p="2em"
      width="100%"
      align="center"
      spacing="1em"
      rounded="none"
      justifyContent="center"
      className="project-wrapper-outer-wrapper"
      bg={colorMode === 'dark' ? 'brand.main' : 'brand.lightAccent'}
    >
      {/* Desktop view and bigger */}
      <Breakpoint large up>
        <HStack m="1em" spacing="1rem" bg="transparent">
          <Heading
            mr="3px"
            as="h2"
            size="xl"
            alignSelf="left"
            color="brand.lightAccentShade"
          >
            Projects
          </Heading>
          <Icon color="brand.lightAccentShade" boxSize="8" as={RiCalendarTodoFill} />
        </HStack>
      </Breakpoint>
      {/* Tablet view and smaller */}
      <Breakpoint medium down>
        <HStack m="1em" spacing=".2rem" bg="transparent">
          <Heading
            mr="3px"
            as="h2"
            size="xl"
            color="brand.lightAccentShade"
          >
            Projects
          </Heading>
          <Icon color="brand.lightAccentShade" boxSize="8" as={RiCalendarTodoFill} />
        </HStack>
      </Breakpoint>

      {/* Content - Project List */}
      <ProjectGrid />
    </VStack>
  );
});

export default ProjectsWrapper;
