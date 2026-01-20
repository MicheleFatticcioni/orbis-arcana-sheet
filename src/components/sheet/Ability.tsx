import { useState } from "react";
import { useSheet, useUpdateSkills } from "@/src/stores/useSheetStore.state";
import SkillRollModal from "./SkillRollModal";

export default function Ability() {
  const sheet = useSheet();
  const updateSkill = useUpdateSkills();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedAttribute, setSelectedAttribute] = useState<string | null>(
    null,
  );

  const handleSkillClick = (skill: string, attribute: string) => {
    setSelectedSkill(skill);
    setSelectedAttribute(attribute);
  };

  const getSkillValue = (skill: string) => {
    return sheet.skills[skill as keyof typeof sheet.skills] || 0;
  };

  const getAttributeValue = (attribute: string) => {
    return sheet.stats[attribute as keyof typeof sheet.stats] || 0;
  };

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
                <span
                  className="text-sm capitalize cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSkillClick(skill, "forza")}
                >
                  {skill}
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
            {["armi-da-fuoco", "furtività", "gioco-di-mano", "movimento"].map(
              (skill) => (
                <div key={skill} className="flex justify-between items-center">
                  <span
                    className="text-sm capitalize cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSkillClick(skill, "agilita")}
                  >
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
                          parseInt(e.target.value) || 0,
                        )
                      }
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {/* VOL Skills */}
        <div className="border-l-2 border-zinc-700 pl-4">
          <h3 className="text-zinc-500 text-sm mb-2">Spirito</h3>
          <div className="space-y-2">
            {["empatia", "intuizione", "investigazione", "rituali"].map(
              (skill) => (
                <div key={skill} className="flex justify-between items-center">
                  <span
                    className="text-sm capitalize cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSkillClick(skill, "spirito")}
                  >
                    {skill}
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
                          parseInt(e.target.value) || 0,
                        )
                      }
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {/* INT Skills */}
        <div className="border-l-2 border-zinc-700 pl-4">
          <h3 className="text-zinc-500 text-sm mb-2">Ingeno</h3>
          <div className="space-y-2">
            {["medicina", "ingegneria", "percezione", "occultismo"].map(
              (skill) => (
                <div key={skill} className="flex justify-between items-center">
                  <span
                    className="text-sm capitalize cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSkillClick(skill, "ingegno")}
                  >
                    {skill}
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
                          parseInt(e.target.value) || 0,
                        )
                      }
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      <SkillRollModal
        isOpen={!!selectedSkill && !!selectedAttribute}
        onClose={() => {
          setSelectedSkill(null);
          setSelectedAttribute(null);
        }}
        skillName={selectedSkill?.replace(/-/g, " ") || ""}
        skillValue={selectedSkill ? getSkillValue(selectedSkill) : 0}
        attributeName={selectedAttribute?.replace(/-/g, " ") || ""}
        attributeValue={
          selectedAttribute ? getAttributeValue(selectedAttribute) : 0
        }
        cursedValue={sheet.tracks.maledetti || 0}
      />
    </div>
  );
}
