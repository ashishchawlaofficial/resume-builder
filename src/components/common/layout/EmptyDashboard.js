import { Box, Image, Title, Text, Button } from "@mantine/core";
import ResumeImg from "../../../assets/img/resume.svg";
import { FiPlus } from "react-icons/fi";

const EmptyDashboard = ({ init, isLoading }) => {
  return (
    <Box
      component="section"
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Box
          sx={{
            maxWidth: 250,
          }}
          mx="auto"
        >
          <Image src={ResumeImg} alt="Empty Image" />
        </Box>
        <Title order={6} mt={30}>
          No Resume Found.
        </Title>
        <Text fz="sm" c="dimmed">
          Looks like you have just started! Click + to start building your
          resume.
        </Text>
        <Button
          variant="light"
          leftIcon={<FiPlus />}
          mt={20}
          onClick={init}
          loading={isLoading === "pending"}
        >
          Create New
        </Button>
      </Box>
    </Box>
  );
};

export default EmptyDashboard;
