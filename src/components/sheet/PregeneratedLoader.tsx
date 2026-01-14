"use client";

import React, { useEffect, useState } from "react";
import { useUpdateSheet } from "@/src/stores/useSheetStore.state";

export default function PregeneratedLoader() {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const updateSheet = useUpdateSheet();

  useEffect(() => {
    fetch("/api/pregenerated")
      .then((res) => res.json())
      .then((data) => {
        if (data.files) {
          setFiles(data.files);
        }
      })
      .catch((err) => console.error("Failed to load pregenerated files", err));
  }, []);

  const handleLoad = async () => {
    if (!selectedFile) return;
    try {
      const res = await fetch(`/pregenerated/${selectedFile}`);
      const json = await res.json();
      updateSheet(json);
      // Optional: Add success feedback
    } catch (err) {
      console.error("Failed to load character", err);
      alert("Errore nel caricamento del personaggio");
    }
  };

  if (files.length === 0) return null;

  return (
    <div className="flex gap-2 items-center">
      <select
        value={selectedFile}
        onChange={(e) => setSelectedFile(e.target.value)}
        className="bg-zinc-800 text-white text-sm p-2 rounded border border-zinc-700 focus:outline-none focus:border-zinc-500"
      >
        <option value="">-- Seleziona Personaggio --</option>
        {files.map((file) => (
          <option key={file} value={file}>
            {file.replace(".json", "").replace(/_/g, " ").toUpperCase()}
          </option>
        ))}
      </select>
      <button
        onClick={handleLoad}
        disabled={!selectedFile}
        className="bg-zinc-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded border border-blue-800 transition-colors uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Carica
      </button>
    </div>
  );
}
