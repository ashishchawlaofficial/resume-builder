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
import CertificationForm from "./CertificationForm";
import CertificationList from "./CertificationList";
import { getCertificationData } from "../../../store/slices/certificationSlice";

const Certification = () => {
  const [opened, setOpened] = useState(false);
  const { data } = useSelector((state) => state.certification);
  const isDataEmpty = isEmptyArray(data);
  const theme = useMantineTheme(); // To Customize the drawer overlay
  const dispatch = useDispatch();
  const { builderID, userID } = useParams();

  const requestUrlChunk = useMemo(() => {
    return {
      builderId: builderID,
      userId: userID,
      endpointKey: "certification",
      isFormData: true,
    };
  }, [builderID, userID]);

  useEffect(() => {
    dispatch(getCertificationData(requestUrlChunk));
  }, [dispatch, requestUrlChunk]);
  console.log("Certification Data: ", data);

  return (
    <>
      <Box>
        {/* Section Title */}
        <Container fluid mb={30}>
          <Group position="apart">
            <Box>
              <Title order={3} size="h4">
                Awards & Certifications
              </Title>
              <Text color="dimmed" fz="sm">
                List your Awards & Certifications here.
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
                  <CertificationList
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
        title="Add New Record"
        padding="xl"
        size="50%"
        position="right"
        overlayColor={theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        {/* Certifications Form */}
        <CertificationForm
          setDrawer={setOpened}
          requestUrlChunk={requestUrlChunk}
        />
      </Drawer>
    </>
  );
};

export default Certification;
