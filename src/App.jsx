import { useState, useEffect } from "react";

function App() {
  function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, "0"))
        .join("");
      return hashHex;
    });
  }
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
  const isTokenValid = hash(token);

  return <p>{isTokenValid}</p>;
}

export default App;
