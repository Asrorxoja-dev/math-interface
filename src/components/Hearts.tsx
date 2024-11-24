
import { Heart } from 'lucide-react';

interface HeartsProps {
  lives: number;
}

export function Hearts({ lives }: HeartsProps) {
  return (
    <div className="flex space-x-1 absolute top-4 right-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Heart
          key={index}
          className={`w-5 h-5 ${
            index < lives ? 'fill-red-500 text-red-500' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}