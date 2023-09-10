import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute.jsx";
import PublicRoute from "./auth/PublicRoute.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/user/Login.jsx";
import EventsList from "./components/event/EventsList.jsx";
import EventPage from "./components/event/EventPage.jsx";
import Signup from "./components/user/Signup.jsx";
import Logout from "./components/user/Logout.jsx";
import LoginWithOTP from "./components/user/LoginWithOTP.jsx";
import MyBooking from "./components/booking/MyBooking.jsx";
import axios from "axios";
import Cookies from "js-cookie";

function App() {
  axios.interceptors.request.use((request) => {
    let token = Cookies.get("bookMySeatToken");
    request.headers.authorization = token;
    return request;
  });

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/my-booking" element={<MyBooking />} />
          </Route>
          <Route path="/" element={<PublicRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/login-with-otp" element={<LoginWithOTP />} />
          </Route>
          <Route path="/events/:reqType/:argument" element={<EventsList />} />
          <Route path="event-page/:eventId" element={<EventPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
