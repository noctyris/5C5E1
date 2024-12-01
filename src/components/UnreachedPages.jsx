function UnreachedPage(props) {
  function handleReach() {
    props.setReached(true);
    props.setPage(0);
  }
  const UNREACHED_PAGES = [
    <div className="content">
      <h3>Une petite surprise pour toi...</h3>
      <img src="/arrow-down.png" />
      <p id="answer" onClick={() => props.setPage(1)}>
        Découvrir la suite
      </p>
    </div>,
    <div className="content">
      <h3>Un petit jeu</h3>
      <p>Réponds à cette question pour découvrir la suite</p>
      <p id="answer" onClick={() => props.setPage(2)}>
        Je suis prête
      </p>
    </div>,
    <div className="content">
      <h3>Sais-tu pourquoi cette page ?</h3>
      <div className="multiple">
        <p id="answer" onClick={() => props.setPage(4)}>
          Oui
        </p>
        <p id="answer" onClick={() => props.setPage(3)}>
          Non
        </p>
      </div>
    </div>,
    <div className="content">
      <h3>Tu veux savoir pourquoi ?</h3>
      <div className="multiple">
        <p id="answer" onClick={() => props.setPage(4)}>
          Oui
        </p>
        <p id="answer" onClick={() => props.setPage(5)}>
          Non
        </p>
      </div>
    </div>,
    <div className="content">
      <h3>Cool, la suite est ici</h3>
      <img src="/arrow-down.png" />
      <p onClick={() => handleReach()} id="answer">
        Suite {">>"}
      </p>
    </div>,
    <div className="content">
      <h3>Tu es sûre ?</h3>
      <div className="multiple">
        <p id="answer" onClick={() => props.setPage(6)}>
          Oui
        </p>
        <p id="answer" onClick={() => props.setPage(4)}>
          Non
        </p>
      </div>
    </div>,
    <div className="content">
      <h3>Tant pis...</h3>
      <p id="answer" onClick={() => window.close()}>
        ✕
      </p>
    </div>,
  ];

  return UNREACHED_PAGES[props.n];
}

export default UnreachedPage;
