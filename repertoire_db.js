/**
 * HERMES Violin Lab v4.0 - Repertoire Database
 * Excertos famosos mapeados por tonalidade (do Iniciante ao Solista).
 */

const repertoireDb = {
    "G": [
        {
            "id": "repertoire_g_iniciante",
            "composer": "Antonio Vivaldi",
            "obra": "Concerto em Sol Maior RV 310 (Mov. 1)",
            "level": "Iniciante",
            "dificuldade": "Arco detaché rápido, foco na corda Ré e Lá.",
            "notes": ["D5", "D5", "B4", "B4", "G4", "G4", "D4", "D4", "E4", "F#4", "G4", "A4", "B4", "C5", "D5", "D5"]
        },
        {
            "id": "repertoire_g_intermedio",
            "composer": "J.S. Bach",
            "obra": "Minueto em Sol Maior (Suzuki Livro 1)",
            "level": "Intermédio",
            "dificuldade": "Fraseado clássico, saltos de 3ª e 4ª.",
            "notes": ["D5", "G4", "A4", "B4", "C5", "D5", "G4", "G4", "E5", "C5", "D5", "E5", "F#5", "G5", "G4", "G4"]
        },
        {
            "id": "repertoire_g_avancado",
            "composer": "W.A. Mozart",
            "obra": "Concerto para Violino nº 3 em Sol Maior K.216",
            "level": "Avançado",
            "dificuldade": "Mudança de posição suave (1ª a 3ª) e brilho clássico.",
            "notes": ["D5", "B4", "G4", "D4", "B3", "G3", "D4", "F#4", "A4", "C5", "E5", "D5"]
        },
        {
            "id": "repertoire_g_solista",
            "composer": "J.S. Bach",
            "obra": "Sonata nº1 em Sol Menor BWV 1001 (Adagio)",
            "level": "Solista",
            "dificuldade": "Estilo menor expressivo, arpejos dramáticos e afinação densa.",
            "notes": ["G3", "Bb3", "D4", "G4", "Bb4", "A4", "G4", "F#4", "G4", "D4", "Bb3", "G3"]
        }
    ],
    "D": [
        {
            "id": "repertoire_d_iniciante",
            "composer": "J.S. Bach",
            "obra": "Musette em Ré Maior (Suzuki Livro 2)",
            "level": "Iniciante",
            "dificuldade": "Golpes de arco limpos, notas repetidas em staccato.",
            "notes": ["D5", "A4", "F#4", "D4", "A4", "D5", "F#5", "D5", "G5", "F#5", "E5", "D5", "A4", "C#5", "D5", "D5"]
        },
        {
            "id": "repertoire_d_intermedio",
            "composer": "G.F. Handel",
            "obra": "Sonata em Ré Maior HWV 371 (Adagio)",
            "level": "Intermédio",
            "dificuldade": "Estilo cantabile expressivo com ligaduras longas.",
            "notes": ["A4", "D5", "F#5", "A5", "G5", "F#5", "E5", "D5", "C#5", "D5", "E5", "A4"]
        },
        {
            "id": "repertoire_d_avancado",
            "composer": "W.A. Mozart",
            "obra": "Concerto para Violino nº 4 em Ré Maior K.218",
            "level": "Avançado",
            "dificuldade": "Introdução marcial brilhante, staccato e posições altas.",
            "notes": ["D4", "F#4", "A4", "D5", "F#5", "D5", "A4", "F#4", "D4", "A4", "D5", "F#5"]
        },
        {
            "id": "repertoire_d_solista",
            "composer": "L. van Beethoven",
            "obra": "Concerto para Violino em Ré Maior Op.61",
            "level": "Solista",
            "dificuldade": "Tema lírico solene, exige pureza de timbre na corda Lá e Mi.",
            "notes": ["F#4", "G4", "A4", "D5", "F#5", "E5", "D5", "C#5", "B4", "A4", "G4", "F#4"]
        }
    ],
    "A": [
        {
            "id": "repertoire_a_iniciante",
            "composer": "J.S. Bach",
            "obra": "Gavotte em Lá Menor (Suzuki Livro 2)",
            "level": "Iniciante",
            "dificuldade": "Ritmo sincopado em Lá Menor.",
            "notes": ["A4", "B4", "C5", "A4", "E5", "D5", "C5", "B4", "A4", "B4", "C5", "A4"]
        },
        {
            "id": "repertoire_a_intermedio",
            "composer": "Antonio Vivaldi",
            "obra": "Concerto em Lá Menor RV 356 (Mov. 1)",
            "level": "Intermédio",
            "dificuldade": "Arco detaché enérgico e passagens rápidas na 1ª posição.",
            "notes": ["A4", "E5", "C5", "A4", "B4", "E4", "G#4", "B4", "C5", "D5", "E5", "A4"]
        },
        {
            "id": "repertoire_a_avancado",
            "composer": "J.S. Bach",
            "obra": "Concerto para Violino em Lá Menor BWV 1041",
            "level": "Avançado",
            "dificuldade": "Semicolcheias contínuas, exige controlo de dinâmica e afinação de semitons.",
            "notes": ["E5", "D5", "C5", "B4", "A4", "G#4", "A4", "E4", "F#4", "G#4", "A4", "B4"]
        },
        {
            "id": "repertoire_a_solista",
            "composer": "Johannes Brahms",
            "obra": "Concerto para Violino em Ré Maior Op.77 (Adagio)",
            "level": "Solista",
            "dificuldade": "Fraseado lírico extremamente longo e expressivo.",
            "notes": ["A4", "C#5", "E5", "A5", "G#5", "F#5", "E5", "D5", "C#5", "B4", "A4", "G#4"]
        }
    ]
};

