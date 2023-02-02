import { configureStore } from "@reduxjs/toolkit";
// Reducer Imports
import authReducer from "./slices/authSlice";
import builderReducer from "./slices/builderSlice";
import personalReducer from "./slices/personalInfoSlice";
import educationReducer from "./slices/educationSlice";
import employmentReducer from "./slices/employmentSlice";
import projectsReducer from "./slices/projectsSlice";
import certificationReducer from "./slices/certificationSlice";
import skillsReducer from "./slices/skillsSlice";
import miscReducer from "./slices/miscSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    builder: builderReducer,
    personal: personalReducer,
    education: educationReducer,
    employment: employmentReducer,
    projects: projectsReducer,
    certification: certificationReducer,
    skills: skillsReducer,
    misc: miscReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
