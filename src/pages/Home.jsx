import { useState, useEffect } from "react";
import { Calculator } from "../components/Calculator";
import { StepTracker } from "../components/StepTracker";
import { Hearts } from "../components/Hearts";
import { QuestionDisplay } from "../components/QuestionDisplay";
import { GameControls } from "../components/GameControls";
import { SolutionDisplay } from "../components/SolutionDisplay";
import { mathQuestions } from "../data/questions";
import { Calculator as Kalkulator } from "lucide-react";
import { X } from "lucide-react";
import { Toaster } from "sonner";
import { toast } from "sonner";
const initialGameState = {
  lives: 3,
  currentStep: 0,
  mistakes: 0,
  strafQuestions: 0,
  isVideoRequired: false,
  hasViewedSolution: false,
  roundStatus: "default",
  actionTaken: false,
  viewedSolutionSteps: [],
};

function Home() {
  const [gameState, setGameState] = useState(initialGameState);
  const [input, setInput] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  
  const [videoStep, setVideoStep] = useState(null);

  const currentQuestion = mathQuestions[gameState.currentStep];

  useEffect(() => {
    setShowVideo(false);
    setShowSolution(false);
  }, [gameState.currentStep]);

  const handleInput = (value) => {
    if (value === "=") {
      handleCheck();
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleCheck = () => {
    const userAnswer =
      currentQuestion.type === "multiple-choice" ? selectedOption : input;

    if (userAnswer === currentQuestion.correctAnswer) {
      handleCorrectAnswer();
      setIsAnswerCorrect(true);
      toast.success("To'g'ri javob!", {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    } else {
      handleWrongAnswer();
      setIsAnswerCorrect(false);
      toast.error("Noto'g'ri javob!", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };

  const handleCorrectAnswer = () => {
    setInput("");
    setSelectedOption(null);

    let heartsToAdd = 1;


  if (gameState.hasViewedSolution || gameState.actionTaken) {
    heartsToAdd = 0;
  }

  setGameState((prev) => ({
    ...prev,
    lives: Math.min(prev.lives + heartsToAdd, 3),
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
    if (!gameState.actionTaken) {
      setShowSolution(true);
      setGameState((prev) => ({
        ...prev,
        lives: prev.lives - 1,
        hasViewedSolution: true,
        roundStatus: "red",
        actionTaken: true,
        viewedSolutionSteps: [...prev.viewedSolutionSteps, prev.currentStep],
      }));
    }
  };

  const handleVideoExplanation = () => {
    if (!gameState.actionTaken) {
      setShowVideo(true); // Show video on button click
      setVideoStep(gameState.currentStep); // Track the current step where video is viewed
      if (gameState.lives > 0) {
        setGameState((prev) => ({
          ...prev,
          lives: prev.lives - 1,
          roundStatus: "yellow", // Change round status to yellow after video
          hasViewedSolution: true,
          actionTaken: true,
        }));
      }
    }
  };


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
    const modal = document.getElementById("my_modal_3");
    modal?.showModal();
  };

  return (
    <div className="">
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
        <button className="btn " onClick={openModal}>
          <p className="bg-black text-white px-3 py-3 rounded-xl">Modal</p>
        </button>
        <dialog id="my_modal_3" className="modal rounded-xl w-full max-w-5xl">
          <div className="modal-box mt-5">
            <Toaster position="top-center" />
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-1 ">
                <X />
              </button>
            </form>
            <div className="bg-gray-100 flex items-center justify-center p-4">
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
                    <div className="bg-gray-50 p-4 rounded-lg flex justify-center items-center mb-4">
                      <p className="text-lg font-medium text-gray-700">
                        Sizning javobingiz:
                      </p>
                      <input
                        type="number"
                        className="border-2 border-gray-300 rounded-lg p-2 mx-5 max-w-[70px]"
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
                    (gameState.isVideoRequired &&
                      !gameState.hasViewedSolution) ||
                    (currentQuestion.type === "completion" &&
                      input.trim() === "")
                  }
                  showNext={showSolution}
                  videoRequired={gameState.isVideoRequired}
                  videoUrl={currentQuestion.videoUrl || ""}
                  actionTaken={gameState.actionTaken}
                  isAnswerCorrect={isAnswerCorrect}
                />

                {showVideo && currentQuestion.videoUrl && (
                  <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                      Video tushuntirish:
                    </h3>
                    <iframe
                      src={currentQuestion.videoUrl}
                      title="Video Explanation"
                      className="w-full h-64 rounded-lg border"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                <SolutionDisplay
                  solution={currentQuestion.solution}
                  isVisible={showSolution}
                />

                <StepTracker
                  currentStep={gameState.currentStep}
                  totalSteps={mathQuestions.length + gameState.strafQuestions}
                  roundStatus={gameState.roundStatus}
                  viewedSolutionSteps={gameState.viewedSolutionSteps}
                  lives={gameState.lives}
                  videoStep={videoStep}
                />
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default Home;
