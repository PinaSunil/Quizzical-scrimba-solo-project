
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Answers from "./Answers"
import { FaCheck, FaTimes } from "react-icons/fa";


const Questions = (props) => {
    
    const {
        question, 
        answersArray, 
        isAnswerChecked,
        correctAnswer, 
        selectedValues,
        handleRadioChange,
        questionId
    } = props
    
    return (
      <div className="each-quiz">
        <p className="question">{question}</p>
        <div className="options-container">
          {answersArray.map((answer) => (
              <Answers 
                key={nanoid()} 
                answer={answer}
                questionId = {questionId}
                correctAnswer = {correctAnswer}
                isAnswerChecked={isAnswerChecked}
                selectedValues={selectedValues}
                handleRadioChange={handleRadioChange}
              />

          ))}

          {isAnswerChecked ? selectedValues[questionId] === correctAnswer ? <FaCheck size={25} color="green"/> : <FaTimes size={25} color="red"/> : null}
        </div>
      </div>
    )
}

export default Questions
