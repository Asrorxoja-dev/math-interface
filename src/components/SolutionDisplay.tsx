

interface SolutionDisplayProps {
  solution: string;
  isVisible: boolean;
}

export function SolutionDisplay({ solution, isVisible }: SolutionDisplayProps) {
  if (!isVisible) return null;

  return (
    <div className="mt-6 p-6 bg-green-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Solution</h3>
      <div className="prose prose-sm">
        <h2>
         <input type="text" className="border-2 border-gray-300 rounded-lg p-2 w-full" value={solution} readOnly>
    
         </input>
          </h2>
      </div>
    </div>
  );
}