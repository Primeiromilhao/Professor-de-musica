/* HERMES Beginner Ecosystem v1 */
(function(){
"use strict";
const DATA="08_DADOS/hermes_beginner_ecosystem_v1.json";let db=null;
const esc=s=>String(s??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
async function load(){try{const r=await fetch(DATA,{cache:"no-store"});if(r.ok)db=await r.json();}catch(e){}
if(!db)return;window.HERMES_BEGINNER_ECOSYSTEM=db;render();
const l=document.getElementById("level-select");l?.addEventListener("change",render);}
function levelId(level){return ({iniciante:"L1",intermedio:"L3",avancado:"L4",pre_solista:"L4",solista:"L4"})[level]||"L1";}
function render(){let old=document.getElementById("hermes-beginner-ecosystem");if(old)old.remove();const main=document.querySelector("main");if(!main)return;
const level=document.getElementById("level-select")?.value||"iniciante";const lid=levelId(level);const cards=db.levels.filter(x=>x.id===lid||lid==="L1");
const p=document.createElement("section");p.id="hermes-beginner-ecosystem";p.className="panel no-print";p.innerHTML='<h2 class="panel-title">🎼 Percurso do Aluno — diagnóstico real</h2><p class="cvc-evidence">HERMES começa pela fundação e só promove quando as competências demonstram consistência. O concerto é dividido em sessões; cada sessão devolve ao CVC e aos métodos.</p><div id="hermes-concert-cards"></div><div id="hermes-concert-session" style="margin-top:1rem"></div>';
main.insertBefore(p,main.firstElementChild);const box=p.querySelector("#hermes-concert-cards");
const targetIds=lid==="L1"?["RIEDING_OP35","RIEDING_OP36","SEITZ_OP22"]:lid==="L2"?["RIEDING_OP35","RIEDING_OP36","SEITZ_OP22"]:lid==="L3"?["VIVALDI_RV356","VIVALDI_RV310"]:["HAYDN_HOB_VIIA4"];
const concerts=db.concertos.filter(c=>targetIds.includes(c.id));box.innerHTML=concerts.map(c=>'<button class="btn btn-secondary btn-sm hermes-eco-concert" data-id="'+esc(c.id)+'" style="margin:.25rem">'+esc(c.title)+' — '+esc(c.composer)+'</button>').join("");
p.querySelectorAll(".hermes-eco-concert").forEach(b=>b.addEventListener("click",()=>showConcert(b.dataset.id)));
if(concerts[0])showConcert(concerts[0].id);
}
function showConcert(id){const c=db.concertos.find(x=>x.id===id),box=document.getElementById("hermes-concert-session");if(!c||!box)return;
box.innerHTML='<div class="hermes-formation-card"><h3>'+esc(c.title)+'</h3><p><strong>Fonte:</strong> <a href="'+esc(c.source)+'" target="_blank" rel="noopener">IMSLP</a></p><p><strong>Pré-requis:</strong> '+esc(c.sessions.map(s=>s.methods.join(", ")).join(" · "))+'</p><p><strong>Movimentos/sessões:</strong> '+c.sessions.length+'</p><div id="hermes-session-buttons"></div><div id="hermes-session-detail" style="margin-top:.8rem"></div></div>';
const bs=document.getElementById("hermes-session-buttons");c.sessions.forEach((s,i)=>{const b=document.createElement("button");b.className="btn btn-secondary btn-sm";b.style.margin=".2rem";b.textContent="Sessão "+String.fromCharCode(65+i)+" — "+s.movement;b.onclick=()=>showSession(c,s);bs.appendChild(b);});showSession(c,c.sessions[0]);}
function showSession(c,s){const box=document.getElementById("hermes-session-detail");if(!box)return;
box.innerHTML='<h4>'+esc(s.id)+' — '+esc(s.movement)+' · '+esc(s.bars)+'</h4><p><strong>Objetivo:</strong> '+esc(s.purpose)+'</p><p><strong>Competências CVC:</strong> '+esc(s.competencies.join(" · "))+'</p><p><strong>Métodos:</strong> '+esc(s.methods.join(" · "))+'</p><div class="cvc-chain"><span>Diagnóstico</span><b>→</b><span>CVC</span><b>→</b><span>Preparação</span><b>→</b><span>Método</span><b>→</b><span>Passagem</span><b>→</b><span>Avaliação</span></div><p class="cvc-evidence">A passagem deve ser praticada isoladamente e depois reintegrada no movimento. A gravação pelo microfone alimenta a avaliação local.</p>';
const cvc=window.HERMES_CVC;if(cvc&&s.competencies[0]){const r=cvc.recommend("problema_afinação",{repertoire:s.purpose});if(r){const e=document.createElement("p");e.className="cvc-evidence";e.innerHTML="<strong>Primeira rota CVC:</strong> "+esc(r.primary?.label||"competência")+" → "+esc(r.sevcik?.method||"Ševčík");box.appendChild(e);}}
}
window.addEventListener("hermes:method-pedagogy-ready",()=>{}, {once:true});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",load,{once:true});else load();
})();
