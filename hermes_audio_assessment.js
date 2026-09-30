/* HERMES Audio Assessment v1 — local microphone, no external AI/API */
(function(){
'use strict';
const KEY='hermes_audio_assessment_v1';
const NOTE_NAMES=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
let stream=null, ctx=null, analyser=null, raf=null, running=false;
let samples=[], noteFrames=0, voicedFrames=0, centsErrors=[], rmsValues=[], currentNote=null, lastUpdate=0;
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function pitch(frame,sr){
  let rms=Math.sqrt(frame.reduce((a,x)=>a+x*x,0)/frame.length);
  if(rms<0.012) return {hz:null,rms};
  let min=Math.floor(sr/1200), max=Math.min(Math.floor(sr/120), frame.length-2), best=-1, bestCorr=0;
  for(let lag=min;lag<=max;lag++){
    let sum=0,n=0;
    for(let i=0;i<frame.length-lag;i+=2){sum+=frame[i]*frame[i+lag];n++;}
    const c=sum/n;
    if(c>bestCorr){bestCorr=c;best=lag;}
  }
  if(best<1 || bestCorr<0.001) return {hz:null,rms};
  const hz=sr/best;
  if(hz<120||hz>1200) return {hz:null,rms};
  return {hz,rms};
}
function hzToMidi(hz){return 69+12*Math.log2(hz/440);}
function midiToName(m){const n=Math.round(m);return NOTE_NAMES[(n%12+12)%12]+(Math.floor(n/12)-1);}
function cents(hz,target){return 1200*Math.log2(hz/target);}
function updateUI(data){
 const q=id=>document.getElementById(id);
 if(!q('hermes-audio-live')) return;
 q('hermes-audio-status').textContent=data.status;
 q('hermes-audio-note').textContent=data.note||'—';
 q('hermes-audio-cents').textContent=data.cents==null?'—':(data.cents>0?'+':'')+data.cents.toFixed(1)+' cents';
 q('hermes-audio-score').textContent=data.score==null?'—':data.score.toFixed(0)+'%';
 q('hermes-audio-frames').textContent=data.voiced+' amostras sonoras';
}
function frame(){
 if(!running)return;
 const buf=new Float32Array(analyser.fftSize); analyser.getFloatTimeDomainData(buf);
 const p=pitch(buf,ctx.sampleRate); noteFrames++;
 if(p.hz){voicedFrames++; const m=hzToMidi(p.hz), nearest=Math.round(m), target=440*Math.pow(2,(nearest-69)/12), ce=cents(p.hz,target);
   centsErrors.push(Math.abs(ce)); rmsValues.push(p.rms); currentNote=midiToName(m);
   const score=Math.max(0,100-(centsErrors.slice(-80).reduce((a,b)=>a+b,0)/Math.max(1,centsErrors.slice(-80).length))*2.5);
   if(performance.now()-lastUpdate>90){lastUpdate=performance.now();updateUI({status:'A ouvir…',note:currentNote,cents:ce,score,voiced:voicedFrames});}
 } else if(performance.now()-lastUpdate>300){lastUpdate=performance.now();updateUI({status:'Aguardando som…',note:null,cents:null,score:null,voiced:voicedFrames});}
 raf=requestAnimationFrame(frame);
}
async function start(){
 if(running)return;
 if(!navigator.mediaDevices?.getUserMedia) throw new Error('O navegador não disponibiliza microfone seguro. Abra o HERMES por HTTPS local ou localhost.');
 stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});
 ctx=new (window.AudioContext||window.webkitAudioContext)(); await ctx.resume();
 const src=ctx.createMediaStreamSource(stream); analyser=ctx.createAnalyser(); analyser.fftSize=4096; analyser.smoothingTimeConstant=0;
 src.connect(analyser); running=true; samples=[];noteFrames=0;voicedFrames=0;centsErrors=[];rmsValues=[];
 updateUI({status:'A ouvir…',note:null,cents:null,score:null,voiced:0}); frame();
}
function stop(){
 running=false;if(raf)cancelAnimationFrame(raf);raf=null;
 if(stream)stream.getTracks().forEach(t=>t.stop());stream=null;
 if(ctx){ctx.close();ctx=null;}
 const abs=centsErrors.length?centsErrors.reduce((a,b)=>a+b,0)/centsErrors.length:null;
 const score=abs==null?null:Math.max(0,100-abs*2.5);
 const result={timestamp:new Date().toISOString(),voicedFrames,meanAbsCents:abs,score:score==null?null:+score.toFixed(1)};
 const hist=JSON.parse(localStorage.getItem(KEY)||'[]');hist.push(result);localStorage.setItem(KEY,JSON.stringify(hist.slice(-100)));
 updateUI({status:'Avaliação terminada',note:currentNote,cents:null,score,voiced:voicedFrames});
 window.dispatchEvent(new CustomEvent('hermes:audio-assessment',{detail:result}));
 return result;
}
function render(){
 if(document.getElementById('hermes-audio-panel'))return;
 const host=document.querySelector('#hermes-cvc-panel')||document.querySelector('#hermes-formation-panel');
 if(!host)return;
 const el=document.createElement('section');el.id='hermes-audio-panel';el.className='panel no-print';
 el.innerHTML='<div class="panel-header"><h2 class="panel-title">🎙️ HERMES — Avaliação pelo Violino</h2><span class="badge">LOCAL</span></div>'+
 '<p>O HERMES ouve a execução pelo microfone e mede afinação em tempo real. Nenhum áudio é enviado para a nuvem.</p>'+
 '<div class="hermes-audio-live" id="hermes-audio-live"><div><strong>Estado</strong><span id="hermes-audio-status">Pronto</span></div><div><strong>Nota</strong><span id="hermes-audio-note">—</span></div><div><strong>Desvio</strong><span id="hermes-audio-cents">—</span></div><div><strong>Afinação</strong><span id="hermes-audio-score">—</span></div><div><strong>Dados</strong><span id="hermes-audio-frames">0 amostras sonoras</span></div></div>'+
 '<div class="hermes-audio-actions"><button id="btn-hermes-mic-start" class="btn btn-primary btn-sm">🎙️ Começar avaliação</button><button id="btn-hermes-mic-stop" class="btn btn-secondary btn-sm" disabled>Parar e guardar</button></div>'+
 '<small>Primeira versão: afinação/estabilidade. Ritmo, ataques, arco e comparação com partitura serão acrescentados sobre este mesmo motor.</small>';
 host.parentNode.insertBefore(el,host.nextSibling);
 document.getElementById('btn-hermes-mic-start').onclick=async()=>{try{await start();document.getElementById('btn-hermes-mic-start').disabled=true;document.getElementById('btn-hermes-mic-stop').disabled=false;}catch(e){updateUI({status:'Erro: '+e.message,note:null,cents:null,score:null,voiced:0});}};
 document.getElementById('btn-hermes-mic-stop').onclick=()=>{stop();document.getElementById('btn-hermes-mic-start').disabled=false;document.getElementById('btn-hermes-mic-stop').disabled=true;};
}
window.HERMES_AUDIO={start,stop,history:()=>JSON.parse(localStorage.getItem(KEY)||'[]')};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();
