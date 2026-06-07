/**
 * HERMES PDF Source Validator & Practice Plan Resolver
 */

/**
 * Resolve o plano de prática do dia cruzando nível, nota e modo do aluno.
 */
function resolvePracticePlan({ key, mode, studentLevel, catalog }) {
  if (!catalog) return null;
  
  // Normaliza o nível para corresponder ao catalog
  const normalizedLevel = studentLevel.toLowerCase();
  
  let route = catalog.scaleRoutes.find(r =>
    r.key === key && r.mode === mode && r.studentLevel.toLowerCase() === normalizedLevel
  );

  // Se não encontrar rota direta, cria um Fallback Inteligente (Transposição)
  if (!route) {
    console.warn(`[WARN] Rota não encontrada para ${key} ${mode} (${studentLevel}). Ativando fallback pedagógico...`);
    route = generatePedagogicFallback(key, mode, studentLevel, catalog);
  }

  const units = idList => (idList || []).map(id => catalog.studyUnits.find(u => u.id === id)).filter(Boolean);
  
  // Enriquecer técnica com o sevcikDb global se disponível
  let bows = [];
  if (typeof sevcikDb !== "undefined" && sevcikDb[key]) {
    const list = sevcikDb[key];
    const s = Array.isArray(list) 
      ? (list.find(item => item.level.toLowerCase() === studentLevel.toLowerCase()) || list[0])
      : list;
    if (s) {
      bows = [{
        id: s.id,
        bookId: s.bookId || "sevcik_op1_1",
        title: s.title,
        focus: s.foco || s.focus,
        notes: s.notes
      }];
    }
  } else {
    bows = units(route.dailyPlan.bowUnits);
  }

  // Enriquecer repertório com o repertoireDb global se disponível
  let piece = null;
  let excerpts = [];
  if (typeof repertoireDb !== "undefined" && repertoireDb[key]) {
    const list = repertoireDb[key];
    const item = list.find(r => r.level.toLowerCase() === studentLevel.toLowerCase()) || list[0];
    if (item) {
      piece = {
        id: item.id,
        title: item.obra,
        composer: item.composer,
        key: key,
        mode: mode,
        studentLevel: studentLevel,
        difficultyDescription: item.dificuldade
      };
      excerpts = [{
        id: item.id + "_exc",
        pieceId: item.id,
        title: "Excerto Célebre",
        bars: "Tema Principal",
        transferObjective: item.dificuldade,
        notes: item.notes
      }];
    }
  }

  if (!piece) {
    piece = catalog.repertoirePieces.find(p => p.id === route.dailyPlan.repertoirePieceId) || null;
    excerpts = (route.dailyPlan.excerptIds || []).map(id => catalog.excerptLinks.find(e => e.id === id)).filter(Boolean);
  }

  const relatedBookIds = [...new Set([
    ...units(route.dailyPlan.scaleUnits).map(x => x.bookId),
    ...units(route.dailyPlan.bowUnits).map(x => x.bookId),
    ...units(route.dailyPlan.etudeUnits).map(x => x.bookId)
  ])];

  // Filtra os PDFs válidos baseados no bookId ou pieceId
  const pdfs = catalog.pdfEntries.filter(p => 
    (p.bookId && relatedBookIds.includes(p.bookId)) ||
    (p.pieceId && p.pieceId === route.dailyPlan.repertoirePieceId)
  );

  return {
    route,
    scales: units(route.dailyPlan.scaleUnits),
    bows,
    etudes: units(route.dailyPlan.etudeUnits),
    piece,
    excerpts,
    pdfs
  };
}

/**
 * Gera sequências de cordas duplas (terças, sextas ou oitavas) baseadas nas notas de uma escala.
 */
