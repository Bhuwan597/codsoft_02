import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dasboard from "./pages/Dasboard";
import FullProjectPage from "./pages/FullProjectPage";
import Project from "./pages/Project";
import UserProvider from "./contexts/userContextProvider";
import Auth from "./components/Auth";

function App() {
  return (
    <div className="App">
      <div className="bg-slate-100">
        <BrowserRouter>
          <UserProvider>
            <Routes>
              <Route index element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<Auth />}>
                <Route path="/dashboard" element={<Dasboard />} />
                <Route path="/create" element={<Project />} />
                <Route path="/:slug" element={<FullProjectPage />} />
              </Route>
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
