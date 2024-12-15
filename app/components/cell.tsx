import { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faTimes } from "@fortawesome/free-solid-svg-icons";

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

  const handleclick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
    <div
      className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center border border-gray-300 cursor-pointer hover:bg-gray-200 transition-all duration-300 bg-transparent shadow-md"
      onClick={handleclick}
    >
      <div className="text-4xl md:text-6xl text-white">
        {cell ? (
          cell === "circle" ? (
            <FontAwesomeIcon icon={faCircle} />
          ) : (
            <FontAwesomeIcon icon={faTimes} />
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Cell;