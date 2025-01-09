import React from "react";

import "../styles/_step-tracker.scss";

export function StepTracker({
  currentStep,
  totalSteps,
  viewedSolutionSteps,
  videoStep,
}) {
  return (
    <div className="step-tracker">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`step ${
            videoStep === index
              ? "step--video"
              : viewedSolutionSteps.includes(index)
              ? "step--viewed"
              : index < currentStep
              ? "step--completed"
              : "step--default"
          }`}
        />
      ))}
    </div>
  );
}
