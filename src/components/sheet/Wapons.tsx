import { useSheet, useUpdateWeapons } from "@/src/stores/useSheetStore.state";

export default function Wapons() {
  const sheet = useSheet();
  const updateWeapons = useUpdateWeapons();

  const weaponChangeHandler = (index: number, value: string) => {
    const newWeapons = [...sheet.weapons];
    newWeapons[index] = value;
    updateWeapons(newWeapons);
  };

  return (
    <div>
      <h2 className="section-header text-xl">Armi</h2>
      <div className="space-y-2">
        {sheet.weapons.map((weapon, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Arma ${i + 1} (Danno / Note)`}
            value={weapon}
            onChange={(e) => weaponChangeHandler(i, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
}
