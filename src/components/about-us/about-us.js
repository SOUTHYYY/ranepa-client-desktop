import React from "react";
import "./about-us.css";

const AboutUs = () => {
  return (
    <div>
      <div className="home-title">
        <span className="aboutUsHeader">
          Данный клиент является неоффициальным клиентом сайта НИУ РАНХиГС и не
          имеет ничего общего с его содержимым
        </span>
        <span className="aboutUsName">Создано при помощи библиотеки React</span>
        <div className="aboutUsLogo fa-5x">
          <a href="https://ru.reactjs.org/">
            <i className="aboutIcon fab fa-react"></i>
          </a>
          <a href="https://firebase.google.com/">
            <i className="aboutIcon fas fa-fire-alt"></i>
          </a>
          <a href="https://github.com/SOUTHYYY/ranepa-client-desktop">
            <i className="aboutIcon fab fa-github"></i>
          </a>
          <a href="https://www.mapbox.com/">
            <i className="aboutIcon fas fa-map-marked-alt"></i>
          </a>
        </div>
      </div>
      <div className="waveWrapper waveAnimation">
        <div className="waveWrapperInner bgTop">
          <div
            className="wave waveTop"
            style={{
              backgroundImage: `url('http://front-end-noobs.com/jecko/img/wave-top.png')`
            }}
          />
        </div>
        <div className="waveWrapperInner bgMiddle">
          <div
            className="wave waveMiddle"
            style={{
              backgroundImage: `url('http://front-end-noobs.com/jecko/img/wave-mid.png')`
            }}
          />
        </div>
        <div className="waveWrapperInner bgBottom">
          <div
            className="wave waveBottom"
            style={{
              backgroundImage: `url('http://front-end-noobs.com/jecko/img/wave-bot.png')`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
