import React, { useEffect, useState } from "react";
import UnreachedPage from "./components/UnreachedPages";
import { nanoid } from "nanoid";

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [leaves, setLeaves] = useState([]);
  const [page, setPage] = useState(0);
  const [isReached, setReached] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const PASSWORD = "cUt3qsqJ";

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
    if (!isReached) {
      const interval = setInterval(() => {
        setLeaves((prevLeaves) =>
          prevLeaves.map((leaf) => {
            const newPosY = leaf.posY + 1;
            if (newPosY > window.innerHeight) {
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
    }
  }, []);

  function copy() {
    navigator.clipboard.writeText("Y1V0M3FzcUo=");
    alert("Copié");
  }

  function handleChange(e) {
    setPasswordValue(e.target.value);
  }

  const REACHED_PAGES = [
    <div className="content">
      <h3>Pour accéder au site, trouve le mot de passe :</h3>
      <p>Crypté: </p>
      <p onClick={() => copy()}>
        <code>Y1V0M3FzcUo=</code>
      </p>
      <img src="/arrow-down.png" />
        <input
          type="password"
          id="password"
          value={passwordValue}
          onChange={handleChange}
          style={{boxShadow: (passwordValue === PASSWORD) ? "0 0 30px #00ff00" : "none"}}
        />
      {(passwordValue === PASSWORD) ? <button onClick={() => setPage(1)}>Go</button> : ""}
    </div>,
    <div className="content">Hello</div>
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
      <UnreachedPage n={page} setPage={setPage} setReached={setReached} />
    </main>
  ) : (
    <main className="reached">{REACHED_PAGES[page]}</main>
  );
}

export default App;
