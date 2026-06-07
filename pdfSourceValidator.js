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
    const s = sevcikDb[key];
    bows = [{
      id: s.id,
      bookId: "sevcik_op1_1",
      title: s.title,
      focus: s.foco || s.focus,
      notes: s.notes
    }];
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
 * Gera um plano pedagógico alternativo dinamicamente quando a rota exata não existe no JSON.
 */
function generatePedagogicFallback(key, mode, studentLevel, catalog) {
  const isMinor = mode.includes("minor");
  const octaves = studentLevel === "iniciante" ? 1 : (studentLevel === "intermedio" ? 2 : 3);
  
  // Cria unidades virtuais transpostas
  const fallbackScaleId = `fallback_scale_${key}`;
  const fallbackBowId = `fallback_bow_${key}`;
  const fallbackEtudeId = `fallback_etude_${key}`;
  const fallbackPieceId = `fallback_piece_${key}`;
  const fallbackExcerptId = `fallback_excerpt_${key}`;

  // Se já não estiverem no catalog, injetamos unidades genéricas transpostas para o tom
  if (!catalog.studyUnits.find(u => u.id === fallbackScaleId)) {
    catalog.studyUnits.push({
      id: fallbackScaleId,
      bookId: studentLevel === "iniciante" ? "suzuki_vol1" : "flesch_scale_system",
      title: `${studentLevel === "iniciante" ? "Suzuki" : "Flesch"} - Escala de ${key} ${isMinor ? "Menor" : "Maior"}`,
      focus: `Estudo de afinação em ${key} ${isMinor ? "Menor" : "Maior"} com foco no dedilhado e estabilidade tonal.`,
      notes: generateMajorScaleNotes(key, mode, octaves)
    });
  }

  if (!catalog.studyUnits.find(u => u.id === fallbackBowId)) {
    catalog.studyUnits.push({
      id: fallbackBowId,
      bookId: "sevcik_op1_1",
      title: `Ševčík Op.1 - Exercício em ${key}`,
      focus: `Dedilhados de agilidade e padrões de arco adaptados em ${key}.`,
      notes: generateMajorScaleNotes(key, mode, 1).slice(0, 8)
    });
  }

  if (!catalog.studyUnits.find(u => u.id === fallbackEtudeId)) {
    catalog.studyUnits.push({
      id: fallbackEtudeId,
      bookId: "kayser_op20",
      title: `Kayser Op.20 - Estudo Transposto para ${key}`,
      focus: "Padrões rítmicos e distribuição de arco transpostos para a tonalidade ativa.",
      notes: generateMajorScaleNotes(key, mode, 1).slice(0, 16)
    });
  }

  if (!catalog.repertoirePieces.find(p => p.id === fallbackPieceId)) {
    catalog.repertoirePieces.push({
      id: fallbackPieceId,
      title: `Tema Clássico em ${key} ${isMinor ? "Menor" : "Maior"}`,
      composer: "Bach/Suzuki",
      key: key,
      mode: mode,
      studentLevel: studentLevel,
      difficultyDescription: `Estudo clássico adaptado para consolidar a tonalidade de ${key}.`
    });
  }

  if (!catalog.excerptLinks.find(e => e.id === fallbackExcerptId)) {
    catalog.excerptLinks.push({
      id: fallbackExcerptId,
      pieceId: fallbackPieceId,
      title: "Tema do Minueto",
      bars: "Compassos 1-8",
      transferObjective: "Coordenação dinâmica e articulação tonal limpa na tónica ativa.",
      notes: generateMajorScaleNotes(key, mode, 1)
    });
  }

  return {
    key,
    mode,
    studentLevel,
    octaves,
    bowingPattern: "Detaché simples / Martelado",
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
