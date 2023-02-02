import { createSlice } from "@reduxjs/toolkit";
import { useApiEndpoint } from "../../components/common/utils/Functions";

// Initial State
const initialState = {
  loading: "idle",
  data: {},
  error: "",
};

const MiscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setLoader: (state) => {
      if (state.loading === "idle") state.loading = "pending";
    },
    setData: (state, action) => {
      state.data = action.payload;
      state.error = "";
      if (state.loading === "pending") state.loading = "idle";
    },
    setError: (state, action) => {
      state.error = action.payload;
      if (state.loading === "pending") state.loading = "idle";
    },
  },
});

export const { setLoader, setData, setError } = MiscSlice.actions;

export default MiscSlice.reducer;

// Async API Functions
export const saveMiscData = (miscData) => async (dispatch) => {
  const endpoint = useApiEndpoint(miscData);
  const { formData } = miscData;
  dispatch(setLoader());

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      dispatch(setData(formData));
    } else {
      dispatch(setError("Something went wrong! Data cannot be saved."));
    }
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const getMiscData =
  ({ ...requestUrlChunk }) =>
  async (dispatch) => {
    const endpoint = useApiEndpoint(requestUrlChunk);
    dispatch(setLoader());

    try {
      const request = await fetch(endpoint);

      if (request.ok) {
        const response = await request.json();
        dispatch(setData(response));
      } else {
        dispatch(setError("Something went wrong! Data cannot be fetch."));
      }
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
