/* HERMES CVC Engine v1
   CVC = arquitetura de competências; não é uma sequência rígida.
   Direções: competência -> treino -> repertório e repertório -> diagnóstico -> treino.
*/
(function(global){
  "use strict";
  const DATA_URL="08_DADOS/hermes_cvc_graph_v1.json";
  const PROFILE_KEY="hermes_cvc_profile_v1";
  const FALLBACK={
    masteryStages:["exposicao","compreensao","lenta","controlada","musical","transferencia","automatizacao","dominio"],
    competencies:{
      CVC_POSTURA:{label:"Postura e equilíbrio",sevcik:["SEVCIK_OP6","SEVCIK_OP1"],complementary:["WOHLFAHRT_OP45"],applications:["toda prática"]},
      CVC_AFINACAO:{label:"Afinação",sevcik:["SEVCIK_OP1","SEVCIK_OP8","SEVCIK_OP11"],complementary:["FLESCH_SCALE","KREUTZER_42"],applications:["escalas","arpejos","repertório"]},
      CVC_INDEPENDENCIA:{label:"Independência dos dedos",sevcik:["SEVCIK_OP1","SEVCIK_OP3","SEVCIK_OP7"],complementary:["WOHLFAHRT_OP45","KAYSER_OP20"],applications:["escalas","passagens rápidas"]},
      CVC_ARCO:{label:"Controle do arco",sevcik:["SEVCIK_OP2","SEVCIK_OP3"],complementary:["KREUTZER_42","FIORILLO_36"],applications:["détaché","martelé","spiccato"]},
      CVC_COORDENACAO:{label:"Coordenação esquerda-direita",sevcik:["SEVCIK_OP1","SEVCIK_OP2","SEVCIK_OP3"],complementary:["KREUTZER_42","MAZAS"],applications:["escalas","semicolcheias","concerto"]},
      CVC_MUDANCA_POSICAO:{label:"Mudança de posição",sevcik:["SEVCIK_OP1","SEVCIK_OP8"],complementary:["KREUTZER_42","FLESCH_SCALE"],applications:["escalas 3 oitavas","Mendelssohn","Mozart"]},
      CVC_EXTENSOES:{label:"Extensões e formas da mão",sevcik:["SEVCIK_OP1","SEVCIK_OP9"],complementary:["KREUTZER_42","FIORILLO_36"],applications:["cordas duplas","passagens cromáticas"]},
      CVC_CORDAS_DUPLAS:{label:"Cordas duplas e acordes",sevcik:["SEVCIK_OP1","SEVCIK_OP7","SEVCIK_OP9"],complementary:["KREUTZER_42","FIORILLO_36","DONT_OP35"],applications:["Bach","Paganini","Brahms"]},
      CVC_VELOCIDADE:{label:"Velocidade controlada",sevcik:["SEVCIK_OP1","SEVCIK_OP3","SEVCIK_OP7"],complementary:["KREUTZER_42","FIORILLO_36","DONT_OP35"],applications:["passagens rápidas","Paganini","Mendelssohn"]},
      CVC_ESCALAS:{label:"Escalas como mapa técnico",sevcik:["SEVCIK_OP8","SEVCIK_OP11"],complementary:["FLESCH_SCALE"],applications:["todo repertório tonal"]},
      CVC_ARPEJOS:{label:"Arpejos",sevcik:["SEVCIK_OP13"],complementary:["FLESCH_SCALE","DONT_OP35"],applications:["concertos","cadências"]},
      CVC_MUSICALIDADE:{label:"Musicalidade aplicada",sevcik:["SEVCIK_OP16"],complementary:["BACH","KREUTZER_42","FIORILLO_36"],applications:["fraseado","dinâmica","estilo"]}
    },
    levels:{
      iniciante:{preferred:["SEVCIK_OP6","SEVCIK_OP1","WOHLFAHRT_OP45"]},
      intermedio:{preferred:["SEVCIK_OP1","SEVCIK_OP2","SEVCIK_OP8","KAYSER_OP20","KREUTZER_42"]},
      avancado:{preferred:["SEVCIK_OP2","SEVCIK_OP8","SEVCIK_OP9","KREUTZER_42","FIORILLO_36","FLESCH_SCALE"]},
      pre_solista:{preferred:["SEVCIK_OP1","SEVCIK_OP8","SEVCIK_OP9","SEVCIK_OP11","DONT_OP35","FLESCH_SCALE"]},
      solista:{preferred:["SEVCIK_OP7","SEVCIK_OP9","SEVCIK_OP11","SEVCIK_OP16","DONT_OP35","FLESCH_SCALE"]}
    },
    problems:[
      {id:"problema_afinação",label:"Afinação instável",keywords:["afinação","pitch","semitom"],competencies:["CVC_AFINACAO","CVC_ESCALAS"]},
      {id:"problema_shift",label:"Mudança de posição insegura",keywords:["mudança de posição","posição","shift"],competencies:["CVC_MUDANCA_POSICAO","CVC_AFINACAO"]},
      {id:"problema_arco",label:"Arco inconsistente",keywords:["arco","spiccato","martelé","detaché"],competencies:["CVC_ARCO","CVC_COORDENACAO"]},
      {id:"problema_rapidez",label:"Passagem rápida não estabiliza",keywords:["rápida","semicolcheias","velocidade"],competencies:["CVC_VELOCIDADE","CVC_COORDENACAO"]},
      {id:"problema_duplas",label:"Cordas duplas/acordes instáveis",competencies:["CVC_CORDAS_DUPLAS","CVC_EXTENSOES"]},
      {id:"problema_coordenacao",label:"Mãos não sincronizam",competencies:["CVC_COORDENACAO","CVC_INDEPENDENCIA"]},
      {id:"problema_musical",label:"Técnica funciona mas a frase não comunica",keywords:["fraseado","musicalidade","dinâmica","som","timbre"],competencies:["CVC_MUSICALIDADE","CVC_ARCO"]}
    ]
  };  let graph=FALLBACK;
  function normalizeGraph(raw){
    if(!raw) return FALLBACK;
    const competencies=Array.isArray(raw.competencies)
      ? Object.fromEntries(raw.competencies.map(x=>[x.id,x]))
      : (raw.competencies||{});
    return {...FALLBACK,...raw,competencies};
  }
  function getProfile(){
    try{return JSON.parse(localStorage.getItem(PROFILE_KEY)||'{"studentId":"student_01","level":"intermedio","competencies":{}}');}
    catch(_){return {studentId:"student_01",level:"intermedio",competencies:{}};}
  }
  function saveProfile(p){localStorage.setItem(PROFILE_KEY,JSON.stringify(p));}
  function levelRank(level){return {iniciante:1,intermedio:2,avancado:3,pre_solista:4,solista:5}[level]||2;}
  function chooseCompetency(id,profile){
    const c=graph.competencies[id]; if(!c)return null;
    const state=profile.competencies?.[id]||{stage:0,score:0.5,failures:0};
    return {...c,id,state};
  }
  function pickSevcik(comp,profile){
    const preferred=(graph.levels?.[profile.level]?.preferred)||[];
    const ids=comp.sevcik||[];
    const bookId=preferred.find(x=>ids.includes(x))||ids[0];
    const map={
      SEVCIK_OP1:"sevcik_op1_1",SEVCIK_OP2:"sevcik_op2",SEVCIK_OP3:"sevcik_op3",
      SEVCIK_OP6:"sevcik_op6",SEVCIK_OP7:"sevcik_op7",SEVCIK_OP8:"sevcik_op8",
      SEVCIK_OP9:"sevcik_op9",SEVCIK_OP11:"sevcik_op11",SEVCIK_OP13:"sevcik_op13",SEVCIK_OP16:"sevcik_op16"
    };
    return {method:bookId,bookId:map[bookId]||bookId};
  }
  function findSevcikExercise(method,level,key){
    const db=(typeof global.sevcikDb!=="undefined")?global.sevcikDb:((typeof sevcikDb!=="undefined")?sevcikDb:null);
    if(!db)return null;
    const list=db[key]||[];
    if(!Array.isArray(list))return null;
    const wanted=method;
    return list.find(x=>x.bookId===wanted || (wanted==="SEVCIK_OP1" && x.bookId?.startsWith("sevcik_op1"))) ||
           list.find(x=>x.level?.toLowerCase()===String(level).toLowerCase()) || list[0] || null;
  }
  function recommend(problemId,opts={}){
    const profile={...getProfile(),...(opts.profile||{})};
    const problem=(graph.problems||[]).find(x=>x.id===problemId);
    if(!problem)return null;
    const competencies=problem.competencies.map(id=>chooseCompetency(id,profile)).filter(Boolean);
    competencies.sort((a,b)=>(a.state.score??0.5)-(b.state.score??0.5));
    const primary=competencies[0];
    const sevcik=pickSevcik(primary,profile);
    const exercise=findSevcikExercise(sevcik.method,profile.level,opts.key||"G");
    const reason=opts.repertoire
      ? "Este treino foi escolhido porque a passagem/repertório apresenta a dificuldade diagnosticada."
      : "Este treino foi escolhido para construir a competência antes da aplicação musical.";
    return {
      problem,primary,alternatives:competencies.slice(1),sevcik,
      exercise:exercise?{id:exercise.id,title:exercise.title,focus:exercise.foco||exercise.focus,bookId:exercise.bookId}:null,
      complementary:primary.complementary||[],
      application:opts.repertoire||primary.applications?.[0]||"aplicação musical",
      reason
    };
  }  function diagnoseFromText(text,opts={}){
    const s=String(text||"").toLowerCase();
    let best=null,bestScore=0;
    for(const p of graph.problems||[]){
      const words=[p.label,...(p.keywords||[])];
      const score=words.reduce((n,w)=>n+(s.includes(String(w).toLowerCase())?1:0),0);
      if(score>bestScore){best=p;bestScore=score;}
    }
    if(!best)return null;
    return recommend(best.id,opts);
  }
  function reverseFromRepertoire(excerpt,opts={}){
    const text=typeof excerpt==="string"?excerpt:[excerpt?.title,excerpt?.transferObjective,excerpt?.difficultyDescription].filter(Boolean).join(" ");
    return diagnoseFromText(text,opts);
  }
  function buildSession(opts={}){
    const profile={...getProfile(),...(opts.profile||{})};
    const rec=opts.problemId?recommend(opts.problemId,{...opts,profile}):reverseFromRepertoire(opts.excerpt,{...opts,profile});
    if(!rec)return null;
    const weak=(rec.primary.state.score??0.5)<0.7 || (rec.primary.state.failures||0)>0;
    const urgent=opts.urgent===true;
    const total=opts.minutes||30;
    let blocks=urgent?[5,5,15,5]:[5,8,7,10];
    if(!urgent && weak) blocks=[6,9,5,10];
    if(total!==30){
      const ratio=total/30; blocks=blocks.map(x=>Math.max(2,Math.round(x*ratio)));
    }
    return {minutes:blocks.reduce((a,b)=>a+b,0),blocks:[
      {minutes:blocks[0],name:"Preparação CVC",purpose:rec.primary.label},
      {minutes:blocks[1],name:"Ševčík",purpose:rec.exercise?.title||rec.sevcik.method},
      {minutes:blocks[2],name:"Escala/estudo",purpose:(rec.complementary||[]).join(" + ")},
      {minutes:blocks[3],name:"Repertório",purpose:rec.application}
    ],recommendation:rec,adaptive:true};
  }
  function updateCompetency(id,score,stage,opts={}){
    const p=getProfile(); p.level=opts.level||p.level||"intermedio";
    p.competencies=p.competencies||{};
    const old=p.competencies[id]||{stage:0,score:0.5,failures:0};
    const failed=Number(score)<Number(old.score||0.5);
    p.competencies[id]={stage:Math.max(0,Math.min(7,Number(stage??old.stage))),score:Number(score),failures:failed?(old.failures||0)+1:0,last:new Date().toISOString()};
    saveProfile(p); return p.competencies[id];
  }
  function resetCompetency(id){const p=getProfile();if(p.competencies?.[id])delete p.competencies[id];saveProfile(p);return p;}
  async function load(){
    try{const r=await fetch(DATA_URL,{cache:"no-store"}); if(r.ok)graph=normalizeGraph(await r.json());}
    catch(_){}
    if(!graph)graph=FALLBACK;
    global.HERMES_CVC={graph,getProfile,saveProfile,recommend,diagnoseFromText,reverseFromRepertoire,buildSession,updateCompetency,resetCompetency,chooseCompetency,findSevcikExercise};
    document.dispatchEvent(new CustomEvent("hermes:cvc-ready"));
  }
  global.HERMES_CVC={graph:FALLBACK,getProfile,saveProfile,recommend,diagnoseFromText,reverseFromRepertoire,buildSession,updateCompetency,resetCompetency,chooseCompetency,findSevcikExercise};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",load);else load();
})(window);
// ── UI ADAPTATIVA ─────────────────────────────────────────────
(function(){
  function esc(v){return String(v??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));}
  function render(rec){
    const box=document.getElementById("cvc-recommendation"), session=document.getElementById("cvc-session");
    if(!box||!rec)return;
    const c=rec.primary, s=rec.exercise;
    const state=c.state||{stage:0,score:.5,failures:0};
    box.innerHTML="<strong>Caminho CVC</strong>"+
      "<div class='cvc-chain'><span>Problema</span><b>→</b><span>"+esc(rec.problem.label)+"</span><b>→</b><span>"+esc(c.label)+"</span><b>→</b><span>"+esc(s?.title||rec.sevcik.method)+"</span><b>→</b><span>"+esc(rec.application)+"</span></div>"+
      "<p class='cvc-evidence'><strong>Porquê:</strong> "+esc(rec.reason)+"</p>"+
      "<p class='cvc-evidence'><strong>Estado:</strong> etapa "+(Number(state.stage)+1)+"/8 · score "+Math.round(Number(state.score)*100)+"% · falhas "+Number(state.failures||0)+"</p>"+
      (s?"<p class='cvc-evidence'><strong>Foco Ševčík:</strong> "+esc(s.focus||"preparação técnica")+"</p>":"");
    if(session){
      const minutes=document.getElementById("cvc-minutes")?.value||30;
      const plan=window.HERMES_CVC.buildSession({problemId:rec.problem.id,key:document.getElementById("tonic-select")?.value||"G",minutes:Number(minutes)});
      session.innerHTML="<strong>Sessão adaptativa</strong>"+
        plan.blocks.map(b=>"<p><b>"+b.minutes+" min — "+esc(b.name)+"</b><br><span class='cvc-evidence'>"+esc(b.purpose)+"</span></p>").join("")+
        (state.failures>0?"<p class='cvc-regress'><strong>Regressão permitida:</strong> houve falha recente; consolidar a competência antes de aumentar a exigência.</p>":"");
    }
  }
  function init(){
    const btn=document.getElementById("btn-cvc-diagnose"), select=document.getElementById("cvc-problem-select");
    if(!btn||!select||!window.HERMES_CVC)return;
    const level=document.getElementById("level-select");
    const run=()=>{
      const p=window.HERMES_CVC.getProfile(); p.level=level?.value||p.level||"intermedio"; window.HERMES_CVC.saveProfile(p);
      render(window.HERMES_CVC.recommend(select.value,{key:document.getElementById("tonic-select")?.value||"G"}));
    };
    btn.addEventListener("click",run);
    level?.addEventListener("change",()=>{const p=window.HERMES_CVC.getProfile();p.level=level.value;window.HERMES_CVC.saveProfile(p);run();});
    run();
  }
  document.addEventListener("hermes:cvc-ready",init,{once:true});
  if(document.readyState!=="loading")setTimeout(init,0);
})();

// ── REPERTÓRIO -> CVC AUTOMÁTICO ─────────────────────────────
(function(){
  function observe(){
    if(!window.HERMES_CVC)return;
    const targets=["staff-content-label","weekly-concerto-focus-box","vexflow-panel-title"]
      .map(id=>document.getElementById(id)).filter(Boolean);
    const scan=()=>{
      const text=targets.map(x=>x.textContent||"").join(" ");
      if(!/repertório|concerto|passagem|excerto/i.test(text))return;
      const level=document.getElementById("level-select")?.value||"intermedio";
      const key=document.getElementById("tonic-select")?.value||"G";
      const rec=window.HERMES_CVC.reverseFromRepertoire(text,{key,profile:{level}});
      if(rec){
        const sel=document.getElementById("cvc-problem-select");
        if(sel)sel.value=rec.problem.id;
        const btn=document.getElementById("btn-cvc-diagnose");
        if(btn)btn.click();
      }
    };
    targets.forEach(el=>new MutationObserver(scan).observe(el,{childList:true,subtree:true,characterData:true}));
    setTimeout(scan,300);
  }
  document.addEventListener("hermes:cvc-ready",observe,{once:true});
  if(document.readyState!=="loading")setTimeout(observe,50);
})();
