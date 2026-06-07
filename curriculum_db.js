/**
 * HERMES Violin Lab v4.0 - Curriculum Generator
 * Motor de desafios diários (1 a 30 dias) para as 12 tonalidades.
 */

const curriculumDb = {
    // Desafios fixos para G Major
    "G": {
        "dia_1": {
            "tecnica": "Tocar Ševčík Op.1 Ex.17 a 60 BPM (2 repetições completas).",
            "escala": "Ouvir a escala G Maior (Passo 1 Suzuki) 2 vezes.",
            "repertorio": "Cantar as notas do Vivaldi RV 310 compassos 1-4.",
            "bonus": "Prestar atenção à ressonância da corda solta Ré na nota Ré4.",
            "xp": 50
        },
        "dia_3": {
            "tecnica": "Ševčík Op.1 Ex.17 com ligaduras mais rápidas a 72 BPM.",
            "escala": "Executar a escala de G Maior (2 oitavas) a 70 BPM.",
            "repertorio": "Tocar as primeiras 4 notas do Vivaldi RV 310.",
            "bonus": "Tocar sem olhar para a mão esquerda.",
            "xp": 70
        },
        "dia_7": {
            "tecnica": "Executar Ševčík Op.1 Ex.17 a 80 BPM de forma limpa.",
            "escala": "Cantar e tocar a tríade de G Maior com pedal harmónico.",
            "repertorio": "Executar Vivaldi RV 310 compassos 1-8 no tempo.",
            "bonus": "Manter o arco perfeitamente perpendicular às cordas.",
            "xp": 100
        }
    }
};

// Gerador dinâmico para qualquer dia (1 a 30) e tonalidade
function getDailyChallengeForTonic(tonic, type, level, day) {
    const scaleName = `${tonic} ${type === "major" ? "Maior" : "Menor"}`;
    
    // Se existe desafio específico no DB, usa-o
    if (curriculumDb[tonic] && curriculumDb[tonic][`dia_${day}`]) {
        return curriculumDb[tonic][`dia_${day}`];
    }

    // Caso contrário, gera dinamicamente baseado na fase do desafio de 30 dias
    let sevcikTask = "";
    let scaleTask = "";
    let repTask = "";
    let bonusTask = "";
    let xp = 50 + (day * 3);

    const sevcikEx = sevcikDb[tonic] ? sevcikDb[tonic].title : "Exercício Ševčík Geral";

    if (day <= 5) {
        sevcikTask = `Executar ${sevcikEx} a um andamento lento (55 BPM) focando no som limpo.`;
        scaleTask = `Ouvir a escala de ${scaleName} (Passo 1 Suzuki) e marcar os objetivos.`;
        repTask = `Visualizar a pauta do excerto clássico desta tonalidade.`;
        bonusTask = "Verificar se as cordas soltas vibram por simpatia nas notas de apoio.";
    } else if (day <= 12) {
        sevcikTask = `Praticar ${sevcikEx} a 65 BPM com ligaduras de 2 em 2 notas.`;
        scaleTask = `Cantar os graus I, III e V de ${scaleName} e tocar a escala em 1 oitava.`;
        repTask = `Tocar as primeiras 4 notas do excerto de repertório da tonalidade.`;
        bonusTask = "Tocar à frente do espelho para monitorizar a curvatura dos dedos.";
    } else if (day <= 20) {
        sevcikTask = `Subir o andamento de ${sevcikEx} para 75 BPM.`;
        scaleTask = `Executar a escala completa (Passo 5 Suzuki) com metrônomo e pedal de fundo.`;
        repTask = `Estudar a metade do excerto clássico ligando as notas corretamente.`;
        bonusTask = "Fazer 1 minuto de respiração profunda antes de iniciar a prática.";
    } else {
        sevcikTask = `Dominar ${sevcikEx} a 85 BPM mantendo a afinação impecável.`;
        scaleTask = `Tocar a escala em loop (Passo 4 Suzuki) por 2 minutos seguidos.`;
        repTask = `Executar o excerto clássico completo desta tonalidade no tempo correto.`;
        bonusTask = "Gravar o excerto em WAV e analisar os pontos a afinar.";
    }

    return {
        "tecnica": sevcikTask,
        "escala": scaleTask,
        "repertorio": repTask,
        "bonus": bonusTask,
        "xp": xp
    };
}
