import { Box, Container, Text, Title, Divider } from "@mantine/core";
import MiscForm from "./MiscForm";

const Misc = () => {
  return (
    <Box>
      <Container fluid mb={30}>
        <Title order={3} size="h4">
          Miscellaneous
        </Title>
        <Text color="dimmed" fz="sm">
          Add your preferred languages, interests and social links.
        </Text>
        <Divider my="xs" color="#f2f2f2" />
      </Container>
      <Container fluid>
        <MiscForm />
      </Container>
    </Box>
  );
};

export default Misc;
