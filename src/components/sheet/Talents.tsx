import { useSheet, useUpdateTalents } from "@/src/stores/useSheetStore.state";
import { CharacterData } from "../CharacterSheet";
export default function Talents() {
  const sheet = useSheet();
  const updateTalent = useUpdateTalents();

  const talentChangeHandler = (
    index: number,
    field: keyof CharacterData["talents"][0],
    value: string | number
  ) => {
    const newTalents = [...sheet.talents];
    newTalents[index] = { ...newTalents[index], [field]: value };
    updateTalent(newTalents);
  };

  return (
    <div className="mt-8 pt-4 border-t border-zinc-800">
      <h2 className="section-header text-xl">Doti & Talenti</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-zinc-500 text-xs uppercase tracking-wider border-b border-zinc-700">
            <th className="py-2 w-3/4">Nome Dote / Descrizione</th>
            <th className="py-2 w-1/8 text-center">Liv.</th>
            <th className="py-2 w-1/8 text-center">Pag.</th>
          </tr>
        </thead>
        <tbody>
          {sheet.talents.map((t, i) => (
            <tr key={i}>
              <td className="py-2 pr-4">
                <input
                  type="text"
                  placeholder="Nome dote..."
                  value={t.name}
                  onChange={(e) =>
                    talentChangeHandler(i, "name", e.target.value)
                  }
                />
              </td>
              <td className="py-2 px-2">
                <input
                  type="number"
                  className="text-center"
                  value={t.level || ""}
                  onChange={(e) =>
                    talentChangeHandler(
                      i,
                      "level",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </td>
              <td className="py-2 pl-2">
                <input
                  type="number"
                  className="text-center text-zinc-500"
                  value={t.page || ""}
                  onChange={(e) =>
                    talentChangeHandler(
                      i,
                      "page",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
