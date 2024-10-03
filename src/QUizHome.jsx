import { useEffect, useState } from 'react';
import styles from './Quiz.module.css';

function QuizHome() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers for each question

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    const data = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple");
    const res = await data.json();

    // Shuffle answers for each question and store the shuffled array in each question object
    const questionsWithShuffledAnswers = res.results.map((question) => ({
      ...question,
      shuffledAnswers: shuffleAnswersArr(question), // Store shuffled answers
    }));

    setQuestions(questionsWithShuffledAnswers); // Save the questions with shuffled answers in state
  };

  // Function to shuffle the array of answers (used once on initial fetch)
  const shuffleAnswersArr = (question) => {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    return allAnswers.sort(() => Math.random() - 0.5);
  };

  // Handle answer selection
  const handleAnswerClick = (questionIndex, selectedAnswer, correctAnswer) => {
    // Only allow selection if the answer hasn't been selected already
    if (!selectedAnswers[questionIndex]) {
      setSelectedAnswers((prevSelectedAnswers) => ({
        ...prevSelectedAnswers,
        [questionIndex]: { selectedAnswer, correctAnswer }, // Store selected and correct answers for each question
      }));
    }
  };

  return (
    <div className={styles.quizBody}>
      <ul>
        {questions.length > 0 &&
          questions.map((ques, index) => (
            <li key={index}>
              <h3>{ques.question}</h3>
              {/* Render the pre-shuffled answers stored in the state */}
              {ques.shuffledAnswers.map((answer, i) => {
                const isSelected = selectedAnswers[index]?.selectedAnswer === answer;
                const isCorrect = selectedAnswers[index]?.correctAnswer === answer;
                const hasSelected = !!selectedAnswers[index]; // Check if an answer has been selected for the current question

                return (
                  <button
                    key={i}
                    className={styles.optionButton}
                    onClick={() => handleAnswerClick(index, answer, ques.correct_answer)}
                    disabled={hasSelected} // Disable the button if an answer has already been selected
                    style={{
                      backgroundColor: isSelected && isCorrect ? 'blue' : isSelected && !isCorrect ? 'red' : '',
                      color: isSelected ? 'white' : 'black', // Change text color when selected
                      cursor: hasSelected ? 'not-allowed' : 'pointer', // Change cursor when disabled
                    }}
                  >
                    {answer}
                  </button>
                );
              })}
              <hr />
            </li>
          ))}
          <button className={styles.checkAnswerBtn}>check Answers</button>
      </ul>


    </div>
  );
}

export default QuizHome;
