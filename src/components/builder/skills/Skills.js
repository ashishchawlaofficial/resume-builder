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
import SkillsForm from "./SkillsForm";
import SkillsList from "./SkillsList";
import { getSkillsData } from "../../../store/slices/skillsSlice";

const Skills = () => {
  const [opened, setOpened] = useState(false);
  const { data } = useSelector((state) => state.skills);
  const isDataEmpty = isEmptyArray(data);
  const theme = useMantineTheme(); // To Customize the drawer overlay
  const dispatch = useDispatch();
  const { builderID, userID } = useParams();

  const requestUrlChunk = useMemo(() => {
    return {
      builderId: builderID,
      userId: userID,
      endpointKey: "skills",
      isFormData: true,
    };
  }, [builderID, userID]);

  useEffect(() => {
    dispatch(getSkillsData(requestUrlChunk));
  }, [dispatch, requestUrlChunk]);
  console.log("Skills Data: ", data);

  return (
    <>
      <Box>
        {/* Section Title */}
        <Container fluid mb={30}>
          <Group position="apart">
            <Box>
              <Title order={3} size="h4">
                Skills
              </Title>
              <Text color="dimmed" fz="sm">
                You can add your technical, soft or any other type of skills.
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
                  <SkillsList
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
        title="Add Skills"
        padding="xl"
        size="50%"
        position="right"
        overlayColor={theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        {/* Skills Form */}
        <SkillsForm setDrawer={setOpened} requestUrlChunk={requestUrlChunk} />
      </Drawer>
    </>
  );
};

export default Skills;
