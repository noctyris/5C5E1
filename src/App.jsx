import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [leaves, setLeaves] = useState([]);
  const [page, setPage] = useState(0);
  const COLORS = [
    "#631601",
    "#da0001",
    "#db4901",
    "#b25600",
    "#f78701",
    "#ffc502",
    "#606C38",
    "#283618",
    "#fefae0",
    "#dda15e",
    "#bc6c25",
  ];
  useEffect(() => {
    const initialLeaves = Array.from({ length: 60 }, () => ({
      id: `leave-${nanoid()}`,
      posX: randint(-55, window.innerWidth - 55),
      posY: randint(-55, window.innerHeight - 55),
      shape: randint(70, 100),
      orientation: randint(0, 360),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    setLeaves(initialLeaves);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeaves((prevLeaves) =>
        prevLeaves.map((leaf) => {
          const newPosY = leaf.posY + 1; // Déplace la feuille vers le bas
          if (newPosY > window.innerHeight) {
            // Si la feuille sort de l'écran, réinitialise sa position en haut
            return {
              ...leaf,
              posY: 0,
              posX: randint(0, window.innerWidth - 55),
            };
          }
          return { ...leaf, posY: newPosY };
        })
      );
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const PAGES = [
    <div className="content">
      <h1 id="p1">Une petite surprise pour toi...</h1>
      <img src="/arrow-down.png" />
      <p onClick={() => setPage(1)}>Découvrir la suite</p>
    </div>,
    <div className="content">Hello</div>,
  ];

  return (
    <main>
      {leaves.map((l) => (
        <span
          className="leaf"
          style={{
            backgroundColor: l.color,
            color: l.color,
            borderRadius: `0 ${l.shape}px`,
            top: l.posY,
            left: l.posX,
            transform: `rotate(${l.orientation}deg)`,
          }}
          key={l.id}
        >
          {" "}
        </span>
      ))}
      {PAGES[page]}
    </main>
  );
}

export default App;
