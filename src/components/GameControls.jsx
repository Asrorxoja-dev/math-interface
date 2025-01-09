import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { toast } from "sonner";
import "../styles/_game-controls.scss";

export function GameControls({
  onCheck,
  onViewSolution,
  onVideoExplanation,
  isCheckDisabled,
  showNext,
  videoUrl,
  actionTaken,
  currentQuestionId,
}) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setShowVideo(false);
  }, [currentQuestionId]);

  const handleVideoExplanation = () => {
    if (!actionTaken && videoUrl) {
      setShowVideo(true);
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
  };

  return (
    <div className="game-controls">
      <div className="controls-row">
        <button
          onClick={handleVideoExplanation}
          disabled={actionTaken}
          className="video-button"
        >
          <Play size={15} className="icon" />
          Video tushuntirish
        </button>

        <div className="button-group">
          <button
            onClick={onViewSolution}
            disabled={actionTaken}
            className="solution"
          >
            Yechimni ko'rish
          </button>

          <button
            onClick={handleCheck}
            disabled={isCheckDisabled}
            className={`check ${showNext ? "next" : ""}`}
          >
            {showNext ? "Keyingi" : "Tekshirish"}
          </button>
        </div>
      </div>
    </div>
  );
}
