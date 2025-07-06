import "./App.css";
import Body from "./components/Body";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router";
import store from "./utils/appStore";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
