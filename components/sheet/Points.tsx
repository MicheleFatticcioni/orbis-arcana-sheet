import { CharacterData } from "../CharacterSheet";
import { BaseSheetProps } from "./sheet.interface";

interface PointsProps extends BaseSheetProps {
  handleTrackClick: (
    track: keyof CharacterData["tracks"],
    index: number
  ) => void;
}

export default function Points({ data, handleTrackClick }: PointsProps) {
  return (
    <div className="bg-zinc-800/50 p-6 rounded border border-zinc-700">
      <h2 className="section-header text-xl mb-4">Stato Vitale</h2>

      {/* Dadi Maledetti */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="gothic-font font-bold text-purple-400">
            Dadi Maledetti
          </span>
          <span className="text-xs text-zinc-500">CORRUZIONE</span>
        </div>
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`track-circle ${
                i <= data.tracks.maledetti ? "filled" : ""
              }`}
              onClick={() => handleTrackClick("maledetti", i)}
            />
          ))}
        </div>
      </div>

      {/* Salute */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="gothic-font font-bold text-red-500">Salute</span>
          <span className="text-xs text-zinc-500">FISICO</span>
        </div>
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`track-circle ${
                i <= data.tracks.salute ? "filled" : ""
              }`}
              onClick={() => handleTrackClick("salute", i)}
            />
          ))}
        </div>
      </div>

      {/* Stress */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="gothic-font font-bold text-blue-400">Stress</span>
          <span className="text-xs text-zinc-500">MENTALE</span>
        </div>
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`track-circle ${
                i <= data.tracks.stress ? "filled" : ""
              }`}
              onClick={() => handleTrackClick("stress", i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
