import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Container,
  Text,
  Title,
  Divider,
  Button,
  Group,
  Drawer,
  useMantineTheme,
  ScrollArea,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import EmptyList from "../../common/layout/EmptyList";
import { isEmptyArray } from "../../common/utils/Functions";
import { FiPlus } from "react-icons/fi";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
import { getProjectsData } from "../../../store/slices/projectsSlice";

const Projects = () => {
  const [opened, setOpened] = useState(false);
  const { data } = useSelector((state) => state.projects);
  const isDataEmpty = isEmptyArray(data);
  const theme = useMantineTheme(); // To Customize the drawer overlay
  const dispatch = useDispatch();
  const { builderID, userID } = useParams();

  const requestUrlChunk = useMemo(() => {
    return {
      builderId: builderID,
      userId: userID,
      endpointKey: "projects",
      isFormData: true,
    };
  }, [builderID, userID]);

  useEffect(() => {
    dispatch(getProjectsData(requestUrlChunk));
  }, [dispatch, requestUrlChunk]);
  console.log("Projects Data: ", data);

  return (
    <>
      <Box>
        {/* Section Title */}
        <Container fluid mb={30}>
          <Group position="apart">
            <Box>
              <Title order={3} size="h4">
                Projects
              </Title>
              <Text color="dimmed" fz="sm">
                List your Projects here.
              </Text>
            </Box>
            {!isDataEmpty && (
              <Box>
                <Button
                  variant="subtle"
                  leftIcon={<FiPlus />}
                  onClick={() => setOpened(true)}
                >
                  Add New
                </Button>
              </Box>
            )}
          </Group>
          <Divider my="xs" color="#f2f2f2" />
        </Container>
        {/* Section Body */}
        <Container fluid>
          <ScrollArea style={{ height: "80vh" }}>
            {isDataEmpty ? (
              <EmptyList setOpened={setOpened} />
            ) : (
              data.map((item, index) => {
                return (
                  <ProjectList
                    key={index}
                    listItem={item}
                    index={index}
                    requestUrlChunk={requestUrlChunk}
                  />
                );
              })
            )}
          </ScrollArea>
        </Container>
      </Box>
      {/* Form Drawer */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add New Project"
        padding="xl"
        size="50%"
        position="right"
        overlayColor={theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        {/* Projects Form */}
        <ProjectForm setDrawer={setOpened} requestUrlChunk={requestUrlChunk} />
      </Drawer>
    </>
  );
};

export default Projects;
