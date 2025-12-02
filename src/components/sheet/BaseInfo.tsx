import { useSheet, useUpdateInfo } from "@/src/stores/useSheetStore.state";

export default function BaseInfo() {
    const sheet = useSheet();
    const updateInfo = useUpdateInfo();
  return (
    <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
      <div className="col-span-1 md:col-span-3 text-center mb-4">
        <h1 className="text-4xl text-white font-bold tracking-widest border-b border-zinc-800 pb-4">
          Orbis Arcana
        </h1>
        <p className="text-xs text-zinc-500 mt-1 uppercase tracking-[0.3em]">
          Scheda del Personaggio
        </p>
      </div>

      <div>
        <label className="block text-xs uppercase text-zinc-500 mb-1">
          Nome PG
        </label>
        <input
          type="text"
          className="text-lg font-bold"
          placeholder="..."
          value={sheet.info.name}
          onChange={(e) => updateInfo("name", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-xs uppercase text-zinc-500 mb-1">
          Alias / Nome in Codice
        </label>
        <input
          type="text"
          placeholder="..."
          value={sheet.info.alias}
          onChange={(e) => updateInfo("alias", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-xs uppercase text-zinc-500 mb-1">
          Professione
        </label>
        <input
          type="text"
          placeholder="..."
          value={sheet.info.profession}
          onChange={(e) => updateInfo("profession", e.target.value)}
        />
      </div>
    </div>
  );
}
