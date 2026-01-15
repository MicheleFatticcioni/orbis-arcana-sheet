"use client";

import React, { useState } from "react";
import Image from "next/image";

interface SkillRollModalProps {
  isOpen: boolean;
  onClose: () => void;
  skillName: string;
  skillValue: number;
  attributeName: string;
  attributeValue: number;
}

export default function SkillRollModal({
  isOpen,
  onClose,
  skillName,
  skillValue,
  attributeName,
  attributeValue,
}: SkillRollModalProps) {
  const [modifier, setModifier] = useState<number>(0);
  const [attributeRollResults, setAttributeRollResults] = useState<number[]>(
    []
  );
  const [skillRollResults, setSkillRollResults] = useState<number[]>([]);
  const [negativeRolls, setNegativeRolls] = useState<number[]>([]);
  const [totalSuccess, setTotalSuccess] = useState<number>(0);

  if (!isOpen) return null;

  const handleRoll = () => {
    // For now, simple alert. Logic can be expanded later.
    const attributeRollResults = Array.from(
      { length: attributeValue },
      () => Math.floor(Math.random() * 6) + 1
    );

    const skillRollResults = Array.from(
      { length: skillValue + (modifier > 0 ? modifier : 0) },
      () => Math.floor(Math.random() * 6) + 1
    );

    const negativeRolls = Array.from(
      { length: modifier < 0 ? modifier * -1 : 0 },
      () => Math.floor(Math.random() * 6) + 1
    );

    setAttributeRollResults(attributeRollResults);
    setSkillRollResults(skillRollResults);
    setNegativeRolls(negativeRolls);

    const totalSuccess =
      skillRollResults.filter((roll) => roll == 6).length +
      attributeRollResults.filter((roll) => roll == 6).length -
      negativeRolls.filter((roll) => roll == 6).length;

    setTotalSuccess(totalSuccess);
  };

  const handleClose = () => {
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
            {attributeName}: {attributeValue}
          </span>
          <span className="block text-sm text-zinc-500 normal-case mt-1">
            {skillName}: {skillValue}
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

        {(attributeRollResults.length > 0 || skillRollResults.length > 0) && (
          <div className="mt-6 space-y-4 border-t border-zinc-700 pt-4">
            {/* Risultato Totale */}
            <div className="text-center bg-zinc-800 p-3 rounded-lg border border-zinc-600">
              <span className="block text-zinc-400 text-xs uppercase tracking-widest mb-1">
                Totale Successi
              </span>
              <span className="text-4xl font-bold text-white">
                {totalSuccess}
              </span>
            </div>

            {/* Dadi Attributo */}
            {attributeRollResults.length > 0 && (
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                  {attributeName} ({attributeRollResults.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {attributeRollResults.map((result, i) => (
                    <Image
                      key={`attr-${i}`}
                      src={`/dice/attribute/black-dice-${result}.png`}
                      alt={`Dado ${result}`}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Dadi Abilità */}
            {skillRollResults.length > 0 && (
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                  {skillName} ({skillRollResults.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {skillRollResults.map((result, i) => (
                    <Image
                      key={`skill-${i}`}
                      src={`/dice/ability/red-dice-${result}.png`}
                      alt={`Dado ${result}`}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Dadi Modificatore Negativo (se presenti) */}
            {negativeRolls.length > 0 && (
              <div>
                <p className="text-xs text-red-400 uppercase tracking-wider mb-2">
                  Malus ({negativeRolls.length})
                </p>
                <div className="flex flex-wrap gap-2 opacity-80">
                  {negativeRolls.map((result, i) => (
                    <Image
                      key={`neg-${i}`}
                      src={`/dice/ability/red-dice-${result}.png`}
                      alt={`Dado ${result}`}
                      width={40}
                      height={40}
                      className="object-contain hue-rotate-180 grayscale-[0.5]"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
