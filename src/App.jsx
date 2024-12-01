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

  const PASSWORD = "170430";

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
    navigator.clipboard.writeText("0x313730343330");
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
        <code>0x313730343330</code>
      </p>
      <p id="password">{passwordValue}</p>
      <div className="numpad">
        <p
          className="num"
          onClick={() => setPasswordValue(passwordValue + "1")}
        >
          1
        </p>
        <p
          className="num"
          onClick={() => setPasswordValue(passwordValue + "2")}
        >
          2
        </p>
        <p
          className="num"
          onClick={() => setPasswordValue(passwordValue + "3")}
        >
          3
        </p>
        <p
          className="num"
          onClick={() => setPasswordValue(passwordValue + "4")}
        >
          4
        </p>
        <p
          className="num"
          onClick={() => setPasswordValue(passwordValue + "5")}
        >
          5
        </p>
        <p
          className="num"
          onClick={() => setPasswordValue(passwordValue + "6")}
        >
          6
        </p>
        <p
          className="num"
          onClick={() => setPasswordValue(passwordValue + "7")}
        >
          7
        </p>
        <p
          className="num"
          onClick={() => setPasswordValue(passwordValue + "8")}
        >
          8
        </p>
        <p
          className="num"
          onClick={() => setPasswordValue(passwordValue + "9")}
        >
          9
        </p>
        {passwordValue === PASSWORD ? (
          <img src="/validate.png" onClick={() => setPage(1)} className="num" />
        ) : (
          ""
        )}
        <p
          style={{ gridColumn: "2" }}
          className="num"
          onClick={() => setPasswordValue(passwordValue + "0")}
        >
          0
        </p>
        <img
          src="/backspace.png"
          onClick={() => setPasswordValue(passwordValue.slice(0, -1))}
          className="num"
        />
      </div>
    </div>,
    <div className="content">
      <h2>Mon message</h2>
      <p>
        Tu es quelqu'un de très spécial pour moi.
        <br />
        J'espère que tu ressens la même chose.
      </p>
      <p>
        En clair, ça fait{" "}
        {Math.floor(
          (new Date() - new Date("2023-09-04")) / 1000 / 60 / 60 / 24
        )}{" "}
        jours que je t'aime
      </p>
      <p>J'espère que c'est réciporque</p>
      <div className="multiple">
        <p id="answer" onClick={() => setPage(2)}>
          Oui
        </p>
        <p id="answer" onClick={() => setPage(3)}>
          Non
        </p>
      </div>
    </div>,
    <div className="content">
      <h2>Merci !</h2>
      <p>Merci beaucoup !!</p>
      <p id="answer" onClick={() => window.close()}>
        ✕
      </p>
    </div>,
    <div className="content">
      <h2>Mince !</h2>
      <p>Je comprends, merci quand même d'avoir joué le jeu</p>
      <p>J'espère qu'on restera amis</p>
      <p>Et n'en parles pas trop s'il te plaît, j'en aurais un peu honte</p>
      <p id="answer" onClick={() => window.close()}>
        ✕
      </p>
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
      <UnreachedPage n={page} setPage={setPage} setReached={setReached} />
    </main>
  ) : (
    <main className="reached">{REACHED_PAGES[page]}</main>
  );
}

export default App;
