import { useEffect } from "react";
import Wrapper from "../common/layout/Wrapper";
import EmptyDashboard from "../common/layout/EmptyDashboard";
import FilledDashboard from "../ui/FilledDashboard";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  configureBuilder,
  unsetLoader,
  getBuilderData,
} from "../../store/slices/builderSlice";

const Dashboard = () => {
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Subscribing to Resume data from Redux Store
  const { loading, data, error } = useSelector((state) => state.builder);

  console.log("Builder IDs: ", data);

  useEffect(() => {
    if (userId) dispatch(getBuilderData(userId));
  }, [dispatch, userId]);

  const handleInit = () => {
    const builderId = uuidv4();
    dispatch(
      configureBuilder({
        builderId,
        userId,
        endpointKey: "meta/builderIDs",
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
      {data.length === 0 ? (
        <EmptyDashboard init={handleInit} isLoading={loading} />
      ) : (
        <FilledDashboard data={data} userId={userId} />
      )}
    </Wrapper>
  );
};

export default Dashboard;
