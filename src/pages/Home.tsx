import { useState } from "react";
import { Calculator } from "../components/Calculator";
import { StepTracker } from "../components/StepTracker";
import { Hearts } from "../components/Hearts";
import { QuestionDisplay } from "../components/QuestionDisplay";
import { GameControls } from "../components/GameControls";
import { SolutionDisplay } from "../components/SolutionDisplay";
import { GameState } from "../types";
import { mathQuestions } from "../data/questions";
import { Calculator as Kalkulator } from "lucide-react";
import { X } from "lucide-react";
const initialGameState: GameState = {
  lives: 3,
  currentStep: 0,
  mistakes: 0,
  strafQuestions: 0,
  isVideoRequired: false,
  hasViewedSolution: false,
  roundStatus: "default",
  actionTaken: false, 
};

function Home() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [input, setInput] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = mathQuestions[gameState.currentStep];

  const handleInput = (value: string) => {
    if (value === "=") {
      handleCheck();
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleCheck = () => {
    const userAnswer =
      currentQuestion.type === "multiple-choice" ? selectedOption : input;

    if (userAnswer === currentQuestion.correctAnswer) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  };

  const handleCorrectAnswer = () => {
    setInput("");
    setSelectedOption(null);
    setShowSolution(false);

    setGameState((prev) => ({
      ...prev,
      lives: Math.min(prev.lives + 1, 3),
      currentStep: prev.currentStep + 1,
      mistakes: 0,
      roundStatus: "default",
      isVideoRequired: false,
      hasViewedSolution: false,
      actionTaken: false, 
    }));
  };

  const handleWrongAnswer = () => {
    if (gameState.mistakes === 0) {
      setGameState((prev) => ({ ...prev, mistakes: 1 }));
    } else {
      setGameState((prev) => ({
        ...prev,
        lives: prev.lives - 1,
        strafQuestions:
          prev.lives === 1 ? prev.strafQuestions + 2 : prev.strafQuestions + 1,
        roundStatus: prev.lives === 1 ? "red" : prev.roundStatus,
        isVideoRequired: prev.lives === 1,
      }));
    }
  };

  const handleViewSolution = () => {
    if (!gameState.actionTaken) { // Prevent multiple clicks
      setShowSolution(true);
      setGameState((prev) => ({
        ...prev,
        lives: prev.lives - 1,
        hasViewedSolution: true,
        roundStatus: "brown",
        actionTaken: true, // Mark as used
      }));
    }
  };
  
  const handleVideoExplanation = () => {
    if (!gameState.actionTaken) { // Prevent multiple clicks
      if (gameState.lives > 0) {
        setGameState((prev) => ({
          ...prev,
          lives: prev.lives - 1,
          roundStatus: "yellow",
          hasViewedSolution: true,
          actionTaken: true, // Mark as used
        }));
      }
    }
  };
  
  if (gameState.lives === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Game Over! 😢</h1>
          <p className="text-gray-600">
            You've run out of lives. Better luck next time!
          </p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setGameState(initialGameState);
            }}
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  if (gameState.currentStep >= mathQuestions.length) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Congratulations! 🎉</h1>
          <p className="text-gray-600">
            You've completed all the math questions!
          </p>
        </div>
      </div>
    );
  }

  const openModal = () => {
    const modal = document.getElementById(
      "my_modal_3"
    ) as HTMLDialogElement | null;
    modal?.showModal();
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <button className="btn " onClick={openModal}>
        <p className="bg-black text-white px-3 py-3 rounded-xl">Modal</p>
      </button>
      <dialog id="my_modal_3" className="modal rounded-xl ">
        <div className="modal-box w-full max-w-5xl mt-5">
          <form method="dialog">
            <button className="btn btn-sm  btn-circle btn-ghost absolute right-2 top-1 ">
              <X />
            </button>
          </form>
          <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl p-14 w-full max-w-2xl relative">
              <Hearts lives={gameState.lives} />

              <QuestionDisplay
                question={currentQuestion}
                roundStatus={gameState.roundStatus}
                onOptionSelect={handleOptionSelect}
                selectedOption={selectedOption}
              />

              {currentQuestion.type === "completion" && (
                <div className="mt-6">
                  <div className="bg-gray-50 p-4 rounded-lg flex justify-between px-16   items-center mb-4">
                    <p className="text-lg font-medium text-gray-700">
                      Sizning javobingiz:
                    </p>
                    <input
                      type="number"
                      className="border-2 border-gray-300 rounded-lg p-2 max-w-[70px]"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    ></input>
                    <Kalkulator className="text-gray-700" size={35} />
                  </div>
                  <Calculator onInput={handleInput} />
                </div>
              )}

<GameControls
  onCheck={handleCheck}
  onViewSolution={handleViewSolution}
  onVideoExplanation={handleVideoExplanation} 
  isCheckDisabled={
    gameState.isVideoRequired && !gameState.hasViewedSolution
  }
  showNext={showSolution}
  videoRequired={gameState.isVideoRequired}
  videoUrl={currentQuestion.videoUrl || ''}
  actionTaken={gameState.actionTaken}
/>


              <SolutionDisplay
                solution={currentQuestion.solution}
                isVisible={showSolution}
              />

              <StepTracker
                currentStep={gameState.currentStep}
                totalSteps={mathQuestions.length + gameState.strafQuestions}
              />
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );

}export default Home;