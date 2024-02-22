import { Dispatch, SetStateAction } from "react";

type cellprops = {
  go: string;
  setgo: Dispatch<SetStateAction<string>>;
  id: number;
  cells: string[];
  setcells: Dispatch<SetStateAction<string[]>>;
  cell: string;
  winningmessage: string;
};
const Cell = ({
  go,
  setgo,
  id,
  cells,
  setcells,
  cell,
  winningmessage,
}: cellprops) => {
  const handlecellchange = (celltochange: string) => {
    let copycells = [...cells];
    copycells[id] = celltochange;
    setcells(copycells);
  };

  const handleclick = (e) => {
    if (winningmessage) {
      return;
    }

    const nottaken = !cells[id];

    if (nottaken) {
      if (go === "circle") {
        handlecellchange("circle");
        setgo("cross");
      } else if (go === "cross") {
        handlecellchange("cross");
        setgo("circle");
      }
    }
  };

  return (
    <div className="square" onClick={handleclick}>
      <div className={cell}> {cell ? (cell === "circle" ? "O" : "X") : ""}</div>
    </div>
  );
};
export default Cell;
