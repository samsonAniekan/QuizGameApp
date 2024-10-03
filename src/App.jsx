import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import QuizHome from './QUizHome';
import styles from "./App.module.css"


function App() {
  return (
    <div className={styles.app}>
    <Router>
      <Routes>
        <Route path = "/" element = {<Login />}></Route> {/** rOUTE FOR login */}
        <Route path= "/quiz" element = {<QuizHome />}></Route>   { /* route for Quiz */}
      </Routes>
    </Router>
    </div>
  )
}

export default App
