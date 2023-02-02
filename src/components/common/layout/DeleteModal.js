import {
  Box,
  Modal,
  Image,
  Group,
  Button,
  useMantineTheme,
  Title,
} from "@mantine/core";
import TrashImg from "../../../assets/img/trash.svg";

const DeleteModal = ({ modalOpened, setModalOpened, handleDelete, listId }) => {
  const theme = useMantineTheme(); // To Customize the modal overly

  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      size="sm"
      overlayColor={theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
    >
      <Box pl={30} pr={30}>
        <Box
          sx={{
            maxWidth: 150,
          }}
          mx="auto"
        >
          <Image src={TrashImg} alt="Trash Image" />
        </Box>
        <Title order={4} ta="center" pl={30} pr={30} mt={20}>
          Are you sure you want to delete this record?
        </Title>
        <Group mt={20} position="center">
          <Button
            variant="outline"
            color="gray"
            pl={30}
            pr={30}
            onClick={() => setModalOpened(false)}
          >
            Cancel
          </Button>
          <Button
            color="red"
            pl={30}
            pr={30}
            onClick={() => handleDelete(listId)}
          >
            Delete
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
