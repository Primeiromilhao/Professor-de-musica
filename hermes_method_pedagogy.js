/* HERMES Method Pedagogy v1 - adaptive study graph */
(function(){
"use strict";
const DATA="08_DADOS/hermes_method_pedagogy_v1.json";
let data=null;
const esc=s=>String(s??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
async function load(){try{const r=await fetch(DATA,{cache:"no-store"});if(r.ok)data=await r.json();}catch(e){}
if(!data)return; window.HERMES_METHOD_PEDAGOGY={data,select:selectFamily,build:buildRoute};
window.dispatchEvent(new CustomEvent("hermes:method-pedagogy-ready"));}
function selectFamily(competency,level="iniciante",problem=""){
const c=String(competency||"").toUpperCase();
const families=data.sevcikFamilies||[];
const matches=families.filter(f=>(f.competencies||[]).some(x=>x===c));
return matches[0]||families[0];
}
function buildRoute(competency,level,problem,repertoire){
const first=selectFamily(competency,level,problem);if(!first)return null;
const chain=[first];let cur=first;for(let i=0;i<4;i++){const id=cur.next?.[0];cur=(data.sevcikFamilies||[]).find(f=>f.id===id);if(!cur)break;chain.push(cur);}
return {mode:"family",competency,level,problem,repertoire,chain};}
function renderPanel(){
let old=document.getElementById("hermes-method-pedagogy-panel");if(old)old.remove();
const host=document.querySelector("#hermes-formation-panel")||document.querySelector(".formation-panel")||document.querySelector("main");if(!host)return;
const p=document.createElement("section");p.id="hermes-method-pedagogy-panel";p.className="panel no-print";
p.innerHTML='<h2 class="panel-title">ðŸ§­ Como estudar os mÃ©todos</h2><p class="cvc-evidence">HERMES nÃ£o manda fazer exercÃ­cio 1â†’2â†’3 automaticamente. Seleciona uma famÃ­lia pela competÃªncia, relaciona exercÃ­cios, aplica variaÃ§Ãµes e volta ao repertÃ³rio.</p><div id="hermes-method-route"></div>';
host.parentNode.insertBefore(p,host.nextSibling);updatePanel();}
function updatePanel(){const box=document.getElementById("hermes-method-route");if(!box||!data)return;
const profile=window.HERMES_CVC?.getProfile?.()||{};const level=document.getElementById("level-select")?.value||profile.level||"iniciante";
const comp=window.HERMES_CVC?.chooseCompetency?.("CVC_INDEPENDENCIA",profile)||{label:"IndependÃªncia dos dedos"};
const route=buildRoute("CVC_INDEPENDENCIA",level,"diagnÃ³stico inicial","repertÃ³rio atual");if(!route)return;
box.innerHTML='<div class="cvc-chain">'+route.chain.map((f,i)=>'<span>'+esc(f.id)+' â€” '+esc(f.name)+'</span>'+ (i<route.chain.length-1?'<b>â†’</b>':'')).join("")+'</div><p class="cvc-evidence"><strong>AplicaÃ§Ã£o:</strong> '+esc(route.chain[0].transfer)+'</p>';
}
function patchCvc(){if(!window.HERMES_CVC||window.HERMES_CVC._methodPatched)return;const orig=window.HERMES_CVC.recommend;
window.HERMES_CVC.recommend=function(problemId,opts={}){const r=orig(problemId,opts);if(r&&data){const fam=selectFamily(r.primary?.id||"CVC_INDEPENDENCIA",opts.profile?.level||"iniciante",problemId);r.methodFamily=fam;r.studyRule=data.methodRules?.[r.sevcik?.method]||null;r.methodRoute=buildRoute(r.primary?.id||"CVC_INDEPENDENCIA",opts.profile?.level,problemId,opts.repertoire);}
return r;};window.HERMES_CVC._methodPatched=true;}
function init(){patchCvc();renderPanel();const l=document.getElementById("level-select");l?.addEventListener("change",()=>setTimeout(updatePanel,0));}
window.addEventListener("hermes:method-pedagogy-ready",init,{once:true});
if(document.readyState!=="loading")load();else document.addEventListener("DOMContentLoaded",load,{once:true});
})();