// Fallback generator para as tonalidades não mapeadas explicitamente
function getRepertoireForTonic(tonic, level) {
    const list = repertoireDb[tonic];
    if (list) {
        return list.find(item => item.level === level) || getTransposedFallback(tonic, level);
    }
    return getTransposedFallback(tonic, level);
}

function getTransposedFallback(tonic, level) {
    // Transpõe um tema padrão baseado no nível para a tónica selecionada
    const compositores = {
        "Iniciante": "Tradicional",
        "Intermédio": "L. van Beethoven",
        "Avançado": "F. Schubert",
        "Solista": "N. Paganini"
    };
    const obras = {
        "Iniciante": `Canção Folk em ${tonic}`,
        "Intermédio": `Hino à Alegria em ${tonic} (Adaptado)`,
        "Avançado": `Ave Maria em ${tonic} (Dueto/Posições)`,
        "Solista": `Tema e Variações em ${tonic} (Capricho)`
    };

    // Melodia de fallback simples baseada na escala do tom
    let notes = ["C4", "E4", "G4", "C5", "B4", "G4", "A4", "C5", "G4", "E4", "F4", "D4", "C4"];
    if (level === "Iniciante") {
        notes = ["C4", "C4", "G4", "G4", "A4", "A4", "G4", "F4", "F4", "E4", "E4", "D4", "D4", "C4"];
    } else if (level === "Intermédio") {
        notes = ["E4", "E4", "F4", "G4", "G4", "F4", "E4", "D4", "C4", "C4", "D4", "E4", "E4", "D4", "D4"];
    } else if (level === "Solista") {
        notes = ["C4", "D4", "Eb4", "F#4", "G4", "Ab4", "B4", "C5", "B4", "Ab4", "G4", "F#4", "Eb4", "D4", "C4"];
    }

    // Transpõe as notas de Dó (C) para a tónica de destino
    const chromaticNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const targetIdx = chromaticNotes.indexOf(tonic.replace("b", "").replace("#", ""));
    const shift = targetIdx > -1 ? targetIdx : 0;

    const transposedNotes = notes.map(n => {
        const letter = n.slice(0, -1);
        const oct = parseInt(n.slice(-1));
        let idx = chromaticNotes.indexOf(letter);
        if (idx === -1) idx = 0;
        let newIdx = (idx + shift) % 12;
        let octShift = Math.floor((idx + shift) / 12);
        
        // Ajusta nome da tónica para refletir sustenidos/bemóis apropriados
        let newName = chromaticNotes[newIdx];
        if (tonic.endsWith("#") && newName.length === 1 && newIdx > 0) {
            // Simplificação
        }
        return `${newName}${oct + octShift}`;
    });

    return {
        "id": `fallback_${tonic}_${level}`,
        "composer": compositores[level],
        "obra": obras[level],
        "level": level,
        "dificuldade": "Treino prático de dedilhado e afinação harmónica nesta tonalidade.",
        "notes": transposedNotes
    };
}
