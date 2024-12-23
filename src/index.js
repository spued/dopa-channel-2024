import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./styles/styles.scss";
import reportWebVitals from "./reportWebVitals";
import VideoPlayer from "./components/VideoPlayer";
import VideoList from "./components/VideoList";

const root = ReactDOM.createRoot(document.getElementById("root"));
const SiteSetting = () => {
  useEffect(() => {
    document.title = "DOPA Channel";
    document.body.classList.add("main-body");

    return () => {
      document.body.classList.remove("main-body");
    };
  }, []);
};

function App() {
  return (
    <React.StrictMode>
      <SiteSetting />
      <div className="container">
        <section id="header_area">
          <div className="header">
            <div className="header__content">
              <img src={require("./images/dopa_channel_logo.png")} width="10%" alt="DOPA Communication division" />
              <h3>กองการสื่อสาร กรมการปกครอง</h3>
              <img src={require("./images/dopa_logo_small.png")} width="5%" alt="DOPA Communication division" />
            </div>
          </div>
        </section>
        <section id="live_area">
          <div className="live__content">
            <VideoPlayer />
            <h5>รายการถ่ายทอดสด</h5>
          </div>
        </section>
        <section id="playback__area">
          <div className="playback__content">
            <VideoList />
          </div>
        </section>
        <section id="footer__area">
          <div className="footer__content">
            <p>&copy; Copyright 2024 DOPA Communication division.</p>
            <p>V 1.0.3 All right reserved.</p>
          </div>
        </section>
      </div>
    </React.StrictMode>
  );
}
root.render(App());

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
