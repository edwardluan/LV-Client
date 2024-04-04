import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GLOBALTYPES } from "./redux/actions/globalTyles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { rfToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionAction";
import { getNotifies } from "./redux/actions/notifyAction";

import RoutePage from "./customRouter/RoutePage";
import LoginPage from "./pages/login";
import HomePage from "./pages/home"
import RegisterPage from "./pages/register";
import Header from "./components/header/Header";
import Notify from "./components/notify/Notify";
import StatusModal from "./components/StatusModal";
import SocketClient from "./SocketClient";

import io from "socket.io-client"

function App() {
  const auth = useSelector((state) => state.auth?.token)
  const status = useSelector((state) => state.status)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(rfToken())
    const socket = io()
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket })
    return () => socket.close()
  }, [dispatch])

  useEffect(() => {
    if (auth) {
      dispatch(getPosts(auth))
      dispatch(getSuggestions(auth))
      dispatch(getNotifies(auth))
    }
  }, [dispatch, auth])

  return (
    <Router>
      <Notify />
      <input type="checkbox" id="theme"></input>
      <div className="App">
        <div className="main">
          {auth && <Header />}
          {status && <StatusModal />}
          {auth && <SocketClient />}
          <Routes>
            <Route exact path="/" element={auth ? <HomePage /> : <LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route path="/:page" element={<RoutePage />} />
            <Route path="/:page/:id" element={<RoutePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
