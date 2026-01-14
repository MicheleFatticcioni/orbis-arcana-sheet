"use client";

import React, { useEffect } from "react";
import BaseInfo from "./sheet/BaseInfo";
import Attributes from "./sheet/Attributes";
import Ability from "./sheet/Ability";
import Talents from "./sheet/Talents";
import Points from "./sheet/Points";
import Inventory from "./sheet/Inventory";
import Wapons from "./sheet/Wapons";
import PregeneratedLoader from "./sheet/PregeneratedLoader";
import { INITIAL_DATA } from "../constant/initialData";
import { useSheet, useUpdateSheet } from "../stores/useSheetStore.state";

export interface CharacterData {
  info: {
    name: string;
    alias: string;
    profession: string;
  };
  stats: {
    forza: number;
    agilita: number;
    spirito: number;
    ingegno: number;
  };
  skills: {
    [key: string]: number;
  };
  tracks: {
    maledetti: number;
    salute: number;
    stress: number;
  };
  inventory: string;
  weapons: string[];
  talents: { name: string; level: number; page: number }[];
}

export default function CharacterSheet() {
  const sheet = useSheet();
  const updateSheet = useUpdateSheet();
  console.log(sheet);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("orbis-arcana-sheet");
    if (saved) {
      try {
        updateSheet(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem("orbis-arcana-sheet", JSON.stringify(sheet));
  }, [sheet]);

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(sheet, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `character-${sheet.info.name || "sheet"}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        updateSheet(json);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-6xl bg-zinc-900 p-6 md:p-10 shadow-2xl border border-zinc-800 relative">
      {/* Header / Info Base */}
      <BaseInfo />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Attributes & Skills */}
        <div className="lg:col-span-7 space-y-8">
          {/* CARATTERISTICHE */}
          <Attributes />

          {/* ABILITÀ */}
          <Ability />

          {/* ZAINO */}
          <Inventory />
        </div>

        {/* RIGHT COLUMN: Points & Inventory */}
        <div className="lg:col-span-5 space-y-8 break-inside-avoid">
          {/* Header for Print */}
          <div className="only-print col-span-12 text-center my-4">
            <h1 className="text-4xl text-white font-bold tracking-widest border-b border-zinc-800 pb-4">
              Orbis Arcana
            </h1>
            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-[0.3em]">
              Scheda del Personaggio
            </p>
          </div>

          {/* PUNTI (Tracks) */}
          <Points />
          {/* DOTI */}
          <Talents />
        </div>
        <div className="lg:col-span-12 space-y-8 break-inside-avoid">
          {/* ARMI */}
          <Wapons />
        </div>
      </div>

      <div className="mt-8 text-center no-print flex flex-col items-center justify-center gap-4">
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => document.getElementById("file-upload")?.click()}
            className="bg-zinc-800 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded border border-blue-800 transition-colors uppercase tracking-widest text-sm cursor-pointer"
          >
            Carica Dati
          </button>
          <input
            type="file"
            id="file-upload"
            accept=".json"
            className="hidden"
            style={{ display: "none" }}
            onChange={handleUpload}
          />
          <button
            onClick={handleDownload}
            className="bg-zinc-800 hover:bg-green-900 text-white font-bold py-2 px-6 rounded border border-green-800 transition-colors uppercase tracking-widest text-sm cursor-pointer"
          >
            Scarica Dati
          </button>
          <button
            onClick={() => updateSheet(INITIAL_DATA)}
            className="bg-zinc-800 hover:bg-red-900 text-white font-bold py-2 px-6 rounded border border-red-800 transition-colors uppercase tracking-widest text-sm cursor-pointer"
          >
            Reset
          </button>
        </div>

        <div className="border-t border-zinc-800 pt-4 w-full flex justify-center">
          <PregeneratedLoader />
        </div>
      </div>
    </div>
  );
}
