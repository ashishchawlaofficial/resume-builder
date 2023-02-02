import { Box, Flex } from "@mantine/core";
import Editor from "../builder/Editor";
import Wrapper from "../common/layout/Wrapper";

const Builder = () => {
  return (
    <Wrapper>
      <Box>
        <Flex position="apart">
          <Box id="editor" sx={{ width: "60%" }}>
            <Editor />
          </Box>
          <Box
            id="preview"
            sx={{ width: "40%", height: "100vh", backgroundColor: "#f5f5f5" }}
          >
            Preview
          </Box>
        </Flex>
      </Box>
    </Wrapper>
  );
};

export default Builder;
