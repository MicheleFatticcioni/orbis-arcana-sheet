import { CharacterData } from "@/components/CharacterSheet";
import html2pdf from "html2pdf.js";

const skillNames: { [key: string]: string } = {
  prestanza: "Prestanza",
  resistenza: "Resistenza",
  rissa: "Rissa",
  "armi-da-fuoco": "Armi Da Fuoco",
  furtivita: "Furtività",
  "gioco-di-mano": "Gioco Di Mano",
  movimento: "Movimento",
  empatia: "Empatia",
  intuizione: "Intuizione",
  percezione: "Percezione",
  rituali: "Rituali",
  medicina: "Medicina",
  ingegneria: "Ingegneria",
  investigazione: "Investigazione",
  occultismo: "Occultismo",
};

const skillGroups: { [key: string]: string[] } = {
  forza: ["prestanza", "resistenza", "rissa"],
  agilita: ["armi-da-fuoco", "furtivita", "gioco-di-mano", "movimento"],
  spirito: ["empatia", "intuizione", "percezione", "rituali"],
  ingegno: ["medicina", "ingegneria", "investigazione", "occultismo"],
};

function generateEmptyBubbles(max: number = 6): string {
  let html = '<div class="bubbles">';
  for (let i = 0; i < max; i++) {
    html += `<div class="bubble"></div>`;
  }
  html += "</div>";
  return html;
}

function generateAbilityGroup(stat: string, sheet: CharacterData): string {
  const skills = skillGroups[stat];
  let html = `
    <div class="abilita-group">
      <div class="abilita-group-title">${
        stat.charAt(0).toUpperCase() + stat.slice(1)
      }</div>`;

  skills.forEach((skillKey) => {
    const skillName = skillNames[skillKey];
    const skillValue = sheet.skills[skillKey] || 0;
    html += `
      <div class="abilita-row">
        <span class="abilita-name">${skillName}</span>
        <span class="abilita-val">${skillValue}</span>
      </div>`;
  });

  html += `</div>`;
  return html;
}

function generateTalentsRows(talents: CharacterData["talents"]): string {
  let html = "";
  talents
    .filter((talent) => talent.name && talent.name.trim())
    .forEach((talent) => {
      const level = talent.level > 0 ? talent.level : "—";
      const page = talent.page > 0 ? talent.page : "—";
      html += `
      <div class="doti-entry">
        <span class="doti-entry-name">${talent.name}</span>
        <span class="doti-entry-val">${level}</span>
        <span class="doti-entry-val">${page}</span>
      </div>`;
    });
  return html;
}

function generateWeaponsRows(weapons: string[]): string {
  let html = "";
  weapons
    .filter((weapon) => weapon && weapon.trim())
    .forEach((weapon) => {
      html += `<div class="arma-row"><span class="arma-name">${weapon}</span></div>`;
    });
  return html;
}

