import { useState } from "react";
import Wrapper from "../common/layout/Wrapper";
import { Box } from "@mantine/core";
import EmptyDashboard from "../common/layout/EmptyDashboard";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  configureBuilder,
  unsetLoader,
} from "../../store/slices/userMetaSlice";

const Dashboard = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const userId = sessionStorage.getItem("userId");
  const isLoading = useSelector((state) => state.meta.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInit = () => {
    const builderId = uuidv4();
    dispatch(
      configureBuilder({
        builderId,
        userId,
        endpointKey: "metaData/builderIDs",
      })
    );
    setTimeout(() => {
      navigate(`/build/new/${builderId}/${userId}`, { replace: true });
      dispatch(unsetLoader());
    }, 5000);

    console.log("Builder ID: ", builderId, userId);
  };

  return (
    <Wrapper>
      <Box
        component="section"
        sx={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isEmpty && <EmptyDashboard init={handleInit} isLoading={isLoading} />}
      </Box>
    </Wrapper>
  );
};

export default Dashboard;
