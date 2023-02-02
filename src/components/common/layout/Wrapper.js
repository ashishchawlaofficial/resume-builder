import { Box } from "@mantine/core";
import AppHeader from "./Header";

const Wrapper = ({ children }) => {
  return (
    <Box component="main">
      <AppHeader />
      {children}
    </Box>
  );
};

export default Wrapper;
