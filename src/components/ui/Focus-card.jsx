import React, { useState } from "react";
import { cn } from "../../utils/cd";
import { Link } from "react-router-dom";

export const Card = React.memo(({
  card,
  index,
  hovered,
  setHovered,
}) => (

  <Link
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    to={`${card.categoryId}`}
    className={cn(
      "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
      hovered !== null && hovered !== index && "lg:blur-sm lg:scale-[0.98]"
    )}>
    
    <img
      src={card.image} 
      alt={card.title}
      className="absolute inset-0 object-cover w-full h-full" 
    />
    
    <div
      className={cn(
        "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
        hovered === index ? "lg:opacity-100" : "lg:opacity-0"
      )}>
      <div
        className="text-xl flex flex-col md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
        {card.title}
      </div>
    </div>
  </Link>
));


Card.displayName = "Card";

export function FocusCards({
  cards
}) {
  const [hovered, setHovered] = useState(null);
  return (
    (<div
      className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered} />
      ))}
    </div>)
  );
}
