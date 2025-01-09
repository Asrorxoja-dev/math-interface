import "../styles/_hearts.scss"
import { Heart } from 'lucide-react';



export function Hearts({ lives }) {
  return (
    <div className="hearts">
      {Array.from({ length: 3 }).map((_, index) => (
        <Heart
          key={index}
          className={`heart ${index < lives ? 'heart--filled' : 'heart--empty'}`}
        />
      ))}
    </div>
  );
}