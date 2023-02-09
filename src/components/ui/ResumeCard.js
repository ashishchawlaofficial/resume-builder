import {
  BsTrash,
  BsDownload,
  BsThreeDots,
  BsPencil,
  BsTextareaT,
} from "react-icons/bs";
import {
  Menu,
  createStyles,
  ActionIcon,
  Group,
  Box,
  Paper,
  Title,
  Flex,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";

const useStyles = createStyles((_params) => {
  return {
    card: {
      height: 270,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      backgroundSize: "cover",
      transition: "0.3s transform ease",
      [`&:hover`]: {
        transform: "scale(1.03)",
      },
    },

    title: {
      fontWeight: 600,
      color: "black",
      lineHeight: 1.2,
      fontSize: 15,
    },
  };
});

function ResumeCard({ image, title, link }) {
  const { classes } = useStyles();

  return (
    <Box>
      <Title order={3} className={classes.title} mb={10}>
        {title}
      </Title>
      <Paper
        withBorder
        p="xl"
        radius="md"
        sx={{ backgroundImage: `url(${image})` }}
        className={classes.card}
        component="a"
        href={link}
      ></Paper>
      <Group position="apart" mt={10}>
        <Stack>
          <Text fz="xs" c="dimmed">
            Created: 03 Feb, 2023
          </Text>
        </Stack>

        <Flex>
          <Menu shadow="md" width={200} withArrow>
            <Menu.Target>
              <Tooltip label="Actions" color="dark" position="top" withArrow>
                <ActionIcon color="blue">
                  <BsThreeDots size={20} />
                </ActionIcon>
              </Tooltip>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Actions</Menu.Label>
              <Menu.Item icon={<BsTextareaT size={14} />}>Edit Title</Menu.Item>
              <Menu.Item icon={<BsPencil size={14} />}>Edit Resume</Menu.Item>
              <Menu.Item color="red" icon={<BsTrash size={14} />}>
                Delete
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Download</Menu.Label>
              <Menu.Item icon={<BsDownload size={14} />}>
                Download as PDF
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Group>
    </Box>
  );
}

export default ResumeCard;
