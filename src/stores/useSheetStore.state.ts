import { useSheetStore } from "./useSheetStore";

/**
 * Contains sheet data
 * @returns
 */
export const useSheet = () => useSheetStore((state) => state.sheet);

/**
 * Update sheet data
 * @returns
 */
export const useUpdateSheet = () => useSheetStore((state) => state.updateSheet);

/**
 * Update info data
 * @returns
 */
export const useUpdateInfo = () => useSheetStore((state) => state.updateInfo);

/**
 * Update stats data
 * @returns
 */
export const useUpdateStats = () => useSheetStore((state) => state.updateStats);

/**
 * Update skills data
 * @returns
 */
export const useUpdateSkills = () =>
  useSheetStore((state) => state.updateSkills);

/**
 * Update tracks data
 * @returns
 */
export const useUpdateTracks = () =>
  useSheetStore((state) => state.updateTracks);

/**
 * Update inventory data
 * @returns
 */
export const useUpdateInventory = () =>
  useSheetStore((state) => state.updateInventory);

/**
 * Update weapons data
 * @returns
 */
export const useUpdateWeapons = () =>
  useSheetStore((state) => state.updateWeapons);

/**
 * Update talents data
 * @returns
 */
export const useUpdateTalents = () =>
  useSheetStore((state) => state.updateTalents);
