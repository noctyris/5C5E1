import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [leaves, setLeaves] = useState([]);
  const [page, setPage] = useState(0);
  const [isReached, setReached] = useState(0);

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

  const bgColor = [
    { cTop: "#de8c3c", cBottom: "#695140" },
    { cTop: "#ffffff", cBottom: "#000000" },
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
    document
      .querySelector(":root")
      .style.setProperty("--cTop", bgColor[isReached].cTop);
    document
      .querySelector(":root")
      .style.setProperty("--cBottom", bgColor[isReached].cBottom);

    if (!isReached) {
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
    }

    return () => clearInterval(interval);
  }, []);

  const PAGES = [
    <div className="content">
      <h3 id="p1">Une petite surprise pour toi...</h3>
      <img src="/arrow-down.png" />
      <p id="answer" onClick={() => setPage(1)}>
        Découvrir la suite
      </p>
    </div>,
    <div className="content">
      <h3>Un petit jeu</h3>
      <p>Réponds à cette question pour découvrir la suite</p>
      <p id="answer" onClick={() => setPage(2)}>
        Je suis prête
      </p>
    </div>,
    <div className="content">
      <h3>Sais-tu pourquoi cette page ?</h3>
      <div className="multiple">
        <p id="answer" onClick={() => setPage(4)}>
          Oui
        </p>
        <p id="answer" onClick={() => setPage(3)}>
          Non
        </p>
      </div>
    </div>,
    <div className="content">
      <h3>Tu veux savoir pourquoi ?</h3>
      <div className="multiple">
        <p id="answer" onClick={() => setPage(4)}>
          Oui
        </p>
        <p id="answer" onClick={() => setPage(5)}>
          Non
        </p>
      </div>
    </div>,
    <div className="content">
      <h3 id="p1">Cool, la suite est ici</h3>
      <img src="/arrow-down.png" />
      <p onClick={() => setReached(1)} id="answer">
        Suite {">>"}
      </p>
    </div>,
    <div className="content">
      <h3>Tu es sûre ?</h3>
      <div className="multiple">
        <p id="answer" onClick={() => setPage(6)}>
          Oui
        </p>
        <p id="answer" onClick={() => setPage(4)}>
          Non
        </p>
      </div>
    </div>,
    <div className="content">
      <h3>Tant pis...</h3>
    </div>,
  ];

  return !isReached ? (
    <main className="not-reached">
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
  ) : (
    <main className="reached"></main>
  );
}

export default App;
