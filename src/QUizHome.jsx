import React, { useEffect, useState } from 'react';
import he from 'he';  // Import the he library
import styles from './Quiz.module.css';
import QuizResult from './QuizResult';

function QuizHome() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    const data = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple");
    const res = await data.json();

    // Decode HTML entities for questions and answers
    const questionsWithShuffledAnswers = res.results.map((question) => ({
      ...question,
      question: he.decode(question.question), // Decode the question text
      correct_answer: he.decode(question.correct_answer), // Decode the correct answer
      incorrect_answers: question.incorrect_answers.map((ans) => he.decode(ans)), // Decode incorrect answers
      shuffledAnswers: shuffleAnswersArr(question),
    }));

    setQuestions(questionsWithShuffledAnswers);
  };

  const shuffleAnswersArr = (question) => {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    return allAnswers.sort(() => Math.random() - 0.5);
  };

  const handleAnswerClick = (questionIndex, selectedAnswer, correctAnswer) => {
    if (!selectedAnswers[questionIndex]) {
      setSelectedAnswers((prevSelectedAnswers) => ({
        ...prevSelectedAnswers,
        [questionIndex]: { selectedAnswer, correctAnswer },
      }));
    }
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
  };

  const handlePlayAgain = () => {
    setShowResults(false);
    setSelectedAnswers({});
    fetchQuizData();
  };

  if (showResults) {
    return <QuizResult questions={questions} selectedAnswers={selectedAnswers} onPlayAgain={handlePlayAgain} />;
  }

  return (
    <div className={styles.quizBody}>
      <ul>
        {questions.length > 0 &&
          questions.map((ques, index) => (
            <li key={index}>
              <h3>{ques.question}</h3>
              {ques.shuffledAnswers.map((answer, i) => {
                const isSelected = selectedAnswers[index]?.selectedAnswer === answer;
                const isCorrect = selectedAnswers[index]?.correctAnswer === answer;
                const hasSelected = !!selectedAnswers[index];

                return (
                  <button
                    key={i}
                    className={styles.optionButton}
                    onClick={() => handleAnswerClick(index, answer, ques.correct_answer)}
                    disabled={hasSelected}
                    style={{
                      backgroundColor: isSelected && isCorrect ? '#90EE90' : isSelected && !isCorrect ? '#FF7F7F' : '',
                      color: isSelected ? 'white' : 'black',
                      cursor: hasSelected ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {answer}
                  </button>
                );
              })}
              <hr />
            </li>
          ))}
      </ul>
      <button className={styles.checkAnswerBtn} onClick={handleCheckAnswers}>
        Check Answers
      </button>
    </div>
  );
}

export default QuizHome;
