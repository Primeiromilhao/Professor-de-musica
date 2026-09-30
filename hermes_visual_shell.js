/* HERMES VISUAL SHELL v3 */
(function(){
"use strict";
function build(){
if(document.getElementById("hermes-v1-shell"))return;
document.body.classList.add("hermes-v1");
const shell=document.createElement("div");shell.id="hermes-v1-shell";shell.className="hermes-v1-shell";
shell.innerHTML='<aside class="hv-sidebar"><div class="hv-brand">HERMES<span>Violin Lab · Escola de Violino</span></div><div class="hv-profile"><div class="hv-avatar">♬</div><strong>Meu percurso</strong><small>Diagnóstico real · progresso por competência</small></div><nav class="hv-nav"><button class="active" data-view="home">⌂ Início</button><button data-view="formation">◈ Formação</button><button data-view="repertoire">♫ Repertório</button><button data-view="assessment">◉ Avaliação</button><button data-view="labs">✦ Laboratório</button></nav><div class="hv-side-note">Técnica, teoria, ouvido interno e performance são trabalhados juntos.</div></aside>'+
'<main class="hv-main"><div class="hv-top"><div><h1>Professor de Violino</h1><p>Da fundação à formação de músico completo.</p></div><div class="hv-status"><i class="hv-dot"></i> Sistema local</div></div>'+
'<section class="hv-hero"><h2>Hoje no HERMES</h2><p id="hv-today">Começamos pela avaliação de nivelamento. O HERMES não parte do nível declarado; parte do que você demonstra.</p></section>'+
'<div class="hv-work"><section class="hv-score"><div class="hv-score-head"><strong>Partitura de trabalho</strong><span class="hv-pill">Trecho da sessão</span></div><div class="hv-score-placeholder"><div><b>Partitura limpa</b><br><span>Os pontos de análise ficam discretos. Clique neles para abrir harmonia, história, ouvido interno, técnica e interpretação.</span><br><button class="hv-action" id="hv-open-analysis">Abrir análise musical</button></div></div></section>'+
'<aside class="hv-critical"><h3>Foco da sessão</h3><div class="hv-critical-item"><b>1 · Competência</b><span>A definir pelo diagnóstico</span></div><div class="hv-critical-item"><b>2 · Preparação</b><span>CVC → exercício → aplicação</span></div><div class="hv-critical-item"><b>3 · Retorno</b><span>Voltar à música e verificar transferência</span></div><button class="hv-action" id="hv-start-assessment">Começar nivelamento</button></aside></div>'+
'<div class="hv-bottom"><div class="hv-card"><h3>Formação obrigatória</h3><p>Escalas, Ševčík e estudos são escolhidos conforme as necessidades reais.</p><span class="hv-pill">CVC · Técnica</span></div><div class="hv-card"><h3>Repertório</h3><p>Cada obra devolve necessidades técnicas, teóricas e auditivas.</p><span class="hv-pill">Obra → trecho → competência</span></div><div class="hv-card"><h3>Performance</h3><p>Solo, piano, playback e orquestra têm modos de escuta e preparação diferentes.</p><span class="hv-pill">Ouvido interno</span></div></div></main>'+
'<aside class="hv-right"><h2>Concertos</h2><p>A obra gera o ecossistema pedagógico.</p><div class="hv-concert active" data-work="RIEDING_OP35" data-level="L2"><b>Rieding Op. 35</b><span>Primeiro concerto · Fundação</span></div><div class="hv-concert" data-work="SEITZ_OP22" data-level="L2"><b>Seitz Op. 22 nº 5</b><span>Primeiros concertos</span></div><div class="hv-concert" data-work="VIVALDI_RV356" data-level="L3"><b>Vivaldi RV 356</b><span>Consolidação</span></div><div class="hv-concert" data-work="HAYDN_HOB_VIIA4" data-level="L4"><b>Haydn G maior</b><span>Transição para intermédio</span></div><div class="hv-concert" data-work="BEETHOVEN_OP61" data-level="AVANCADO"><b>Beethoven Op.61</b><span>Avançado · prova específica</span></div><div class="hv-concert" data-work="MENDELSSOHN_OP64" data-level="AVANCADO"><b>Mendelssohn Op.64</b><span>Avançado · Mi menor</span></div><div class="hv-concert" data-work="BACH_CHACONNE" data-level="PRE_SOLISTA"><b>Bach Chaconne</b><span>Pré-solista · polifonia</span></div><button class="hv-action secondary" id="hv-open-musical">Mapa musical</button></aside>';
document.querySelector(".app-container")?.prepend(shell);
document.querySelectorAll(".hv-nav button").forEach(b=>b.addEventListener("click",()=>activate(b.dataset.view)));
document.querySelectorAll(".hv-concert").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".hv-concert").forEach(x=>x.classList.remove("active"));b.classList.add("active");const id=b.dataset.work,level=b.dataset.level;const needsReadiness=!["L1","L2","L3"].includes(level);if(needsReadiness&&window.HERMES_READINESS&&id)window.HERMES_READINESS.open(id);else window.HERMES_MUSICAL?.open();}));
document.getElementById("hv-open-analysis")?.addEventListener("click",()=>window.HERMES_MUSICAL?.open());
document.getElementById("hv-open-musical")?.addEventListener("click",()=>window.HERMES_MUSICAL?.open());
document.getElementById("hv-start-assessment")?.addEventListener("click",()=>{const p=document.getElementById("hermes-placement-panel");if(p)p.scrollIntoView({behavior:"smooth"});else window.HERMES_MUSICAL?.open();});
}
function activate(view){
const t=document.getElementById("hv-today");
const m={home:"Começamos pela avaliação de nivelamento. O HERMES não parte do nível declarado; parte do que você demonstra.",formation:"Competência → preparação → método → aplicação → avaliação. Se faltar uma técnica, primeiro vem a microaula.",repertoire:"A obra permanece no centro. Cada trecho pode abrir sua análise harmônica, histórica, auditiva, técnica e interpretativa.",assessment:"A avaliação mede evidências. Se o sinal não for confiável, o HERMES não transforma a dúvida em erro.",labs:"Técnicas isoladas: aprender o conceito, ouvir o resultado, praticar e depois transferir para o repertório."};
if(t)t.textContent=m[view]||m.home;
document.querySelectorAll(".hv-nav button").forEach(x=>x.classList.toggle("active",x.dataset.view===view));
if(view==="labs")window.HERMES_MICRO_LABS?.open("harmonicos");
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",build);else build();
})();
/* Readiness integration */
document.addEventListener("hermes:work-released",e=>{
 const w=e.detail?.work;if(!w)return;
 const t=document.getElementById("hv-today");if(t)t.textContent="Estudo liberado: "+w.title+". O diagnóstico continua associado à obra e será retomado durante a transferência para os trechos."; 
 const s=document.querySelector(".hv-score-placeholder span");if(s)s.textContent="Obra liberada para estudo. O HERMES mantém os requisitos diagnosticados como foco da sessão."; 
});
