export function StepTracker({
  currentStep,
  totalSteps,
  roundStatus,
  viewedSolutionSteps,
}: {
  currentStep: number;
  totalSteps: number;
  roundStatus: string;
  viewedSolutionSteps: number[];
}) {
  return (
    <div className="flex justify-center mt-4">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-full mx-1 ${
            viewedSolutionSteps.includes(index) 
              ? "bg-red-500"
              : index < currentStep
              ? "bg-green-500"
              : "bg-gray-300"
          }`}
        ></div>
      ))}
    </div>
  );
}
