/* HERMES Beginner Curriculum — progressive entry route */
(function(){
  async function load(){
    try{
      const r=await fetch('08_DADOS/hermes_beginner_curriculum_v1.json');
      const data=await r.json();
      window.HERMES_BEGINNER=data;
      render(data);
    }catch(e){console.warn('Currículo inicial não carregado',e);}
  }
  function render(data){
    const host=document.getElementById('hermes-formation-cards');
    if(!host)return;
    host.innerHTML=data.levels.map((l,i)=>`<article class="hermes-formation-card ${i===0?'active':''}">
      <span class="badge">${l.id}</span><h3>${l.name}</h3>
      <strong>Técnica</strong><p>${l.technique.join(' · ')}</p>
      <strong>Repertório</strong><p>${l.repertoire.join(' · ')}</p>
    </article>`).join('');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load);else load();
})();