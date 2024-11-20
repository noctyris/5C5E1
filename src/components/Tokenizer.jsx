import { useState } from "react";

const azertyTable =
  "azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN1234567890&é\"'(-è_çà)=~#{[|`\\^@]}$*ù%!,:;/.?<>";
function createToken(hour, date) {
  const data = [
    hour.split(":").join(""),
    date.split("-").join("").slice(2),
  ].join("");
  console.log(data);
  return data
    .split("")
    .map(
      (c, i) =>
        azertyTable[
          (azertyTable.indexOf(c) + azertyTable.indexOf("_3lEn@~<3_"[i])) %
          azertyTable.length
        ]
    )
    .join("");
}

function TokenEncoder() {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [token, setToken] = useState("");
  const [active, setActive] = useState(false);

  function handleChangeD(e) {
    setDate(e.target.value);
    setToken(createToken(hour, e.target.value)); // Utilisez e.target.value ici
  }

  function handleChangeH(e) {
    setHour(e.target.value);
    setToken(createToken(e.target.value, date)); // Utilisez e.target.value ici
  }

  const activeView = (
    <div className="inside">
      <input type="date" value={date} onChange={handleChangeD} /><br />
      <input type="time" value={hour} onChange={handleChangeH} /><br />
      <br />
      <code>{token}</code>
      <button onClick={() => setActive(false)}>Close</button>
    </div>
  );

  const inactiveView = <button onClick={() => setActive(true)}>Tokenizer</button>;

  return <div className="tokenizer">{active ? activeView : inactiveView}</div>;
}

export default TokenEncoder;
