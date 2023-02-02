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
import { deleteEmploymentRecord } from "../../../store/slices/employmentSlice";
import DeleteModal from "../../common/layout/DeleteModal";

const EmploymentList = ({ listItem, index, requestUrlChunk }) => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteEmploymentRecord(requestUrlChunk, id));
    console.log("Delete initiated");
  };

  const startDate = `${listItem.startMonth}/${listItem.startYear}`;
  const endDate = listItem.isPresent
    ? "Present"
    : `${listItem.endMonth}/${listItem.endYear}`;

  return (
    <>
      <Box key={index}>
        <Paper p="md" withBorder mb={20}>
          <Flex position="apart">
            {/* List Section */}
            <Box sx={{ width: "85%" }}>
              <Title order={3} size="h4">
                {listItem.company}
              </Title>
              <Text c="dimmed" fz="sm">
                {listItem.designation} ({startDate} - {endDate})
              </Text>

              <Text fz="sm" mt={20}>
                {listItem.summary.slice(0, 150).concat("...")}
              </Text>
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

export default EmploymentList;
