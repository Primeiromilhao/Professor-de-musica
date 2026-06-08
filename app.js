/**
 * HERMES Violin Lab v4.6 - Core App Logic (REWRITE LIMPO)
 */

document.addEventListener("DOMContentLoaded", () => {
    const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental, Annotation } = Vex.Flow;

    // ── DOM ELEMENTS ──────────────────────────────────────────
    const levelSelect       = document.getElementById("level-select");
    const tonicSelect       = document.getElementById("tonic-select");
    const scaleTypeSelect   = document.getElementById("scale-type-select");
    const rhythmDivisionSelect = document.getElementById("rhythm-division-select");
    const octavesSelect     = document.getElementById("octaves-select");
    const intervalSelect    = document.getElementById("interval-select");
    const octavesGroup      = document.getElementById("octaves-group");
    const intervalGroup     = document.getElementById("interval-group");
    const bpmSlider         = document.getElementById("bpm-slider");
    const bpmVal            = document.getElementById("bpm-val");
    const fsBpmSlider       = document.getElementById("fs-bpm-slider");
    const fsBpmVal          = document.getElementById("fs-bpm-val");
    const btnPlay           = document.getElementById("btn-play");
    const btnStop           = document.getElementById("btn-stop");
    const btnFsPlay         = document.getElementById("btn-fs-play");
    const btnFsStop         = document.getElementById("btn-fs-stop");
    const btnRecord         = document.getElementById("btn-record");
    const btnPdf            = document.getElementById("btn-pdf");
    const btnFullscreenMode = document.getElementById("btn-fullscreen-mode");
    const btnExitFs         = document.getElementById("btn-exit-fs");
    const recordStatus      = document.getElementById("record-status");
    const relativeDisplay   = document.getElementById("relative-scale-display");
    const btnSwitchRelative = document.getElementById("btn-switch-relative");
    const scaleBadge        = document.getElementById("scale-badge");
    const printScaleTitle   = document.getElementById("print-scale-title");
    const noteDisplay       = document.getElementById("current-note-display");
    const fingerDisplay     = document.getElementById("current-finger-display");
    const positionDisplay   = document.getElementById("current-position-display");
    const fingerDot         = document.getElementById("finger-dot");
    const harmonyTableBody  = document.getElementById("harmony-table-body");
    const teacherTipsContent= document.getElementById("teacher-tips-content");
    const chkSuzukiMode     = document.getElementById("chk-suzuki-mode");
    const suzukiContent     = document.getElementById("suzuki-content");
    const suzukiPanel       = document.getElementById("suzuki-panel");
    const btnSuzukiPrev     = document.getElementById("btn-suzuki-prev");
    const btnSuzukiNext     = document.getElementById("btn-suzuki-next");
    const suzukiStepIndicatorText = document.getElementById("suzuki-step-indicator-text");
    const suzukiHistoryContainer  = document.getElementById("suzuki-history-container");
    const planScaleName    = document.getElementById("plan-scale-name");
    const planScaleOctaves = document.getElementById("plan-scale-octaves");
    const planScaleBowing  = document.getElementById("plan-scale-bowing");
    const planScaleFocus   = document.getElementById("plan-scale-focus");
    const planTechTitle    = document.getElementById("plan-tech-title");
    const planTechFocus    = document.getElementById("plan-tech-focus");
    const techPdfContainer = document.getElementById("tech-pdf-container");
    const planStudyTitle   = document.getElementById("plan-study-title");
    const planStudyFocus   = document.getElementById("plan-study-focus");
    const studyPdfContainer= document.getElementById("study-pdf-container");
    const planRepTitle     = document.getElementById("plan-rep-title");
    const planRepExcerpt   = document.getElementById("plan-rep-excerpt");
    const planRepBars      = document.getElementById("plan-rep-bars");
    const planRepFocus     = document.getElementById("plan-rep-focus");
    const repPdfContainer  = document.getElementById("rep-pdf-container");
    const btnRestoreScale  = document.getElementById("btn-restore-scale");
    const btnRestoreScaleStaff = document.getElementById("btn-restore-scale-staff");
    const vexflowPanelTitle= document.getElementById("vexflow-panel-title");
    const challengeDayNum  = document.getElementById("challenge-day-num");
    const streakCountDisplay= document.getElementById("streak-count-display");
    const totalXpDisplay   = document.getElementById("total-xp-display");
    const btnCompleteDay   = document.getElementById("btn-complete-day");
    const txtChalPercent   = document.getElementById("txt-chal-percent");
    const barChalProgress  = document.getElementById("bar-chal-progress");
    const masteredKeysCount= document.getElementById("mastered-keys-count");
    const studentRankTitle = document.getElementById("student-rank-title");
    const sessionsCount    = document.getElementById("sessions-count");
    const academyPercentText= document.getElementById("academy-percent-text");
    const barAcademyProgress= document.getElementById("bar-academy-progress");

    // ── GLOBAL DATA ───────────────────────────────────────────
    let repertoryCatalog = null;
    let validatedSources = null;
    let activePracticePlan = null;

    // ── MUSIC THEORY CONSTANTS ────────────────────────────────
    // Escala cromática com nomes canónicos
    const CHROMATIC = ["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"];
    const SCALE_INTERVALS = {
        "major":         [2,2,1,2,2,2,1],
        "minor-natural": [2,1,2,2,1,2,2],
        "minor-harmonic":[2,1,2,2,1,3,1],
        "minor-melodic": [2,1,2,2,2,2,1]
    };
    const DEGREE_NAMES = {
        "major":         ["Tónica","Supertónica","Mediante","Subdominante","Dominante","Sobredominante","Sensível"],
        "minor-natural": ["Tónica","Supertónica","Mediante","Subdominante","Dominante","Sobredominante","Subtónica"],
        "minor-harmonic":["Tónica","Supertónica","Mediante","Subdominante","Dominante","Sobredominante","Sensível"],
        "minor-melodic": ["Tónica","Supertónica","Mediante","Subdominante","Dominante","Sobredominante","Sensível"]
    };
    const DEGREE_ROMAN = ["I","II","III","IV","V","VI","VII"];

    const CONCERTO_DATABASE = {
        "iniciante": {
            "vivaldi_a": {
                "title": "Concerto em Lá Menor, RV 356",
                "composer": "Antonio Vivaldi",
                "weeks": {
                    "1": {
                        "focus": "Tema do Allegro Inicial (Compassos 1-15)",
                        "justification": "O staccato enérgico e o tempo firme de Ševčík Op. 2 preparam a clareza e a pulsação precisas exigidas no tema principal."
                    },
                    "2": {
                        "focus": "Transições de Cordas na 1ª Posição",
                        "justification": "A alternância rápida entre a corda Lá e Mi requer que o pulso direito esteja relaxado. Use o pedal de Lá menor para verificar a afinação."
                    },
                    "3": {
                        "focus": "Estudo de Dinâmica no Adagio (Largo)",
                        "justification": "O movimento lento exige legato longo sustentando a nota. O uso de notas longas ajuda a manter um tom de violino ressonante."
                    },
                    "4": {
                        "focus": "Presto - Finalização do Terceiro Movimento",
                        "justification": "Agilidade de dedos no tempo rápido. O metrônomo diário de 60 a 80 BPM dará a estabilidade rítmica para finalizar a peça."
                    }
                }
            },
            "seitz_5": {
                "title": "Concerto de Estudante Nº 5 em Ré Maior, Op. 22",
                "composer": "Fritz Seitz",
                "weeks": {
                    "1": {
                        "focus": "Entrada Solo em Ré Maior",
                        "justification": "A escala de Ré Maior garante o posicionamento correto do 2º dedo baixo na corda Lá. O Ševčík ajuda a estabilizar o ataque de arco no calcanhar."
                    },
                    "2": {
                        "focus": "Terças e Cordas Duplas Fáceis",
                        "justification": "A introdução à condução de vozes e o treino com pedal de tónica facilitam a afinação dupla ao tocar duas cordas simultâneas."
                    },
                    "3": {
                        "focus": "Semicolcheias com Ligaduras",
                        "justification": "Sincronização de dedos com ligaduras de duas notas. O estudo diário de agilidade no plano ajuda a evitar tensões na mão esquerda."
                    },
                    "4": {
                        "focus": "Presto - Andamento Alegre Final",
                        "justification": "Destaque para o detaché rápido na ponta do arco. Pratique de forma lenta (50 BPM) antes de acelerar."
                    }
                }
            },
            "rieding_35": {
                "title": "Concerto em Si Menor, Op. 35",
                "composer": "Oskar Rieding",
                "weeks": {
                    "1": {
                        "focus": "Tema Principal Expressivo",
                        "justification": "Exige uma sonoridade cantada e expressiva na 1ª posição. O uso do pedal em Si Menor ajuda a afinar o 2º dedo colado no 1º dedo na corda Ré."
                    },
                    "2": {
                        "focus": "Saltos de Intervalo de 4ª e 5ª",
                        "justification": "Os saltos entre as cordas Ré e Lá exigem controle do ângulo do cotovelo direito. A prática das lições de arco previne ruídos nas mudanças."
                    },
                    "3": {
                        "focus": "Secção em Si Maior (Luminosa)",
                        "justification": "A transição de Si Menor para Si Maior introduz sustenidos adicionais (D#, G#). A escala com apoio do pedal auxilia a ajustar estes dedos altos."
                    },
                    "4": {
                        "focus": "Allegro Moderato Final",
                        "justification": "Controle do ritmo com colcheias e semicolcheias alternadas. O metrônomo ajuda a manter a pulsação constante."
                    }
                }
            }
        },
        "intermedio": {
            "accolay_a": {
                "title": "Concerto em Lá Menor",
                "composer": "Jean-Baptiste Accolay",
                "weeks": {
                    "1": {
                        "focus": "Abertura Dramática e Legato",
                        "justification": "O tema romântico exige legato expressivo na corda Sol e Lá. A escala de 2 oitavas limpa e o pedal ativo facilitam a afinação nos shifts para a 3ª posição."
                    },
                    "2": {
                        "focus": "Arpejos e Mudanças Rápidas",
                        "justification": "A passagem de arpejos na corda Mi exige shifts suaves (Ševčík Op. 8). Mantenha o polegar relaxado."
                    },
                    "3": {
                        "focus": "Secção Cantabile em Dó Maior",
                        "justification": "Treino de vibrato contínuo e projeção de som em notas longas. A dinâmica expressiva dá o caráter lírico exigido."
                    },
                    "4": {
                        "focus": "Final Presto e Staccato",
                        "justification": "Dedilhado veloz na corda Mi e staccato na metade superior do arco. Use metrônomo lento a médio para garantir clareza técnica."
                    }
                }
            },
            "vivaldi_g": {
                "title": "Concerto em Sol Maior, RV 310",
                "composer": "Antonio Vivaldi",
                "weeks": {
                    "1": {
                        "focus": "Tema do Allegro Inicial",
                        "justification": "Articulação rápida de semicolcheias na corda Ré e Lá. O tempo dinâmico do Ševčík Op. 2 prepara a agilidade e sincronia."
                    },
                    "2": {
                        "focus": "Transições de Posição (1ª a 3ª)",
                        "justification": "Os shifts para a 3ª posição na corda Lá e Mi devem ser limpos. Use as notas de apoio para guiar a mão."
                    },
                    "3": {
                        "focus": "Largo - Sustentação de Arco",
                        "justification": "Legato longo e expressivo. O pedal harmônico ativo ajuda a monitorizar a afinação pura das notas longas."
                    },
                    "4": {
                        "focus": "Terceiro Movimento (Allegro Giga)",
                        "justification": "Mudanças rápidas de corda em ritmo de giga. O cotovelo direito flexível previne fadiga muscular nas mudanças de plano."
                    }
                }
            },
            "rieding_21": {
                "title": "Concerto em Mi Menor, Op. 21",
                "composer": "Oskar Rieding",
                "weeks": {
                    "1": {
                        "focus": "Primeiro Tema Melancólico",
                        "justification": "A afinação precisa de Mi menor melódica é estabilizada com o pedal ativo. O legato longo apoia o caráter lírico."
                    },
                    "2": {
                        "focus": "Agilidade de Dedos na 1ª e 3ª Posição",
                        "justification": "Os exercícios de Ševčík Op. 8 garantem a precisão do slide para a terceira posição nos picos de dinâmica."
                    },
                    "3": {
                        "focus": "Saltos de Corda e Mudança de Posição",
                        "justification": "O alinhamento prévio do cotovelo direito com Ševčík Op. 3 previne notas falsas nas mudanças rápidas de plano."
                    },
                    "4": {
                        "focus": "Finale Rápido (Allegro)",
                        "justification": "Desenvolvimento do spiccato leve. A prática diária com metrônomo lento a médio prepara a coordenação final."
                    }
                }
            }
        },
        "avancado": {
            "mendelssohn_e": {
                "title": "Concerto em Mi Menor, Op. 64",
                "composer": "Felix Mendelssohn",
                "weeks": {
                    "1": {
                        "focus": "Primeiro Tema Solo (Allegro muito appassionato)",
                        "justification": "A melodia inicial começa no registro médio e sobe para o superagudo. O estudo da escala de 4 oitavas de Mi Menor e os shifts precisos para a 5ª e 7ª posições na corda Mi garantem a entonação."
                    },
                    "2": {
                        "focus": "Segundo Tema em Sol Maior (Cantabile)",
                        "justification": "Controle absoluto da velocidade do arco para notas longas sobre o pedal de Sol Maior, com vibrato contínuo e som lírico."
                    },
                    "3": {
                        "focus": "Desenvolvimento e Passagens Virtuosas",
                        "justification": "Arpejos rápidos em semicolcheias com mudanças de corda complexas. O estudo de agilidade e as lições de Fiorillo preparam o braço direito para transições rápidas de plano."
                    },
                    "4": {
                        "focus": "Cadência de Virtuosismo (Arpejos Ricochet)",
                        "justification": "A famosa cadência com arpejos ricochet em cordas duplas. O estudo avançado de oitavas e sextas na semana dá a força e flexibilidade necessárias."
                    }
                }
            },
            "bruch_g": {
                "title": "Concerto em Sol Menor, Op. 26",
                "composer": "Max Bruch",
                "weeks": {
                    "1": {
                        "focus": "Ataque Inicial com Cordas Duplas",
                        "justification": "Ataque dramático com acordes de cordas duplas. O alinhamento de 45º do arco e o peso estável (Ševčík Op. 9) são cruciais para a projeção sem trastejar."
                    },
                    "2": {
                        "focus": "Adagio - Cantabile Sublime",
                        "justification": "Fraseado lírico expressivo de grande amplitude dinâmica. A afinação em Mi Bemol/Lá Bemol é refinada usando o pedal de sustentação contínuo."
                    },
                    "3": {
                        "focus": "Passagens de Oitavas Paralelas",
                        "justification": "Shifts rápidos de oitavas paralelas (dedos 1-4) na corda Lá e Mi. O treino de oitavas com ancoragem do primeiro dedo fornece estabilidade."
                    },
                    "4": {
                        "focus": "Finale - Tema Enérgico (Allegro energico)",
                        "justification": "Uso de cordas duplas rítmicas e spiccato forte. O plano semanal de golpes de arco prepara o pulso para a resposta rápida do arco."
                    }
                }
            },
            "mozart_3": {
                "title": "Concerto para Violino nº 3 em Sol Maior, K. 216",
                "composer": "W. A. Mozart",
                "weeks": {
                    "1": {
                        "focus": "Primeiro Tema Solo (Allegro)",
                        "justification": "Mozart exige elegância clássica. A escala de 3 oitavas limpa e o staccato leve do Ševčík preparam a leveza e clareza de arco necessárias."
                    },
                    "2": {
                        "focus": "Apogiaturas e Ornamentação",
                        "justification": "O estudo de flexibilidade da mão esquerda e os trinados de preparação facilitam a agilidade do 2º e 3º dedos nos ornamentos mozartianos."
                    },
                    "3": {
                        "focus": "Adagio - Cantabile Expressivo",
                        "justification": "Mudanças de posição para a 3ª e 5ª posições na corda Ré e Lá. O vibrato contínuo e sustentado com apoio do pedal no fundo garante a expressividade do tema."
                    },
                    "4": {
                        "focus": "Rondeau - Alternância de Tempos",
                        "justification": "Sincronização rítmica nas passagens rápidas e mudanças de caráter (do clássico ao folclórico). O metrônomo rigoroso na prática semanal resolve as quebras de andamento."
                    }
                }
            }
        }
    };

    const keySignatureMap = {
        "Gmajor":"G","Gminor-natural":"Bb","Abmajor":"Ab","Amajor":"A","Aminor-natural":"C",
        "Bbmajor":"Bb","Bmajor":"B","Cmajor":"C","Cminor-natural":"Eb","C#major":"C#",
        "Dmajor":"D","Dminor-natural":"F","Ebmajor":"Eb","Emajor":"E","Fmajor":"F","F#major":"F#"
    };

    const notesViolinMap = {
        "G3":  {string:"G",finger:0,pos:"Solta",x:30},
        "A3":  {string:"G",finger:1,pos:"1ª Pos",x:80},
        "Bb3": {string:"G",finger:2,pos:"1ª Pos (baixo)",x:110},
        "B3":  {string:"G",finger:2,pos:"1ª Pos",x:130},
        "C4":  {string:"G",finger:3,pos:"1ª Pos",x:155},
        "C#4": {string:"G",finger:3,pos:"1ª Pos (alto)",x:175},
        "D4":  {string:"D",finger:0,pos:"Solta",x:30},
        "Eb4": {string:"D",finger:1,pos:"1ª Pos (baixo)",x:55},
        "E4":  {string:"D",finger:1,pos:"1ª Pos",x:80},
        "F4":  {string:"D",finger:2,pos:"1ª Pos (baixo)",x:110},
        "F#4": {string:"D",finger:2,pos:"1ª Pos",x:130},
        "G4":  {string:"D",finger:3,pos:"1ª Pos",x:155},
        "Ab4": {string:"D",finger:3,pos:"1ª Pos (alto)",x:175},
        "A4":  {string:"A",finger:0,pos:"Solta",x:30},
        "Bb4": {string:"A",finger:1,pos:"1ª Pos (baixo)",x:55},
        "B4":  {string:"A",finger:1,pos:"1ª Pos",x:80},
        "C5":  {string:"A",finger:2,pos:"1ª Pos (baixo)",x:110},
        "C#5": {string:"A",finger:2,pos:"1ª Pos",x:130},
        "D5":  {string:"A",finger:3,pos:"1ª Pos",x:155},
        "Eb5": {string:"A",finger:3,pos:"1ª Pos (alto)",x:175},
        "E5":  {string:"E",finger:0,pos:"Solta",x:30},
        "F5":  {string:"E",finger:1,pos:"1ª Pos (baixo)",x:55},
        "F#5": {string:"E",finger:1,pos:"1ª Pos",x:80},
        "G5":  {string:"E",finger:2,pos:"1ª Pos (baixo)",x:110},
        "Ab5": {string:"E",finger:2,pos:"1ª Pos",x:130},
        "A5":  {string:"E",finger:3,pos:"1ª Pos",x:155},
        "Bb5": {string:"E",finger:3,pos:"1ª Pos (alto)",x:175},
        "B5":  {string:"E",finger:4,pos:"1ª Pos",x:195},
        "C6":  {string:"E",finger:1,pos:"3ª Pos",x:110},
        "C#6": {string:"E",finger:2,pos:"3ª Pos",x:130},
        "D6":  {string:"E",finger:3,pos:"3ª Pos",x:155},
        "Eb6": {string:"E",finger:3,pos:"3ª Pos",x:175},
        "E6":  {string:"E",finger:1,pos:"5ª Pos",x:80},
        "F6":  {string:"E",finger:1,pos:"5ª Pos",x:100},
        "F#6": {string:"E",finger:2,pos:"5ª Pos",x:120},
        "G6":  {string:"E",finger:3,pos:"5ª Pos",x:140},
        "Ab6": {string:"E",finger:3,pos:"5ª Pos",x:160},
        "A6":  {string:"E",finger:1,pos:"7ª Pos",x:80},
        "Bb6": {string:"E",finger:1,pos:"7ª Pos",x:100},
        "B6":  {string:"E",finger:2,pos:"7ª Pos",x:120},
        "C7":  {string:"E",finger:3,pos:"7ª Pos",x:140},
        "C#7": {string:"E",finger:3,pos:"7ª Pos",x:160},
        "D7":  {string:"E",finger:4,pos:"7ª Pos",x:180},
        "Eb7": {string:"E",finger:4,pos:"7ª Pos",x:190},
        "E7":  {string:"E",finger:1,pos:"10ª Pos",x:80},
        "F7":  {string:"E",finger:2,pos:"10ª Pos",x:110},
        "F#7": {string:"E",finger:3,pos:"10ª Pos",x:140},
        "G7":  {string:"E",finger:4,pos:"10ª Pos",x:170}
    };

    // ── STATE VARIABLES ───────────────────────────────────────
    let isPlaying        = false;
    let lastLevel        = null;
    let piano            = null;
    let synth            = null;
    let isAudioInit      = false;
    let activeNotesList  = [];
    let activeNoteIndex  = 0;
    let playTimeout      = null;
    let activePlaybackType = "scale";
    let suzukiActive     = false;
    let currentStep      = 1;
    let suzukiCompletedSteps   = new Set();
    let suzukiChecklistStates  = {};
    let isImitationPause = false;
    let loopStartIdx     = 0;
    let loopEndIdx       = 0;
    let challengeDay     = 1;
    let userXP           = 0;
    let streakCount      = 0;
    let completedScalesList = new Set();
    let challengeStates  = {tecnica:false,escala:false,repertoire:false,bonus:false};
    let mediaRecorder    = null;
    let recordedChunks   = [];
    let isRecording      = false;
    let practiceHistory  = [];

    // ══════════════════════════════════════════════════════════
    // ── CORE SCALE GENERATOR (MATEMATICAMENTE PERFEITO) ───────
    // Gera a escala ascendente + descendente de forma contínua,
    // SEM saltos de oitava errados. A oitava só sobe quando
    // a nota passa de B para C (como é a teoria musical real).
    // ══════════════════════════════════════════════════════════
    function buildScale(tonic, mode, octaves) {
        const intervals = SCALE_INTERVALS[mode] || SCALE_INTERVALS["major"];
        const tonicIdx  = CHROMATIC.indexOf(tonic);
        if (tonicIdx === -1) return [];

        // Definir oitava de início com base na tónica para violino
        // Sol (G3), Lá (A3), Si (B3) começam na oitava 3
        // Dó (C4) em diante começa na oitava 4
        const startOct = (tonicIdx >= CHROMATIC.indexOf("G")) ? 3 : 4;

        let ascending = [];
        let chrIdx  = tonicIdx;
        let octave  = startOct;

        // Ascendente: tónica + 7 graus x octaves
        for (let o = 0; o < octaves; o++) {
            for (let i = 0; i < 7; i++) {
                ascending.push({ name: CHROMATIC[chrIdx], octave, degree: i });
                // Avança o índice cromático
                chrIdx += intervals[i];
                if (chrIdx >= 12) {
                    chrIdx -= 12;
                    octave++;  // Subida de oitava REAL: só quando passa de B para C
                }
            }
        }
        // Nota de topo (oitava acima da tónica)
        ascending.push({ name: CHROMATIC[chrIdx], octave, degree: 0 });

        // Descendente: inversão sem repetir o topo
        const descending = [...ascending].reverse().slice(1);
        return [...ascending, ...descending];
    }

    function getAscendingScale(tonic, mode, octaves) {
        const intervals = SCALE_INTERVALS[mode] || SCALE_INTERVALS["major"];
        const tonicIdx  = CHROMATIC.indexOf(tonic);
        if (tonicIdx === -1) return [];

        const startOct = (tonicIdx >= CHROMATIC.indexOf("G")) ? 3 : 4;

        let ascending = [];
        let chrIdx  = tonicIdx;
        let octave  = startOct;

        for (let o = 0; o < octaves; o++) {
            for (let i = 0; i < 7; i++) {
                ascending.push({ name: CHROMATIC[chrIdx], octave, degree: i });
                chrIdx += intervals[i];
                if (chrIdx >= 12) {
                    chrIdx -= 12;
                    octave++;
                }
            }
        }
        ascending.push({ name: CHROMATIC[chrIdx], octave, degree: 0 });
        return ascending;
    }

    function buildArpeggioFromDegrees(ascendingScale, targetDegrees, sectionName) {
        let arpAscending = ascendingScale.filter(n => targetDegrees.includes(n.degree));
        const startDegree = targetDegrees[0];
        const startIdx = arpAscending.findIndex(n => n.degree === startDegree);
        if (startIdx !== -1) {
            arpAscending = arpAscending.slice(startIdx);
        }
        if (arpAscending.length === 0) return [];

        const arpDescending = [...arpAscending].reverse().slice(1);
        const combined = [...arpAscending, ...arpDescending];
        return combined.map(n => ({ ...n, section: sectionName }));
    }

    function generateArpeggiosForLevel(ascendingScale, mode, level) {
        let activeLevelGroup = level;
        if (activeLevelGroup === "solista") activeLevelGroup = "avancado";

        if (activeLevelGroup === "iniciante") {
            return buildArpeggioFromDegrees(ascendingScale, [0, 2, 4], "Arpejo da Tónica");
        } else if (activeLevelGroup === "intermedio") {
            const tonicArp = buildArpeggioFromDegrees(ascendingScale, [0, 2, 4], "Arpejo da Tónica");
            const dominantArp = mode === "major"
                ? buildArpeggioFromDegrees(ascendingScale, [4, 6, 1, 3], "Arpejo da Dominante (7ª)")
                : buildArpeggioFromDegrees(ascendingScale, [6, 1, 3, 5], "Arpejo da Dominante (Diminuta)");
            return [...tonicArp, ...dominantArp];
        } else {
            const tonicArp = buildArpeggioFromDegrees(ascendingScale, [0, 2, 4], "Arpejo da Tónica");
            const subdominantArp = buildArpeggioFromDegrees(ascendingScale, [3, 5, 0], "Arpejo da Subdominante");
            const dominantArp = mode === "major"
                ? buildArpeggioFromDegrees(ascendingScale, [4, 6, 1, 3], "Arpejo da Dominante (7ª)")
                : buildArpeggioFromDegrees(ascendingScale, [6, 1, 3, 5], "Arpejo da Dominante (Diminuta)");
            return [...tonicArp, ...subdominantArp, ...dominantArp];
        }
    }

    // ── FINGERING ENRICHMENT ──────────────────────────────────
    function enrichWithFingering(notes) {
        return notes.map(n => {
            if (n.isChord) {
                const enrichedChordPitches = n.chordPitches.map(pitch => {
                    const map = notesViolinMap[pitch];
                    return {
                        fullName: pitch,
                        name: pitch.slice(0, -1),
                        octave: parseInt(pitch.slice(-1)),
                        string:   map ? map.string   : "E",
                        finger:   map ? map.finger    : 1,
                        position: map ? map.pos       : "?",
                        x:        map ? map.x         : 80
                    };
                });
                const firstMap = enrichedChordPitches[0];
                return {
                    ...n,
                    keys: enrichedChordPitches.map(p => `${p.name.toLowerCase()}/${p.octave}`),
                    string: firstMap.string,
                    finger: firstMap.finger,
                    position: firstMap.position,
                    x: firstMap.x,
                    chordNotes: enrichedChordPitches
                };
            } else {
                const key = `${n.name}${n.octave}`;
                const map = notesViolinMap[key];
                return {
                    ...n,
                    keys: [`${n.name.toLowerCase()}/${n.octave}`],
                    string:   map ? map.string   : "E",
                    finger:   map ? map.finger    : 1,
                    position: map ? map.pos       : "?",
                    x:        map ? map.x         : 80
                };
            }
        });
    }

    // ══════════════════════════════════════════════════════════
    // ── AUDIO ENGINE (TONE.JS OFFLINE — SEM CDN) ──────────────
    // ══════════════════════════════════════════════════════════
    function initAudio() {
        if (isAudioInit) return;

        // Sintetizador principal (escala)
        piano = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "triangle" },
            envelope:   { attack: 0.02, decay: 0.3, sustain: 0.4, release: 0.8 },
            volume: -6
        }).toDestination();

        // Reverb subtil
        const reverb = new Tone.Reverb({ decay: 1.2, wet: 0.2 }).toDestination();
        piano.connect(reverb);

        // Sintetizador do drone (pedal harmónico)
        synth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "sine" },
            envelope:   { attack: 0.5, decay: 0.1, sustain: 0.9, release: 1.5 },
            volume: -12
        }).toDestination();

        isAudioInit = true;
    }

    // ── PLAYBACK ENGINE ───────────────────────────────────────
    async function togglePlayback() {
        initAudio();
        if (isPlaying) { stopPlayback(); return; }

        // OBRIGATÓRIO: desbloquear AudioContext no primeiro clique do utilizador
        await Tone.start();

        isPlaying = true;
        btnPlay.innerHTML   = `<i class="fa-solid fa-pause"></i> Pausar`;
        btnFsPlay.innerHTML = `<i class="fa-solid fa-pause"></i> Pausar`;
        const btnStaffPlay = document.getElementById("btn-staff-play");
        if (btnStaffPlay) btnStaffPlay.innerHTML = `<i class="fa-solid fa-pause"></i> Pausar`;
        btnStop.disabled    = false;
        btnFsStop.disabled  = false;
        updateSuzukiPlaybackUI(true);
        activeNoteIndex  = 0;
        isImitationPause = false;

        if (suzukiActive && currentStep === 4 && activePlaybackType === "scale") {
            setSuzukiLoopRange();
        }
        // Iniciar pedal de sustentação contínuo (se selecionado)
        const droneSelect = document.getElementById("drone-select");
        if (droneSelect && droneSelect.value !== "none") {
            await startDroneAudio(parseInt(droneSelect.value));
        } else if (activeDroneDegree !== null) {
            await startDroneAudio(activeDroneDegree);
        }
        playNextNote();
    }

    function stopPlayback() {
        isPlaying = false;
        if (playTimeout) clearTimeout(playTimeout);

        btnPlay.innerHTML   = `<i class="fa-solid fa-play"></i> Tocar`;
        btnFsPlay.innerHTML = `<i class="fa-solid fa-play"></i> Tocar`;
        const btnStaffPlay = document.getElementById("btn-staff-play");
        if (btnStaffPlay) btnStaffPlay.innerHTML = `<i class="fa-solid fa-play"></i> Tocar`;
        btnStop.disabled    = true;
        btnFsStop.disabled  = true;

        if (piano) piano.releaseAll();
        stopDroneAudio();

        updateSuzukiPlaybackUI(false);
        removeVisualNoteHighlight();
        const arrow = document.getElementById("play-arrow");
        if (arrow) arrow.style.display = "none";
        if (fingerDot) fingerDot.style.display = "none";
        document.querySelectorAll(".violin-neck .dynamic-finger-dot").forEach(el => el.remove());
        if (noteDisplay)     noteDisplay.innerText    = "Nota: ---";
        if (fingerDisplay)   fingerDisplay.innerText  = "Dedo: -";
        if (positionDisplay) positionDisplay.innerText= "Posição: -";
    }

    // Stop playback without stopping the drone (used when scale finishes)
    function stopPlaybackPreserveDrone() {
        isPlaying = false;
        if (playTimeout) clearTimeout(playTimeout);

        btnPlay.innerHTML   = `<i class="fa-solid fa-play"></i> Tocar`;
        btnFsPlay.innerHTML = `<i class="fa-solid fa-play"></i> Tocar`;
        const btnStaffPlay = document.getElementById("btn-staff-play");
        if (btnStaffPlay) btnStaffPlay.innerHTML = `<i class="fa-solid fa-play"></i> Tocar`;
        btnStop.disabled    = true;
        btnFsStop.disabled  = true;

        if (piano) piano.releaseAll();
        // Do not stop drone audio to keep pedal sounding

        updateSuzukiPlaybackUI(false);
        removeVisualNoteHighlight();
        const arrow = document.getElementById("play-arrow");
        if (arrow) arrow.style.display = "none";
        if (fingerDot) fingerDot.style.display = "none";
        document.querySelectorAll(".violin-neck .dynamic-finger-dot").forEach(el => el.remove());
        if (noteDisplay)     noteDisplay.innerText    = "Nota: ---";
        if (fingerDisplay)   fingerDisplay.innerText  = "Dedo: -";
        if (positionDisplay) positionDisplay.innerText= "Posição: -";
    }

    function playNextNote() {
        if (!isPlaying) return;

        // Loop Suzuki passo 4
        if (suzukiActive && currentStep === 4 && activePlaybackType === "scale") {
            if (activeNoteIndex > loopEndIdx) activeNoteIndex = loopStartIdx;
        }

        // Fim da sequência
        if (activeNoteIndex >= activeNotesList.length) {
            if (activePlaybackType === "scale") {
                if (suzukiActive && currentStep === 5) recordPracticeCompletion();
                challengeStates.escala = true;
                const chkEscala = document.getElementById("chk-chal-escala");
                if (chkEscala) chkEscala.checked = true;
                updateAcademyStats();
            } else if (activePlaybackType === "tecnica" || activePlaybackType === "etude") {
                challengeStates.tecnica = true;
                const chkTecnica = document.getElementById("chk-chal-tecnica");
                if (chkTecnica) chkTecnica.checked = true;
                updateAcademyStats();
            } else if (activePlaybackType === "repertoire") {
                challengeStates.repertoire = true;
                const chkRep = document.getElementById("chk-chal-repertorio");
                if (chkRep) chkRep.checked = true;
                updateAcademyStats();
            }
            if (activePlaybackType === "scale") { stopPlaybackPreserveDrone(); } else { stopPlayback(); }
            return;
        }

        // Pausa de imitação Suzuki passo 3
        if (suzukiActive && currentStep === 3 && activePlaybackType === "scale"
            && activeNoteIndex > 0 && activeNoteIndex % 4 === 0 && !isImitationPause) {
            isImitationPause = true;
            const bpm = parseInt(bpmSlider.value);
            const dur = (60 / bpm) * 4 * 1000;
            showImitationOverlay(true, activeNoteIndex - 4, activeNoteIndex - 1);
            if (piano) piano.releaseAll();
            playTimeout = setTimeout(() => {
                showImitationOverlay(false);
                isImitationPause = false;
                playNextNote();
            }, dur);
            return;
        }

        const note = activeNotesList[activeNoteIndex];
        const bpm  = parseInt(bpmSlider.value);
        const rhythmSel = rhythmDivisionSelect?.value || "seminima";
        let factor = 1.0;
        if (rhythmSel === "minima") factor = 2.0;
        else if (rhythmSel === "colcheia") factor = 0.5;
        else if (rhythmSel === "semicolcheia") factor = 0.25;
        const dur  = (60 / bpm) * factor; // segundos

        // Notas para tocar (escala ± intervalo ou acordes)
        let toPlay = [];
        if (note.isChord && note.chordPitches) {
            toPlay = [...note.chordPitches];
        } else {
            toPlay = [`${note.name}${note.octave}`];
        }

        if (intervalSelect.value !== "none" && activePlaybackType === "scale" && !note.isChord) {
            const iv = calcInterval(note, intervalSelect.value);
            if (iv) toPlay.push(`${iv.name}${iv.octave}`);
        }

        // Tocar nota (suporta polifonia real com PolySynth) se a escala não estiver silenciada
        const muteScale = document.getElementById("chk-mute-scale")?.checked === false;
        if (piano && !muteScale) {
            piano.triggerAttackRelease(toPlay, dur * 0.85);
        }

        // Visuais
        highlightVisualNote(activeNoteIndex);
        updateViolinNeck(note);

        activeNoteIndex++;
        playTimeout = setTimeout(playNextNote, dur * 1000);
    }

    function calcInterval(note, interval) {
        const semis = {third:4, "3rd":4, fourth:5, "4th":5, fifth:7, "5th":7, sixth:9, "6th":9, eighth:12, "8th":12};
        const s = semis[interval] || 0;
        if (!s) return null;
        const idx = CHROMATIC.indexOf(note.name);
        if (idx === -1) return null;
        const newIdx = (idx + s) % 12;
        const octAdd = Math.floor((idx + s) / 12);
        return { name: CHROMATIC[newIdx], octave: note.octave + octAdd };
    }

    function getDroneChord(degreeIdx) {
        const tonic = tonicSelect.value;
        const mode  = scaleTypeSelect.value;
        const ivals = SCALE_INTERVALS[mode] || SCALE_INTERVALS["major"];
        let root = CHROMATIC.indexOf(tonic);
        for (let i = 0; i < degreeIdx; i++) root = (root + ivals[i]) % 12;
        const third = (root + 4) % 12;
        const fifth  = (root + 7) % 12;
        return [`${CHROMATIC[root]}3`, `${CHROMATIC[third]}3`, `${CHROMATIC[fifth]}3`];
    }

    // ══════════════════════════════════════════════════════════
    // ── VEXFLOW SHEET MUSIC RENDERER ──────────────────────────
    // Desenha a escala numa única pauta contínua com graus
    // ══════════════════════════════════════════════════════════
    function drawSheetMusic(notes) {
        const staffDiv = document.getElementById("vexflow-staff");
        staffDiv.innerHTML = "";
        // Garante fundo branco a toda a hora
        staffDiv.style.backgroundColor = "#ffffff";
        staffDiv.style.padding = "16px";
        staffDiv.style.borderRadius = "8px";

        if (!notes || notes.length === 0) return;

        const tonic   = tonicSelect.value;
        const mode    = scaleTypeSelect.value;
        const keySig  = keySignatureMap[`${tonic}${mode}`] || "C";
        const itvSel  = intervalSelect.value;

        // Largura disponível
        const containerWidth = staffDiv.parentElement ? staffDiv.parentElement.offsetWidth : 900;
        const width = Math.max(containerWidth - 40, 600);

        // Quantas notas cabem por linha (pauta)
        const NOTES_PER_LINE = 8;
        
        // Agrupar notas por secção
        const sections = [];
        let currentSection = null;
        notes.forEach(n => {
            const secName = n.section || "Escala";
            if (!currentSection || currentSection.title !== secName) {
                currentSection = { title: secName, notes: [] };
                sections.push(currentSection);
            }
            currentSection.notes.push(n);
        });

        // Dividir cada secção em blocos (chunks) separadamente
        const chunks = [];
        sections.forEach(sec => {
            const secNotes = sec.notes;
            for (let i = 0; i < secNotes.length; i += NOTES_PER_LINE) {
                const chunk = secNotes.slice(i, i + NOTES_PER_LINE);
                if (i === 0) {
                    chunk[0].isSectionStart = true;
                    chunk[0].sectionTitle = sec.title;
                }
                if (i + NOTES_PER_LINE >= secNotes.length) {
                    chunk[chunk.length - 1].isSectionEnd = true;
                }
                chunks.push(chunk);
            }
        });

        const STAVE_HEIGHT = 180; // espaço entre linhas de pauta (inclui anotações)
        const totalHeight  = chunks.length * STAVE_HEIGHT + 40;

        const renderer = new Renderer(staffDiv, Renderer.Backends.SVG);
        renderer.resize(width, totalHeight);
        const ctx = renderer.getContext();
        // Fundo branco no SVG
        ctx.setFillStyle("#ffffff");

        let yOffset = 40;

        chunks.forEach((chunk, chunkIdx) => {
            const stave = new Stave(10, yOffset, width - 20);

            const isSecStart = chunk[0].isSectionStart;
            if (isSecStart || chunkIdx === 0) {
                stave.addClef("treble").addKeySignature(keySig);
            } else {
                stave.addClef("treble");
            }
            const isSecEnd = chunk[chunk.length - 1].isSectionEnd;
            if (isSecEnd || chunkIdx === chunks.length - 1) {
                stave.setEndBarType(Vex.Flow.Barline.type.DOUBLE);
            }
            stave.setContext(ctx).draw();

            if (isSecStart && chunk[0].sectionTitle) {
                ctx.setFont("Arial", 12, "bold italic");
                ctx.setFillStyle("#7c4dff");
                ctx.fillText(chunk[0].sectionTitle, 15, yOffset - 10);
            }

            const vexNotes = chunk.map((n, localIdx) => {
                const globalIdx = notes.indexOf(n);

                // Use pre-computed keys from enrichWithFingering or fallback
                let keys = n.keys;
                if (!keys) {
                    let noteLetter = n.name.toLowerCase();
                    keys = [`${noteLetter}/${n.octave}`];

                    // Intervalo paralelo
                    if (itvSel !== "none" && activePlaybackType === "scale") {
                        const iv = calcInterval(n, itvSel);
                        if (iv) {
                            const ivLetter = iv.name.toLowerCase();
                            keys.push(`${ivLetter}/${iv.octave}`);
                        }
                    }
                }

                const rhythmSel = rhythmDivisionSelect?.value || "seminima";
                const durMap = { "minima": "h", "seminima": "q", "colcheia": "8", "semicolcheia": "16" };
                const vexDuration = durMap[rhythmSel] || "q";

                const staveNote = new StaveNote({ clef: "treble", keys, duration: vexDuration });

                // Acidentais explícitos (quando NÃO fazem parte da armadura)
                keys.forEach((k, kIdx) => {
                    const pitch = k.split("/")[0];
                    if (pitch.includes("#")) {
                        staveNote.addModifier(new Accidental("#"), kIdx);
                    } else if (pitch.length > 1 && pitch.endsWith("b")) {
                        staveNote.addModifier(new Accidental("b"), kIdx);
                    }
                });

                // Grau funcional como anotação no TOPO da nota
                const chkShowDegrees = document.getElementById("chk-show-degrees");
                const showDegrees = (chkShowDegrees && chkShowDegrees.checked) || (activePlaybackType === "scale");
                if (showDegrees && n.degree !== undefined) {
                    const degreeNames  = DEGREE_NAMES[mode] || DEGREE_NAMES["major"];
                    const degLabel     = `${DEGREE_ROMAN[n.degree] || ""}`;
                    const funcLabel    = degreeNames[n.degree] || "";
                    const annotation   = new Annotation(`${degLabel} ${funcLabel}`)
                        .setFont("Arial", 9, "bold")
                        .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP);
                    staveNote.addModifier(annotation, 0);
                }

                staveNote.setAttribute("id", `note-svg-${globalIdx}`);
                return staveNote;
            });

            const voice = new Voice({ num_beats: vexNotes.length, beat_value: 4 });
            voice.setMode(Voice.Mode.SOFT);
            voice.addTickables(vexNotes);

            const fmtWidth = (isSecStart || chunkIdx === 0) ? (width - 160) : (width - 60);
            new Formatter().joinVoices([voice]).format([voice], fmtWidth);
            voice.draw(ctx, stave);

            const rhythmSel = rhythmDivisionSelect?.value || "seminima";
            const durMap = { "minima": "h", "seminima": "q", "colcheia": "8", "semicolcheia": "16" };
            const vexDuration = durMap[rhythmSel] || "q";
            if (vexDuration === "8" || vexDuration === "16") {
                const beams = Vex.Flow.Beam.generateBeams(vexNotes);
                beams.forEach(b => b.setContext(ctx).draw());
            }

            yOffset += STAVE_HEIGHT;
        });
    }

    // ── VISUAL NOTE HIGHLIGHT ─────────────────────────────────
    function highlightVisualNote(idx) {
        removeVisualNoteHighlight();
        const el = document.getElementById(`note-svg-${idx}`);
        if (el) {
            el.querySelectorAll("path,rect").forEach(p => p.classList.add("note-highlight-active"));
        }
        const arrow = document.getElementById("play-arrow");
        if (el && arrow) {
            const r  = el.getBoundingClientRect();
            const cr = document.getElementById("vexflow-staff").getBoundingClientRect();
            arrow.style.display = "block";
            arrow.style.left    = `${r.left - cr.left + r.width / 2 - 8}px`;
            const lineIdx = Math.floor(idx / 8);
            arrow.style.top = `${15 + lineIdx * 180}px`;
        }
    }

    function removeVisualNoteHighlight() {
        document.querySelectorAll(".note-highlight-active").forEach(e => e.classList.remove("note-highlight-active"));
    }

    // ── VIOLIN NECK ───────────────────────────────────────────
    function updateViolinNeck(note) {
        if (!note) return;

        // Clear existing dynamic dots
        document.querySelectorAll(".violin-neck .dynamic-finger-dot").forEach(el => el.remove());

        if (note.isChord && note.chordNotes) {
            // Chord
            if (noteDisplay)     noteDisplay.innerText    = `Nota: ${note.name}`;
            const fingers = note.chordNotes.map(n => n.finger === 0 ? "Solta" : n.finger).join("+");
            const positions = [...new Set(note.chordNotes.map(n => n.position))].join("/");
            if (fingerDisplay)   fingerDisplay.innerText  = `Dedo: ${fingers}`;
            if (positionDisplay) positionDisplay.innerText= `Posição: ${positions}`;

            if (!fingerDot) return;
            fingerDot.style.display = "none"; // Hide main dot

            const stringTops = {G:20,D:45,A:70,E:95};
            const neck = document.querySelector(".violin-neck");
            if (neck) {
                note.chordNotes.forEach(cn => {
                    const dot = document.createElement("div");
                    dot.className = "finger-dot dynamic-finger-dot";
                    dot.style.top = `${stringTops[cn.string] || 70}px`;
                    dot.style.left = `${cn.x || 80}px`;
                    dot.style.display = "block";
                    neck.appendChild(dot);
                });
            }
        } else {
            // Single note
            if (noteDisplay)     noteDisplay.innerText    = `Nota: ${note.name}${note.octave}`;
            if (fingerDisplay)   fingerDisplay.innerText  = `Dedo: ${note.finger === 0 ? "Solta" : note.finger}`;
            if (positionDisplay) positionDisplay.innerText= `Posição: ${note.position || "?"}`;
            if (!fingerDot) return;
            const stringTops = {G:20,D:45,A:70,E:95};
            fingerDot.style.display = "block";
            fingerDot.style.top  = `${stringTops[note.string] || 70}px`;
            fingerDot.style.left = `${note.x || 80}px`;
        }
    }

    function loadScaleIntoStaff() {
        const tonic   = tonicSelect.value;
        const mode    = scaleTypeSelect.value;
        const octaves = parseInt(octavesSelect.value) || 1;
        const level   = levelSelect.value;
        const practiceMode = document.getElementById("practice-mode-select")?.value || "both";

        activePlaybackType = "scale";

        let raw = [];
        if (practiceMode === "scale") {
            raw = buildScale(tonic, mode, octaves).map(n => ({ ...n, section: "Escala" }));
        } else if (practiceMode === "arpeggio") {
            const ascending = getAscendingScale(tonic, mode, octaves);
            raw = generateArpeggiosForLevel(ascending, mode, level);
        } else {
            // both
            const scaleNotes = buildScale(tonic, mode, octaves).map(n => ({ ...n, section: "Escala" }));
            const ascending = getAscendingScale(tonic, mode, octaves);
            const arpNotes = generateArpeggiosForLevel(ascending, mode, level);
            raw = [...scaleNotes, ...arpNotes];
        }

        activeNotesList = enrichWithFingering(raw);
        drawSheetMusic(activeNotesList);

        vexflowPanelTitle.innerHTML = `<i class="fa-solid fa-music"></i> Pauta Clave de Sol`;
        const modeLabel = {
            "major":"Maior","minor-natural":"Menor Natural",
            "minor-harmonic":"Menor Harmónica","minor-melodic":"Melódica"
        }[mode] || mode;

        let badgeText = `${tonic} ${modeLabel}`;
        if (practiceMode === "arpeggio") badgeText += " (Arpejos)";
        else if (practiceMode === "both") badgeText += " (Escala + Arpejos)";
        scaleBadge.innerText = badgeText;

        if (btnRestoreScaleStaff) btnRestoreScaleStaff.style.display = "none";
        const staffContentLabel = document.getElementById("staff-content-label");
        if (staffContentLabel) {
            if (practiceMode === "scale") staffContentLabel.innerText = "Escala Principal";
            else if (practiceMode === "arpeggio") staffContentLabel.innerText = "Arpejos Principais";
            else staffContentLabel.innerText = "Escala & Arpejos";
        }
    }

    function loadPedagogicUnitIntoStaff(unit, badgeText, type) {
        stopPlayback();
        activePlaybackType = type;
        if (!unit) return;

        const raw = unit.notes.map((noteName, idx) => {
            if (noteName.includes("-")) {
                const parts = noteName.split("-");
                return {
                    name: noteName,
                    fullName: noteName,
                    isChord: true,
                    chordPitches: parts,
                    degree: idx % 7
                };
            } else {
                let name, octave;
                const lastChar = noteName[noteName.length - 1];
                octave = parseInt(lastChar);
                name   = noteName.slice(0, -1);
                return { name, octave, degree: idx % 7, fullName: noteName, isChord: false, chordPitches: [noteName] };
            }
        });

        activeNotesList = enrichWithFingering(raw);
        vexflowPanelTitle.innerHTML = `<i class="fa-solid fa-music"></i> Pauta: ${unit.title}`;
        scaleBadge.innerText = badgeText;
        btnRestoreScale.style.display = "inline-block";
        if (btnRestoreScaleStaff) btnRestoreScaleStaff.style.display = "inline-block";
        const staffContentLabel = document.getElementById("staff-content-label");
        if (staffContentLabel) staffContentLabel.innerText = `A praticar: ${unit.title}`;
        drawSheetMusic(activeNotesList);
    }

    // ── BPM SLIDERS SYNC ─────────────────────────────────────
    bpmSlider.addEventListener("input", e => {
        bpmVal.innerText    = e.target.value;
        fsBpmSlider.value   = e.target.value;
        fsBpmVal.innerText  = e.target.value;
    });
    fsBpmSlider.addEventListener("input", e => {
        fsBpmVal.innerText  = e.target.value;
        bpmSlider.value     = e.target.value;
        bpmVal.innerText    = e.target.value;
    });

    // ── CONTROLS ──────────────────────────────────────────────
    function applyLevelSettings() {
        const lvl = levelSelect.value;
        if (lvl === "iniciante") {
            octavesGroup.style.display = "none";
            intervalGroup.style.display = "none";
            octavesSelect.value = "1";
            intervalSelect.value = "none";
        } else {
            octavesGroup.style.display = "block";
            intervalGroup.style.display = "block";
        }
    }

    levelSelect.addEventListener("change",     () => { applyLevelSettings(); updateDashboard(); });
    tonicSelect.addEventListener("change",     () => updateDashboard());
    scaleTypeSelect.addEventListener("change", () => updateDashboard());
    document.getElementById("practice-mode-select")?.addEventListener("change", () => updateDashboard());
    rhythmDivisionSelect?.addEventListener("change", () => {
        drawSheetMusic(activeNotesList);
        updateDashboard();
    });
    octavesSelect.addEventListener("change",   () => updateDashboard());
    intervalSelect.addEventListener("change",  () => updateDashboard());

    // Event listeners para o Mixer de Áudio e Drone Select
    const droneSelect = document.getElementById("drone-select");
    if (droneSelect) {
        droneSelect.addEventListener("change", async e => {
            const val = e.target.value;
            if (val === "none") {
                stopDroneAudio();
            } else {
                await startDroneAudio(parseInt(val));
            }
        });
    }

    const chkMutePedal = document.getElementById("chk-mute-pedal");
    if (chkMutePedal) {
        chkMutePedal.addEventListener("change", async e => {
            if (e.target.checked) {
                if (activeDroneDegree !== null) {
                    await startDroneAudio(activeDroneDegree);
                }
            } else {
                if (synth) synth.releaseAll();
            }
        });
    }

    const chkMuteScale = document.getElementById("chk-mute-scale");
    if (chkMuteScale) {
        chkMuteScale.addEventListener("change", () => {
            // Apenas para sincronizar/salvar estado se necessário
        });
    }

    document.getElementById("btn-rebuild-weekly-plan")?.addEventListener("click", () => {
        generateWeeklyPlan();
        alert("Plano semanal recalculado para a escala e nível ativos!");
    });

    document.getElementById("weekly-concerto-select")?.addEventListener("change", () => {
        generateWeeklyPlan();
    });

    document.getElementById("weekly-week-select")?.addEventListener("change", () => {
        generateWeeklyPlan();
    });

    const chkShowDegrees = document.getElementById("chk-show-degrees");
    if (chkShowDegrees) {
        chkShowDegrees.addEventListener("change", () => {
            drawSheetMusic(activeNotesList);
        });
    }

    chkSuzukiMode.addEventListener("change", e => {
        suzukiActive = e.target.checked;
        if (suzukiActive) {
            suzukiContent.style.display = "block";
            suzukiPanel.style.border    = "1px solid var(--secondary)";
            changeSuzukiStep(1);
        } else {
            suzukiContent.style.display = "none";
            suzukiPanel.style.border    = "1px solid var(--border-color)";
            stopPlayback();
            updateDashboard();
        }
    });

    btnPlay.addEventListener("click",   togglePlayback);
    btnStop.addEventListener("click",   stopPlayback);
    btnFsPlay.addEventListener("click", togglePlayback);
    btnFsStop.addEventListener("click", stopPlayback);
    btnRestoreScale.addEventListener("click", () => { loadScaleIntoStaff(); });
    btnRestoreScaleStaff?.addEventListener("click", () => { loadScaleIntoStaff(); });

    // ── PRACTICE PLAN CARDS ACTIONS ──────────────────────────
    const tryGet = id => document.getElementById(id);

    tryGet("btn-tech-view")?.addEventListener("click", () => {
        if (!activePracticePlan) return;
        const u = activePracticePlan.bows[0] || activePracticePlan.scales[0];
        if (u) loadPedagogicUnitIntoStaff(u, "Técnica", "tecnica");
    });
    tryGet("btn-tech-play")?.addEventListener("click", () => {
        if (!activePracticePlan) return;
        const u = activePracticePlan.bows[0] || activePracticePlan.scales[0];
        if (u) { loadPedagogicUnitIntoStaff(u, "Técnica", "tecnica"); togglePlayback(); }
    });
    tryGet("btn-study-view")?.addEventListener("click", () => {
        if (!activePracticePlan) return;
        const u = activePracticePlan.etudes[0];
        if (u) loadPedagogicUnitIntoStaff(u, "Estudo", "etude");
    });
    tryGet("btn-study-play")?.addEventListener("click", () => {
        if (!activePracticePlan) return;
        const u = activePracticePlan.etudes[0];
        if (u) { loadPedagogicUnitIntoStaff(u, "Estudo", "etude"); togglePlayback(); }
    });
    tryGet("btn-rep-view")?.addEventListener("click", () => {
        if (!activePracticePlan) return;
        const ex = activePracticePlan.excerpts[0];
        if (ex) loadPedagogicUnitIntoStaff(ex, "Repertório", "repertoire");
    });
    tryGet("btn-rep-play")?.addEventListener("click", () => {
        if (!activePracticePlan) return;
        const ex = activePracticePlan.excerpts[0];
        if (ex) { loadPedagogicUnitIntoStaff(ex, "Repertório", "repertoire"); togglePlayback(); }
    });
    tryGet("btn-rep-study")?.addEventListener("click", () => {
        if (!activePracticePlan) return;
        const ex = activePracticePlan.excerpts[0];
        if (ex) {
            loadPedagogicUnitIntoStaff(ex, "Repertório (Lento)", "repertoire");
            bpmSlider.value = Math.max(40, parseInt(bpmSlider.value) - 15);
            bpmVal.innerText = bpmSlider.value;
            togglePlayback();
        }
    });

    // ── FULLSCREEN ────────────────────────────────────────────
    btnFullscreenMode.addEventListener("click", () => {
        document.body.classList.add("fullscreen-active");
        setTimeout(() => drawSheetMusic(activeNotesList), 80);
    });
    btnExitFs.addEventListener("click", () => {
        document.body.classList.remove("fullscreen-active");
        setTimeout(() => drawSheetMusic(activeNotesList), 80);
    });

    // ── WAV RECORDER ─────────────────────────────────────────
    btnRecord.addEventListener("click", () => {
        initAudio();
        if (isRecording) {
            isRecording = false;
            btnRecord.innerHTML = `<i class="fa-solid fa-circle"></i> Gravar WAV`;
            btnRecord.className = "btn btn-record";
            recordStatus.innerText = "A processar...";
            if (mediaRecorder) mediaRecorder.stop();
        } else {
            isRecording = true;
            btnRecord.innerHTML = `<i class="fa-solid fa-square" style="color:white"></i> Parar Gravação`;
            btnRecord.className = "btn btn-primary";
            recordStatus.innerText = "A gravar...";
            recordedChunks = [];
            const dest = Tone.getContext().createMediaStreamDestination();
            Tone.getDestination().connect(dest);
            mediaRecorder = new MediaRecorder(dest.stream);
            mediaRecorder.ondataavailable = e => { if (e.data.size > 0) recordedChunks.push(e.data); };
            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, {type:"audio/wav"});
                const url  = URL.createObjectURL(blob);
                const a    = Object.assign(document.createElement("a"), {href:url, download:`ViolinLab_${tonicSelect.value}_${scaleTypeSelect.value}.wav`, style:"display:none"});
                document.body.appendChild(a);
                a.click();
                setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); recordStatus.innerText = "WAV exportado!"; }, 100);
            };
            mediaRecorder.start();
        }
    });

    btnPdf.addEventListener("click", () => window.print());

    // -- MODAL PLANO SEMANAL --
    const btnOpenWeeklyPlan = document.getElementById("btn-open-weekly-plan");
    const btnCloseWeeklyPlan = document.getElementById("btn-close-weekly-plan");
    const weeklyPlanModal = document.getElementById("weekly-plan-modal");
    if (btnOpenWeeklyPlan && weeklyPlanModal) {
        btnOpenWeeklyPlan.addEventListener("click", () => {
            generateWeeklyPlan();
            weeklyPlanModal.classList.add("open");
        });
    }
    if (btnCloseWeeklyPlan && weeklyPlanModal) {
        btnCloseWeeklyPlan.addEventListener("click", () => {
            weeklyPlanModal.classList.remove("open");
        });
    }
    if (weeklyPlanModal) {
        weeklyPlanModal.addEventListener("click", e => {
            if (e.target === weeklyPlanModal) {
                weeklyPlanModal.classList.remove("open");
            }
        });
    }

    function populateConcertoOptions() {
        const levelSelect = document.getElementById("level-select");
        const concertoSelect = document.getElementById("weekly-concerto-select");
        if (!levelSelect || !concertoSelect) return;

        let level = levelSelect.value;
        if (level === "solista") level = "avancado";

        concertoSelect.innerHTML = "";

        const levelData = CONCERTO_DATABASE[level];
        if (levelData) {
            Object.keys(levelData).forEach(key => {
                const opt = document.createElement("option");
                opt.value = key;
                opt.innerText = `${levelData[key].title} (${levelData[key].composer})`;
                concertoSelect.appendChild(opt);
            });
        } else {
            const opt = document.createElement("option");
            opt.value = "none";
            opt.innerText = "Sem concerto sugerido";
            concertoSelect.appendChild(opt);
        }
    }

    // ── DASHBOARD UPDATE ──────────────────────────────────────
    function updateDashboard() {
        const key   = tonicSelect.value;
        const mode  = scaleTypeSelect.value;
        const level = levelSelect.value;

        if (level !== lastLevel) {
            populateConcertoOptions();
        }

        activePracticePlan = resolvePracticePlan({ key, mode, studentLevel: level, catalog: repertoryCatalog });

        const modeLabel = {
            "major":"Maior","minor-natural":"Menor Natural",
            "minor-harmonic":"Menor Harmónica","minor-melodic":"Menor Melódica"
        }[mode] || mode;

        if (activePracticePlan) {
            const pr = activePracticePlan.route;
            if (level !== "iniciante" && level !== lastLevel) {
                octavesSelect.value = pr.octaves;
            }
            lastLevel = level;
            planScaleName.innerText  = `${key} ${modeLabel}`;
            planScaleOctaves.innerText = `${pr.octaves} Oitava${pr.octaves > 1 ? "s" : ""}`;
            planScaleBowing.innerText  = pr.bowingPattern;
            const su = activePracticePlan.scales[0];
            planScaleFocus.innerText   = su ? su.focus : `Entonação em ${key} ${modeLabel}.`;

            const tu = activePracticePlan.bows[0] || su;
            if (tu) {
                planTechTitle.innerText = tu.title;
                planTechFocus.innerText = tu.focus;
                techPdfContainer.innerHTML = "";
                const tp = activePracticePlan.pdfs.find(p => p.bookId === tu.bookId);
                tp ? renderPdfBadge(tp, techPdfContainer) : renderManualEntryBadge(techPdfContainer);
            }

            const eu = activePracticePlan.etudes[0];
            if (eu) {
                planStudyTitle.innerText = eu.title;
                planStudyFocus.innerText = eu.focus;
                studyPdfContainer.innerHTML = "";
                const sp = activePracticePlan.pdfs.find(p => p.bookId === eu.bookId);
                sp ? renderPdfBadge(sp, studyPdfContainer) : renderManualEntryBadge(studyPdfContainer);
            }

            const piece  = activePracticePlan.piece;
            const excerpt= activePracticePlan.excerpts[0];
            if (piece && excerpt) {
                planRepTitle.innerText   = `${piece.title} (${piece.composer})`;
                planRepExcerpt.innerText = excerpt.title;
                planRepBars.innerText    = excerpt.bars;
                planRepFocus.innerText   = excerpt.transferObjective;
                repPdfContainer.innerHTML = "";
                const rp = activePracticePlan.pdfs.find(p => p.pieceId === piece.id);
                rp ? renderPdfBadge(rp, repPdfContainer) : renderManualEntryBadge(repPdfContainer);
            } else {
                planRepTitle.innerText   = "Sem Peça em Catálogo";
                planRepExcerpt.innerText = "-";
                planRepBars.innerText    = "-";
                planRepFocus.innerText   = "Nenhuma melodia associada.";
                repPdfContainer.innerHTML = "";
            }
        }

        // Sempre gera a escala correctamente e desenha
        if (!isPlaying || activePlaybackType === "scale") {
            loadScaleIntoStaff();
        }

        vexflowPanelTitle.innerHTML = `<i class="fa-solid fa-music"></i> Pauta Clave de Sol`;
        scaleBadge.innerText = `${key} ${modeLabel}`;
        printScaleTitle.innerText = `Escala de ${key} ${modeLabel}`;
        btnRestoreScale.style.display = "none";

        relativeDisplay.innerText = getRelativeScale(key, mode);
        updateStudyFundamentals(key, mode, level, activePracticePlan?.route);
        challengeDayNum.innerText = challengeDay;

        const txt_t = tryGet("txt-chal-tecnica");
        const txt_e = tryGet("txt-chal-escala");
        const txt_r = tryGet("txt-chal-repertorio");
        const txt_b = tryGet("txt-chal-bonus");
        if (txt_t) txt_t.innerText = `Estudar técnica em ${key} ${modeLabel}.`;
        if (txt_e) txt_e.innerText = `Tocar a escala de ${key} ${modeLabel} a ${bpmSlider.value} BPM.`;
        if (txt_r) txt_r.innerText = activePracticePlan?.piece ? `Tocar excerto de ${activePracticePlan.piece.title}.` : "Tocar excerto clássico.";
        if (txt_b) txt_b.innerText = getBonusChallengeText(challengeDay);

        renderSuzukiChecklist();
        renderHarmonyTable();
        updateAcademyStats();
        drawCircleOfFifths();
        generateWeeklyPlan();
    }

    // ── PDF BADGES ────────────────────────────────────────────
    function renderPdfBadge(pdfEntry, container) {
        if (!pdfEntry || !container) return;
        const validation = validatePdfSource(pdfEntry, validatedSources);
        let badgeClass = "pdf-badge-rejected", statusText = "Restrito", targetUrl = pdfEntry.fallbackUrl || "#";
        if (validation.status === "approved_embed")          { badgeClass="pdf-badge-embed";       statusText="Embed/Direct";   targetUrl=pdfEntry.pdfUrl; }
        else if (validation.status === "approved_external_open") { badgeClass="pdf-badge-open";   statusText="IMSLP/Externo";  targetUrl=pdfEntry.sourcePageUrl; }
        else if (validation.status === "approved_download_only") { badgeClass="pdf-badge-download";statusText="Download";      targetUrl=pdfEntry.pdfUrl; }
        else if (validation.status === "conditional")        { badgeClass="pdf-badge-conditional"; statusText="Condicional";   targetUrl=pdfEntry.fallbackUrl; }
        container.innerHTML = `<a href="${targetUrl}" target="_blank" class="pdf-badge ${badgeClass}" style="text-decoration:none;"><i class="fa-solid fa-file-pdf"></i> ${statusText}</a>`;
    }

    function renderManualEntryBadge(container) {
        if (!container) return;
        container.innerHTML = `<span class="pdf-badge pdf-badge-conditional"><i class="fa-solid fa-book-bookmark"></i> Livro Físico</span>`;
    }

    // ── SUSTAINED DRONE AUDIO FUNCTIONS ───────────────────────
    let activeDroneDegree = null;

    async function startDroneAudio(degree) {
        initAudio();
        await Tone.start();
        const mutePedal = document.getElementById("chk-mute-pedal")?.checked === false;
        
        if (synth) synth.releaseAll();
        
        activeDroneDegree = degree;
        
        const droneSelect = document.getElementById("drone-select");
        if (droneSelect) {
            droneSelect.value = String(degree);
        }
        
        updatePedalButtonsUI();

        if (mutePedal) return;

        const notes = getDroneChord(degree);
        if (synth) {
            synth.triggerAttack(notes);
        }
    }

    function stopDroneAudio() {
        activeDroneDegree = null;
        if (synth) {
            synth.releaseAll();
        }
        
        const droneSelect = document.getElementById("drone-select");
        if (droneSelect) {
            droneSelect.value = "none";
        }
        
        updatePedalButtonsUI();
    }

    async function toggleDroneAudio(degree) {
        if (activeDroneDegree === degree) {
            stopDroneAudio();
        } else {
            await startDroneAudio(degree);
        }
    }

    function updatePedalButtonsUI() {
        const rows = document.querySelectorAll("#harmony-table-body tr");
        rows.forEach((row, idx) => {
            const btn = row.querySelector(".btn-play-chord");
            if (activeDroneDegree === idx) {
                row.classList.add("active-pedal-row");
                if (btn) {
                    btn.classList.add("active-pedal");
                    btn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i> Parar`;
                }
            } else {
                row.classList.remove("active-pedal-row");
                if (btn) {
                    btn.classList.remove("active-pedal");
                    btn.innerHTML = `<i class="fa-solid fa-volume-high"></i> Ouvir`;
                }
            }
        });
    }

    // ── HARMONY TABLE ─────────────────────────────────────────
    function renderHarmonyTable() {
        if (!harmonyTableBody) return;
        harmonyTableBody.innerHTML = "";
        const mode = scaleTypeSelect.value;
        const chordsDesc = mode === "major"
            ? ["Maior (Tónica)","Menor (Supertónica)","Menor (Mediante)","Maior (Subdominante)","Maior (Dominante)","Menor (Sobredominante)","Diminuto (Sensível)"]
            : ["Menor (Tónica)","Diminuto (Supertónica)","Maior (Mediante)","Menor (Subdominante)","Menor (Dominante)","Maior (Sobredominante)","Maior (Subtónica)"];
        for (let i = 0; i < 7; i++) {
            const chord = getDroneChord(i);
            const tr = document.createElement("tr");
            tr.innerHTML = `<td><strong>${DEGREE_ROMAN[i]}</strong></td><td>${chord[0].slice(0,-1)}</td><td>${chordsDesc[i]}</td><td><button class="btn btn-sm btn-secondary btn-play-chord" data-degree="${i}" style="padding:0.2rem 0.5rem;font-size:0.75rem;"><i class="fa-solid fa-volume-high"></i> Ouvir</button></td>`;
            tr.querySelector(".btn-play-chord").addEventListener("click", async e => {
                const deg = parseInt(e.currentTarget.dataset.degree);
                await toggleDroneAudio(deg);
            });
            harmonyTableBody.appendChild(tr);
        }
        updatePedalButtonsUI();
    }

    // ── STUDY FUNDAMENTALS ────────────────────────────────────
    function getDetailedStudyGuide(key, mode, level, route) {
        const isMinor = mode.includes("minor");
        const isAvancadoOrSolista = level === "avancado" || level === "solista";
        
        let bowTechniqueHtml = "";
        let coordHtml = "";
        let doubleStopHtml = "";
        
        const pattern = route ? route.bowingPattern : "2 notas ligadas, 2 separadas";
        if (pattern.includes("ligadas") && pattern.includes("separadas")) {
            bowTechniqueHtml = `
                <strong>Golpe de Arco: Legato + Détaché Misto</strong><br>
                Use metade do arco para as duas notas ligadas (distribuição lenta e constante) e ative um détaché rápido e enérgico no meio do arco para as duas notas soltas. 
                Mantenha o braço direito relaxado e o pulso flexível nas transições.
            `;
        } else if (pattern.includes("marteladas") || pattern.includes("martelado")) {
            bowTechniqueHtml = `
                <strong>Golpe de Arco: Martelé (Martelado)</strong><br>
                Exige uma mordida limpa no início de cada nota (pressione ligeiramente o indicador sobre o arco, solte a pressão ao puxar). 
                Pare o arco completamente entre as notas para criar um silêncio nítido. Ótimo para precisão e velocidade.
            `;
        } else if (pattern.includes("polifonia") || pattern.includes("acordos") || pattern.includes("acordes")) {
            bowTechniqueHtml = `
                <strong>Golpe de Arco: Quebra de Acordes (Polifonia)</strong><br>
                Para acordes de 3 ou 4 cordas (ex: Bach Chaconne), toque as duas notas inferiores juntas no calcanhar (graves) e imediatamente gire o cotovelo para tocar as duas notas superiores (agudas). 
                Evite esmagar o som; use velocidade de arco em vez de pressão excessiva.
            `;
        } else {
            bowTechniqueHtml = `
                <strong>Golpe de Arco: Détaché no Meio do Arco</strong><br>
                Toque com notas separadas e bem cantadas, usando a seção central do arco. 
                O som deve ser contínuo e uniforme (pronunciado, mas sem acentos secos), mantendo a pressão constante do indicador.
            `;
        }
        
        coordHtml = `
            <strong>Sincronização de Mãos (Coordenação)</strong><br>
            A mão esquerda deve antecipar a nota seguinte colocada antes da mudança de direção do arco. 
            Pratique de forma lenta (40-50 BPM), garantindo que os dedos da mão esquerda caiam exatamente no mesmo milésimo de segundo em que o arco muda de direção. 
            Para arpejos ou saltos largos, prepare o ângulo do cotovelo direito com antecedência.
        `;
        
        if (isAvancadoOrSolista) {
            doubleStopHtml = `
                <strong>Estudo de Cordas Duplas e Afinação</strong><br>
                Ao praticar terças, sextas ou oitavas (Ševčík Op.9 / Kreutzer):
                <ul>
                    <li>Toque primeiro cada nota separadamente para conferir a afinação individual.</li>
                    <li>Toque juntas com peso igual do arco nas duas cordas (ângulo de 45º).</li>
                    <li>Use o conceito de <i>Notas de Apoio (Anchor Fingers)</i>: mantenha o dedo mais baixo fixo enquanto move o dedo mais alto para estabilizar a mão esquerda.</li>
                    <li>Ouça os batimentos acústicos (sons de combinação de Tartini); quando perfeitamente afinado, o som ressoa de forma limpa e sem oscilações ásperas.</li>
                </ul>
            `;
        } else {
            doubleStopHtml = `
                <strong>Introdução à Condução de Vozes</strong><br>
                Ainda que esteja na 1ª posição, prepare-se para o estudo de cordas duplas mantendo os dedos da mão esquerda curvados e próximos das cordas. 
                Ao tocar escalas, deixe a nota anterior soar o máximo de tempo possível (legato de dedos) para criar uma transição ressonante e fluida.
            `;
        }
        
        return `
            <div class="study-guide-details">
                <div class="guide-item"><i class="fa-solid fa-wand-magic-sparkles"></i> <div>${bowTechniqueHtml}</div></div>
                <div class="guide-item"><i class="fa-solid fa-arrows-spin"></i> <div>${coordHtml}</div></div>
                <div class="guide-item"><i class="fa-solid fa-layer-group"></i> <div>${doubleStopHtml}</div></div>
            </div>
        `;
    }

    function updateStudyFundamentals(key, mode, level, route) {
        const raw       = buildScale(key, mode, 1);
        const isMinor   = mode.includes("minor");
        const note1     = raw[0]?.name || key;
        const note4     = raw[3]?.name || "";
        const note5     = raw[4]?.name || "";
        const note7     = raw[6]?.name || "";

        const el = id => tryGet(id);
        if (el("study-tonic-desc"))      el("study-tonic-desc").innerHTML      = `<strong>Tónica (I Grau):</strong> ${note1} — Resolução e repouso principal.`;
        if (el("study-subdominant-desc"))el("study-subdominant-desc").innerHTML = `<strong>Subdominante (IV Grau):</strong> ${note4} — Tensão intermédia.`;
        if (el("study-dominant-desc"))   el("study-dominant-desc").innerHTML   = `<strong>Dominante (V Grau):</strong> ${note5} — Grande tensão que resolve para a tónica.`;
        if (el("study-leading-desc"))    el("study-leading-desc").innerHTML    = `<strong>${isMinor?"Subtónica":"Sensível"} (VII Grau):</strong> ${note7} — Forte atração para ${note1}.`;

        const tips = {
            "G": "Sol Maior: tom natural do violino! Corda Sol solta ressoa por simpatia.",
            "Ab": "Lá Bemol Maior: 4 bemóis. Atenção ao 1º dedo recuado (Ab, Db) e afinação estreita de semitons.",
            "A": "Lá Maior: introduz C#, F# e G#. Dedos 1 e 2 afastados nas cordas Ré e Lá.",
            "Bb": "Si Bemol Maior: 2 bemóis (Bb, Eb). O 2º dedo colado no 1º dedo na corda Lá e Mi.",
            "B": "Si Maior: 5 sustenidos. Posições de dedilhado alto. Atenção ao A# e D# (dedos esticados).",
            "C": "Dó Maior: sem acidentais. Todos os 2ºs dedos em posição baixa (Fá, Dó) na 1ª posição.",
            "C#": "Dó Sustenido Maior: 7 sustenidos. Dedilhado de semitons agudos, dedos altos.",
            "D": "Ré Maior: padrões idênticos nas cordas Ré e Lá. A corda Ré ressoa no Ré superior por simpatia.",
            "Eb": "Mi Bemol Maior: 3 bemóis (Bb, Eb, Ab). Recue o 1º dedo (Fá natural) na corda Mi e use 2º dedo baixo.",
            "E": "Mi Maior: 4 sustenidos. Dedos altos na pestana e afinação exata do D# com o 4º dedo.",
            "F": "Fá Maior: tem 1 bemol (Bb). O 1º dedo na corda Lá e Mi recua para a posição baixa.",
            "F#": "Fá Sustenido Maior: 6 sustenidos. Afinação precisa com semitons elevados e controle posicional."
        };
        const tip = tips[key] || `Estudo de entonação em ${key}. Verifique postura do arco e flexibilidade do punho.`;
        if (teacherTipsContent) teacherTipsContent.innerHTML = `<p><i class="fa-solid fa-lightbulb"></i> ${tip}</p>`;
        if (tryGet("study-practice-guide")) {
            tryGet("study-practice-guide").innerHTML = getDetailedStudyGuide(key, mode, level, route);
        }
    }

    // ── WEEKLY STUDY PLAN GENERATOR (PROFESSOR ONLINE) ────────
    function getPreviousSunday(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day; // Sunday is 0
        return new Date(d.setDate(diff));
    }

    function formatDate(date) {
        return date.toLocaleDateString("pt-PT", { day: '2-digit', month: '2-digit' });
    }

    function generateWeeklyPlan() {
        const key = tonicSelect.value;
        const mode = scaleTypeSelect.value;
        const level = levelSelect.value;
        const modeLabel = {
            "major":"Maior","minor-natural":"Menor Natural",
            "minor-harmonic":"Menor Harmónica","minor-melodic":"Menor Melódica"
        }[mode] || mode;

        const container = document.getElementById("weekly-plan-grid");
        const datesLabel = document.getElementById("weekly-plan-dates");
        if (!container || !datesLabel) return;

        const sunday = getPreviousSunday(new Date());
        const saturday = new Date(sunday);
        saturday.setDate(sunday.getDate() + 6);
        datesLabel.innerText = `Semana de ${formatDate(sunday)} a ${formatDate(saturday)}`;

        const savedStates = JSON.parse(localStorage.getItem("violin_lab_weekly_plan_completed_days") || "{}");

        let scaleBook = "Suzuki Vol. 1";
        let techBookLeft = "Ševčík Op. 1 Part 1";
        let techBookRight = "Ševčík Op. 2 (Arcadas)";
        let etudeBook = "Wohlfahrt Op. 45";
        let doubleStopType = "Segundas";

        if (level === "intermedio") {
            scaleBook = "Ševčík Op. 1 (Escalas)";
            techBookLeft = "Ševčík Op. 8 (Posições)";
            techBookRight = "Ševčík Op. 3 (Arco)";
            etudeBook = "Kayser Op. 20";
            doubleStopType = "Terças / Quartas";
        } else if (level === "avancado" || level === "solista") {
            scaleBook = "Carl Flesch (Sistema de Escalas)";
            techBookLeft = "Ševčík Op. 9 (Cordas Duplas)";
            techBookRight = "Fiorillo 36 Estudos";
            etudeBook = "Kreutzer 42 Estudos";
            doubleStopType = "Sextas / Oitavas";
        }

        // Recuperar o concerto e semana do roteiro
        const concertoSelect = document.getElementById("weekly-concerto-select");
        const weekSelect = document.getElementById("weekly-week-select");
        let selectedConcertoKey = concertoSelect?.value;
        let selectedWeekKey = weekSelect?.value || "1";

        let activeLevelGroup = level;
        if (activeLevelGroup === "solista") activeLevelGroup = "avancado";

        const levelData = CONCERTO_DATABASE[activeLevelGroup];
        let chosenConcerto = null;
        if (levelData && selectedConcertoKey) {
            chosenConcerto = levelData[selectedConcertoKey];
        }
        if (!chosenConcerto && levelData) {
            const firstKey = Object.keys(levelData)[0];
            chosenConcerto = levelData[firstKey];
            selectedConcertoKey = firstKey;
        }

        let pieceName = chosenConcerto ? `${chosenConcerto.title} (${chosenConcerto.composer})` : `Concerto em ${key} ${modeLabel}`;
        let weekInfo = chosenConcerto ? chosenConcerto.weeks[selectedWeekKey] : null;
        let weekFocusText = weekInfo ? weekInfo.focus : "Desenvolvimento Técnico";

        // Ajustar Roteiro Diário
        const days = [
            { name: "Segunda-Feira", time: 45, focus: "Articulação e Legato", 
              bow: `10 min: ${techBookRight} - Detaché e ligaduras uniformes.`, 
              left: `10 min: ${techBookLeft} - Flexibilidade e postura.`, 
              scale: `10 min: ${scaleBook} em ${key} ${modeLabel} - 1 oitava bem cantada.`, 
              piece: `15 min: Estudo de ${etudeBook} - Leitura lenta com foco em: ${weekFocusText}.` },
            { name: "Terça-Feira", time: 45, focus: "Agilidade de Dedos (Esquerda)", 
              bow: `10 min: Velocidade de arco no meio do arco.`, 
              left: `10 min: ${techBookLeft} - Força e queda vertical dos dedos.`, 
              scale: `10 min: ${scaleBook} com ligaduras de 2 notas.`, 
              piece: `15 min: Concerto: ${pieceName} - Praticar compassos/detalhes de: ${weekFocusText}.` },
            { name: "Quarta-Feira", time: 50, focus: "Cordas Duplas e Afinação", 
              bow: `10 min: Ângulo de arco plano (45º) tocando duas cordas.`, 
              left: `15 min: ${techBookLeft} - Preparação de dedos duplos (${doubleStopType}).`, 
              scale: `10 min: Escala em ${key} com pedal de tónica ativo no fundo para afinação pura.`, 
              piece: `15 min: ${etudeBook} - Sincronização e fluidez técnica para o concerto.` },
            { name: "Quinta-Feira", time: 45, focus: "Arcadas Curtas (Martelé/Spiccato)", 
              bow: `10 min: ${techBookRight} - Martelé com pausas e pressão firme.`, 
              left: `10 min: Extensão do 4º dedo para afinação alta.`, 
              scale: `10 min: ${scaleBook} em staccato curto.`, 
              piece: `15 min: Concerto: ${pieceName} - Foco técnico spiccato/martelé na secção: ${weekFocusText}.` },
            { name: "Sexta-Feira", time: 50, focus: "Expressividade e Vibrato", 
              bow: `10 min: Controle de volume (crescendo / decrescendo) nas frases.`, 
              left: `15 min: Dedos de apoio (Anchor) e vibrato contínuo em notas longas.`, 
              scale: `10 min: ${scaleBook} em legato lento de 4 notas por arco.`, 
              piece: `15 min: Concerto: ${pieceName} - Cantabile expressivo em: ${weekFocusText}.` },
            { name: "Sábado", time: 60, focus: "Performance e Gravação", 
              bow: `15 min: Aquecimento completo com variações de arco da semana.`, 
              left: `10 min: Revisão de trechos técnicos difíceis do concerto.`, 
              scale: `15 min: Tocar a escala com metrônomo no tempo ideal.`, 
              piece: `20 min: Gravar em WAV o trecho de ${pieceName} (foco: ${weekFocusText}) e auto-avaliar.` },
            { name: "Domingo", time: 30, focus: "Auto-Avaliação e Leitura", 
              bow: `10 min: Prática de leitura à primeira vista livre.`, 
              left: `10 min: Alongamentos e relaxamento muscular da mão e braços.`, 
              scale: `10 min: Prática livre no Círculo de Quintas.`, 
              piece: `Marcar conquistas da semana de ${pieceName} e planejar a próxima fase.` }
        ];

        container.innerHTML = "";
        days.forEach(day => {
            const isCompleted = savedStates[day.name] || false;
            const card = document.createElement("div");
            card.className = `weekly-day-card${isCompleted ? " completed-day" : ""}`;
            card.innerHTML = `
                <h3 style="margin:0; font-size:0.9rem; display:flex; justify-content:space-between; align-items:center;">
                    <span>${day.name}</span>
                    <span style="font-size:0.75rem; font-weight:normal; opacity:0.8;">${day.time} min</span>
                </h3>
                <p style="font-size:0.75rem; color:var(--secondary); font-weight:600; margin:0.25rem 0 0.5rem 0; font-style:italic;"><i class="fa-solid fa-bullseye"></i> ${day.focus}</p>
                <div style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.75rem;">
                    <div class="practice-item"><strong>Mão Direita:</strong> <span>${day.bow}</span></div>
                    <div class="practice-item"><strong>Mão Esquerda:</strong> <span>${day.left}</span></div>
                    <div class="practice-item"><strong>Escala:</strong> <span>${day.scale}</span></div>
                    <div class="practice-item"><strong>Repertório/Estudo:</strong> <span>${day.piece}</span></div>
                </div>
                <div style="margin-top:auto; display:flex; align-items:center; justify-content:space-between; font-size:0.7rem; border-top:1px dashed var(--border-color); padding-top:0.5rem;">
                    <span style="color:var(--text-muted); font-style:italic;">Concluído:</span>
                    <input type="checkbox" class="weekly-day-checkbox" data-day="${day.name}" ${isCompleted ? "checked" : ""} style="width:auto; height:16px; width:16px; cursor:pointer;">
                </div>
            `;

            card.querySelector(".weekly-day-checkbox").addEventListener("change", e => {
                const dayName = e.target.dataset.day;
                savedStates[dayName] = e.target.checked;
                localStorage.setItem("violin_lab_weekly_plan_completed_days", JSON.stringify(savedStates));
                if (e.target.checked) {
                    userXP += 15;
                    updateAcademyStats();
                }
                generateWeeklyPlan();
            });

            container.appendChild(card);
        });

        // Bloco de Foco no Concerto Semanal
        const focusBox = document.getElementById("weekly-concerto-focus-box");
        if (focusBox) {
            if (chosenConcerto && weekInfo) {
                focusBox.style.display = "block";
                focusBox.innerHTML = `
                    <h3 style="margin: 0 0 0.5rem 0; font-size: 0.95rem; color: var(--secondary); display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fa-solid fa-graduation-cap"></i> Foco Semanal no Concerto: ${chosenConcerto.title}
                    </h3>
                    <p style="font-size: 0.85rem; margin: 0 0 0.5rem 0; color: var(--text-main);">
                        <strong>Compositor:</strong> ${chosenConcerto.composer} | <strong>Semana:</strong> ${selectedWeekKey}
                    </p>
                    <div style="background: rgba(0,0,0,0.2); padding: 0.75rem; border-radius: 8px; border-left: 3px solid var(--secondary); font-size: 0.8rem; line-height: 1.4;">
                        <p style="margin: 0 0 0.25rem 0; color: var(--text-main); font-weight: 600;">
                            <i class="fa-solid fa-star"></i> Secção de Estudo: ${weekInfo.focus}
                        </p>
                        <p style="margin: 0; color: var(--text-muted);">
                            <strong>Justificação Pedagógica:</strong> ${weekInfo.justification}
                        </p>
                    </div>
                `;
            } else {
                focusBox.style.display = "none";
            }
        }
    }

    // ── CIRCLE OF FIFTHS ──────────────────────────────────────
    function drawCircleOfFifths() {
        const container = tryGet("circle-fifths-container");
        if (!container) return;
        const ORDER = ["C","G","D","A","E","B","F#","C#","Ab","Eb","Bb","F"];
        const SVG_SIZE = 200, CENTER = 100, RADIUS = 80;
        const activeTonic = tonicSelect.value;
        const activeMode  = scaleTypeSelect.value;
        let svg = `<svg width="${SVG_SIZE}" height="${SVG_SIZE}" viewBox="0 0 ${SVG_SIZE} ${SVG_SIZE}"><circle cx="${CENTER}" cy="${CENTER}" r="${RADIUS}" fill="none" stroke="var(--border-color)" stroke-width="2"/>`;
        ORDER.forEach((note, idx) => {
            const angle  = (idx * 30 - 90) * Math.PI / 180;
            const x = CENTER + RADIUS * Math.cos(angle);
            const y = CENTER + RADIUS * Math.sin(angle);
            const isActive   = note === activeTonic;
            const isMastered = completedScalesList.has(`${note}${activeMode}`);
            const fill = isActive ? "var(--primary)" : isMastered ? "var(--success)" : "#8a99ad";
            const stroke = isActive ? "rgba(124,77,255,0.4)" : isMastered ? "rgba(0,230,118,0.3)" : "none";
            svg += `<g class="circle-note-node" data-note="${note}" style="cursor:pointer;"><circle cx="${x}" cy="${y}" r="16" fill="rgba(18,22,32,0.9)" stroke="${stroke}" stroke-width="3"/><text x="${x}" y="${y+4}" font-family="Outfit" font-size="10" font-weight="bold" fill="${fill}" text-anchor="middle">${note}</text></g>`;
        });
        svg += "</svg>";
        container.innerHTML = svg;
        container.querySelectorAll(".circle-note-node").forEach(node => {
            node.addEventListener("click", e => {
                tonicSelect.value = e.currentTarget.dataset.note;
                updateDashboard();
            });
        });
    }

    // ── ACADEMY STATS ─────────────────────────────────────────
    function updateAcademyStats() {
        if (totalXpDisplay)     totalXpDisplay.innerText     = `${userXP} XP 🌟`;
        if (streakCountDisplay) streakCountDisplay.innerText = `${streakCount} Dias 🔥`;
        if (masteredKeysCount)  masteredKeysCount.innerText  = `${completedScalesList.size} / 12`;
        if (sessionsCount)      sessionsCount.innerText      = practiceHistory.length;

        let rank = "Recruta da Pauta";
        if (userXP > 500) rank = "Solista Avançado";
        else if (userXP > 250) rank = "Líder de Naipe";
        else if (userXP > 100) rank = "Violinista Suzuki";
        else if (userXP > 40)  rank = "Diletante Dedicado";
        if (studentRankTitle) studentRankTitle.innerText = rank;

        const percent = Math.min(100, Math.floor((completedScalesList.size / 12) * 100));
        if (academyPercentText)   academyPercentText.innerText     = `${percent}%`;
        if (barAcademyProgress)   barAcademyProgress.style.width   = `${percent}%`;

        let cc = Object.values(challengeStates).filter(Boolean).length;
        const cp = Math.floor((cc / 4) * 100);
        if (txtChalPercent)  txtChalPercent.innerText    = `${cp}%`;
        if (barChalProgress) barChalProgress.style.width = `${cp}%`;

        const main = challengeStates.tecnica && challengeStates.escala && challengeStates.repertoire;
        if (btnCompleteDay) {
            btnCompleteDay.disabled   = !main;
            btnCompleteDay.className  = main ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm";
        }
    }

    btnCompleteDay?.addEventListener("click", () => {
        const key  = tonicSelect.value;
        const mode = scaleTypeSelect.value;
        completedScalesList.add(`${key}${mode}`);
        userXP     += challengeStates.bonus ? 75 : 50;
        streakCount++;
        challengeDay = (challengeDay % 30) + 1;
        challengeStates = {tecnica:false,escala:false,repertoire:false,bonus:false};
        ["chk-chal-tecnica","chk-chal-escala","chk-chal-repertorio","chk-chal-bonus"].forEach(id => {
            const el = tryGet(id); if (el) el.checked = false;
        });
        saveProgress();
        advanceTonicToNextFifth();
        updateDashboard();
        alert(`Parabéns! Dia ${challengeDay} concluído. +50 XP!`);
    });

    function advanceTonicToNextFifth() {
        const idx = CHROMATIC.indexOf(tonicSelect.value);
        tonicSelect.value = CHROMATIC[(idx + 7) % 12];
    }

    // ── SUZUKI METHOD ─────────────────────────────────────────
    function changeSuzukiStep(stepNum) {
        currentStep = stepNum;
        stopPlayback();
        document.querySelectorAll(".suzuki-step").forEach(el => {
            el.classList.remove("active");
            if (suzukiCompletedSteps.has(parseInt(el.dataset.step))) el.classList.add("completed");
            else el.classList.remove("completed");
        });
        const activeEl = document.querySelector(`.suzuki-step[data-step="${stepNum}"]`);
        if (activeEl) activeEl.classList.add("active");
        const bar = tryGet("suzuki-progress-bar");
        if (bar) bar.style.width = `${(stepNum/6)*100}%`;
        if (suzukiStepIndicatorText) suzukiStepIndicatorText.innerText = `Passo ${stepNum} de 6`;
        if (btnSuzukiPrev) btnSuzukiPrev.disabled = stepNum === 1;
        if (btnSuzukiNext) btnSuzukiNext.disabled = stepNum === 6;

        const stepTitle       = tryGet("suzuki-step-title");
        const stepInstruction = tryGet("suzuki-step-instruction");
        const actionsDiv      = tryGet("suzuki-actions");

        if (actionsDiv) actionsDiv.innerHTML = "";
        if (suzukiHistoryContainer) suzukiHistoryContainer.style.display = "none";

        const STEPS = {
            1:{ t:"Passo 1: Ouvir antes de tocar", i:"Oiça a escala completa para absorver a entonação do tom.", btn:"Ouvir Escala" },
            2:{ t:"Passo 2: Cantar e Reconhecer Graus", i:"Cante a escala. Os graus I, III, V e VII estão destacados na pauta.", btn:"Cantar com Apoio" },
            3:{ t:"Passo 3: Imitação Fraseada (Eco)", i:"O sistema toca 4 notas e pausa. Imite no seu violino.", btn:"Iniciar Eco" },
            4:{ t:"Passo 4: Repetir Pequeno (Loop)", i:"Selecione um trecho difícil e repita em loop.", btn:"Iniciar Repetição" },
            5:{ t:"Passo 5: Execução Completa", i:"Execute a escala inteira com o sintetizador de referência.", btn:"Tocar Junto" },
            6:{ t:"Passo 6: Revisão & Histórico", i:"Reveja escalas anteriores e registe o progresso.", btn:null }
        };

        const s = STEPS[stepNum];
        if (stepTitle)       stepTitle.innerText       = s.t;
        if (stepInstruction) stepInstruction.innerText = s.i;
        if (actionsDiv && s.btn) {
            if (stepNum === 4) {
                actionsDiv.innerHTML = `
                    <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
                        <button class="btn btn-primary btn-sm" id="btn-suzuki-act"><i class="fa-solid fa-play"></i> ${s.btn}</button>
                        <span style="font-size:0.8rem;color:var(--text-muted);">Notas de:</span>
                        <select id="suzuki-loop-start" style="width:70px;padding:0.2rem;"></select>
                        <span style="font-size:0.8rem;color:var(--text-muted);">a:</span>
                        <select id="suzuki-loop-end" style="width:70px;padding:0.2rem;"></select>
                    </div>`;
                populateSuzukiLoopSelects();
            } else {
                actionsDiv.innerHTML = `<button class="btn btn-primary btn-sm" id="btn-suzuki-act"><i class="fa-solid fa-play"></i> ${s.btn}</button>`;
            }
        }
        if (stepNum === 6 && suzukiHistoryContainer) {
            suzukiHistoryContainer.style.display = "block";
            renderHistoryTable();
        }

        const actBtn = tryGet("btn-suzuki-act");
        if (actBtn) actBtn.addEventListener("click", () => togglePlayback());

        renderSuzukiChecklist();
    }

    btnSuzukiPrev?.addEventListener("click", () => { if (currentStep > 1) changeSuzukiStep(currentStep - 1); });
    btnSuzukiNext?.addEventListener("click", () => {
        if (currentStep < 6) { suzukiCompletedSteps.add(currentStep); changeSuzukiStep(currentStep + 1); saveProgress(); }
    });

    function populateSuzukiLoopSelects() {
        const ss = tryGet("suzuki-loop-start");
        const se = tryGet("suzuki-loop-end");
        if (!ss || !se) return;
        ss.innerHTML = se.innerHTML = "";
        activeNotesList.forEach((n, idx) => {
            const o1 = new Option(`${idx+1}: ${n.name}${n.octave}`, idx);
            const o2 = new Option(`${idx+1}: ${n.name}${n.octave}`, idx);
            ss.appendChild(o1); se.appendChild(o2);
        });
        ss.value = 0;
        se.value = Math.min(3, activeNotesList.length - 1);
        ss.addEventListener("change", setSuzukiLoopRange);
        se.addEventListener("change", setSuzukiLoopRange);
    }

    function setSuzukiLoopRange() {
        loopStartIdx = parseInt(tryGet("suzuki-loop-start")?.value || 0);
        loopEndIdx   = parseInt(tryGet("suzuki-loop-end")?.value   || 3);
        if (loopStartIdx > loopEndIdx) [loopStartIdx, loopEndIdx] = [loopEndIdx, loopStartIdx];
    }

    function updateSuzukiPlaybackUI(playing) {
        const btn = tryGet("btn-suzuki-act");
        if (!btn) return;
        if (playing) { btn.innerHTML = `<i class="fa-solid fa-pause"></i> Pausar`; btn.className = "btn btn-secondary btn-sm"; }
        else         { btn.innerHTML = `<i class="fa-solid fa-play"></i> Continuar`; btn.className = "btn btn-primary btn-sm"; }
    }

    function showImitationOverlay(show, startIdx = 0, endIdx = 0) {
        const staffDiv = tryGet("vexflow-staff");
        if (!staffDiv) return;
        let overlay = tryGet("suzuki-imitation-overlay");
        if (!overlay) {
            overlay = Object.assign(document.createElement("div"), {id:"suzuki-imitation-overlay"});
            Object.assign(overlay.style, {position:"absolute",top:"0",left:"0",width:"100%",height:"100%",background:"rgba(0,229,255,0.08)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:"100",borderRadius:"12px"});
            overlay.innerHTML = `<div style="background:var(--bg-main);border:2px solid var(--secondary);padding:1rem;border-radius:12px;text-align:center;"><h4 style="color:var(--secondary)"><i class="fa-solid fa-microphone"></i> O seu Eco!</h4><p style="margin:0;font-size:0.8rem;">Imite agora as notas no seu violino...</p></div>`;
            staffDiv.appendChild(overlay);
        }
        overlay.style.display = show ? "flex" : "none";
    }

    function renderSuzukiChecklist() {
        const ul = tryGet("suzuki-checklist");
        if (!ul) return;
        ul.innerHTML = "";
        const objectives = {
            1:[{id:"hear_full",text:"Ouvir a escala completa sem interrupção."},{id:"hear_drone",text:"Identificar a consonância do pedal harmónico."}],
            2:[{id:"sing_notes",text:"Cantar as notas subindo e descendo."},{id:"degree_tonic",text:"Reconhecer a Sensível (VII) a resolver na Tónica (I)."}],
            3:[{id:"imitate_eco",text:"Completar com sucesso pelo menos 2 frases em Eco."}],
            4:[{id:"repeat_loop",text:"Repetir o loop de 4 notas 5 vezes seguidas sem errar."}],
            5:[{id:"play_tempo",text:"Tocar a escala inteira no andamento definido."},{id:"pitch_tuning",text:"Afinar com o sintetizador de referência."}],
            6:[{id:"check_history",text:"Arquivar a sessão e registar progresso."}]
        };
        const key    = `${tonicSelect.value}_${scaleTypeSelect.value}_step_${currentStep}`;
        (objectives[currentStep] || []).forEach(item => {
            const liId    = `${key}_${item.id}`;
            const checked = suzukiChecklistStates[liId] || false;
            const li = document.createElement("li");
            li.style.cssText = "display:flex;align-items:center;gap:0.5rem;font-size:0.8rem;";
            li.innerHTML = `<input type="checkbox" id="${liId}" ${checked?"checked":""} style="width:auto;cursor:pointer;"><label for="${liId}" style="color:${checked?"var(--text-muted)":"var(--text-main)"};text-decoration:${checked?"line-through":"none"};cursor:pointer;flex:1;">${item.text}</label>`;
            li.querySelector("input").addEventListener("change", e => {
                suzukiChecklistStates[liId] = e.target.checked;
                localStorage.setItem("violin_lab_suzuki_checklist_states", JSON.stringify(suzukiChecklistStates));
                if (e.target.checked) { userXP += 5; updateAcademyStats(); }
                renderSuzukiChecklist();
            });
            ul.appendChild(li);
        });
    }

    // ── HELPERS ───────────────────────────────────────────────
    function getRelativeScale(key, mode) {
        const idx = CHROMATIC.indexOf(key);
        if (mode === "major") return `${CHROMATIC[(idx + 9) % 12]} Menor (m)`;
        return `${CHROMATIC[(idx + 3) % 12]} Maior`;
    }

    btnSwitchRelative?.addEventListener("click", () => {
        const key  = tonicSelect.value;
        const mode = scaleTypeSelect.value;
        const idx  = CHROMATIC.indexOf(key);
        if (mode === "major") {
            tonicSelect.value      = CHROMATIC[(idx + 9) % 12];
            scaleTypeSelect.value  = "minor-natural";
        } else {
            tonicSelect.value      = CHROMATIC[(idx + 3) % 12];
            scaleTypeSelect.value  = "major";
        }
        updateDashboard();
    });

    function getBonusChallengeText(day) {
        const list = [
            "Pratique com olhos fechados para focar na memória muscular.",
            "Tocar com máxima pressão do arco sem rachar o som.",
            "Tocar em pianíssimo extremo na ponta do arco.",
            "Estudo de ressonância: cordas soltas vibram por simpatia?",
            "Mantenha postura perfeita por 2 minutos contínuos.",
            "Tocar a escala inteira sem olhar para o braço esquerdo."
        ];
        return list[day % list.length];
    }

    function recordPracticeCompletion() {
        practiceHistory.push({ date: new Date().toLocaleDateString("pt-PT"), type: activePlaybackType, scale: `${tonicSelect.value} ${scaleTypeSelect.value}` });
        saveProgress();
    }

    function renderHistoryTable() {
        if (!suzukiHistoryContainer) return;
        let html = '<table class="harmony-table"><tr><th>Data</th><th>Escala</th></tr>';
        practiceHistory.slice(-5).forEach(h => { html += `<tr><td>${h.date}</td><td>${h.scale}</td></tr>`; });
        html += "</table>";
        suzukiHistoryContainer.innerHTML = html;
    }

    function loadProgress() {
        userXP        = parseInt(localStorage.getItem("violin_lab_xp"))      || 0;
        streakCount   = parseInt(localStorage.getItem("violin_lab_streak"))  || 0;
        challengeDay  = parseInt(localStorage.getItem("violin_lab_day"))     || 1;
        const comp    = localStorage.getItem("violin_lab_completed_keys");
        if (comp) completedScalesList = new Set(JSON.parse(comp));
        const hist    = localStorage.getItem("violin_lab_history");
        if (hist) practiceHistory = JSON.parse(hist);
        const suzCompl= localStorage.getItem("violin_lab_suzuki_completed");
        if (suzCompl) suzukiCompletedSteps = new Set(JSON.parse(suzCompl));
        const suzCheck= localStorage.getItem("violin_lab_suzuki_checklist_states");
        if (suzCheck) suzukiChecklistStates = JSON.parse(suzCheck);
    }

    function saveProgress() {
        localStorage.setItem("violin_lab_xp",              userXP);
        localStorage.setItem("violin_lab_streak",          streakCount);
        localStorage.setItem("violin_lab_day",             challengeDay);
        localStorage.setItem("violin_lab_completed_keys",  JSON.stringify([...completedScalesList]));
        localStorage.setItem("violin_lab_history",         JSON.stringify(practiceHistory));
    }

    // ── INLINE CATALOG FALLBACK (funciona sem servidor, via file://) ────────
    const INLINE_CATALOG = {
        studyBooks: [
            { id: "sevcik_op1_1", title: "School of Violin Technics, Op.1 Part 1", composer: "Otakar Ševčík", difficulty: "Iniciante", type: "tecnica" },
            { id: "sevcik_op2", title: "School of Bowing Technics, Op.2", composer: "Otakar Ševčík", difficulty: "Iniciante", type: "tecnica" },
            { id: "sevcik_op3", title: "Shifting (Mudanças de Posição), Op.3", composer: "Otakar Ševčík", difficulty: "Intermedio", type: "tecnica" },
            { id: "sevcik_op7", title: "Preparatory Trill Studies, Op.7", composer: "Otakar Ševčík", difficulty: "Solista", type: "tecnica" },
            { id: "sevcik_op8", title: "Shifting (Mudança de Posição), Op.8", composer: "Otakar Ševčík", difficulty: "Intermedio", type: "tecnica" },
            { id: "sevcik_op9", title: "Double Stop Preparations, Op.9", composer: "Otakar Ševčík", difficulty: "Intermedio", type: "tecnica" },
            { id: "kayser_op20", title: "36 Elementary and Progressive Studies, Op.20", composer: "Heinrich Ernst Kayser", difficulty: "Intermedio", type: "etude" },
            { id: "wohlfahrt_op45", title: "60 Studies, Op.45", composer: "Franz Wohlfahrt", difficulty: "Iniciante", type: "etude" },
            { id: "dont_op35", title: "24 Studies and Caprices, Op.35", composer: "Jakob Dont", difficulty: "Solista", type: "etude" },
            { id: "kreutzer_42", title: "42 Studies or Caprices", composer: "Rodolphe Kreutzer", difficulty: "Avancado", type: "etude" },
            { id: "fiorillo_36", title: "36 Etudes or Caprices", composer: "Federigo Fiorillo", difficulty: "Avancado", type: "etude" },
            { id: "flesch_scale_system", title: "Scale System", composer: "Carl Flesch", difficulty: "Avancado", type: "escala" },
            { id: "galamian_scale_system", title: "Contemporary Violin Technique", composer: "Ivan Galamian", difficulty: "Avancado", type: "escala" },
            { id: "suzuki_vol1", title: "Suzuki Violin School, Vol 1", composer: "Shinichi Suzuki", difficulty: "Iniciante", type: "escala" }
        ],
        studyUnits: [
            {
                id: "sevcik_unit_g_maj",
                bookId: "sevcik_op1_1",
                title: "Ševčík Op.1 Part 1 Ex.17 (Sol Maior)",
                focus: "Fortalecimento do 4º dedo, flexibilidade do punho no arco e afinação na primeira posição.",
                notes: ["G4", "A4", "B4", "C5", "D5", "E5", "F#5", "G5", "A5", "G5", "F#5", "E5", "D5", "C5", "B4", "A4", "G4"]
            },
            {
                id: "sevcik_double_g",
                bookId: "sevcik_op9",
                title: "Ševčík Op.9 Ex.1 - Terças e Sextas em Sol",
                focus: "Afinação e dedilhado de cordas duplas. Dedos 1 e 3, 2 e 4 atuando em pares.",
                notes: ["G3-B3", "A3-C4", "B3-D4", "C4-E4", "D4-F#4", "E4-G4", "F#4-A4", "G4-B4", "F#4-A4", "E4-G4", "D4-F#4", "C4-E4", "B3-D4", "A3-C4", "G3-B3"]
            },
            {
                id: "kreutzer_unit_g_maj",
                bookId: "kreutzer_42",
                title: "Kreutzer Estudo Nº 35 - Sextas e Oitavas (Sol Maior)",
                focus: "Montagem de oitavas paralelas e sextas. Apoio igual nos dois pontos do arco.",
                notes: ["G3-E4", "A3-F#4", "B3-G4", "C4-A4", "D4-B4", "E4-C5", "F#4-D5", "G4-E5", "G3-G4", "A3-A4", "B3-B4", "C4-C5", "G3-E4"]
            },
            {
                id: "fiorillo_unit_g_maj",
                bookId: "fiorillo_36",
                title: "Fiorillo Estudo Nº 12 - Acordes de 3 e 4 cordas",
                focus: "Ataque simultâneo das cordas. Cotovelo direito alinhado para a divisão do peso.",
                notes: ["G3-D4-B4", "A3-E4-C5", "B3-F#4-D5", "G3-D4-B4-G5", "B3-F#4-D5", "A3-E4-C5", "G3-D4-B4"]
            },
            {
                id: "sevcik_unit_d_maj",
                bookId: "sevcik_op1_1",
                title: "Ševčík Op.1 Part 1 Ex.18 (Ré Maior)",
                focus: "Estudo de terças e quintas na 1ª posição com cruzamento de cordas rápido.",
                notes: ["D4", "F#4", "E4", "G4", "F#4", "A4", "G4", "B4", "A4", "C#5", "B4", "D5", "C#5", "B4", "A4", "G4", "F#4", "E4", "D4"]
            },
            {
                id: "sevcik_double_d",
                bookId: "sevcik_op9",
                title: "Ševčík Op.9 Ex.2 - Terças e Quartas em Ré",
                focus: "Afinação e montagem de acordes de Ré. 1º e 2º dedos colados.",
                notes: ["D4-F#4", "E4-G4", "F#4-A4", "G4-B4", "A4-C#5", "B4-D5", "A4-C#5", "G4-B4", "F#4-A4", "E4-G4", "D4-F#4"]
            },
            {
                id: "kayser_unit_g_maj",
                bookId: "kayser_op20",
                title: "Kayser Op.20 Estudo Nº 2 (Sol Maior)",
                focus: "Desenvolvimento do staccato na metade superior do arco, transição ágil de corda.",
                notes: ["G4", "B4", "D5", "G5", "F#5", "D5", "B4", "G4", "A4", "C5", "E5", "A5", "G5", "E5", "C5", "A4"]
            },
            {
                id: "kayser_unit_d_maj",
                bookId: "kayser_op20",
                title: "Kayser Op.20 Estudo Nº 5 (Ré Maior)",
                focus: "Cruzes de corda complexos, mantendo dedilhado firme na primeira posição.",
                notes: ["D4", "A4", "F#4", "D5", "A4", "F#5", "D5", "A5", "G5", "E5", "C#5", "A4", "D4"]
            },
            {
                id: "kayser_unit_a_maj",
                bookId: "kayser_op20",
                title: "Kayser Op.20 Estudo Nº 7 (Lá Maior)",
                focus: "Distribuição de arco (Whole Bow / Half Bow) com ligaduras amplas.",
                notes: ["A4", "E5", "C#5", "A5", "E5", "A5", "G#5", "E5", "D5", "B4", "G#4", "E4", "A4"]
            },
            {
                id: "suzuki_unit_g_maj",
                bookId: "suzuki_vol1",
                title: "Suzuki Vol 1 - Escala de Sol Maior",
                focus: "Estudo de afinação básica na 1ª posição com dedilhado padrão nas cordas G e D.",
                notes: ["G3", "A3", "B3", "C4", "D4", "E4", "F#4", "G4", "F#4", "E4", "D4", "C4", "B3", "A3", "G3"]
            }
        ],
        repertoirePieces: [
            {
                id: "vivaldi_rv310",
                title: "Concerto em Sol Maior Op.3 No.3 RV 310",
                composer: "Antonio Vivaldi",
                key: "G",
                mode: "major",
                studentLevel: "iniciante",
                difficultyDescription: "Concerto barroco alegre com passagens brilhantes de semicolcheias na 1ª posição."
            },
            {
                id: "mozart_k216",
                title: "Concerto para Violino nº 3 em Sol Maior K.216",
                composer: "W. A. Mozart",
                key: "G",
                mode: "major",
                studentLevel: "avancado",
                difficultyDescription: "Fraseado clássico refinado, passagens de semicolcheias brilhantes, saltos expressivos."
            },
            {
                id: "handel_hwv371",
                title: "Sonata em Ré Maior HWV 371",
                composer: "G. F. Handel",
                key: "D",
                mode: "major",
                studentLevel: "intermedio",
                difficultyDescription: "Sonata clássica barroca exigindo expressividade nos movimentos lentos e agilidade no Allegro."
            },
            {
                id: "bach_chaconne",
                title: "Chaconne em Ré Menor (Partita BWV 1004)",
                composer: "J. S. Bach",
                key: "D",
                mode: "minor-natural",
                studentLevel: "solista",
                difficultyDescription: "O maior teste de polifonia no violino. Exige acordes de 3 e 4 cordas perfeitos e controle tímbrico."
            },
            {
                id: "vivaldi_rv356",
                title: "Concerto em Lá Menor Op.3 No.6 RV 356",
                composer: "Antonio Vivaldi",
                key: "A",
                mode: "minor-natural",
                studentLevel: "iniciante",
                difficultyDescription: "Obra pedagógica clássica de violino. Estudo excelente de staccato e posições na corda E."
            },
            {
                id: "paganini_caprice24",
                title: "24 Caprichos Op.1: Capricho Nº 24",
                composer: "Niccolò Paganini",
                key: "A",
                mode: "minor-natural",
                studentLevel: "solista",
                difficultyDescription: "Variações com pizzicato de mão esquerda, oitavas paralelas, décimas e arpejos velozes."
            },
            {
                id: "wieniawski_concerto2",
                title: "Concerto nº 2 em Ré Menor Op.22",
                composer: "Henryk Wieniawski",
                key: "D",
                mode: "minor-natural",
                studentLevel: "solista",
                difficultyDescription: "Romantismo virtuoso polaco. Passagens cromáticas velozes, spiccato volante e expressividade."
            },
            {
                id: "ysaye_sonata3",
                title: "Sonata nº 3 'Ballade' Op.27",
                composer: "Eugène Ysaÿe",
                key: "D",
                mode: "minor-natural",
                studentLevel: "solista",
                difficultyDescription: "Obra-prima impressionista para violino solo. Acordes densos, dinâmicas extremas e rubato expressivo."
            }
        ],
        excerptLinks: [
            {
                id: "vivaldi_rv310_exc1",
                pieceId: "vivaldi_rv310",
                title: "Tema do Allegro Inicial",
                bars: "Compassos 1-8",
                transferObjective: "Controle do staccato martelado na metade superior do arco e ressonância da tónica G nas cordas soltas.",
                notes: ["G4", "B4", "D5", "G5", "F#5", "D5", "B4", "G4", "D5", "B4", "G4", "D4", "G4"]
            },
            {
                id: "mozart_k216_exc1",
                pieceId: "mozart_k216",
                title: "Exposição do Solo (Allegro)",
                bars: "Compassos 40-48",
                transferObjective: "Leveza clássica no arco, articulação limpa de colcheias e semicolcheias e shifts de posição para a 3ª.",
                notes: ["G4", "D5", "B5", "G5", "F#5", "E5", "D5", "C5", "B4", "A4", "G4", "F#4", "G4", "A4", "B4", "C5", "D5"]
            },
            {
                id: "handel_hwv371_exc1",
                pieceId: "handel_hwv371",
                title: "Affettuoso - Abertura",
                bars: "Compassos 1-6",
                transferObjective: "Expressividade em notas longas, vibrato controlado e passagens suaves de arco na corda Ré e Lá.",
                notes: ["D4", "A4", "F#4", "D5", "C#5", "B4", "A4", "G4", "F#4", "E4", "D4"]
            },
            {
                id: "bach_chaconne_exc1",
                pieceId: "bach_chaconne",
                title: "Tema Principal & Acordes",
                bars: "Compassos 1-8",
                transferObjective: "Montagem rápida de acordes de 3/4 cordas. Distribuição de peso no calcanhar do arco.",
                notes: ["D4-F4-A4-D5", "D4-F4-A4-D5", "C#4-E4-G4-A4", "D4-F4-A4-F5", "E4-G4-C#5-G5", "F4-A4-D5-A5", "F4-Bb4-D5-Bb5", "F4-A4-D5-A5"]
            },
            {
                id: "paganini_cap24_exc1",
                pieceId: "paganini_caprice24",
                title: "Tema (Quasi Presto)",
                bars: "Variação 1 (Compassos 1-12)",
                transferObjective: "Coordenação de arpejos rápidos e cordas duplas dedilhadas com precisão na afinação Lá Menor.",
                notes: ["A4", "C5-E5", "B4", "D5-F5", "C5-E5", "A5", "G#5-B5", "E5", "A4", "C5-E5", "B4", "D5-F5", "C5-E5", "A4"]
            },
            {
                id: "vivaldi_rv356_exc1",
                pieceId: "vivaldi_rv356",
                title: "Tema Principal do Allegro",
                bars: "Compassos 1-10",
                transferObjective: "Precisão tonal na corda E, shift para a 3ª posição e cruzamento rápido de cordas.",
                notes: ["A4", "C5", "E5", "A5", "G#5", "E5", "C5", "A4", "B4", "D5", "F5", "D5", "B4", "G#4", "A4"]
            },
            {
                id: "wieniawski_exc1",
                pieceId: "wieniawski_concerto2",
                title: "Passagem de Semicolcheias do Solo",
                bars: "Compassos 70-76",
                transferObjective: "Aumento do controlo de arcada detaché na corda Mi com dedilhado veloz cromático.",
                notes: ["D4", "F4", "A4", "D5", "E5", "F5", "G#5", "A5", "Bb5", "G5", "E5", "C#5", "D5"]
            },
            {
                id: "ysaye_exc1",
                pieceId: "ysaye_sonata3",
                title: "Tema de Abertura (Lento)",
                bars: "Compassos 1-5",
                transferObjective: "Flexibilidade dos dedos da mão esquerda na montagem de acordes e sonoridade dramática.",
                notes: ["D4-F4-A4-D5", "C#4-E4-A4-E5", "D4-F4-A4-F5", "G4-C5-E5-G5", "A4-F5-A5"]
            }
        ],
        scaleRoutes: [
            {
                key: "G",
                mode: "major",
                studentLevel: "iniciante",
                octaves: 1,
                bowingPattern: "2 notas ligadas, 2 separadas",
                dailyPlan: {
                    scaleUnits: ["suzuki_unit_g_maj"],
                    bowUnits: ["sevcik_unit_g_maj"],
                    etudeUnits: ["kayser_unit_g_maj"],
                    repertoirePieceId: "vivaldi_rv310",
                    excerptIds: ["vivaldi_rv310_exc1"]
                }
            },
            {
                key: "G",
                mode: "major",
                studentLevel: "avancado",
                octaves: 3,
                bowingPattern: "3 notas ligadas, 3 marteladas",
                dailyPlan: {
                    scaleUnits: ["flesch_unit_g_maj"],
                    bowUnits: ["fiorillo_unit_g_maj"],
                    etudeUnits: ["kreutzer_unit_g_maj"],
                    repertoirePieceId: "mozart_k216",
                    excerptIds: ["mozart_k216_exc1"]
                }
            },
            {
                key: "D",
                mode: "major",
                studentLevel: "intermedio",
                octaves: 2,
                bowingPattern: "4 notas ligadas, 4 marteladas",
                dailyPlan: {
                    scaleUnits: ["sevcik_unit_d_maj"],
                    bowUnits: ["sevcik_double_d"],
                    etudeUnits: ["kayser_unit_d_maj"],
                    repertoirePieceId: "handel_hwv371",
                    excerptIds: ["handel_hwv371_exc1"]
                }
            },
            {
                key: "A",
                mode: "minor-natural",
                studentLevel: "iniciante",
                octaves: 1,
                bowingPattern: "Detaché simples no meio do arco",
                dailyPlan: {
                    scaleUnits: ["sevcik_unit_a_maj"],
                    bowUnits: ["sevcik_unit_a_maj"],
                    etudeUnits: ["kayser_unit_a_maj"],
                    repertoirePieceId: "vivaldi_rv356",
                    excerptIds: ["vivaldi_rv356_exc1"]
                }
            },
            {
                key: "A",
                mode: "minor-natural",
                studentLevel: "solista",
                octaves: 3,
                bowingPattern: "Variações rápidas de arco",
                dailyPlan: {
                    scaleUnits: ["flesch_unit_g_maj"],
                    bowUnits: ["sevcik_double_g"],
                    etudeUnits: ["kreutzer_unit_g_maj"],
                    repertoirePieceId: "paganini_caprice24",
                    excerptIds: ["paganini_cap24_exc1"]
                }
            },
            {
                key: "D",
                mode: "minor-natural",
                studentLevel: "solista",
                octaves: 3,
                bowingPattern: "Polifonia densa de arco",
                dailyPlan: {
                    scaleUnits: ["sevcik_unit_d_maj"],
                    bowUnits: ["sevcik_double_d"],
                    etudeUnits: ["fiorillo_unit_g_maj"],
                    repertoirePieceId: "bach_chaconne",
                    excerptIds: ["bach_chaconne_exc1", "wieniawski_exc1", "ysaye_exc1"]
                }
            }
        ],
        pdfEntries: [
            {
                id: "pdf_sevcik_op1_1",
                bookId: "sevcik_op1_1",
                title: "Ševčík School of Violin Technics Op.1 Book 1",
                composer: "Ševčík",
                sourceDomain: "s9.imslp.org",
                sourcePageUrl: "https://imslp.org/wiki/School_of_Violin_Technics_(%C5%A0ev%C4%8D%C3%ADk,_Otakar)",
                pdfUrl: "https://s9.imslp.org/files/imglnks/usimg/b/ba/IMSLP21589-PMLP48658-Sevcik_Op1_Book1.pdf",
                fallbackUrl: "https://imslp.org/wiki/Special:Search/Sevcik_Op1_Book1"
            },
            {
                id: "pdf_kayser_op20",
                bookId: "kayser_op20",
                title: "Kayser 36 Elementary Studies Op.20",
                composer: "Kayser",
                sourceDomain: "imslp.org",
                sourcePageUrl: "https://imslp.org/wiki/36_Elementary_and_Progressive_Studies,_Op.20_(Kayser,_Heinrich_Ernst)",
                pdfUrl: "https://imslp.simssa.ca/files/imglnks/usimg/0/07/IMSLP17642-Kayser_Op20_1-12.pdf",
                fallbackUrl: "https://imslp.org/wiki/Special:Search/Kayser_Op20"
            },
            {
                id: "pdf_vivaldi_rv310",
                pieceId: "vivaldi_rv310",
                title: "Vivaldi Concerto em Sol Maior RV 310",
                composer: "Vivaldi",
                sourceDomain: "imslp.org",
                sourcePageUrl: "https://imslp.org/wiki/Violin_Concerto_in_G_major,_RV_310_(Vivaldi,_Antonio)",
                pdfUrl: "https://imslp.simssa.ca/files/imglnks/usimg/3/30/IMSLP01683-Vivaldi_-_RV310.pdf",
                fallbackUrl: "https://imslp.org/wiki/Special:Search/Vivaldi_RV310"
            },
            {
                id: "pdf_handel_hwv371",
                pieceId: "handel_hwv371",
                title: "Handel Sonata em Ré Maior HWV 371",
                composer: "Handel",
                sourceDomain: "imslp.org",
                sourcePageUrl: "https://imslp.org/wiki/Violin_Sonata_in_D_major,_HWV_371_(Handel,_George_Frideric)",
                pdfUrl: "https://s9.imslp.org/files/imglnks/usimg/9/9f/IMSLP204312-WIMA.8a33-Handel_Sonata_D.pdf",
                fallbackUrl: "https://imslp.org/wiki/Special:Search/Handel_Sonata_HWV371"
            },
            {
                id: "pdf_vivaldi_rv356",
                pieceId: "vivaldi_rv356",
                title: "Vivaldi Concerto em Lá Menor RV 356",
                composer: "Vivaldi",
                sourceDomain: "imslp.org",
                sourcePageUrl: "https://imslp.org/wiki/Violin_Concerto_in_A_minor,_RV_356_(Vivaldi,_Antonio)",
                pdfUrl: "https://imslp.simssa.ca/files/imglnks/usimg/5/5b/IMSLP521404-PMLP46200-Vivaldi_RV356_PianoScore.pdf",
                fallbackUrl: "https://imslp.org/wiki/Special:Search/Vivaldi_RV356"
            }
        ]
    };

    const INLINE_SOURCES = {
        domains: [
            {domain:"s9.imslp.org",       status:"approved_download_only", cors_allowed:false, requires_auth:false, description:"CDN IMSLP. Download direto."},
            {domain:"imslp.simssa.ca",     status:"approved_download_only", cors_allowed:false, requires_auth:false, description:"CDN IMSLP Canadá. Download direto."},
            {domain:"imslp.org",           status:"approved_external_open", cors_allowed:false, requires_auth:false, description:"IMSLP. Abre em aba externa."},
            {domain:"archive.org",         status:"approved_embed",         cors_allowed:true,  requires_auth:false, description:"Internet Archive. Embed suportado."},
            {domain:"raw.githubusercontent.com", status:"approved_embed",  cors_allowed:true,  requires_auth:false, description:"GitHub Raw. CORS suportado."},
            {domain:"violinlab.com",       status:"rejected_copyright_or_access", cors_allowed:false, requires_auth:true, description:"Obra comercial. Requer livro físico."}
        ]
    };

    // ── STARTUP ───────────────────────────────────────────────
    async function loadValidatorData() {
        // Tenta carregar do ficheiro; se falhar (file://) usa o catálogo embutido
        try {
            const catRes = await fetch("repertoryCatalog.detailed.json");
            if (catRes.ok) {
                repertoryCatalog = await catRes.json();
            } else {
                throw new Error("HTTP " + catRes.status);
            }
            try {
                const srcRes = await fetch("validatedSources.json");
                if (srcRes.ok) validatedSources = await srcRes.json();
            } catch(_) {}
        } catch(e) {
            console.info("[HERMES] A usar catálogo embutido (modo offline/file://).");
            repertoryCatalog = INLINE_CATALOG;
            validatedSources = INLINE_SOURCES;
        }
        loadProgress();
        updateDashboard();
    }

    loadValidatorData();
});

