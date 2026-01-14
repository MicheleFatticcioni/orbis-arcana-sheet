"use client";

import React, { useState } from "react";

interface SkillRollModalProps {
  isOpen: boolean;
  onClose: () => void;
  skillName: string;
  skillValue: number;
}

export default function SkillRollModal({
  isOpen,
  onClose,
  skillName,
  skillValue,
}: SkillRollModalProps) {
  const [modifier, setModifier] = useState<number>(0);

  if (!isOpen) return null;

  const handleRoll = () => {
    // For now, simple alert. Logic can be expanded later.
    const roll = Math.floor(Math.random() * 10) + 1;
    const total = roll + skillValue + modifier;
    alert(
      `Tiro su ${skillName.toUpperCase()}:
      
Dado: ${roll}
Abilità: ${skillValue}
Modificatore: ${modifier}

TOTALE: ${total}`
    );
    onClose();
    setModifier(0); // Reset after roll
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-lg shadow-xl w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-zinc-400 hover:text-white"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-center mb-4 text-white uppercase tracking-wider">
          {skillName}
          <span className="block text-sm text-zinc-500 normal-case mt-1">
            Valore Base: {skillValue}
          </span>
        </h3>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-zinc-800 p-2 rounded">
            <span className="text-zinc-300 text-sm">Modificatore</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setModifier((m) => m - 1)}
                className="w-8 h-8 flex items-center justify-center bg-zinc-700 hover:bg-zinc-600 rounded text-white font-bold"
              >
                -
              </button>
              <input
                type="number"
                value={modifier}
                onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
                className="w-12 bg-transparent text-center text-white font-bold focus:outline-none"
              />
              <button
                onClick={() => setModifier((m) => m + 1)}
                className="w-8 h-8 flex items-center justify-center bg-zinc-700 hover:bg-zinc-600 rounded text-white font-bold"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleRoll}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded uppercase tracking-widest transition-colors mt-2"
          >
            Tira
          </button>
        </div>
      </div>
    </div>
  );
}