function generateDoubleStopNotes(scaleNotes, intervalType) {
  let diff = 2; // padrão 3ª (terças)
  if (intervalType === "6th") diff = 5;
  if (intervalType === "8th") diff = 7;
  
  let doubleStops = [];
  // Gera subida
  for (let i = 0; i < scaleNotes.length - diff; i++) {
    doubleStops.push(`${scaleNotes[i]}-${scaleNotes[i + diff]}`);
  }
  // Gera descida
  for (let i = scaleNotes.length - diff - 1; i >= 0; i--) {
    doubleStops.push(`${scaleNotes[i]}-${scaleNotes[i + diff]}`);
  }
  return doubleStops;
}

/**
 * Gera um plano pedagógico alternativo dinamicamente quando a rota exata não existe no JSON.
 */
function generatePedagogicFallback(key, mode, studentLevel, catalog) {
  const isMinor = mode.includes("minor");
  const octaves = studentLevel === "iniciante" ? 1 : (studentLevel === "intermedio" ? 2 : 3);
  
  // Cria unidades virtuais transpostas
  const fallbackScaleId = `fallback_scale_${key}_${studentLevel}`;
  const fallbackBowId = `fallback_bow_${key}_${studentLevel}`;
  const fallbackEtudeId = `fallback_etude_${key}_${studentLevel}`;
  const fallbackPieceId = `fallback_piece_${key}_${studentLevel}`;
  const fallbackExcerptId = `fallback_excerpt_${key}_${studentLevel}`;

  // Configuração inteligente de livros e focos
  let scaleBookId = "suzuki_vol1";
  let scaleTitle = `Suzuki - Escala de ${key} ${isMinor ? "Menor" : "Maior"}`;
  let scaleFocus = `Estudo de afinação em ${key} ${isMinor ? "Menor" : "Maior"} com foco no dedilhado na 1ª posição.`;
  
  if (studentLevel === "intermedio") {
    scaleBookId = "sevcik_op1_1";
    scaleTitle = `Ševčík - Escala de ${key} ${isMinor ? "Menor" : "Maior"}`;
    scaleFocus = `Estudo posicional (1ª a 3ª posição) na escala de ${key} para entonação.`;
  } else if (studentLevel === "avancado") {
    scaleBookId = "flesch_scale_system";
    scaleTitle = `Carl Flesch - Sistema de Escalas em ${key} ${isMinor ? "Menor" : "Maior"}`;
    scaleFocus = `Sistema de 3 oitavas de Carl Flesch em ${key} com dedilhado de mudanças.`;
  } else if (studentLevel === "solista") {
    scaleBookId = "galamian_scale_system";
    scaleTitle = `Ivan Galamian - Escala Contemporânea de ${key} ${isMinor ? "Menor" : "Maior"}`;
    scaleFocus = `Padrões de ritmo e aceleração de arco de Ivan Galamian em ${key} (3/4 oitavas).`;
  }

  // Se já não estiverem no catalog, injetamos
  if (!catalog.studyUnits.find(u => u.id === fallbackScaleId)) {
    catalog.studyUnits.push({
      id: fallbackScaleId,
      bookId: scaleBookId,
      title: scaleTitle,
      focus: scaleFocus,
      notes: generateMajorScaleNotes(key, mode, octaves)
    });
  }

  // Técnica (Ševčík)
  let bowBookId = "sevcik_op1_1";
  let bowTitle = `Ševčík Op.1 Part 1 - Técnica em ${key}`;
  let bowFocus = `Distribuição uniforme e articulação de dedos em ${key}.`;
  let bowNotes = generateMajorScaleNotes(key, mode, 1).slice(0, 8);

  if (studentLevel === "iniciante") {
    bowBookId = "sevcik_op2";
    bowTitle = `Ševčík Op.2 - Técnica de Arco em ${key}`;
    bowFocus = `Padrões rítmicos de détaché e ligadura na primeira posição.`;
  } else if (studentLevel === "intermedio") {
    bowBookId = "sevcik_op8";
    bowTitle = `Ševčík Op.8 - Mudança de Posição em ${key}`;
    bowFocus = `Deslizar o polegar de forma fluida durante as mudanças.`;
    bowNotes = generateMajorScaleNotes(key, mode, 2).slice(0, 12);
  } else if (studentLevel === "avancado") {
    bowBookId = "sevcik_op9";
    bowTitle = `Ševčík Op.9 - Preparação de Cordas Duplas em ${key}`;
    bowFocus = `Montagem de terças e sextas paralelas em ${key}.`;
    bowNotes = generateDoubleStopNotes(generateMajorScaleNotes(key, mode, 1), "3rd");
  } else if (studentLevel === "solista") {
    bowBookId = "sevcik_op7";
    bowTitle = `Ševčík Op.7 - Estudos de Trinado em ${key}`;
    bowFocus = `Articulação rápida de dedos sob a tonalidade de ${key}.`;
    bowNotes = generateMajorScaleNotes(key, mode, 2).slice(0, 16);
  }

  if (!catalog.studyUnits.find(u => u.id === fallbackBowId)) {
    catalog.studyUnits.push({
      id: fallbackBowId,
      bookId: bowBookId,
      title: bowTitle,
      focus: bowFocus,
      notes: bowNotes
    });
  }

  // Estudos (Etudes)
  let etudeBookId = "kayser_op20";
  let etudeTitle = `Kayser Op.20 - Estudo em ${key}`;
  let etudeFocus = "Padrões rítmicos e distribuição de arco transpostos.";
  let etudeNotes = generateMajorScaleNotes(key, mode, 1).slice(0, 16);

  if (studentLevel === "iniciante") {
    etudeBookId = "wohlfahrt_op45";
    etudeTitle = `Wohlfahrt Op.45 - Estudo em ${key}`;
    etudeFocus = `Desenvolvimento da afinação básica e força na corda Sol.`;
  } else if (studentLevel === "intermedio") {
    etudeBookId = "kayser_op20";
    etudeTitle = `Kayser Op.20 - Estudo em ${key}`;
    etudeFocus = `Desenvolvimento do spiccato, staccato e cruzamento de cordas.`;
  } else if (studentLevel === "avancado") {
    etudeBookId = "kreutzer_42";
    etudeTitle = `Kreutzer Estudo - Agilidade em ${key}`;
    etudeFocus = `Técnica avançada de Rodolphe Kreutzer para flexibilidade de arco e dedos.`;
    etudeNotes = generateDoubleStopNotes(generateMajorScaleNotes(key, mode, 1), "6th");
  } else if (studentLevel === "solista") {
    etudeBookId = "dont_op35";
    etudeTitle = `Jakob Dont Op.35 - Capricho em ${key}`;
    etudeFocus = `Estudos de oitavas paralelas e posições elevadas.`;
    etudeNotes = generateDoubleStopNotes(generateMajorScaleNotes(key, mode, 1), "8th");
  }

  if (!catalog.studyUnits.find(u => u.id === fallbackEtudeId)) {
    catalog.studyUnits.push({
      id: fallbackEtudeId,
      bookId: etudeBookId,
      title: etudeTitle,
      focus: etudeFocus,
      notes: etudeNotes
    });
  }

  // Peça de Repertório
  const repPiece = (typeof repertoireDb !== "undefined" && repertoireDb[key])
    ? (repertoireDb[key].find(item => item.level.toLowerCase() === studentLevel.toLowerCase()) || repertoireDb[key][0])
    : null;

  if (!catalog.repertoirePieces.find(p => p.id === fallbackPieceId)) {
    catalog.repertoirePieces.push({
      id: fallbackPieceId,
      title: repPiece ? repPiece.obra : `Tema Clássico em ${key} ${isMinor ? "Menor" : "Maior"}`,
      composer: repPiece ? repPiece.composer : "Bach/Suzuki",
      key: key,
      mode: mode,
      studentLevel: studentLevel,
      difficultyDescription: repPiece ? repPiece.dificuldade : `Estudo clássico adaptado para consolidar a tonalidade de ${key}.`
    });
  }

  if (!catalog.excerptLinks.find(e => e.id === fallbackExcerptId)) {
    catalog.excerptLinks.push({
      id: fallbackExcerptId,
      pieceId: fallbackPieceId,
      title: "Excerto Célebre",
      bars: "Tema Principal",
      transferObjective: repPiece ? repPiece.dificuldade : "Articulação e entonação na tónica ativa.",
      notes: repPiece ? repPiece.notes : generateMajorScaleNotes(key, mode, 1)
    });
  }

  let finalBowing = "Detaché simples";
  if (studentLevel === "intermedio") finalBowing = "4 notas ligadas, 4 marteladas";
  else if (studentLevel === "avancado") finalBowing = "3 notas ligadas, 3 marteladas / Cordas Duplas";
  else if (studentLevel === "solista") finalBowing = "Polifonia / Quebra de Acordes";

  return {
    key,
    mode,
    studentLevel,
    octaves,
    bowingPattern: finalBowing,
    dailyPlan: {
      scaleUnits: [fallbackScaleId],
      bowUnits: [fallbackBowId],
      etudeUnits: [fallbackEtudeId],
      repertoirePieceId: fallbackPieceId,
      excerptIds: [fallbackExcerptId]
    }
  };
}

