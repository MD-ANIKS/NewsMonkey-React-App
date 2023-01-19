import "./App.css";
import Navbar from "./components/Navbar";
import React, { useState } from "react";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App () {

  const [progress, setProgress] = useState(0)


    return (
      <>
        <Router>
          <LoadingBar
            color="#ed1e28"
            waitingTime={500}
            transitionTime={500}
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Navbar />
          <Routes>
            <Route
              extract
              path="/"
              element={<News setProgress={setProgress} country="us" category="general" key="general" />}
            />
            <Route
              extract
              path="/business"
              element={<News setProgress={setProgress} category="business" key="business" />}
            />
            <Route
              extract
              path="/entertainment"
              element={<News setProgress={setProgress} category="entertainment" key="entertainment" />}
            />
            <Route
              extract
              path="/health"
              element={<News setProgress={setProgress} category="health" key="health" />}
            />
            <Route
              extract
              path="/science"
              element={<News setProgress={setProgress} category="science" key="science" />}
            />
            <Route
              extract
              path="/sports"
              element={<News setProgress={setProgress} category="sports" key="sports" />}
            />
            <Route
              extract
              path="/technology"
              element={<News setProgress={setProgress} category="technology" key="technology" />}
            />
          </Routes>
        </Router>
      </>
    );
  
}