export function generatePrintHTML(sheet: CharacterData): string {
  const templateHTML = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Orbis Arcana – Scheda del Personaggio</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Share+Tech+Mono&family=Raleway:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --red:       #a01818;
    --purple:    #5b1db8;
    --dark:      #111111;
    --mid:       #333333;
    --muted:     #555555;
    --faint:     #888888;
    --border:    #aaaaaa;
    --border-lt: #d8d8d8;
    --bg:        #ffffff;
    --bg-tint:   #f5f5f5;
    --bg-panel:  #ebebeb;

    --fs-label:   7.5pt;
    --fs-body:    9pt;
    --fs-val:     9.5pt;
    --fs-section: 10.5pt;
    --fs-stat:    22pt;
  }

  body {
    background: #d0d0d0;
    font-family: 'Raleway', sans-serif;
    color: var(--dark);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 210mm;
    min-height: 297mm;
    background: var(--bg);
    margin: 16px auto;
    padding: 9mm 10mm;
    box-shadow: 0 4px 40px rgba(0,0,0,0.22);
  }

  .header {
    text-align: center;
    padding-bottom: 4mm;
    border-bottom: 2.5px solid var(--red);
    margin-bottom: 5mm;
  }
  .header h1 {
    font-family: 'Cinzel', serif;
    font-size: 22pt;
    font-weight: 700;
    letter-spacing: 0.22em;
    color: var(--dark);
    line-height: 1;
  }
  .header .subtitle {
    font-family: 'Share Tech Mono', monospace;
    font-size: 7.5pt;
    letter-spacing: 0.38em;
    color: var(--faint);
    margin-top: 1.5mm;
    text-transform: uppercase;
  }

  .identity-row {
    display: grid;
    grid-template-columns: 2fr 2fr 1.4fr;
    gap: 5mm;
    margin-bottom: 5mm;
  }
  .field {
    border-bottom: 1.5px solid var(--border);
    padding-bottom: 2mm;
  }
  .field-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: var(--fs-label);
    letter-spacing: 0.22em;
    color: var(--faint);
    text-transform: uppercase;
    margin-bottom: 1.5mm;
  }
  .field-value {
    font-family: 'Share Tech Mono', monospace;
    font-size: var(--fs-body);
    color: var(--muted);
    min-height: 5.5mm;
  }

  .section-title {
    font-family: 'Cinzel', serif;
    font-size: var(--fs-section);
    font-weight: 600;
    color: var(--red);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-bottom: 1.5px solid var(--red);
    padding-bottom: 1.5mm;
    margin-bottom: 3.5mm;
  }

  .main-layout {
    display: grid;
    grid-template-columns: 1fr 58mm;
    gap: 6mm;
    margin-bottom: 5mm;
    align-items: start;
  }

  .caratteristiche { margin-bottom: 5mm; }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5mm;
  }
  .stat-box {
    border: 1.5px solid var(--border);
    background: var(--bg-panel);
    text-align: center;
    padding: 3.5mm 1mm 3mm;
  }
  .stat-name {
    font-family: 'Share Tech Mono', monospace;
    font-size: 6.5pt;
    letter-spacing: 0.12em;
    color: var(--muted);
    text-transform: uppercase;
  }
  .stat-value {
    font-family: 'Cinzel', serif;
    font-size: var(--fs-stat);
    font-weight: 700;
    color: var(--dark);
    line-height: 1.1;
    margin-top: 1.5mm;
  }

  .abilita-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3mm;
  }
  .abilita-group {
    border: 1px solid var(--border-lt);
    background: var(--bg-tint);
    padding: 3mm 4mm;
  }
  .abilita-group-title {
    font-family: 'Share Tech Mono', monospace;
    font-size: 6.5pt;
    letter-spacing: 0.2em;
    color: var(--faint);
    text-transform: uppercase;
    border-bottom: 1px solid var(--border-lt);
    padding-bottom: 2mm;
    margin-bottom: 2.5mm;
  }
  .abilita-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2mm 0;
    border-bottom: 1px dotted var(--border-lt);
  }
  .abilita-row:last-child { border-bottom: none; }
  .abilita-name {
    font-family: 'Share Tech Mono', monospace;
    font-size: var(--fs-body);
    color: var(--mid);
  }
  .abilita-val {
    font-family: 'Share Tech Mono', monospace;
    font-size: var(--fs-val);
    font-weight: 600;
    color: var(--dark);
    min-width: 7mm;
    text-align: right;
  }

  .right-col {
    display: flex;
    flex-direction: column;
    gap: 5mm;
  }

  .stato-panel {
    border: 1.5px solid var(--border);
    background: var(--bg-tint);
    padding: 4mm;
  }
  .stato-row { margin-bottom: 5mm; }
  .stato-row:last-child { margin-bottom: 0; }
  .stato-label-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2.5mm;
  }
  .stato-name {
    font-family: 'Cinzel', serif;
    font-size: 9pt;
    font-weight: 600;
    color: var(--red);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .stato-name.dadi { color: var(--purple); }
  .stato-type {
    font-family: 'Share Tech Mono', monospace;
    font-size: 6pt;
    letter-spacing: 0.2em;
    color: var(--faint);
    text-transform: uppercase;
  }
  .bubbles { display: flex; gap: 2.5mm; }
  .bubble {
    width: 6.5mm;
    height: 6.5mm;
    border-radius: 50%;
    border: 1.5px solid var(--border);
    background: var(--bg);
  }

  .doti-panel {
    border: 1.5px solid var(--border);
    background: var(--bg-tint);
    padding: 4mm;
  }
  .doti-header {
    display: grid;
    grid-template-columns: 1fr 9mm 9mm;
    gap: 1mm;
    padding-bottom: 2mm;
    border-bottom: 1px solid var(--border-lt);
    margin-bottom: 1mm;
  }
  .doti-col-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 6.5pt;
    letter-spacing: 0.12em;
    color: var(--faint);
    text-transform: uppercase;
    text-align: right;
  }
  .doti-col-label:first-child { text-align: left; }
  .doti-entry {
    display: grid;
    grid-template-columns: 1fr 9mm 9mm;
    gap: 1mm;
    padding: 2.5mm 0;
    border-bottom: 1px dotted var(--border-lt);
    align-items: center;
  }
  .doti-entry:last-child { border-bottom: none; }
  .doti-entry-name {
    font-family: 'Share Tech Mono', monospace;
    font-size: var(--fs-body);
    color: var(--muted);
  }
  .doti-entry-val {
    font-family: 'Share Tech Mono', monospace;
    font-size: var(--fs-body);
    color: var(--faint);
    text-align: right;
  }

  .bottom-section {
    display: flex;
    flex-direction: column;
    gap: 4mm;
  }
  .zaino-box {
    border: 1.5px solid var(--border-lt);
    background: var(--bg-tint);
    padding: 3.5mm;
    min-height: 24mm;
  }
  .zaino-placeholder {
    font-family: 'Share Tech Mono', monospace;
    font-size: var(--fs-body);
    color: var(--border);
    font-style: italic;
  }
  .zaino-content {
    font-family: 'Share Tech Mono', monospace;
    font-size: var(--fs-body);
    color: var(--muted);
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .armi-panel {
    border: 1.5px solid var(--border);
    background: var(--bg-tint);
    padding: 4mm;
  }
  .armi-inner {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5mm;
  }
  .arma-row {
    padding: 2.5mm 0;
    border-bottom: 1.5px solid var(--border-lt);
  }
  .arma-name {
    font-family: 'Share Tech Mono', monospace;
    font-size: var(--fs-body);
    color: var(--muted);
  }

  @media print {
    @page { size: A4; margin: 0; }
    body { background: white; margin: 0; }
    .page {
      margin: 0;
      padding: 9mm 10mm;
      box-shadow: none;
      width: 210mm;
      min-height: 297mm;
    }
  }
</style>
</head>
<body>
<div class="page">

  <div class="header">
    <h1>ORBIS ARCANA</h1>
    <div class="subtitle">Scheda del Personaggio</div>
  </div>

  <div class="identity-row">
    <div class="field">
      <div class="field-label">Nome PG</div>
      <div class="field-value">${sheet.info.name || "· · ·"}</div>
    </div>
    <div class="field">
      <div class="field-label">Alias / Nome in Codice</div>
      <div class="field-value">${sheet.info.alias || "· · ·"}</div>
    </div>
    <div class="field">
      <div class="field-label">Professione</div>
      <div class="field-value">${sheet.info.profession || "· · ·"}</div>
    </div>
  </div>

  <div class="main-layout">

    <div class="left-col">

      <div class="caratteristiche">
        <div class="section-title">Caratteristiche</div>
        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-name">Forza</div>
            <div class="stat-value">${sheet.stats.forza}</div>
          </div>
          <div class="stat-box">
            <div class="stat-name">Agilità</div>
            <div class="stat-value">${sheet.stats.agilita}</div>
          </div>
          <div class="stat-box">
            <div class="stat-name">Spirito</div>
            <div class="stat-value">${sheet.stats.spirito}</div>
          </div>
          <div class="stat-box">
            <div class="stat-name">Ingegno</div>
            <div class="stat-value">${sheet.stats.ingegno}</div>
          </div>
        </div>
      </div>

      <div class="abilita">
        <div class="section-title">Abilità</div>
        <div class="abilita-grid">
          ${generateAbilityGroup("forza", sheet)}
          ${generateAbilityGroup("agilita", sheet)}
          ${generateAbilityGroup("spirito", sheet)}
          ${generateAbilityGroup("ingegno", sheet)}
        </div>
      </div>

    </div>

    <div class="right-col">

      <div class="stato-panel">
        <div class="section-title">Stato Vitale</div>
        <div class="stato-row">
          <div class="stato-label-row">
            <span class="stato-name dadi">Dadi Maledetti</span>
            <span class="stato-type">Corruzione</span>
          </div>
          ${generateEmptyBubbles()}
        </div>
        <div class="stato-row">
          <div class="stato-label-row">
            <span class="stato-name">Salute</span>
            <span class="stato-type">Fisico</span>
          </div>
          ${generateEmptyBubbles()}
        </div>
        <div class="stato-row">
          <div class="stato-label-row">
            <span class="stato-name">Stress</span>
            <span class="stato-type">Mentale</span>
          </div>
          ${generateEmptyBubbles()}
        </div>
      </div>

      <div class="doti-panel">
        <div class="section-title">Doti &amp; Talenti</div>
        <div class="doti-header">
          <span class="doti-col-label">Nome Dote / Descrizione</span>
          <span class="doti-col-label">Liv.</span>
          <span class="doti-col-label">Pag.</span>
        </div>
        ${generateTalentsRows(sheet.talents)}
      </div>

    </div>

  </div>

  <div class="bottom-section">

    <div class="zaino">
      <div class="section-title">Zaino</div>
      <div class="zaino-box">
        ${
          sheet.inventory
            ? `<span class="zaino-content">${sheet.inventory}</span>`
            : '<span class="zaino-placeholder">Equipaggiamento, consumabili, oggetti chiave...</span>'
        }
      </div>
    </div>

    <div class="armi-panel">
      <div class="section-title">Armi</div>
      <div class="armi-inner">
        ${generateWeaponsRows(sheet.weapons)}
      </div>
    </div>

  </div>

</div>
</body>
</html>`;

  return templateHTML;
}

export async function downloadSheetAsPDF(
  sheet: CharacterData,
  filename?: string
) {
  const html = generatePrintHTML(sheet);
  const element = document.createElement("div");
  element.innerHTML = html;

  const opt = {
    margin: 0,
    filename: filename || `character-${sheet.info.name || "sheet"}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  await html2pdf().set(opt).from(element).save();
}