/**
 * Gera sequências de notas midi simplificadas para escalas arbitrárias para o VexFlow / Sampler
 */
function generateMajorScaleNotes(tonic, mode, octaves) {
  const chromaticScale = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
  const intervals = mode.includes("minor") ? [2, 1, 2, 2, 1, 2, 2] : [2, 2, 1, 2, 2, 2, 1];
  
  let rootIdx = chromaticScale.indexOf(tonic);
  if (rootIdx === -1) rootIdx = 0;

  // Definir oitava de início com base na tónica para violino
  const startOct = (rootIdx >= chromaticScale.indexOf("G")) ? 3 : 4;

  let ascending = [];
  let chrIdx = rootIdx;
  let octave = startOct;

  for (let o = 0; o < octaves; o++) {
    for (let i = 0; i < 7; i++) {
      ascending.push(`${chromaticScale[chrIdx]}${octave}`);
      chrIdx += intervals[i];
      if (chrIdx >= 12) {
        chrIdx -= 12;
        octave++;
      }
    }
  }
  ascending.push(`${chromaticScale[chrIdx]}${octave}`);

  const descending = [...ascending].reverse().slice(1);
  return ascending.concat(descending);
}

/**
 * Valida os metadados da entrada de PDF contra a base de dados de domínios aprovados.
 */
