import { Box, Container, Text, Title, Divider } from "@mantine/core";
import PersonalForm from "./PersonalForm";

const Personal = () => {
  return (
    <Box>
      <Container fluid mb={30}>
        <Title order={3} size="h4">
          Personal Information
        </Title>
        <Text color="dimmed" fz="sm">
          This section requires you to fill all the required personal details.
        </Text>
        <Divider my="xs" color="#f2f2f2" />
      </Container>
      <Container fluid>
        <PersonalForm />
      </Container>
    </Box>
  );
};

export default Personal;
