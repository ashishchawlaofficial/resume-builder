import { createSlice } from "@reduxjs/toolkit";
import {
  objToArrObj,
  useApiEndpoint,
} from "../../components/common/utils/Functions";

// Initial State
const initialState = {
  loading: "idle",
  data: [], // [{name: '', id: '', builderId: ''}, {name: '', id: '', builderId: ''}]
  error: "",
};

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    setLoader: (state) => {
      if (state.loading === "idle") state.loading = "pending";
    },
    setData: (state, action) => {
      state.data = [...state.data, { ...action.payload }];
      state.error = "";
    },
    updateData: (state, action) => {
      state.data = action.payload;
      state.error = "";
      if (state.loading === "pending") state.loading = "idle";
    },
    setError: (state, action) => {
      state.error = action.payload;
      if (state.loading === "pending") state.loading = "idle";
    },
    unsetLoader: (state) => {
      if (state.loading === "pending") state.loading = "idle";
    },
  },
});

export const { setLoader, setData, setError, unsetLoader, updateData } =
  builderSlice.actions;

export default builderSlice.reducer;

// Async API Functions
export const configureBuilder =
  ({ ...data }) =>
  async (dispatch) => {
    const endpoint = useApiEndpoint(data);
    dispatch(setLoader());
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.builderId),
      });
      if (response.ok) {
        dispatch(setData({ builderId: data.builderId }));
      }
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

export const getBuilderData = (id) => async (dispatch) => {
  const endpoint = `${process.env.REACT_APP_DB_URL}/users/${id}/meta/builderIDs.json`;

  dispatch(setLoader());

  try {
    const request = await fetch(endpoint);

    if (request.ok) {
      const response = await request.json();
      const data = objToArrObj(response);
      dispatch(updateData(data));
    }
  } catch (err) {
    dispatch(setError(err.message));
  }
};
