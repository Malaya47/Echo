import "./App.css";
import Body from "./components/Body";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router";
import store from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
