import { useSheet, useUpdateStats } from "@/src/stores/useSheetStore.state";
import { useIsMobile } from "@/src/hooks/useIsMobile";

export default function Attributes() {
  const sheet = useSheet();
  const updateStat = useUpdateStats();
  const isMobile = useIsMobile();

  return (
    <div>
      <h2 className="section-header text-xl">Caratteristiche</h2>
      <div className="grid grid-cols-4 gap-4">
        {["forza", "agilita", "volonta", "intelligenza"].map((stat) => (
          <div
            key={stat}
            className="stat-box p-4 flex flex-col items-center justify-center aspect-square rounded"
          >
            <span className="gothic-font text-sm text-zinc-400 mb-2 capitalize">
              {isMobile ? stat.slice(0, 3).toUpperCase() : stat}
            </span>
            <input
              type="number"
              className="text-center text-3xl font-bold bg-transparent !border-none w-full focus:ring-0"
              value={sheet.stats[stat as keyof typeof sheet.stats] || 0}
              onChange={(e) =>
                updateStat(
                  stat as keyof typeof sheet.stats,
                  parseInt(e.target.value) || 0
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
