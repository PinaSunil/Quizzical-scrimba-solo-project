import React, { useEffect, useState } from "react";
import he from "he";

const Answers = (props) => {
    
        const {
            answer,
            isAnswerChecked,
            correctAnswer, 
            selectedValues,
            handleRadioChange,
            questionId
        } = props
    
    return (
        <>
            <label
              className={`option 
              ${selectedValues[questionId] === answer ? "checked" : ""}
              
              
              ${
                isAnswerChecked
                  ? answer === correctAnswer
                    ? "correct-answer"
                    : selectedValues[questionId] === answer
                    ? "wrong-answer"
                    : ""
                  : ""
              }
              `}
            >
              <input
                type="radio"
                value={answer}
                checked={selectedValues[questionId] === answer}
                onChange={(event) => handleRadioChange(event, questionId)}
                disabled = {isAnswerChecked}
              />
              {he.decode(answer)}
            </label>
        </>
    )
}

export default Answers