"use client";

import React, { useState, useEffect } from "react";
import BaseInfo from "./sheet/BaseInfo";
import Attributes from "./sheet/Attributes";
import Ability from "./sheet/Ability";
import Talents from "./sheet/Talents";
import Points from "./sheet/Points";
import Inventory from "./sheet/Inventory";
import Wapons from "./sheet/Wapons";

export interface CharacterData {
  info: {
    name: string;
    alias: string;
    profession: string;
  };
  stats: {
    forza: number;
    agilita: number;
    volonta: number;
    intelligenza: number;
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

const INITIAL_DATA: CharacterData = {
  info: { name: "", alias: "", profession: "" },
  stats: { forza: 0, agilita: 0, volonta: 0, intelligenza: 0 },
  skills: {
    movimento: 0,
    resistenza: 0,
    rissa: 0,
    empatia: 0,
    intuizione: 0,
    percezione: 0,
    rituali: 0,
    "armi-da-fuoco": 0,
    furtivi: 0,
    "gioco-di-mano": 0,
    informatica: 0,
    ingegneria: 0,
    investigazione: 0,
    occultismo: 0,
  },
  tracks: { maledetti: 0, salute: 0, stress: 0 },
  inventory: "",
  weapons: ["", "", ""],
  talents: Array(5).fill({ name: "", level: 0, page: 0 }),
};

export default function CharacterSheet() {
  const [data, setData] = useState<CharacterData>(INITIAL_DATA);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("orbis-arcana-sheet");
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem("orbis-arcana-sheet", JSON.stringify(data));
  }, [data]);

  const updateInfo = (field: keyof CharacterData["info"], value: string) => {
    setData((prev) => ({ ...prev, info: { ...prev.info, [field]: value } }));
  };

  const updateStat = (field: keyof CharacterData["stats"], value: number) => {
    setData((prev) => ({ ...prev, stats: { ...prev.stats, [field]: value } }));
  };

  const updateSkill = (field: keyof CharacterData["skills"], value: number) => {
    setData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [field]: value },
    }));
  };

  const updateTrack = (track: keyof CharacterData["tracks"], value: number) => {
    setData((prev) => {
      // Toggle logic: if clicking the current value, reset to 0 (or lower? logic in original was clear/fill)
      // Original logic: if clicking highest filled, clear it. Else fill up to clicked.
      // Here we just set the value. If we click the same value, we might want to decrease by 1?
      // Let's stick to simple setting for now, or implement the exact logic in the render.
      // Actually, let's implement the exact logic from the original script in the click handler of the circle.
      return { ...prev, tracks: { ...prev.tracks, [track]: value } };
    });
  };

  const handleTrackClick = (
    track: keyof CharacterData["tracks"],
    index: number
  ) => {
    const currentValue = data.tracks[track];
    // index is 1-based here
    if (currentValue === index) {
      // If clicking the last filled one, remove it (set to index - 1)
      updateTrack(track, index - 1);
    } else {
      // Fill up to index
      updateTrack(track, index);
    }
  };

  const updateInventory = (value: string) => {
    setData((prev) => ({ ...prev, inventory: value }));
  };

  const updateWeapon = (index: number, value: string) => {
    const newWeapons = [...data.weapons];
    newWeapons[index] = value;
    setData((prev) => ({ ...prev, weapons: newWeapons }));
  };

  const updateTalent = (
    index: number,
    field: keyof CharacterData["talents"][0],
    value: string | number
  ) => {
    const newTalents = [...data.talents];
    newTalents[index] = { ...newTalents[index], [field]: value };
    setData((prev) => ({ ...prev, talents: newTalents }));
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `character-${data.info.name || "sheet"}.json`;
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
        setData(json);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-6xl bg-zinc-900 p-6 md:p-10 shadow-2xl border border-zinc-800 relative">
      {/* Header / Info Base */}
      <BaseInfo data={data} updateInfo={updateInfo} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Attributes & Skills */}
        <div className="lg:col-span-7 space-y-8">
          {/* CARATTERISTICHE */}
          <Attributes data={data} updateStat={updateStat} />

          {/* ABILITÀ */}
          <Ability data={data} updateSkill={updateSkill} />

          {/* ZAINO */}
          <Inventory data={data} updateInventory={updateInventory} />
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
          <Points data={data} handleTrackClick={handleTrackClick} />
          {/* DOTI */}
          <Talents data={data} updateTalent={updateTalent} />
        </div>
        <div className="lg:col-span-12 space-y-8 break-inside-avoid">
          {/* ARMI */}
          <Wapons data={data} updateWeapon={updateWeapon} />
        </div>
      </div>

      <div className="mt-8 text-center no-print space-x-4">
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
          onClick={() => window.print()}
          className="bg-zinc-800 hover:bg-yellow-900 text-white font-bold py-2 px-6 rounded border border-yellow-800 transition-colors uppercase tracking-widest text-sm cursor-pointer"
        >
          Scarica PDF
        </button>
        <button
          onClick={() => setData(INITIAL_DATA)}
          className="bg-zinc-800 hover:bg-red-900 text-white font-bold py-2 px-6 rounded border border-red-800 transition-colors uppercase tracking-widest text-sm cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
