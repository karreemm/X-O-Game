"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './components/card';
import { Button } from './components/button';
import { CircleIcon, XIcon, TrophyIcon, RefreshCwIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CellProps {
  id: number;
  go: string;
  setgo: React.Dispatch<React.SetStateAction<string>>;
  cells: string[];
  setcells: React.Dispatch<React.SetStateAction<string[]>>;
  cell: string;
  winningmessage: string;
}

const Cell: React.FC<CellProps> = ({ id, go, setgo, cells, setcells, cell, winningmessage }) => {
  const handleCellChange = (cellToChange: string) => {
    const copyCells = [...cells];
    copyCells[id] = cellToChange;
    setcells(copyCells);
  };

  const handleClick = () => {
    if (winningmessage || cells[id]) return;

    if (go === "circle") {
      handleCellChange("circle");
      setgo("cross");
    } else {
      handleCellChange("cross");
      setgo("circle");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: winningmessage ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-xl backdrop-blur-sm 
                 flex items-center justify-center cursor-pointer border-2 border-white/20"
      onClick={handleClick}
    >
      {cell && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-4xl md:text-6xl"
        >
          {cell === "circle" ? (
            <CircleIcon className="w-12 h-12 md:w-16 md:h-16 text-cyan-400" />
          ) : (
            <XIcon className="w-12 h-12 md:w-16 md:h-16 text-pink-400" />
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

interface ScoreCardProps {
  player: string;
  score: number;
  icon: React.ReactNode;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ player, score, icon }) => (
  <Card className="bg-white/10 backdrop-blur-sm border-0 h-12 flex items-center justify-center flex-1">
    <CardContent className="flex items-center justify-center h-full p-0 px-5 space-x-2">
      {icon}
      <p className="text-xl font-bold text-white">{score}</p>
    </CardContent>
  </Card>
);

export default function TicTacToe() {
  const [cells, setcells] = useState(Array(9).fill(""));
  const [go, setgo] = useState("circle");
  const [winningmessage, setwinningmessage] = useState("");
  const [xCounter, setXCounter] = useState(0);
  const [oCounter, setOCounter] = useState(0);

  const winning = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [2, 4, 6], [0, 4, 8]
  ];

  useEffect(() => {
    winning.forEach((combo) => {
      const circleWin = combo.every((x) => cells[x] === "circle");
      const crossWin = combo.every((x) => cells[x] === "cross");
      
      if (circleWin || crossWin) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        if (circleWin) {
          setwinningmessage("Circle Wins!");
          setOCounter(prev => prev + 1);
        } else {
          setwinningmessage("Cross Wins!");
          setXCounter(prev => prev + 1);
        }
      }
    });
  }, [cells]);

  useEffect(() => {
    if (cells.every((cell) => cell !== "") && !winningmessage) {
      setwinningmessage("It's a Draw!");
    }
  }, [cells, winningmessage]);

  const handleReset = () => {
    setcells(Array(9).fill(""));
    setgo("circle");
    setwinningmessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center w-full max-w-md"
      >
        <div className="flex justify-between w-full gap-2 mb-8">
          <ScoreCard 
            player="X" 
            score={xCounter} 
            icon={<XIcon className="w-6 h-6 text-pink-400" />}
          />
          <Button
            onClick={handleReset}
            className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2 flex-1"
          >
            <RefreshCwIcon className="w-4 h-4" />
            New Game
          </Button>
          <ScoreCard 
            player="O" 
            score={oCounter} 
            icon={<CircleIcon className="w-6 h-6 text-cyan-400" />}
          />
        </div>
        
        <div className="flex justify-center">
          <motion.div 
            className="grid grid-cols-3 gap-3 md:gap-4 w-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {cells.map((cell, index) => (
              <Cell
                key={index}
                id={index}
                go={go}
                setgo={setgo}
                cells={cells}
                setcells={setcells}
                cell={cell}
                winningmessage={winningmessage}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center"
        >
          {winningmessage ? (
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-white">
              <TrophyIcon className="w-8 h-8 text-yellow-400" />
              {winningmessage}
            </div>
          ) : (
            <div className="text-xl text-white/90">
              {go === "circle" ? 
                <CircleIcon className="w-8 h-8 text-cyan-400 inline mr-2" /> : 
                <XIcon className="w-8 h-8 text-pink-400 inline mr-2" />
              }
              Turn
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}