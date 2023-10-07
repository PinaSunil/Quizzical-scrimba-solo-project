import React, { useEffect, useState } from "react";
import he from "he";
import blob from "/blob.svg";
import blob3 from "/blob3.svg";
import loader from "/loader.svg"
import { nanoid } from "nanoid";
import Questions from "./Questions";

const Quiz = () => {
  const [quizes, setQuizes] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gameNumber, setGameNumber] = useState(0);

  const handleRadioChange = (event, questionId) => {
    const { value } = event.target;
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [questionId]: value,
    }));
  };

  function insertItemAtRandomPosition(array, item) {
    const newArray = [...array];
    const randomIndex = Math.floor(Math.random() * (newArray.length + 1));
    newArray.splice(randomIndex, 0, item);
    return newArray;
  }

  function reset(){
    setSelectedValues({})
    setIsAnswerChecked(false)
    setLoading(true)
    setGameNumber(prevGameNumber => prevGameNumber + 1)
  }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const quizzesWithShuffledAnswers = data.results.map((quiz) => ({
          ...quiz,
          answersArray: insertItemAtRandomPosition(
            quiz.incorrect_answers,
            quiz.correct_answer
          ),
        }));
        setQuizes(quizzesWithShuffledAnswers);
        setLoading(false)
      });

    return () => {
      setQuizes([])
      setSelectedValues({})
    };
  }, [gameNumber]); 

  const calculateCorrectAnswers = () => {
    let correctCount = 0;

    quizes.forEach((quiz, index) => {
      const questionId = `question_${index}`;
      const selectedAnswer = selectedValues[questionId];
      const correctAnswer = quiz.correct_answer;

      if (selectedAnswer === correctAnswer) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const totalScore = calculateCorrectAnswers();

  function checkAnswers() {
    setIsAnswerChecked(true);
  }

  const quizElement = quizes?.map((quiz, index) => {
    const question = he.decode(quiz.question);
    const correctAnswer = quiz.correct_answer;
    const questionId = `question_${index}`;
    const answersArray = quiz.answersArray;

    return (
      <Questions
        key={nanoid()} 
        question={question}
        answersArray={answersArray}
        questionId = {questionId}
        correctAnswer = {correctAnswer}
        isAnswerChecked={isAnswerChecked}
        selectedValues={selectedValues}
        handleRadioChange={handleRadioChange}
      />
    )
  });



  return (
    <div className="quiz-page">
      <img src={blob} alt="" className="blob1" />
      <img src={blob3} alt="" className="blob3" />

      {loading ? (
        <div className="loader-container">
             <img src={loader} className = "loading-svg" alt="loading......" />
        </div>
      ) : (
        <div className="quiz-container">
          {quizElement}

          { isAnswerChecked ? 
             (<div className="score-container">
              <p className="score">
                {`You scored ${totalScore}/5 correct answers`}{" "}
              </p>
              <button className="play-again-btn" onClick={reset}>
                Play again
              </button>
            </div> )
          : (
            <button className="check-ans-btn" onClick={checkAnswers} disabled = {Object.keys(selectedValues).length < 5}>
              Check Answer
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
