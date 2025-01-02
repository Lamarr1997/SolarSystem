import './App.css';
import { useState } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import SolarSystem from './components/SolarSystem';
import About from './components/About';
import Footer from './components/Footer';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Background Wave Animation */}
      <svg
        version="1.1"
        x="0px"
        y="0px"
        width="100%"
        height="100%"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        className="background-svg"
      >
        <text
          x="40%"
          y="20%"
          className="title-text"
          fontFamily="Verdana"
          fontSize="78"
          fill="white"
        >
          Solar System
        </text>
        <defs>
          <linearGradient id="bg">
            <stop offset="20%" stopColor="rgba(0, 0, 0, 0.06)" />
            <stop offset="50%" stopColor="rgba(6, 62, 78, 0.6)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0.2)" />
          </linearGradient>
          <path
            id="wave"
            fill="url(#bg)"
            d="M-363.852,502.589c0,0,236.988-41.997,505.475,0s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
          />
        </defs>
        <g>
          <use href="#wave" opacity="0.3">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="10s"
              calcMode="spline"
              values="270 230; -334 180; 270 230"
              keyTimes="0; .5; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"
            />
          </use>
          <use href="#wave" opacity="0.6">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="8s"
              calcMode="spline"
              values="-270 230;243 220;-270 230"
              keyTimes="0; .6; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"
            />
          </use>
          <use href="#wave" opacity="0.9">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="6s"
              calcMode="spline"
              values="0 230;-140 200;0 230"
              keyTimes="0; .4; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"
            />
          </use>
        </g>
      </svg>

      {/* Main Content */}
      <div className="content-wrapper">
        <nav role="navigation" className="main-nav">
          <div id="menuToggle" className="menu-toggle">
            <input
              type="checkbox"
              checked={isMenuOpen}
              onChange={() => setIsMenuOpen(!isMenuOpen)}
            />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu" className={`menu ${isMenuOpen ? 'menu-open' : ''}`}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Solar System
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="canvas-container">
                  <SolarSystem />
                </div>
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      <Footer/>
      </div>
    </div>
  );
};

export default App;
