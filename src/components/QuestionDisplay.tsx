
import { Question } from '../types';

interface QuestionDisplayProps {
  question: Question;
  roundStatus: string;
  onOptionSelect?: (option: string) => void;
  selectedOption?: string | null;
}

export function QuestionDisplay({ 
  question, 
  roundStatus,
  onOptionSelect,
  selectedOption 
}: QuestionDisplayProps) {
  return (
    <div className={`p-6 rounded-lg ${
      roundStatus === 'red' ? 'bg-red-50' :
      roundStatus === 'brown' ? 'bg-amber-50' :
      roundStatus === 'yellow' ? 'bg-yellow-50' :
      'bg-gray-50'
    }`}>
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      
      {question.imageUrl && (
        <img 
          src={question.imageUrl} 
          alt="Question visual"
          className="max-w-full h-auto rounded-lg mb-4"
        />
      )}
      
      {question.type === 'multiple-choice' && question.options && (
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => onOptionSelect?.(option)}
              className={`p-3 rounded-lg shadow transition-colors ${
                selectedOption === option
                  ? 'bg-blue-500 text-white'
                  : 'bg-white hover:bg-blue-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}