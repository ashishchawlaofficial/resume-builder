import {
  Box,
  Image,
  Title,
  Text,
  Button,
  Flex,
  Container,
} from "@mantine/core";
import ResumeImg from "../../../assets/img/resume.svg";
import { FiPlus } from "react-icons/fi";

const EmptyList = ({ setOpened }) => {
  return (
    <Flex>
      <Container>
        <Box
          sx={{
            maxWidth: 150,
          }}
          mx="auto"
        >
          <Image src={ResumeImg} alt="Empty Image" />
        </Box>
      </Container>
      <Container>
        <Title order={6} mt={10}>
          No Records Found.
        </Title>
        <Text fz="sm" c="dimmed">
          Looks like you have just started! Start adding your education.
        </Text>
        <Button
          variant="light"
          leftIcon={<FiPlus />}
          mt={20}
          onClick={() => setOpened(true)}
        >
          Add New
        </Button>
      </Container>
    </Flex>
  );
};

export default EmptyList;
