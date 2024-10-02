import { HashRouter } from 'react-router-dom';
import styles from './App.module.css';
import { useEffect, useState } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    const data = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple");
    const res = await data.json();
    setQuestions(res.results);
  };

  // Function to shuffle the array of answers
  const shuffleAnswersArr = (question) => {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    return allAnswers.sort(() => Math.random() - 0.5);

  };

  return (
    <div className={styles.body}>
      <ul>
        {/* the short ciruiting with && if true shorts circuits and evaluates the questions.map() function */}
        {questions.length > 0 && questions.map((ques, index) => (
          <li key={index}>
            <h3>{ques.question}</h3>
            {/* Shuffle answers and map over them */}
            {shuffleAnswersArr(ques).map((answer, i) => (
              <button key={i} className={styles.optionButton}>
                {answer}
              </button>
            ))}
            <hr />
          </li>

        ))}

      </ul>
    </div>
  );
}

export default App;
