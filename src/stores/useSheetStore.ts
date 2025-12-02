import { create } from "zustand";
import { INITIAL_DATA } from "../constant/initialData";
import { CharacterData } from "../components/CharacterSheet";

interface SheetStore {
  sheet: CharacterData;
  updateSheet: (sheet: CharacterData) => void;
  updateInfo: (field: keyof CharacterData["info"], value: string) => void;
  updateStats: (field: keyof CharacterData["stats"], value: number) => void;
  updateSkills: (field: keyof CharacterData["skills"], value: number) => void;
  updateTracks: (field: keyof CharacterData["tracks"], value: number) => void;
  updateInventory: (value: string) => void;
  updateWeapons: (value: string[]) => void;
  updateTalents: (value: CharacterData["talents"]) => void;
}

export const useSheetStore = create<SheetStore>((set) => ({
  sheet: INITIAL_DATA,
  updateSheet: (sheet: CharacterData) => set({ sheet }),
  updateInfo: (field: keyof CharacterData["info"], value: string) =>
    set((state) => ({
      sheet: {
        ...state.sheet,
        info: {
          ...state.sheet.info,
          [field]: value,
        },
      },
    })),
  updateStats: (field: keyof CharacterData["stats"], value: number) =>
    set((state) => ({
      sheet: {
        ...state.sheet,
        stats: {
          ...state.sheet.stats,
          [field]: value,
        },
      },
    })),
  updateSkills: (field: keyof CharacterData["skills"], value: number) =>
    set((state) => ({
      sheet: {
        ...state.sheet,
        skills: {
          ...state.sheet.skills,
          [field]: value,
        },
      },
    })),
  updateTracks: (field: keyof CharacterData["tracks"], value: number) =>
    set((state) => ({
      sheet: {
        ...state.sheet,
        tracks: {
          ...state.sheet.tracks,
          [field]: value,
        },
      },
    })),
  updateInventory: (value: string) =>
    set((state) => ({
      sheet: {
        ...state.sheet,
        inventory: value,
      },
    })),
  updateWeapons: (value: string[]) =>
    set((state) => ({
      sheet: {
        ...state.sheet,
        weapons: value,
      },
    })),
  updateTalents: (value: CharacterData["talents"]) =>
    set((state) => ({
      sheet: {
        ...state.sheet,
        talents: value,
      },
    })),
}));
