/* HERMES MICRO LABS v2 */
(function(){
"use strict";
let data=null;
async function load(){if(data)return data;try{data=await fetch("08_DADOS/hermes_micro_labs_v1.json").then(r=>r.json());}catch(e){data={labs:[],methodIndex:{}};}return data;}
function esc(s){return String(s??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));}
async function open(labId){
const d=await load(),lab=d.labs.find(x=>x.id===labId);if(!lab)return;
let p=document.getElementById("hermes-micro-lab");
if(!p){p=document.createElement("section");p.id="hermes-micro-lab";p.className="hm-panel";document.body.appendChild(p);}
const methods=(lab.methodLinks||[]).map(id=>'<button class="hm-method" data-method="'+esc(id)+'">'+esc(d.methodIndex?.[id]||id)+'</button>').join("");
p.innerHTML='<div class="hm-head"><div><span class="hm-kicker">LABORATÓRIO ISOLADO</span><h3>'+esc(lab.title)+'</h3></div><button id="hml-close">×</button></div><p class="hm-intro">Conceito → ouvido → gesto → método de apoio → aplicação musical → verificação.</p><div class="hm-lab-methods"><b>Métodos de apoio</b>'+methods+'</div><div class="hm-lab-list">'+lab.sections.map((s,i)=>'<article class="hm-lab-card"><h4>'+esc(s.title)+'</h4><p>'+esc(s.text)+'</p><button data-open="'+i+'">Estudar esta parte</button></article>').join("")+'</div>';
p.classList.add("open");
p.querySelector("#hml-close").onclick=()=>p.classList.remove("open");
p.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>{p.querySelectorAll(".hm-lab-card").forEach((x,i)=>x.classList.toggle("selected",i===Number(b.dataset.open)));});
p.querySelectorAll(".hm-method").forEach(b=>b.onclick=()=>showMethod(d,b.dataset.method,p));
}
function showMethod(d,id,p){
const text=d.methodIndex?.[id]||id;
const old=p.querySelector(".hm-method-detail");if(old)old.remove();
const el=document.createElement("div");el.className="hm-method-detail";el.innerHTML='<b>Método selecionado</b><p>'+esc(text)+'</p><p class="hm-note">O HERMES escolhe exercícios concretos deste método conforme a competência e depois devolve o aluno ao trecho musical.</p>';p.querySelector(".hm-lab-methods").appendChild(el);
}
window.HERMES_MICRO_LABS={load,open};
})();