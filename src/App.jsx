import { useState } from "react";
import Tokenizer from "./components/Tokenizer";

const azertyTable =
  "azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN1234567890&é\"'(-è_çà)=~#{[|`^@]}$*ù!,:;/.?<>";
const decodeToken = (token) =>
  token
    .split("")
    .map(
      (c, i) =>
        azertyTable[
          (azertyTable.indexOf(c) -
            azertyTable.indexOf("_3lEn@~<3_"[i]) +
            azertyTable.length) %
            azertyTable.length
        ]
    )
    .join("");

const validateToken = (token) => {
  if (!token || token.length !== 10) return false;

  const decodedDate = decodeToken(token);
  const hour = decodedDate.slice(0, 4);
  const date = decodedDate.slice(4);

  const currentDate = [
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  ].join("");
  const currentHour = [new Date().getHours(), new Date().getMinutes()].join("");

  return currentDate <= date ? currentHour <= hour : true;
};

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
  const devParam = queryParams.get("p");
  const isTokenValid = validateToken(token);

  const invalidTokenView = <div className="container"><h1>Le token est invalide ou expiré</h1></div>;
  const validTokenView = <div className="container"><h1>Token valide</h1></div>

  return <div>{devParam !== "dev" ? <Tokenizer /> : ""}{isTokenValid ? validTokenView : invalidTokenView}</div>;
}

export default App;
