import { CharacterData } from "../CharacterSheet";

interface WaponsProps {
  data: CharacterData;
  updateWeapon: (index: number, value: string) => void;
}

export default function Wapons({ data, updateWeapon }: WaponsProps) {
  return (
    <div>
      <h2 className="section-header text-xl">Armi</h2>
      <div className="space-y-2">
        {data.weapons.map((weapon, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Arma ${i + 1} (Danno / Note)`}
            value={weapon}
            onChange={(e) => updateWeapon(i, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
}
