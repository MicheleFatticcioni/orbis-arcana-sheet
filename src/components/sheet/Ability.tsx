import { useSheet, useUpdateSkills } from "@/src/stores/useSheetStore.state";

export default function Ability() {
  const sheet = useSheet();
  const updateSkill = useUpdateSkills();
  return (
    <div>
      <h2 className="section-header text-xl">Abilità</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* FOR Skills */}
        <div className="border-l-2 border-zinc-700 pl-4">
          <h3 className="text-zinc-500 text-sm mb-2">Forza</h3>
          <div className="space-y-2">
            {["prestanza", "resistenza", "rissa"].map((skill) => (
              <div key={skill} className="flex justify-between items-center">
                <span className="text-sm capitalize">{skill}</span>
                <div className="w-12">
                  <input
                    type="number"
                    className="w-12 text-right"
                    placeholder="0"
                    value={
                      sheet.skills[skill as keyof typeof sheet.skills] || 0
                    }
                    onChange={(e) =>
                      updateSkill(skill, parseInt(e.target.value) || 0)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AGI Skills */}
        <div className="border-l-2 border-zinc-700 pl-4">
          <h3 className="text-zinc-500 text-sm mb-2">Agilità</h3>
          <div className="space-y-2">
            {["armi-da-fuoco", "furtività", "gioco-di-mano", "movimento"].map((skill) => (
              <div key={skill} className="flex justify-between items-center">
                <span className="text-sm capitalize">
                  {skill.replace(/-/g, " ")}
                </span>
                <div className="w-12">
                  <input
                    type="number"
                    className="w-12 text-right"
                    placeholder="0"
                    value={
                      sheet.skills[skill as keyof typeof sheet.skills] || 0
                    }
                    onChange={(e) =>
                      updateSkill(
                        skill as keyof typeof sheet.skills,
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VOL Skills */}
        <div className="border-l-2 border-zinc-700 pl-4">
          <h3 className="text-zinc-500 text-sm mb-2">Spirito</h3>
          <div className="space-y-2">
            {["empatia", "intuizione", "investigazione", "rituali"].map((skill) => (
              <div key={skill} className="flex justify-between items-center">
                <span className="text-sm capitalize">{skill}</span>
                <div className="w-12">
                  <input
                    type="number"
                    className="w-12 text-right"
                    placeholder="0"
                    value={
                      sheet.skills[skill as keyof typeof sheet.skills] || 0
                    }
                    onChange={(e) =>
                      updateSkill(
                        skill as keyof typeof sheet.skills,
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INT Skills */}
        <div className="border-l-2 border-zinc-700 pl-4">
          <h3 className="text-zinc-500 text-sm mb-2">Ingeno</h3>
          <div className="space-y-2">
            {["informatica", "ingegneria", "investigazione", "occultismo"].map(
              (skill) => (
                <div key={skill} className="flex justify-between items-center">
                  <span className="text-sm capitalize">{skill}</span>
                  <div className="w-12">
                    <input
                      type="number"
                      className="w-12 text-right"
                      placeholder="0"
                      value={
                        sheet.skills[skill as keyof typeof sheet.skills] || 0
                      }
                      onChange={(e) =>
                        updateSkill(
                          skill as keyof typeof sheet.skills,
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
