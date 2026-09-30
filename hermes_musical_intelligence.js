/* HERMES MUSICAL INTELLIGENCE v1 */
(function(){
"use strict";
const DATA_PATH="08_DADOS/hermes_musical_intelligence_v1.json";
let data=null;
const esc=s=>String(s??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
async function load(){
  if(data)return data;
  try{const r=await fetch(DATA_PATH);data=await r.json();return data;}
  catch(e){data={gapLearning:{enabled:true},performanceContexts:{},analysisLayers:[]};return data;}
}
function ensurePanel(){
  if(document.getElementById("hermes-musical-panel"))return;
  const el=document.createElement("section");
  el.id="hermes-musical-panel";el.className="hm-panel";
  el.innerHTML='<div class="hm-head"><div><span class="hm-kicker">CAMADA MUSICAL</span><h3>O que preciso saber e ouvir?</h3></div><button id="hm-close">×</button></div><div class="hm-tabs"><button data-tab="analysis" class="active">Análise</button><button data-tab="ear">Ouvido</button><button data-tab="context">Contexto</button><button data-tab="gap">Lacuna</button></div><div id="hm-content"></div>';
  document.body.appendChild(el);
  el.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>renderTab(b.dataset.tab));
  el.querySelector("#hm-close").onclick=()=>el.classList.remove("open");
}
async function renderTab(tab){
  const d=await load(), c=document.getElementById("hm-content");if(!c)return;
  if(tab==="analysis")c.innerHTML='<h4>Mapa teórico do trecho</h4><p>Tonality → harmonia → notas estruturais → tensão → frase → o que ouvir → técnica → interpretação.</p><div class="hm-tags">'+(d.analysisLayers||[]).map(x=>'<span>'+esc(x)+'</span>').join("")+'</div><p class="hm-note">A partitura permanece limpa. A informação aparece apenas quando você toca/clica no ponto do trecho.</p>';
  if(tab==="ear")c.innerHTML='<h4>Educação auditiva por contexto</h4>'+Object.entries(d.performanceContexts||{}).map(([k,v])=>'<div class="hm-row"><b>'+esc(k)+'</b><span>'+esc(v)+'</span></div>').join("");
  if(tab==="context")c.innerHTML='<h4>História e conhecimento</h4><p>Cada informação recebe uma etiqueta: DOCUMENTADO, INTERPRETAÇÃO, TRADIÇÃO, CURIOSIDADE ou HIPÓTESE. O HERMES não apresenta tradição como fato.</p>';
  if(tab==="gap")c.innerHTML='<h4>Quando falta uma técnica</h4><p>O HERMES não manda simplesmente executar o que você ainda não conhece. Primeiro cria uma microaula: identificar → explicar → demonstrar → praticar → aplicar → verificar.</p><div class="hm-tags">'+(d.gapLearning?.exampleTopics||[]).map(x=>'<button class="hm-topic" data-topic="'+esc(x)+'">'+esc(x)+'</button>').join("")+'</div>';
  c.querySelectorAll(".hm-topic").forEach(b=>b.onclick=()=>openGapLesson(b.dataset.topic));
}
function openGapLesson(topic){
  const c=document.getElementById("hm-content");if(!c)return;
  const titles={harmonicos:"Harmônicos no violino",oitavas:"Oitavas no violino",pizzicato:"Pizzicato",spiccato:"Spiccato",mudanca_de_posicao:"Mudança de posição",afinação:"Afinação",ritmo:"Ritmo",arco:"Controle do arco"};
  c.innerHTML='<button class="hm-back" id="hm-back">← Voltar</button><h4>'+esc(titles[topic]||topic)+'</h4><p><b>Objetivo:</b> saber o que é, ouvir o resultado, executar lentamente e só depois aplicar na obra.</p><p><b>Sem salto:</b> o HERMES não presume conhecimento prévio. A microaula começa no nível necessário e cria um exercício curto antes da passagem.</p><p><b>Aplicação:</b> depois da prática isolada, o sistema retorna ao trecho original e verifica transferência.</p><div class="hm-warning">A avaliação só é usada quando o conceito e o exercício já foram apresentados ao aluno.</div>';
  document.getElementById("hm-back").onclick=()=>renderTab("gap");
}
window.HERMES_MUSICAL={load,open:()=>{ensurePanel();document.getElementById("hermes-musical-panel").classList.add("open");renderTab("analysis");}};
})();