interface StepTrackerProps {
  currentStep: number;
  totalSteps: number;
}

export function StepTracker({ currentStep, totalSteps }: StepTrackerProps) {
  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full ${
            index === currentStep
              ? "bg-red-500"
              : index < currentStep
              ? "bg-green-600"
              : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
