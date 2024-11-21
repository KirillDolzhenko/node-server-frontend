import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Profile from "./pages/Profile/Profile";
import HOCAuthCheck from "./ui/HOC/HOCAuthCheck";
import NotFound from "./pages/NotFound/NotFound";
import HOCAuthNotCheck from "./ui/HOC/HOCAuthNotCheck";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/login"
          element={
            <HOCAuthNotCheck>
              <LogIn />
            </HOCAuthNotCheck>
          }
        ></Route>
        <Route
          path="/auth/signup"
          element={
            <HOCAuthNotCheck>
              <SignUp />
            </HOCAuthNotCheck>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <HOCAuthCheck>
              <Profile />
            </HOCAuthCheck>
          }
        ></Route>
        <Route path="/" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
