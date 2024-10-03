import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./Login.module.css"

function Login() {

    const navigate = useNavigate()

    const startQuizButton = () => {
        navigate("/quiz")
    }
  return (
    <div className={styles.login}>
        <div>
        <h1 className={styles.loginHeader}>QUIZZICAL </h1>
      <h4 className= {styles.quote}>Powering the future of Quizes </h4>

      <button className={styles.starQuizBtn} onClick={startQuizButton}>Start quiz</button>
        </div>
    </div>
  )
}

export default Login
