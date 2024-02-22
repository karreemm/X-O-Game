"use client";
import { useEffect, useState } from "react";
import Cell from "./components/cell";

export default function Home() {
  const [cells, setcells] = useState(["", "", "", "", "", "", "", "", ""]);
  const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];

  const [go, setgo] = useState("circle");
  const [winningmessage, setwinningmessage] = useState("");

  const [xCounter, setXCounter] = useState(0);
  const [oCounter, setOCounter] = useState(0);

  useEffect(() => {
    winning.forEach((combo) => {
      // x here means element in the combo
      const circlewin = combo.every((x) => cells[x] === "circle");
      const crosswin = combo.every((x) => cells[x] === "cross");

      if (circlewin) {
        setwinningmessage("Circle Wins!");
        setOCounter(oCounter + 1);
      } else if (crosswin) {
        setwinningmessage("Cross Wins!");
        setXCounter(xCounter + 1);
      }
    });
  }, [cells]);

  useEffect(() => {
    if (cells.every((cell) => cell != "") && !winningmessage) {
      setwinningmessage("Its Draw! ");
    }
  }, [cells, winningmessage]);

  const HandleReset = (e) => {
    const emptycell = ["", "", "", "", "", "", "", "", ""];
    setcells(emptycell);
    setgo("circle");
    setwinningmessage("");
  };

  return (
    <>
      <div className="largeContainer">
        <div className="result">
          <div className="resultStates">
            <div className="X">
              <div className="xState">X Score</div>
              <div className="xCounter">{xCounter}</div>
            </div>
            <div className="O">
              <div className="oState">O Score</div>
              <div className="oCounter">{oCounter}</div>
            </div>
          </div>
          <div className="btn">
            <button onClick={HandleReset}>New Game</button>
          </div>
        </div>
        <div className="container">
          <div className="GameBoard">
            {cells.map((cell, index) => (
              <Cell
                id={index}
                go={go}
                setgo={setgo}
                key={index}
                cells={cells}
                setcells={setcells}
                cell={cell}
                winningmessage={winningmessage}
              />
            ))}
          </div>
          <div className="state">{winningmessage}</div>
          {!winningmessage && (
            <div className="state">{`Its Now ${go} Turn!`}</div>
          )}
        </div>
      </div>
    </>
  );
}
