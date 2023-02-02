import { useState } from "react";
import {
  Box,
  Flex,
  Paper,
  Text,
  Title,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteSkillsRecord } from "../../../store/slices/skillsSlice";
import DeleteModal from "../../common/layout/DeleteModal";

const SkillsList = ({ listItem, index, requestUrlChunk }) => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteSkillsRecord(requestUrlChunk, id));
    console.log("Delete initiated");
  };

  return (
    <>
      <Box key={index}>
        <Paper p="md" withBorder mb={20}>
          <Flex position="apart">
            {/* List Section */}
            <Box sx={{ width: "85%" }}>
              <Title order={3} size="h4">
                {listItem?.skillTitle}
              </Title>
              <ul className="skills">
                {listItem.skills.map((item) => {
                  return (
                    <li key={item.key}>
                      <Text c="dimmed" fz="sm" key={item.key}>
                        <strong>{item?.name}</strong>{" "}
                        <span>{item?.rating}/5</span>
                      </Text>
                    </li>
                  );
                })}
              </ul>
            </Box>

            {/* Action Icons */}
            <Box sx={{ width: "15%" }}>
              <Flex justify="right">
                <Tooltip label="Edit" position="bottom" withArrow>
                  <ActionIcon variant="transparent" mr={5}>
                    <BsPencil size={16} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Delete" position="bottom" withArrow>
                  <ActionIcon
                    variant="transparent"
                    onClick={() => setModalOpened(true)}
                  >
                    <BsTrash size={16} />
                  </ActionIcon>
                </Tooltip>
              </Flex>
            </Box>
          </Flex>
        </Paper>
      </Box>
      {/* Delete Confirmation Modal */}
      <DeleteModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        handleDelete={handleDelete}
        listId={listItem.id}
      />
    </>
  );
};

export default SkillsList;
