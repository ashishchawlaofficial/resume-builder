import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Auth from "./auth/Auth";
import Protected from "./auth/ProtectedRoute";
import Dashboard from "./components/pages/Dashboard";
import { setUser } from "./store/slices/authSlice";
import Builder from "./components/pages/Builder";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const locFrom = location.state?.from;

  useEffect(() => {
    if (!isLoggedIn) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUser({ user, isLoggedIn: true }));
          navigate(locFrom);
        }
      });
    }
  }, [dispatch, isLoggedIn, navigate, locFrom]);

  return (
    <div className="App">
      <Routes>
        <Route path="auth" element={<Auth />} />
        <Route element={<Protected />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="build/:type/:builderID/:userID" element={<Builder />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
