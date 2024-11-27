import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { toast } from "sonner";

export function GameControls({
  onCheck,
  onViewSolution,
  onVideoExplanation,
  isCheckDisabled,
  showNext,
  videoUrl,
  actionTaken,
  isAnswerCorrect,
  currentQuestionId, // Add a unique identifier for the current question
}) {
  const [showVideo, setShowVideo] = useState(false); // State to control video display

  // Reset video display whenever the question changes
  useEffect(() => {
    setShowVideo(false);
  }, [currentQuestionId]);

  const handleVideoExplanation = () => {
    if (!actionTaken && videoUrl) {
      setShowVideo(true); // Show the video
    } else {
      alert("Video mavjud emas");
    }
    onVideoExplanation();
  };

  const handleCheck = () => {
    if (isCheckDisabled) {
      toast.error("Siz boshqa savolga o'tishingiz mumkin emas!");
      return;
    }
    onCheck();
    if (isAnswerCorrect) {
      toast.success("To'g'ri javob!", {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    } else {
      toast.error("Noto'g'ri javob!", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="flex justify-between items-center">
        <button
          onClick={handleVideoExplanation}
          disabled={actionTaken}
          className="flex items-center px-4 py-2 text-sm mr-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <Play size={15} className="mr-2" />
          Video tushuntirish
        </button>

        <div className="space-x-4">
          <button
            onClick={onViewSolution}
            disabled={actionTaken}
            className="px-4 py-2 text-sm bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Yechimni ko'rish
          </button>

          <button
            onClick={handleCheck}
            disabled={isCheckDisabled}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              showNext
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } ${isCheckDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {showNext ? "Keyingi" : "Tekshirish"}
          </button>
        </div>
      </div>

    
    </div>
  );
}


