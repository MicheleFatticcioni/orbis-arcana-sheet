import { useSheet, useUpdateInventory } from "@/src/stores/useSheetStore.state";

export default function Inventory() {
  const sheet = useSheet();
  const updateInventory = useUpdateInventory();
  return (
    <div>
      <h2 className="section-header text-xl">Zaino</h2>
      <div className="w-full bg-zinc-800/30 border border-zinc-700 p-2 min-h-[200px]">
        {/* <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-zinc-500 text-xs uppercase tracking-wider border-b border-zinc-700">
              <th className="py-2 w-3/4">Oggetto</th>
              <th className="py-2 w-1/8 text-center">Quantità</th>
              <th className="py-2 w-1/8 text-center">Note</th>
            </tr>
          </thead>
          <tbody>
            {data.talents.map((t, i) => (
              <tr key={i}>
                <td className="py-2 pr-4">
                  <input
                    type="text"
                    placeholder="Nome"
                    value={t.name}
                    onChange={(e) => updateTalent(i, "name", e.target.value)}
                  />
                </td>
                <td className="py-2 px-2">
                  <input
                    type="number"
                    className="text-center"
                    value={t.level || ""}
                    onChange={(e) =>
                      updateTalent(i, "level", parseInt(e.target.value) || 0)
                    }
                  />
                </td>
                <td className="py-2 pl-2">
                  <input
                    type="number"
                    className="text-center text-zinc-500"
                    value={t.page || ""}
                    onChange={(e) =>
                      updateTalent(i, "page", parseInt(e.target.value) || 0)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <textarea
          className="w-full h-full bg-transparent border-none resize-none text-sm"
          placeholder="Equipaggiamento, consumabili, oggetti chiave..."
          value={sheet.inventory}
          onChange={(e) => updateInventory(e.target.value)}
          rows={10}
        ></textarea>
      </div>
    </div>
  );
}
