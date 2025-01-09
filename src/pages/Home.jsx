import React, { useState, useEffect } from "react";
import { X, Calculator as Kalkulator } from "lucide-react";
import { Toaster, toast } from "sonner";
import { Calculator } from "../components/Calculator";
import { StepTracker } from "../components/StepTracker";
import { Hearts } from "../components/Hearts";
import { QuestionDisplay } from "../components/QuestionDisplay";
import { GameControls } from "../components/GameControls";
import { SolutionDisplay } from "../components/SolutionDisplay";
import { mathQuestions } from "../data/questions";
import "../styles/_home.scss";

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
  penaltySteps: [],
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
        style: { backgroundColor: "green", color: "white" },
      });
    } else {
      handleWrongAnswer();
      setIsAnswerCorrect(false);
      toast.error("Noto'g'ri javob!", {
        style: { backgroundColor: "red", color: "white" },
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
      const currentPenaltyStep = gameState.currentStep;
      setGameState((prev) => ({
        ...prev,
        lives: prev.lives - 1,
        strafQuestions:
          prev.lives === 1 ? prev.strafQuestions + 2 : prev.strafQuestions + 1,
        roundStatus: prev.lives === 1 ? "red" : prev.roundStatus,
        penaltySteps: [
          ...prev.penaltySteps,
          ...Array.from({ length: prev.strafQuestions }).map(
            (_, i) => currentPenaltyStep + i
          ),
        ],
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
      setShowVideo(true);
      setVideoStep(gameState.currentStep);
      if (gameState.lives > 0) {
        setGameState((prev) => ({
          ...prev,
          lives: prev.lives - 1,
          roundStatus: "yellow",
          hasViewedSolution: true,
          actionTaken: true,
        }));
      }
    }
  };

  if (gameState.currentStep >= mathQuestions.length) {
    return (
      <div className="home">
        <div className="completion-message">
          <h1>Congratulations! 🎉</h1>
          <p>You've completed all the math questions!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <button
        className="modal-button"
        onClick={() => document.getElementById("my_modal_3")?.showModal()}
      >
        Modal
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <Toaster position="top-center" />
          <form method="dialog">
            <button className="close-button">
              <X />
            </button>
          </form>
          <div className="content">
            <div className="card">
              <Hearts lives={gameState.lives} />
              <QuestionDisplay
                question={currentQuestion}
                roundStatus={gameState.roundStatus}
                onOptionSelect={handleOptionSelect}
                selectedOption={selectedOption}
              />
              {currentQuestion.type === "completion" && (
                <div className="completion-input">
                  <div className="input-container">
                    <p>Sizning javobingiz:</p>
                    <input
                      type="number"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <Kalkulator size={35} />
                  </div>
                  <Calculator onInput={handleInput} />
                </div>
              )}
              <GameControls
                onCheck={handleCheck}
                onViewSolution={handleViewSolution}
                onVideoExplanation={handleVideoExplanation}
                isCheckDisabled={
                  (gameState.isVideoRequired && !gameState.hasViewedSolution) ||
                  (currentQuestion.type === "completion" && input.trim() === "")
                }
                showNext={showSolution}
                videoUrl={currentQuestion.videoUrl || ""}
                actionTaken={gameState.actionTaken}
                currentQuestionId={currentQuestion.id}
              />
              {showVideo && currentQuestion.videoUrl && (
                <div className="video-container">
                  <h3>Video tushuntirish:</h3>
                  <iframe
                    src={currentQuestion.videoUrl}
                    title="Video Explanation"
                    allowFullScreen
                  />
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
                videoStep={videoStep}
                penaltySteps={gameState.penaltySteps}
              />
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Home;
