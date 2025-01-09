import React from 'react';

import "../styles/_question.scss"



export function QuestionDisplay({
  question,
  roundStatus,
  onOptionSelect,
  selectedOption,
}) {
  const statusClass = `question-display question-display--${roundStatus}`;

  return (
    <div className={statusClass}>
      <h2>{question.question}</h2>

      {question.imageUrl && (
        <img
          src={question.imageUrl}
          alt="Question visual"
        />
      )}

      {question.type === "multiple-choice" && question.options && (
        <div className="options-grid">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => onOptionSelect?.(option)}
              className={selectedOption === option ? 'selected' : ''}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}