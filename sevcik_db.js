/**
 * HERMES Violin Lab v4.10 - Sevcik Database
 * Mapeamento de exercícios da escola Ševčík por tonalidade e nível.
 * Inclui Opus 1, Opus 2 (Arcadas), Opus 3 e 8 (Mudanças de Posição), Opus 7 (Trinados) e Opus 9 (Cordas Duplas).
 */

const sevcikDb = {
    "G": [
        {
            "id": "sevcik_g_iniciante",
            "level": "iniciante",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 1 Ex.17 (Ligaduras em Sol)",
            "foco": "Distribuição uniforme do arco nas ligaduras de 4 notas simples.",
            "notes": ["G4", "A4", "B4", "C5", "D5", "E5", "F#5", "G5", "A5", "G5", "F#5", "E5", "D5", "C5", "B4", "A4", "G4"]
        },
        {
            "id": "sevcik_g_intermedio",
            "level": "intermedio",
            "bookId": "sevcik_op8",
            "title": "Ševčík Op.8 Ex.1 (Deslizamento 1ª-3ª em Sol)",
            "foco": "Deslizar o 1º dedo suavemente sem interrupção do som.",
            "notes": ["G3", "A3", "B3", "C4", "D4", "E4", "F#4", "G4", "B4", "D5", "G5", "D5", "B4", "G4", "D4", "B3"]
        },
        {
            "id": "sevcik_g_avancado",
            "level": "avancado",
            "bookId": "sevcik_op9",
            "title": "Ševčík Op.9 Ex.1 - Terças e Sextas em Sol",
            "foco": "Afinação e dedilhado de cordas duplas. Dedos 1 e 3, 2 e 4 atuando em pares.",
            "notes": ["G3-B3", "A3-C4", "B3-D4", "C4-E4", "D4-F#4", "E4-G4", "F#4-A4", "G4-B4", "F#4-A4", "E4-G4", "D4-F#4", "C4-E4", "B3-D4", "A3-C4", "G3-B3"]
        },
        {
            "id": "sevcik_g_solista",
            "level": "solista",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 4 Ex.8 (Oitavas em Sol)",
            "foco": "Precisão nas oitavas e flexibilidade dos dedos 1 e 4 na corda dupla.",
            "notes": ["G3-G4", "A3-A4", "B3-B4", "C4-C5", "D4-D5", "E4-E5", "F#4-F#5", "G4-G5", "F#4-F#5", "E4-E5", "D4-D5", "C4-C5", "B3-B4", "A3-A4", "G3-G4"]
        }
    ],
    "Ab": [
        {
            "id": "sevcik_ab_iniciante",
            "level": "iniciante",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 1 Ex.1 (Posição Baixa do 1º Dedo em Lá Bemol)",
            "foco": "Afinar o semitom entre corda solta e 1º dedo (Ab3, Db4, Eb4).",
            "notes": ["Ab3", "Bb3", "C4", "Db4", "Eb4", "Db4", "C4", "Bb3", "Eb4", "F4", "G4", "Ab4", "Bb4", "Ab4", "G4", "F4"]
        },
        {
            "id": "sevcik_ab_intermedio",
            "level": "intermedio",
            "bookId": "sevcik_op3",
            "title": "Ševčík Op.3 Ex.5 (Mudança de Posição em Lá Bemol)",
            "foco": "Preparação e relaxamento do polegar durante as transições de posição.",
            "notes": ["Ab3", "C4", "Eb4", "Ab4", "Bb4", "Db5", "F5", "Ab5", "G5", "Eb5", "C5", "Ab4", "Eb4", "C4", "Ab3"]
        },
        {
            "id": "sevcik_ab_avancado",
            "level": "avancado",
            "bookId": "sevcik_op9",
            "title": "Ševčík Op.9 Ex.3 (Preparação de Terças em Lá Bemol)",
            "foco": "Alinhamento do cotovelo para apoiar o peso do arco nas cordas duplas com bemóis.",
            "notes": ["Ab3-C4", "Bb3-Db4", "C4-Eb4", "Db4-F4", "Eb4-G4", "F4-Ab4", "Eb4-G4", "Db4-F4", "C4-Eb4", "Bb3-Db4", "Ab3-C4"]
        },
        {
            "id": "sevcik_ab_solista",
            "level": "solista",
            "bookId": "sevcik_op7",
            "title": "Ševčík Op.7 Ex.5 (Exercício de Trinado em Lá Bemol)",
            "foco": "Articulação e leveza na queda do dedo no trinado com afinação justa em Ab.",
            "notes": ["Ab4", "Bb4", "Ab4", "Bb4", "C5", "Db5", "C5", "Db5", "Eb5", "F5", "Eb5", "F5", "Ab5"]
        }
    ],
    "A": [
        {
            "id": "sevcik_a_iniciante",
            "level": "iniciante",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 1 Ex.3 (Dedilhado em Lá Maior)",
            "foco": "Espaçamento largo entre 1º e 2º dedo (B e C#) nas cordas Ré e Lá.",
            "notes": ["A3", "C#4", "B3", "D4", "C#4", "E4", "D4", "F#4", "E4", "G#4", "F#4", "A4", "G#4", "B4", "A4", "C#5"]
        },
        {
            "id": "sevcik_a_intermedio",
            "level": "intermedio",
            "bookId": "sevcik_op8",
            "title": "Ševčík Op.8 Ex.3 (Mudança de Posição em Lá)",
            "foco": "Avanço e recuo na 3ª posição usando o 1º dedo como âncora.",
            "notes": ["A3", "C#4", "E4", "A4", "B4", "D5", "F#5", "A5", "G#5", "E5", "C#5", "A4", "E4", "C#4", "A3"]
        },
        {
            "id": "sevcik_a_avancado",
            "level": "avancado",
            "bookId": "sevcik_op9",
            "title": "Ševčík Op.9 Ex.4 (Sextas e Quintas em Lá Maior)",
            "foco": "Apoio balanceado do arco em cordas duplas e afinação harmônica.",
            "notes": ["A3-F#4", "B3-G#4", "C#4-A4", "D4-B4", "E4-C#5", "F#4-D5", "E4-C#5", "D4-B4", "C#4-A4", "B3-G#4", "A3-F#4"]
        },
        {
            "id": "sevcik_a_solista",
            "level": "solista",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 4 Ex.12 (Acordes em Lá)",
            "foco": "Rolamento do arco nos acordes de 3 vozes e precisão no talão.",
            "notes": ["A3-E4-C#5", "B3-F#4-D5", "C#4-G#4-E5", "A3-E4-C#5-A5", "C#4-G#4-E5", "B3-F#4-D5", "A3-E4-C#5"]
        }
    ],
    "Bb": [
        {
            "id": "sevcik_bb_iniciante",
            "level": "iniciante",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 1 Ex.10 (Preparação para 2ª Posição em Si Bemol)",
            "foco": "Colocação precisa dos dedos e semitons naturais em Si bemol.",
            "notes": ["Bb3", "C4", "D4", "Eb4", "F4", "G4", "A4", "Bb4", "C5", "D5", "Eb5", "F5", "Eb5", "D5", "C5", "Bb4"]
        },
        {
            "id": "sevcik_bb_intermedio",
            "level": "intermedio",
            "bookId": "sevcik_op3",
            "title": "Ševčík Op.3 Ex.4 (Arpejos e Mudanças em Si Bemol)",
            "foco": "Precisão de afinação em arpejos largos cruzando posições.",
            "notes": ["Bb3", "D4", "F4", "Bb4", "C5", "Eb5", "G5", "Bb5", "A5", "F5", "D5", "Bb4", "F4", "D4", "Bb3"]
        },
        {
            "id": "sevcik_bb_avancado",
            "level": "avancado",
            "bookId": "sevcik_op9",
            "title": "Ševčík Op.9 Ex.5 (Cordas Duplas em Si Bemol)",
            "foco": "Estudo de terças e sextas paralelas na armadura com dois bemóis.",
            "notes": ["Bb3-D4", "C4-Eb4", "D4-F4", "Eb4-G4", "F4-A4", "G4-Bb4", "F4-A4", "Eb4-G4", "D4-F4", "C4-Eb4", "Bb3-D4"]
        },
        {
            "id": "sevcik_bb_solista",
            "level": "solista",
            "bookId": "sevcik_op7",
            "title": "Ševčík Op.7 Ex.8 (Exercício de Trinado em Si Bemol)",
            "foco": "Articulação rápida, sem fadiga do metacarpo, trinado sobre notas sustentadas.",
            "notes": ["Bb4", "C5", "Bb4", "C5", "D5", "Eb5", "D5", "Eb5", "F5", "G5", "F5", "G5", "Bb5"]
        }
    ],
    "B": [
        {
            "id": "sevcik_b_iniciante",
            "level": "iniciante",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 1 Ex.8 (Extensão do 4º Dedo em Si Maior)",
            "foco": "Estabilidade da palma da mão ao estender o 4º dedo na corda Lá.",
            "notes": ["B3", "D#4", "C#4", "E4", "D#4", "F#4", "E4", "G#4", "F#4", "A#4", "G#4", "B4", "A#4", "C#5", "B4", "D#5"]
        },
        {
            "id": "sevcik_b_intermedio",
            "level": "intermedio",
            "bookId": "sevcik_op8",
            "title": "Ševčík Op.8 Ex.6 (Mudança de Posição em Si Maior)",
            "foco": "Precisão de afinação em andamento moderado ao subir e descer posições.",
            "notes": ["B3", "D#4", "F#4", "B4", "C#5", "E5", "G#5", "B5", "A#5", "F#5", "D#5", "B4", "F#4", "D#4", "B3"]
        },
        {
            "id": "sevcik_b_avancado",
            "level": "avancado",
            "bookId": "sevcik_op9",
            "title": "Ševčík Op.9 Ex.6 (Preparação de Sextas em Si Maior)",
            "foco": "Flexibilidade dos dedos para pressionar duas notas em cordas vizinhas com sustenidos altos.",
            "notes": ["B3-G#4", "C#4-A#4", "D#4-B4", "E4-C#5", "F#4-D#5", "G#4-E5", "F#4-D#5", "E4-C#5", "D#4-B4", "C#4-A#4", "B3-G#4"]
        },
        {
            "id": "sevcik_b_solista",
            "level": "solista",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 4 Ex.15 (Acordes Complexos em Si)",
            "foco": "Distribuição simétrica de pressão nas cordas duplas e acordes de 3 cordas.",
            "notes": ["B3-F#4-D#5", "C#4-G#4-E5", "D#4-A#4-F#5", "B3-F#4-D#5-B5", "D#4-A#4-F#5", "C#4-G#4-E5", "B3-F#4-D#5"]
        }
    ],
    "C": [
        {
            "id": "sevcik_c_iniciante",
            "level": "iniciante",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 1 Ex.5 (Dedilhado de Dó Maior)",
            "foco": "Precisão nos semitons naturais (B-C e E-F) com dedos colados.",
            "notes": ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "C5", "B4", "A4", "G4", "F4", "E4", "D4"]
        },
        {
            "id": "sevcik_c_intermedio",
            "level": "intermedio",
            "bookId": "sevcik_op8",
            "title": "Ševčík Op.8 Ex.7 (Transições de Posição em Dó)",
            "foco": "Mudanças harmônicas e deslizamento do indicador sem ruídos.",
            "notes": ["C4", "E4", "G4", "C5", "D5", "F5", "A5", "C6", "B5", "G5", "E5", "C5", "G4", "E4", "C4"]
        },
        {
            "id": "sevcik_c_avancado",
            "level": "avancado",
            "bookId": "sevcik_op9",
            "title": "Ševčík Op.9 Ex.7 (Terças Preparatórias em Dó Maior)",
            "foco": "Dedilhado cruzado e alinhamento do polegar na 1ª posição em cordas duplas.",
            "notes": ["C4-E4", "D4-F4", "E4-G4", "F4-A4", "G4-B4", "A4-C5", "B4-D5", "C5-E5", "B4-D5", "A4-C5", "G4-B4", "F4-A4", "E4-G4", "D4-F4", "C4-E4"]
        },
        {
            "id": "sevcik_c_solista",
            "level": "solista",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 4 Ex.18 (Acordes Triplos em Dó)",
            "foco": "Equilíbrio de peso do arco nas 3 cordas no talão e meio do arco.",
            "notes": ["C4-G4-E5", "D4-A4-F5", "E4-B4-G5", "F4-C5-A5", "G4-D5-B5", "E4-G4-C5"]
        }
    ],
    "C#": [
        {
            "id": "sevcik_cs_iniciante",
            "level": "iniciante",
            "bookId": "sevcik_op7",
            "title": "Ševčík Op.7 Ex.12 (Agilidade de Trinado em Dó Sustenido)",
            "foco": "Articulação rápida e força muscular no trinado com dedos baixos.",
            "notes": ["C#4", "D#4", "C#4", "D#4", "E4", "F#4", "E4", "F#4", "G#4", "A#4", "G#4", "A#4", "B4", "C#5", "B4", "C#5"]
        },
        {
            "id": "sevcik_cs_intermedio",
            "level": "intermedio",
            "bookId": "sevcik_op8",
            "title": "Ševčík Op.8 Ex.8 (Mudança de Posição em Dó Sustenido)",
            "foco": "Firmeza na subida de posições com dedilhado de sustenidos altos.",
            "notes": ["C#4", "E#4", "G#4", "C#5", "D#5", "F#5", "A#5", "C#6", "B#5", "G#5", "E#5", "C#5", "G#4", "E#4", "C#4"]
        },
        {
            "id": "sevcik_cs_avancado",
            "level": "avancado",
            "bookId": "sevcik_op9",
            "title": "Ševčík Op.9 Ex.8 (Preparação de Sextas em Dó Sustenido)",
            "foco": "Afinação e estiramento de dedos em cordas duplas na tonalidade de C#.",
            "notes": ["C#4-A#4", "D#4-B#4", "E#4-C#5", "F#4-D#5", "G#4-E#5", "A#4-F#5", "G#4-E#5", "F#4-D#5", "E#4-C#5", "D#4-B#4", "C#4-A#4"]
        },
        {
            "id": "sevcik_cs_solista",
            "level": "solista",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 4 Ex.20 (Acordes em Dó Sustenido)",
            "foco": "Montagem rápida de quatro dedos e quebra perfeita do acorde.",
            "notes": ["C#4-G#4-E#5", "D#4-A#4-F#5", "E#4-B#4-G#5", "C#4-G#4-E#5-C#6", "E#4-B#4-G#5", "D#4-A#4-F#5", "C#4-G#4-E#5"]
        }
    ],
    "D": [
        {
            "id": "sevcik_d_iniciante",
            "level": "iniciante",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 1 Ex.2 (Semitons em Ré)",
            "foco": "Distinção entre tom inteiro (1-2) e semitom colado (2-3) nas cordas.",
            "notes": ["D4", "F#4", "E4", "G4", "F#4", "A4", "G4", "B4", "A4", "C#5", "B4", "D5", "C#5", "E5", "D5", "F#5"]
        },
        {
            "id": "sevcik_d_intermedio",
            "level": "intermedio",
            "bookId": "sevcik_op8",
            "title": "Ševčík Op.8 Ex.9 (Mudança de Posição em Ré)",
            "foco": "Estudo de escalas móveis ao longo do espelho cruzando posições.",
            "notes": ["D4", "F#4", "A4", "D5", "E5", "G5", "B5", "D6", "C#6", "A5", "F#5", "D5", "A4", "F#4", "D4"]
        },
        {
            "id": "sevcik_d_avancado",
            "level": "avancado",
            "bookId": "sevcik_op9",
            "title": "Ševčík Op.9 Ex.9 (Terças em Ré Maior)",
            "foco": "Estabilização da afinação em terças com cruzamento rápido do arco.",
            "notes": ["D4-F#4", "E4-G4", "F#4-A4", "G4-B4", "A4-C#5", "B4-D5", "C#5-E5", "D5-F#5", "C#5-E5", "B4-D5", "A4-C#5", "G4-B4", "F#4-A4", "E4-G4", "D4-F#4"]
        },
        {
            "id": "sevcik_d_solista",
            "level": "solista",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 4 Ex.22 (Acordes de 3/4 Vozes em Ré)",
            "foco": "Rolamento do cotovelo e estabilidade rítmica na reprodução polifônica.",
            "notes": ["D4-A4-F#5", "E4-B4-G5", "F#4-C#5-A5", "D4-A4-F#5-D6", "F#4-C#5-A5", "E4-B4-G5", "D4-A4-F#5"]
        }
    ],
    "Eb": [
        {
            "id": "sevcik_eb_iniciante",
            "level": "iniciante",
            "bookId": "sevcik_op2",
            "title": "Ševčík Op.2 Ex.5 (Divisão de Arco em Mi Bemol)",
            "foco": "Controle de golpes de arco détaché suaves ao transitar entre cordas.",
            "notes": ["Eb4", "G4", "F4", "Ab4", "G4", "Bb4", "Ab4", "C5", "Bb4", "D5", "C5", "Eb5", "D5", "F5", "Eb5", "G5"]
        },
        {
            "id": "sevcik_eb_intermedio",
            "level": "intermedio",
            "bookId": "sevcik_op3",
            "title": "Ševčík Op.3 Ex.10 (Shifting e Arpejo em Mi Bemol)",
            "foco": "Relaxamento da mão esquerda nas posições agudas.",
            "notes": ["Eb4", "G4", "Bb4", "Eb5", "F5", "Ab5", "C6", "Eb6", "D6", "Bb5", "G5", "Eb5", "Bb4", "G4", "Eb4"]
        },
        {
            "id": "sevcik_eb_avancado",
            "level": "avancado",
            "bookId": "sevcik_op9",
            "title": "Ševčík Op.9 Ex.10 (Preparação de Sextas em Mi Bemol)",
            "foco": "Dedilhado estável e afinação exata dos semitons em bemol.",
            "notes": ["Eb4-C5", "F4-D5", "G4-Eb5", "Ab4-F5", "Bb4-G5", "C5-Ab5", "Bb4-G5", "Ab4-F5", "G4-Eb5", "F4-D5", "Eb4-C5"]
        },
        {
            "id": "sevcik_eb_solista",
            "level": "solista",
            "bookId": "sevcik_op7",
            "title": "Ševčík Op.7 Ex.15 (Trinado e Ornamentos em Mi Bemol)",
            "foco": "Desenvolvimento do trinado com o 4º dedo, velocidade e precisão.",
            "notes": ["Eb4", "F4", "Eb4", "F4", "G4", "Ab4", "G4", "Ab4", "Bb4", "C5", "Bb4", "C5", "Eb5"]
        }
    ],
    "E": [
        {
            "id": "sevcik_e_iniciante",
            "level": "iniciante",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 1 Ex.4 (Colocação em Mi Maior)",
            "foco": "Precisão na colocação de 4 sustenidos e semitom colado (3-4 dedo).",
            "notes": ["E4", "G#4", "F#4", "A4", "G#4", "B4", "A4", "C#5", "B4", "D#5", "C#5", "E5", "D#5", "F#5", "E5", "G#5"]
        },
        {
            "id": "sevcik_e_intermedio",
            "level": "intermedio",
            "bookId": "sevcik_op8",
            "title": "Ševčík Op.8 Ex.11 (Mudança de Posição em Mi Maior)",
            "foco": "Estudo de agilidade em posições na armadura de quatro sustenidos.",
            "notes": ["E4", "G#4", "B4", "E5", "F#5", "A5", "C#6", "E6", "D#6", "B5", "G#5", "E5", "B4", "G#4", "E4"]
        },
        {
            "id": "sevcik_e_avancado",
            "level": "avancado",
            "bookId": "sevcik_op9",
            "title": "Ševčík Op.9 Ex.11 (Terças em Mi Maior)",
            "foco": "Estudo de terças paralelas com dedos altos e postura balanceada.",
            "notes": ["E4-G#4", "F#4-A4", "G#4-B4", "A4-C#5", "B4-D#5", "C#5-E5", "D#5-F#5", "E5-G#5", "D#5-F#5", "C#5-E5", "B4-D#5", "A4-C#5", "G#4-B4", "F#4-A4", "E4-G#4"]
        },
        {
            "id": "sevcik_e_solista",
            "level": "solista",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 4 Ex.25 (Acordes em Mi Maior)",
            "foco": "Quebra de acordes rápidos e flexibilidade de pulso.",
            "notes": ["E4-B4-G#5", "F#4-C#5-A5", "G#4-D#5-B5", "E4-B4-G#5-E6", "G#4-D#5-B5", "F#4-C#5-A5", "E4-B4-G#5"]
        }
    ],
    "F": [
        {
            "id": "sevcik_f_iniciante",
            "level": "iniciante",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 1 Ex.6 (1º Dedo Recuado em Fá Maior)",
            "foco": "Recuar o 1º dedo (Fá natural) na corda Mi e afinar o Si bemol.",
            "notes": ["F4", "G4", "A4", "Bb4", "C5", "D5", "E5", "F5", "G5", "F5", "E5", "D5", "C5", "Bb4", "A4", "G4"]
        },
        {
            "id": "sevcik_f_intermedio",
            "level": "intermedio",
            "bookId": "sevcik_op8",
            "title": "Ševčík Op.8 Ex.12 (Mudança de Posição em Fá)",
            "foco": "Mudanças lineares de posição ao longo da corda Lá e Mi.",
            "notes": ["F4", "A4", "C5", "F5", "G5", "Bb5", "D6", "F6", "E6", "C6", "A5", "F5", "C5", "A4", "F4"]
        },
        {
            "id": "sevcik_f_avancado",
            "level": "avancado",
            "bookId": "sevcik_op9",
            "title": "Ševčík Op.9 Ex.12 (Sextas e Quintas em Fá)",
            "foco": "Evitar esmagamento de som e focar na ressonância em cordas duplas.",
            "notes": ["F4-D5", "G4-E5", "A4-F5", "Bb4-G5", "C5-A5", "D5-Bb5", "C5-A5", "Bb4-G5", "A4-F5", "G4-E5", "F4-D5"]
        },
        {
            "id": "sevcik_f_solista",
            "level": "solista",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 4 Ex.28 (Acordes em Fá)",
            "foco": "Articulação limpa e balanço do arco nos acordes de 3 vozes em Fá.",
            "notes": ["F4-C5-A5", "G4-D5-Bb5", "A4-E5-C6", "F4-C5-A5-F6", "A4-E5-C6", "G4-D5-Bb5", "F4-C5-A5"]
        }
    ],
    "F#": [
        {
            "id": "sevcik_fs_iniciante",
            "level": "iniciante",
            "bookId": "sevcik_op7",
            "title": "Ševčík Op.7 Ex.3 (Dedilhado Estendido em Fá Sustenido)",
            "foco": "Abertura dos dedos e precisão em notas com sustenidos altos (A#, E#, B#).",
            "notes": ["F#4", "G#4", "A#4", "B4", "C#5", "D#5", "E#5", "F#5", "G#5", "F#5", "E#5", "D#5", "C#5", "B4", "A#4", "G#4"]
        },
        {
            "id": "sevcik_fs_intermedio",
            "level": "intermedio",
            "bookId": "sevcik_op8",
            "title": "Ševčík Op.8 Ex.15 (Mudança de Posição em Fá Sustenido)",
            "foco": "Cuidado com o deslocamento do polegar esquerdo no braço em sustenidos.",
            "notes": ["F#4", "A#4", "C#5", "F#5", "G#5", "B5", "D#6", "F#6", "E#6", "C#6", "A#5", "F#5", "C#5", "A#4", "F#4"]
        },
        {
            "id": "sevcik_fs_avancado",
            "level": "avancado",
            "bookId": "sevcik_op9",
            "title": "Ševčík Op.9 Ex.15 (Terças em Fá Sustenido)",
            "foco": "Manter a curvatura dos dedos ao pressionar terças na armadura com 6 sustenidos.",
            "notes": ["F#4-A#4", "G#4-B4", "A#4-C#5", "B4-D#5", "C#5-E#5", "D#5-F#5", "E#5-G#5", "F#5-A#5", "E#5-G#5", "D#5-F#5", "C#5-E#5", "B4-D#5", "A#4-C#5", "G#4-B4", "F#4-A#4"]
        },
        {
            "id": "sevcik_fs_solista",
            "level": "solista",
            "bookId": "sevcik_op1_1",
            "title": "Ševčík Op.1 Part 4 Ex.30 (Acordes em Fá Sustenido)",
            "foco": "Foco na afinação do E# e B# nos acordes complexos de 4 cordas.",
            "notes": ["F#4-C#5-A#5", "G#4-D#5-B5", "A#4-E#5-C#6", "F#4-C#5-A#5-F#6", "A#4-E#5-C#6", "G#4-D#5-B5", "F#4-C#5-A#5"]
        }
    ]
};
