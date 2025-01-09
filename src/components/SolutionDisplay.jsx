import "../styles/_solution.scss"



export function SolutionDisplay({ solution, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="solution-display">
      <h3>To'g'ri javob:</h3>
      <div className="prose">
        <h2>
          <input
            type="text"
            value={solution}
            readOnly
          />
        </h2>
      </div>
    </div>
  );
}