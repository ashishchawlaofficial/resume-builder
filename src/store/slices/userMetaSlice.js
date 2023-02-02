import { createSlice } from "@reduxjs/toolkit";
import { useApiEndpoint } from "../../components/common/utils/Functions";

// Initial State
const initialState = {
  loading: "idle",
  userMeta: [], // [{name: '', id: '', builderId: ''}, {name: '', id: '', builderId: ''}]
  error: "",
};

const UserMetaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    setLoader: (state) => {
      if (state.loading === "idle") state.loading = "pending";
    },
    setUserMeta: (state, action) => {
      state.userMeta = [...state.userMeta, { ...action.payload }];
      state.error = "";
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

export const { setLoader, setUserMeta, setError, unsetLoader } =
  UserMetaSlice.actions;

export default UserMetaSlice.reducer;

// Async API Functions
export const configureBuilder =
  ({ ...data }) =>
  async (dispatch) => {
    const endpoint = useApiEndpoint(data);
    console.log("Endpoint: ", data, endpoint);
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
        dispatch(setUserMeta({ builderId: data.builderId }));
      }
    } catch (err) {
      console.log(err.message);
      dispatch(setError(err.message));
    }
  };