function validatePdfSource(entry, sourceRules) {
  if (!entry) {
    return { status: "rejected_unstable", reason: "Entrada inválida." };
  }

  // Se não tiver pdfUrl e for violinlab.com, é manual_entry
  if (entry.sourceDomain === "violinlab.com" || !entry.pdfUrl) {
    return { 
      status: "conditional", 
      reason: "Entrada manual: obra comercial protegida por direitos autorais. Requer consulta da edição física impressa." 
    };
  }

  if (!sourceRules || !sourceRules.domains) {
    return { status: "approved_external_open", reason: "Base de dados de regras ausente." };
  }

  const domainRule = sourceRules.domains.find(d => d.domain === entry.sourceDomain);
  if (!domainRule) {
    return { status: "rejected_copyright_or_access", reason: "Domínio desconhecido ou bloqueado." };
  }

  return {
    status: domainRule.status,
    corsAllowed: domainRule.cors_allowed,
    requiresAuth: domainRule.requires_auth,
    description: domainRule.description,
    reason: domainRule.description
  };
}

/**
 * Testa assincronamente a acessibilidade da URL (HEAD request).
 */
async function testPdfUrlReachability(url) {
  const result = {
    success: false,
    status: 0,
    validationDate: new Date().toLocaleDateString("pt-PT"),
    error: ""
  };

  if (!url) return result;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500); // 2.5s timeout

    const response = await fetch(url, {
      method: "HEAD",
      mode: "no-cors", 
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    result.success = true;
    result.status = response.status || 200; 
  } catch (e) {
    result.error = e.name === "AbortError" ? "Timeout" : e.message;
  }
  return result;
}
