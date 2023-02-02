import { createSlice } from "@reduxjs/toolkit";
import {
  flattenResponse,
  useApiEndpoint,
} from "../../components/common/utils/Functions";

// Initial State
const initialState = {
  loading: "idle",
  data: [],
  error: "",
};

const ProjectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setLoader: (state) => {
      if (state.loading === "idle") state.loading = "pending";
    },
    setData: (state, action) => {
      state.data = [...state.data, { ...action.payload }];
      state.error = "";
      if (state.loading === "pending") state.loading = "idle";
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
    deleteRecord: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.error = "";
      if (state.loading === "pending") state.loading = "idle";
    },
  },
});

export const {
  setLoader,
  setData,
  setError,
  unsetLoader,
  updateData,
  deleteRecord,
} = ProjectsSlice.actions;

export default ProjectsSlice.reducer;

// Async API Functions
export const saveProjectsData =
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
        body: JSON.stringify(data.formData),
      });
      if (response.ok) {
        dispatch(setData(data.formData));
      } else {
        dispatch(setError("Something went wrong! Data cannot be saved."));
      }
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

export const getProjectsData = (requestUrlChunk) => async (dispatch) => {
  const endpoint = useApiEndpoint(requestUrlChunk);
  dispatch(setLoader());

  try {
    const request = await fetch(endpoint);

    if (request.ok) {
      const response = await request.json();
      const data = response && flattenResponse(response);
      response !== null ? dispatch(updateData(data)) : dispatch(unsetLoader());
    } else {
      dispatch(setError("Something went wrong! Data cannot be fetch."));
    }
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const deleteProjectsRecord =
  (requestUrlChunk, id) => async (dispatch) => {
    const requestChunk = {
      ...requestUrlChunk,
      endpointKey: `projects/${id}`,
    };
    const endpoint = useApiEndpoint(requestChunk);
    dispatch(setLoader());

    try {
      const request = await fetch(endpoint, {
        method: "DELETE",
      });
      if (request.ok) {
        dispatch(deleteRecord(id));
      } else {
        dispatch(setError("Something went wrong! Record cannot be deleted."));
      }
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
