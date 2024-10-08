import React from 'react';
import styles from './QuizResult.module.css';

function QuizResult({ questions, selectedAnswers }) {
  return (
    <div className={styles.quizBody}>
      <ul>
        {questions.length > 0 &&
          questions.map((ques, index) => (
            <li key={index}>
              <h3>{ques.question}</h3>
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
                    disabled // i disabled the result here
                  >
                    {answer}
                  </button>
                );
              })}
              <hr />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default QuizResult;
