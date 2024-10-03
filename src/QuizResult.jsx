import React from 'react';
import he from 'he'; // Import the he library to decode HTML entities
import styles from './QuizResult.module.css';

function QuizResult({ questions, selectedAnswers, onPlayAgain }) {
  // Calculate the score
  const score = questions.reduce((total, ques, index) => {
    const userAnswer = selectedAnswers[index]?.selectedAnswer;
    if (userAnswer === ques.correct_answer) {
      return total + 1;
    }
    return total;
  }, 0);

  return (
    <div className={styles.quizBody}>
      <ul>
        {questions.length > 0 &&
          questions.map((ques, index) => (
            <li key={index}>
              {/* Decode the question text */}
              <h3>{he.decode(ques.question)}</h3>
              {ques.shuffledAnswers.map((answer, i) => {
                const isSelected = selectedAnswers[index]?.selectedAnswer === answer;
                const isCorrect = answer === ques.correct_answer;
                const isWrong = isSelected && !isCorrect;

                return (
                  <button
                    key={i}
                    className={styles.optionButton}
                    style={{
                      backgroundColor: isCorrect ? '#90EE90' : isWrong ? '#FF7F7F' : 'transparent',
                      color: isSelected ? 'white' : 'black',
                      cursor: 'default',
                    }}
                    disabled
                  >
                    {/* Decode each answer before rendering */}
                    {he.decode(answer)}
                  </button>
                );
              })}
              <hr />
            </li>
          ))}
      </ul>

      {/* Display the user's score above the "Play Again" button */}
      <div className={styles.score}>
        You scored {score}/{questions.length} correct answers!
      </div>

      {/* Play Again button */}
      <button className={`${styles.playAgainBtn} ${styles.responPlayBtn}`} onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
}

export default QuizResult;
