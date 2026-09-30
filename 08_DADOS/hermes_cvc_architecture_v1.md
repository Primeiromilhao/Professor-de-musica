# HERMES Violin Lab — Arquitetura CVC v1

## Princípio
O CVC é a espinha dorsal técnica da formação, mas não é uma sequência rígida de exercícios.
O sistema usa o ciclo:
**diagnosticar → competência → preparar → treinar → aplicar → medir → corrigir → transferir → consolidar**.

## Camadas
- CVC: mapa de competências.
- Ševčík: laboratório técnico.
- Escalas/arpejos: organização da mão, ouvido e mapa harmónico.
- Estudos: transferência técnica.
- Repertório: aplicação e teste.
- Bach: integração polifónica, técnica e musical.
- Teoria/percepção: compreensão.
- Performance: integração.

## Competências CVC
Postura, afinação, independência, arco, coordenação, mudança de posição,
extensões, cordas duplas/acordes, velocidade, escalas, arpejos e musicalidade.
Cada nó possui pré-requisitos, métodos, aplicações e evidências observáveis.
## Navegação bidirecional

### Frente
Competência → preparação → Ševčík → complemento → aplicação → avaliação.

### Reversa
Repertório → problema técnico → competência CVC → preparação → Ševčík → retorno ao repertório.

A rota reversa é implementada em HERMES_CVC.reverseFromRepertoire() e integrada ao
resolvePracticePlan() existente, sem substituir o motor de currículo anterior.

## Perfil dinâmico
O perfil local usa hermes_cvc_profile_v1 e guarda:
- nível;
- score por competência;
- estágio de domínio 0–7;
- falhas recentes;
- última atualização.

Uma competência pode regredir. Falha de transferência aumenta a pressão para consolidar
a competência antes de aumentar a exigência.
## Progressão de domínio
0 exposição
1 compreensão
2 execução lenta
3 execução controlada
4 execução musical
5 transferência
6 automatização
7 domínio

Não existe desbloqueio por BPM isolado.

## Sessão adaptativa
Base de 30 min:
- 5 min preparação CVC
- 8 min Ševčík
- 7 min escala/estudo
- 10 min repertório

Em dificuldade urgente:
- 5 min CVC
- 5 min Ševčík
- 15 min passagem
- 5 min execução musical

Se a competência estiver fraca ou houver falha recente, a distribuição é reajustada.
## Integração com o HERMES existente
Reutilizados:
- hermes_path_v1.json para níveis e gates;
- hermes_training_curriculum_v1.json para formação;
- hermes_method_catalog_v1.json para métodos;
- sevcik_db.js para exercícios existentes;
- repertoire_db.js e repertoryCatalog.detailed.json para repertório;
- pdfSourceValidator.js como ponto de integração do plano;
- app.js para escala, áudio, pauta e histórico;
- localStorage para progresso local.

Novos:
- 08_DADOS/hermes_cvc_graph_v1.json
- hermes_cvc_engine.js
- painel CVC em index.html
- estilos CVC em hermes_formation.css

A arquitetura anterior não foi reescrita. O CVC foi adicionado como camada de decisão.
## Regra anti-robô
O HERMES deve conseguir explicar:
1. qual problema foi observado;
2. qual competência está por trás;
3. por que o exercício foi escolhido;
4. onde essa habilidade aparece na música;
5. como verificar se melhorou;
6. quando regressar ou escolher outra ferramenta.

O motor oferece alternativas de método e preserva a possibilidade de repertório e caminhos
diferentes para alunos diferentes.

## Validações realizadas
- JSON do grafo CVC: válido.
- hermes_cvc_engine.js: sintaxe válida.
- pdfSourceValidator.js: sintaxe válida.
- app.js: sintaxe válida.
- caminho frente: problema de mudança de posição → CVC_MUDANCA_POSICAO → Ševčík → aplicação.
- caminho reverso: texto de repertório com mudança de posição/afinação → mesma competência.
- dois perfis com problemas de cordas duplas produziram competências primárias diferentes.
- plano de 30 min foi gerado de forma adaptativa.
- resolvePracticePlan() passou a devolver o campo cvc.
