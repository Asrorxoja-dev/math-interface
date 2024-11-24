import { Question } from "../types";

export const mathQuestions: Question[] = [
  {
    id: "1",
    type: "completion",
    contentType: "text",
    question: "2x + 5 = 13",
    solution: "x = 4\n2x = 13 - 5\n2x = 8\nx = 4",
    correctAnswer: "4",
    videoUrl: "https://youtube.com",
  },
  {
    id: "2",
    type: "multiple-choice",
    contentType: "text",
    question: "Solve: √16 + 3 = ?",
    solution: "√16 + 3 = 4 + 3 = 7",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    videoUrl: "https://youtube.com/embed/example2",
  },
  // Adding more sample questions - in practice you'd add all 100
  {
    id: "3",
    type: "completion",
    contentType: "text",
    question: "3y - 6 = 15",
    solution: "3y = 21\ny = 7",
    correctAnswer: "7",
    videoUrl: "https://youtube.com/embed/example3",
  },
  // ... more questions would be added here
];
