import React, { useEffect, useState } from "react";

const GameCanvas = () => {
  const [happiness, setHappiness] = useState(50);
  const [hunger, setHunger] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      setHappiness(prev => (prev > 0 ? prev - 5 : 0));
      setHunger(prev => (prev > 0 ? prev - 5 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const feed = () => {
    setHunger(prev => (prev < 95 ? prev + 5 : 100));
  };

  const play = () => {
    setHappiness(prev => (prev < 95 ? prev + 5 : 100));
  };

  return (
    <div>
      <h1>Tamagotchi Game</h1>
      <div>
        <p>Happiness: {happiness}</p>
        <p>Hunger: {hunger}</p>
      </div>
      <button onClick={feed}>Feed</button>
      <button onClick={play}>Play</button>
    </div>
  );
};

export default GameCanvas;
