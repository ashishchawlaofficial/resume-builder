import { useEffect, useState } from "react";
import { Box, Chip, Text, Stack } from "@mantine/core";
import { BsXCircleFill } from "react-icons/bs";

const InputChips = ({ collection, setCollection, placeholderText, label }) => {
  const [tags, setTags] = useState([]);

  const removeTag = (id) => {
    setTags(tags.filter((_, index) => index !== id));
  };

  const addTags = (e) => {
    const tag = e.target.value;
    if (e.key === "Enter" && tag !== "") {
      setTags((prevState) => {
        return [...prevState, tag];
      });
      e.target.value = "";
    }
  };

  useEffect(() => {
    setCollection(tags);
    if (collection) {
      setTags(collection);
    }
  }, [tags, collection, setCollection]);

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        padding: "6px 12px",
        borderRadius: "4px",
      }}
    >
      <Text fz="xs" fw={500} mb={10}>
        {label}
      </Text>
      <Stack>
        <Chip.Group sx={tags.length === 0 && { display: "none" }}>
          {tags &&
            tags.map((tag, index) => {
              return (
                <Chip
                  key={index}
                  variant="filled"
                  sx={{ position: "relative", marginRight: "5px" }}
                >
                  <span style={{ paddingRight: "10px" }}>{tag}</span>
                  <i className="chipIcon" onClick={() => removeTag(index)}>
                    <BsXCircleFill />
                  </i>
                </Chip>
              );
            })}
        </Chip.Group>
        <input
          className="unstyledInput"
          type="text"
          placeholder={placeholderText}
          onKeyUp={addTags}
          size="5"
        />
      </Stack>
    </Box>
  );
};

export default InputChips;
