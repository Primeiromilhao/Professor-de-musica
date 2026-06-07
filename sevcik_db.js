/**
 * HERMES Violin Lab v4.0 - Sevcik Database
 * Mapeamento de exercícios da escola Ševčík por tonalidade.
 */

const sevcikDb = {
    "G": {
        "id": "sevcik_g",
        "title": "Ševčík Op.1 Part 1 Ex.17 (Ligaduras em Sol)",
        "foco": "Distribuição uniforme do arco nas ligaduras de 4 notas.",
        "bpmTarget": 72,
        "notes": ["G3", "B3", "A3", "C4", "B3", "D4", "C4", "E4", "D4", "F#4", "E4", "G4", "F#4", "A4", "G4", "B4"]
    },
    "Ab": {
        "id": "sevcik_ab",
        "title": "Ševčík Op.1 Part 1 Ex.1 (Posição Baixa do 1º Dedo)",
        "foco": "Afinar o semitom entre corda solta e 1º dedo (Ab3, Db4, Eb4).",
        "bpmTarget": 60,
        "notes": ["Ab3", "Bb3", "C4", "Db4", "Eb4", "Db4", "C4", "Bb3", "Eb4", "F4", "G4", "Ab4", "Bb4", "Ab4", "G4", "F4"]
    },
    "A": {
        "id": "sevcik_a",
        "title": "Ševčík Op.1 Part 1 Ex.3 (Dedilhado em Lá Maior)",
        "foco": "Espaçamento largo entre 1º e 2º dedo (B e C#) nas cordas D e A.",
        "bpmTarget": 80,
        "notes": ["A3", "C#4", "B3", "D4", "C#4", "E4", "D4", "F#4", "E4", "G#4", "F#4", "A4", "G#4", "B4", "A4", "C#5"]
    },
    "Bb": {
        "id": "sevcik_bb",
        "title": "Ševčík Op.8 Ex.1 (Mudança de Posição 1ª-3ª em Si Bemol)",
        "foco": "Deslizar o 1º dedo suavemente sem interrupção do som.",
        "bpmTarget": 65,
        "notes": ["Bb3", "C4", "D4", "Eb4", "F4", "G4", "A4", "Bb4", "C5", "D5", "Eb5", "F5", "Eb5", "D5", "C5", "Bb4"]
    },
    "B": {
        "id": "sevcik_b",
        "title": "Ševčík Op.1 Part 1 Ex.8 (Extensão do 4º Dedo)",
        "foco": "Manter a postura da mão estável ao esticar o 4º dedo para alcançar o F#.",
        "bpmTarget": 70,
        "notes": ["B3", "D#4", "C#4", "E4", "D#4", "F#4", "E4", "G#4", "F#4", "A#4", "G#4", "B4", "A#4", "C#5", "B4", "D#5"]
    },
    "C": {
        "id": "sevcik_c",
        "title": "Ševčík Op.1 Part 1 Ex.5 (Dedilhado em Dó Maior)",
        "foco": "Precisão do semitom natural (B-C e E-F). Dedos colados.",
        "bpmTarget": 75,
        "notes": ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "C5", "B4", "A4", "G4", "F4", "E4", "D4"]
    },
    "C#": {
        "id": "sevcik_cs",
        "title": "Ševčík Op.7 Ex.12 (Agilidade de Trinado em Dó Sustenido)",
        "foco": "Articulação rápida e leveza na queda do 3º dedo sobre o 2º.",
        "bpmTarget": 60,
        "notes": ["C#4", "D#4", "C#4", "D#4", "E4", "F#4", "E4", "F#4", "G#4", "A#4", "G#4", "A#4", "B4", "C#5", "B4", "C#5"]
    },
    "D": {
        "id": "sevcik_d",
        "title": "Ševčík Op.1 Part 1 Ex.2 (Semitom Colado em Ré)",
        "foco": "Diferenciar tom inteiro (1-2) de semitom colado (2-3) nas cordas D e A.",
        "bpmTarget": 80,
        "notes": ["D4", "F#4", "E4", "G4", "F#4", "A4", "G4", "B4", "A4", "C#5", "B4", "D5", "C#5", "E5", "D5", "F#5"]
    },
    "Eb": {
        "id": "sevcik_eb",
        "title": "Ševčík Op.2 Ex.5 (Mudança de Corda Suave)",
        "foco": "Ação suave do pulso direito ao transitar entre a corda Lá e Mi.",
        "bpmTarget": 68,
        "notes": ["Eb4", "G4", "F4", "Ab4", "G4", "Bb4", "Ab4", "C5", "Bb4", "D5", "C5", "Eb5", "D5", "F5", "Eb5", "G5"]
    },
    "E": {
        "id": "sevcik_e",
        "title": "Ševčík Op.1 Part 1 Ex.4 (Colocação em Mi Maior)",
        "foco": "Quatro sustenidos. Dedos altos na pestana e afinação exata do D#.",
        "bpmTarget": 75,
        "notes": ["E4", "G#4", "F#4", "A4", "G#4", "B4", "A4", "C#5", "B4", "D#5", "C#5", "E5", "D#5", "F#5", "E5", "G#5"]
    },
    "F": {
        "id": "sevcik_f",
        "title": "Ševčík Op.1 Part 1 Ex.6 (1º Dedo Recuado em Fá)",
        "foco": "Recuar o 1º dedo (Fá natural) na corda Mi e Dó natural na corda Lá.",
        "bpmTarget": 72,
        "notes": ["F4", "G4", "A4", "Bb4", "C5", "D5", "E5", "F5", "G5", "F5", "E5", "D5", "C5", "Bb4", "A4", "G4"]
    },
    "F#": {
        "id": "sevcik_fs",
        "title": "Ševčík Op.7 Ex.3 (Dedilhado Estendido em Fá Sustenido)",
        "foco": "Precisão nas notas com sustenidos altos (A#, E#, B#) e abertura dos dedos.",
        "bpmTarget": 60,
        "notes": ["F#4", "G#4", "A#4", "B4", "C#5", "D#5", "E#5", "F#5", "G#5", "F#5", "E#5", "D#5", "C#5", "B4", "A#4", "G#4"]
    }
};
