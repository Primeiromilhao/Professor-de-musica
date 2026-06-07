/**
 * HERMES Violin Lab v4.10 - Repertoire Database
 * Excertos famosos mapeados por tonalidade (do Iniciante ao Solista).
 * Cobre todas as 12 tonalidades sem fallbacks genéricos de "Canção Folk".
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
    "Ab": [
        {
            "id": "repertoire_ab_iniciante",
            "composer": "Franz Schubert",
            "obra": "Heidenröslein Op. 3 No. 3 (Lá Bemol)",
            "level": "Iniciante",
            "dificuldade": "Uso preciso do 1º dedo baixo nas cordas Lá e Mi em quatro bemóis.",
            "notes": ["Eb4", "Ab4", "C5", "Bb4", "Ab4", "Eb4", "F4", "F4", "Bb4", "Ab4", "G4", "Ab4"]
        },
        {
            "id": "repertoire_ab_intermedio",
            "composer": "Franz Schubert",
            "obra": "Ave Maria em Lá Bemol Maior",
            "level": "Intermédio",
            "dificuldade": "Controle de sustentação de arco legato longo e vibrato quente.",
            "notes": ["C5", "Db5", "Eb5", "Eb5", "F5", "Eb5", "C5", "Ab4", "Bb4", "C5", "Ab4"]
        },
        {
            "id": "repertoire_ab_avancado",
            "composer": "Federigo Fiorillo",
            "obra": "Estudo Nº 3 em Lá Bemol Maior",
            "level": "Avançado",
            "dificuldade": "Dedilhado ágil e mudanças de posições rápidas na escala de Lá Bemol.",
            "notes": ["Ab4", "C5", "Eb5", "Ab5", "G5", "Eb5", "C5", "Bb4", "Ab4", "Eb4", "C4", "Ab3"]
        },
        {
            "id": "repertoire_ab_solista",
            "composer": "Max Bruch",
            "obra": "Concerto em Sol Menor Op.26 (Adagio em Lá Bemol)",
            "level": "Solista",
            "dificuldade": "Fraseado lírico extremamente expressivo e shifts de posição amplos.",
            "notes": ["Eb4", "C5", "Bb4", "Ab4", "G4", "Ab4", "Bb4", "C5", "Eb5", "Db5", "C5", "Bb4"]
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
            "dificuldade": "Semicolcheias contínuas, exige controle de dinâmica e afinação de semitons.",
            "notes": ["E5", "D5", "C5", "B4", "A4", "G#4", "A4", "E4", "F#4", "G#4", "A4", "B4"]
        },
        {
            "id": "repertoire_a_solista",
            "composer": "Niccolò Paganini",
            "obra": "24 Caprichos Op. 1: Capricho Nº 24",
            "level": "Solista",
            "dificuldade": "Variações rápidas em cordas duplas, dedilhado ágil e saltos de oitava.",
            "notes": ["A4", "C5-E5", "B4", "D5-F5", "C5-E5", "A5", "G#5-B5", "E5", "A4", "C5-E5", "B4", "D5-F5", "C5-E5", "A4"]
        }
    ],
    "Bb": [
        {
            "id": "repertoire_bb_iniciante",
            "composer": "Shinichi Suzuki",
            "obra": "Canção do Vento em Si Bemol Maior",
            "level": "Iniciante",
            "dificuldade": "Posição do 2º dedo colado no 1º nas cordas Lá e Mi.",
            "notes": ["F4", "F4", "D5", "D5", "C5", "Bb4", "F4", "G4", "A4", "Bb4", "Bb4"]
        },
        {
            "id": "repertoire_bb_intermedio",
            "composer": "Carl Bohm",
            "obra": "Sarabande em Si Bemol (Op. 314 No. 3)",
            "level": "Intermédio",
            "dificuldade": "Ritmo pontuado barroco, controle de peso do arco no calcanhar.",
            "notes": ["Bb4", "D5", "C5", "Bb4", "A4", "G4", "F4", "D4", "Eb4", "F4", "Bb4"]
        },
        {
            "id": "repertoire_bb_avancado",
            "composer": "W.A. Mozart",
            "obra": "Concerto nº 1 em Si Bemol Maior K.207",
            "level": "Avançado",
            "dificuldade": "Leveza clássica e arpejos brilhantes em Si Bemol.",
            "notes": ["Bb4", "D5", "F5", "Bb5", "A5", "F5", "D5", "Bb4", "C5", "Eb5", "G5", "F5"]
        },
        {
            "id": "repertoire_bb_solista",
            "composer": "J.S. Bach",
            "obra": "Sonata nº 1: Siciliana em Si Bemol",
            "level": "Solista",
            "dificuldade": "Cantabile em ritmo 6/8 pontuado com acordes polifônicos de 3 vozes.",
            "notes": ["F4-Bb4-D5", "D5", "Eb5", "F5", "D5", "Bb4", "G4-C5-Eb5", "Eb5", "D5", "C5"]
        }
    ],
    "B": [
        {
            "id": "repertoire_b_iniciante",
            "composer": "Tradicional",
            "obra": "Brilha Brilha Estrelinha em Si Maior",
            "level": "Iniciante",
            "dificuldade": "5 sustenidos na armadura. Foco no 1º dedo alto (A#) e 3º dedo (D#).",
            "notes": ["B4", "B4", "F#5", "F#5", "G#5", "G#5", "F#5", "E5", "E5", "D#5", "D#5", "C#5", "C#5", "B4"]
        },
        {
            "id": "repertoire_b_intermedio",
            "composer": "Niccolò Paganini",
            "obra": "Carneval de Veneza (Variação em Si Maior)",
            "level": "Intermédio",
            "dificuldade": "Arco saltitado leve (spiccato) e saltos de corda rápidos.",
            "notes": ["F#4", "B4", "D#5", "C#5", "B4", "A#4", "F#4", "B4", "D#5", "C#5", "B4", "A#4"]
        },
        {
            "id": "repertoire_b_avancado",
            "composer": "Rodolphe Kreutzer",
            "obra": "Estudo Nº 28 em Si Maior",
            "level": "Avançado",
            "dificuldade": "Semicolcheias contínuas com cruzamentos de cordas rápidos.",
            "notes": ["B4", "D#5", "F#5", "B5", "A#5", "F#5", "D#5", "B4", "C#5", "E5", "G#5", "F#5"]
        },
        {
            "id": "repertoire_b_solista",
            "composer": "Camille Saint-Saëns",
            "obra": "Concerto nº 3 em Si Menor Op. 61 (Mov. 1)",
            "level": "Solista",
            "dificuldade": "Dramaticidade romântica e passagens na corda Sol solene.",
            "notes": ["B3", "D4", "F#4", "B4", "D5", "C#5", "B4", "A#4", "B4", "F#4", "D4", "B3"]
        }
    ],
    "C": [
        {
            "id": "repertoire_c_iniciante",
            "composer": "Tradicional",
            "obra": "Canção Perpétua em Dó Maior",
            "level": "Iniciante",
            "dificuldade": "Controle dos semitons naturais E-F e B-C sem acidentais.",
            "notes": ["C4", "E4", "G4", "C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"]
        },
        {
            "id": "repertoire_c_intermedio",
            "composer": "Joseph-Hector Fiocco",
            "obra": "Allegro em Dó Maior (Transposto)",
            "level": "Intermédio",
            "dificuldade": "Arco detaché rápido e contínuo com saltos de corda.",
            "notes": ["C5", "G4", "E4", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "G4", "E4", "C4"]
        },
        {
            "id": "repertoire_c_avancado",
            "composer": "Dmitry Kabalevsky",
            "obra": "Concerto em Dó Maior Op. 48 (Mov. 1)",
            "level": "Avançado",
            "dificuldade": "Ritmo enérgico do século XX, passagens na 1ª e 3ª posições.",
            "notes": ["C5", "C5", "D5", "C5", "B4", "A4", "G4", "A4", "B4", "C5", "D5", "E5", "C5"]
        },
        {
            "id": "repertoire_c_solista",
            "composer": "J.S. Bach",
            "obra": "Sonata nº 3 em Dó Maior BWV 1005 (Adagio)",
            "level": "Solista",
            "dificuldade": "Construção de acordes densos e condução de vozes polifônicas complexas.",
            "notes": ["C4-G4-E5", "F4-A4-D5", "E4-G4-C5", "F4-C5-A5", "G4-D5-B5", "E4-G4-C5"]
        }
    ],
    "C#": [
        {
            "id": "repertoire_cs_iniciante",
            "composer": "Tradicional",
            "obra": "Cantiga de Ninar em Dó Sustenido",
            "level": "Iniciante",
            "dificuldade": "Afinar o 3º dedo alto nas cordas Ré e Lá com sustenidos altos.",
            "notes": ["C#4", "E#4", "G#4", "C#5", "B4", "G#4", "A#4", "G#4", "E#4", "D#4", "C#4"]
        },
        {
            "id": "repertoire_cs_intermedio",
            "composer": "Antonio Vivaldi",
            "obra": "Concerto Outono: Adagio em Dó Sustenido Menor",
            "level": "Intermédio",
            "dificuldade": "Sustentação de arco e vibrato expressivo em tom menor melancólico.",
            "notes": ["G#4", "C#5", "D#5", "E5", "D#5", "C#5", "B#4", "C#5", "D#5", "G#4"]
        },
        {
            "id": "repertoire_cs_avancado",
            "composer": "Charles Dancla",
            "obra": "Estudo Op. 73 Nº 8 (Dó Sustenido Menor)",
            "level": "Avançado",
            "dificuldade": "Mudança posicional rápida e saltos de corda sob a escala menor harmônica.",
            "notes": ["C#4", "E4", "G#4", "C#5", "D#5", "E5", "G#5", "F#5", "D#5", "B#4", "C#5"]
        },
        {
            "id": "repertoire_cs_solista",
            "composer": "Jean Sibelius",
            "obra": "Concerto em Ré Menor: Mov. 1 (Tema em C# Menor)",
            "level": "Solista",
            "dificuldade": "Expressividade fria nórdica, timbre denso e afinação estreita de semitons.",
            "notes": ["G#3", "C#4", "E4", "F#4", "G#4", "A4", "F#4", "E4", "D#4", "C#4", "B#3", "C#4"]
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
    "Eb": [
        {
            "id": "repertoire_eb_iniciante",
            "composer": "Tradicional",
            "obra": "Canção de Ninar em Mi Bemol",
            "level": "Iniciante",
            "dificuldade": "Afinação estável com 3 bemóis. Uso do 1º dedo baixo (Eb4, Bb4).",
            "notes": ["Eb4", "Eb4", "G4", "Bb4", "Ab4", "G4", "F4", "Bb4", "G4", "F4", "Eb4"]
        },
        {
            "id": "repertoire_eb_intermedio",
            "composer": "W.A. Mozart",
            "obra": "Sonata em Mi Bemol K.302 (Rondeau)",
            "level": "Intermédio",
            "dificuldade": "Articulação clássica limpa e leveza nos saltos de corda.",
            "notes": ["G4", "Bb4", "Eb5", "G5", "F5", "D5", "Eb5", "C5", "Bb4", "Ab4", "G4"]
        },
        {
            "id": "repertoire_eb_avancado",
            "composer": "W.A. Mozart",
            "obra": "Sinfonia Concertante K.364 (Allegro)",
            "level": "Avançado",
            "dificuldade": "Estilo majestoso clássico e cordas duplas expressivas.",
            "notes": ["Eb4-Bb4", "G4-Eb5", "Bb4-G5", "Eb5-Eb6", "D5-F5", "Bb4-D5", "Eb5"]
        },
        {
            "id": "repertoire_eb_solista",
            "composer": "Richard Strauss",
            "obra": "Sonata em Mi Bemol Op.18 (Mov. 1)",
            "level": "Solista",
            "dificuldade": "Grandes saltos de oitava, expressividade lírica monumental romântica.",
            "notes": ["Eb4", "Bb4", "Eb5", "G5", "Bb5", "Eb6", "D6", "C6", "Bb5", "Ab5", "G5", "F5", "Eb5"]
        }
    ],
    "E": [
        {
            "id": "repertoire_e_iniciante",
            "composer": "Shinichi Suzuki",
            "obra": "Rigadoon em Mi Maior",
            "level": "Iniciante",
            "dificuldade": "Foco no 3º dedo alto nas cordas Ré e Lá com quatro sustenidos.",
            "notes": ["E4", "E4", "B4", "B4", "C#5", "D#5", "E5", "B4", "A4", "G#4", "F#4", "E4"]
        },
        {
            "id": "repertoire_e_intermedio",
            "composer": "J.S. Bach",
            "obra": "Partita nº 3: Gavotte en Rondeau BWV 1006",
            "level": "Intermédio",
            "dificuldade": "Dança barroca alegre com fraseado articulado e saltitante.",
            "notes": ["B4", "E5", "F#5", "G#5", "A5", "B5", "G#5", "E5", "F#5", "D#5", "E5"]
        },
        {
            "id": "repertoire_e_avancado",
            "composer": "J.S. Bach",
            "obra": "Concerto em Mi Maior BWV 1042 (Mov. 1)",
            "level": "Avançado",
            "dificuldade": "Acordes enérgicos no início e passagens rápidas com shifts.",
            "notes": ["E4-B4-G#5", "E4-B4-G#5", "E4-B4-G#5", "F#5", "G#5", "A5", "B5", "C#6", "B5"]
        },
        {
            "id": "repertoire_e_solista",
            "composer": "Felix Mendelssohn",
            "obra": "Concerto em Mi Menor Op.64 (Mov. 1)",
            "level": "Solista",
            "dificuldade": "Máximo virtuosismo romântico, arpejos fluidos e afinação lírica em mi menor.",
            "notes": ["B4", "G5", "F#5", "E5", "D#5", "E5", "F#5", "G5", "B5", "A5", "G5", "F#5", "E5"]
        }
    ],
    "F": [
        {
            "id": "repertoire_f_iniciante",
            "composer": "Tradicional",
            "obra": "Brilha Brilha Estrelinha em Fá Maior",
            "level": "Iniciante",
            "dificuldade": "Semitom colado 1º e 2º dedo na corda Lá (Si Bemol).",
            "notes": ["F4", "F4", "C5", "C5", "D5", "D5", "C5", "Bb4", "Bb4", "A4", "A4", "G4", "G4", "F4"]
        },
        {
            "id": "repertoire_f_intermedio",
            "composer": "Antonio Vivaldi",
            "obra": "Concerto Outono RV 293 (Allegro em Fá)",
            "level": "Intermédio",
            "dificuldade": "Ritmo pontuado alegre e détaché no meio do arco.",
            "notes": ["F4", "A4", "C5", "C5", "D5", "C5", "Bb4", "A4", "G4", "F4", "C5", "F4"]
        },
        {
            "id": "repertoire_f_avancado",
            "composer": "L. van Beethoven",
            "obra": "Sonata 'Primavera' Op. 24 (Mov. 1 em Fá)",
            "level": "Avançado",
            "dificuldade": "Tema clássico fluido cantabile, requer vibrato doce e estável.",
            "notes": ["A4", "G4", "F4", "E4", "D4", "C4", "Bb3", "A3", "F4", "G4", "A4", "C5", "F5"]
        },
        {
            "id": "repertoire_f_solista",
            "composer": "Pablo de Sarasate",
            "obra": "Zigeunerweisen Op. 20 (Ciganas em Fá Menor)",
            "level": "Solista",
            "dificuldade": "Estilo cigano dramático, staccato volante, pizzicato com mão esquerda.",
            "notes": ["C4", "F4", "Ab4", "G4", "F4", "E4", "F4", "G4", "Ab4", "C5", "Db5", "B4", "C5"]
        }
    ],
    "F#": [
        {
            "id": "repertoire_fs_iniciante",
            "composer": "Tradicional",
            "obra": "Escorregador em Fá Sustenido Maior",
            "level": "Iniciante",
            "dificuldade": "6 sustenidos na armadura. Posição dos dedos em sustenidos altos.",
            "notes": ["F#4", "A#4", "C#5", "F#5", "E#5", "C#5", "D#5", "C#5", "A#4", "G#4", "F#4"]
        },
        {
            "id": "repertoire_fs_intermedio",
            "composer": "Henryk Wieniawski",
            "obra": "Kujawiak (Mazurca em Fá Sustenido Menor)",
            "level": "Intermédio",
            "dificuldade": "Expressividade de dança polonesa, ritmo triplo e vibrato quente.",
            "notes": ["F#4", "G#4", "A4", "C#5", "F#5", "E5", "D5", "C#5", "B4", "A4", "G#4", "F#4"]
        },
        {
            "id": "repertoire_fs_avancado",
            "composer": "Charles Dancla",
            "obra": "Estudo Op. 73 Nº 12 (Fá Sustenido Menor)",
            "level": "Avançado",
            "dificuldade": "Dedilhado cromático veloz e saltos rápidos na armadura menor.",
            "notes": ["F#4", "A4", "C#5", "F#5", "G#5", "A5", "C#6", "B5", "G#5", "E#5", "F#5"]
        },
        {
            "id": "repertoire_fs_solista",
            "composer": "Henryk Wieniawski",
            "obra": "Concerto nº 1 em Fá Sustenido Menor Op. 14",
            "level": "Solista",
            "dificuldade": "Extrema dificuldade romântica, décimas, oitavas e dedilhado veloz.",
            "notes": ["F#3", "C#4", "F#4", "A4", "C#5", "F#5", "A5", "G#5", "F#5", "E#5", "F#5", "C#5"]
        }
    ]
};

// Fallback generator para as tonalidades não mapeadas explicitamente
function getRepertoireForTonic(tonic, level) {
    const list = repertoireDb[tonic];
    if (list) {
        return list.find(item => item.level.toLowerCase() === level.toLowerCase()) || list[0];
    }
    return getTransposedFallback(tonic, level);
}

function getTransposedFallback(tonic, level) {
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

    let notes = ["C4", "E4", "G4", "C5", "B4", "G4", "A4", "C5", "G4", "E4", "F4", "D4", "C4"];
    if (level === "Iniciante") {
        notes = ["C4", "C4", "G4", "G4", "A4", "A4", "G4", "F4", "F4", "E4", "E4", "D4", "D4", "C4"];
    } else if (level === "Intermédio") {
        notes = ["E4", "E4", "F4", "G4", "G4", "F4", "E4", "D4", "C4", "C4", "D4", "E4", "E4", "D4", "D4"];
    } else if (level === "Solista") {
        notes = ["C4", "D4", "Eb4", "F#4", "G4", "Ab4", "B4", "C5", "B4", "Ab4", "G4", "F#4", "Eb4", "D4", "C4"];
    }

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
        let newName = chromaticNotes[newIdx];
        return `${newName}${oct + octShift}`;
    });

    return {
        "id": `fallback_${tonic}_${level}`,
        "composer": compositores[level] || "Tradicional",
        "obra": obras[level] || `Melodia em ${tonic}`,
        "level": level,
        "dificuldade": "Treino prático de dedilhado e afinação harmônica nesta tonalidade.",
        "notes": transposedNotes
    };
}
