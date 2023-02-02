import {
  Box,
  Grid,
  Container,
  Group,
  Text,
  Title,
  Button,
  Divider,
} from "@mantine/core";
import ResumeCard from "../ui/ResumeCard";
import TemplateImage from "../../assets/img/resume_template01.jpg";
import { BsPlusCircleFill } from "react-icons/bs";

const FilledDashboard = ({ data, userId }) => {
  return (
    <Box component="section" sx={{ margin: "50px 50px 0" }}>
      <Container fluid mb={30}>
        <Group position="apart">
          <Box>
            <Title order={3} size="h4">
              My Resumes
            </Title>
            <Text color="dimmed" fz="sm">
              Create a tailored resume for each job application. Double your
              changes of getting hired!
            </Text>
          </Box>
          <Box>
            <Button
              variant="subtle"
              leftIcon={<BsPlusCircleFill />}
              // onClick={() => setOpened(true)}
            >
              Add New
            </Button>
          </Box>
        </Group>
        <Divider my="xs" color="#f2f2f2" />
      </Container>
      <Container fluid>
        <Grid
          justify="flex-start"
          gutter={2}
          gutterXs="md"
          gutterMd="xl"
          gutterXl={20}
        >
          {data.map((item, index) => {
            const link = `/build/edit/${item[1]}/${userId}`;
            return (
              <Grid.Col span={2} key={index}>
                <ResumeCard
                  link={link}
                  title="Ashish Resume 2023"
                  author="Ashish"
                  image={TemplateImage}
                />
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default FilledDashboard;
