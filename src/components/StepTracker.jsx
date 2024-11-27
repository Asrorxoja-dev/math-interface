export function StepTracker({
  currentStep,
  totalSteps,
  roundStatus,
  viewedSolutionSteps,
  videoStep, // Track the step where video was viewed
}) {
  return (
    <div className="flex justify-center mt-10">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-full mx-1 ${
            videoStep === index
              ? "bg-yellow-500"
              : viewedSolutionSteps.includes(index)
              ? "bg-red-700"
              : index < currentStep
              ? "bg-green-500"
              : "bg-gray-300"
          }`}
        ></div>
      ))}
    </div>
  );
}
