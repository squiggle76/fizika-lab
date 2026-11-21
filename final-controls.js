/* v4 — mandatory checkpoints, immutable first attempts, two independent recovery questions.
   No server security is claimed: all records are stored locally. */
'use strict';
const FINAL_KEY='fizikalab-v4-local';
const finalState=(()=>{try{return JSON.parse(localStorage.getItem(FINAL_KEY)||'{}')}catch{return {}}})();
finalState.practice ||= {};
finalState.recovery ||= {};
function finalSave(){try{localStorage.setItem(FINAL_KEY,JSON.stringify(finalState))}catch{}}
const RECOVERY={
 units:[
  {q:'Майстриня виконала роботу 360 Дж за 6 с. Яка потужність її пристрою?',kind:'num',a:60,unit:'Вт',why:'360 Дж / 6 с = 60 Дж/с = 60 Вт.'},
  {q:'Під час підйому на 2 м вантаж отримав 100 Дж енергії. Яка середня сила підйому діяла вздовж руху?',kind:'num',a:50,unit:'Н',why:'100 Дж / 2 м = 50 Н. Дж/м = Н.'}],
 lever:[
  {q:'Дверну ручку перемістили у 3 рази далі від петель. У скільки разів зросте момент тієї самої перпендикулярної сили?',kind:'num',a:3,unit:'рази',why:'Момент дорівнює силі, помноженій на плече. Плече утричі більше — момент утричі більший.'},
  {q:'Момент 36 Н·м створює перпендикулярна сила 12 Н. Яке плече?',kind:'num',a:3,unit:'м',why:'l=M/F=36/12=3 м. (Н·м)/Н=м.'}],
 ramp:[
  {q:'Ящик вагою 180 Н піднімають рівномірно без тертя на висоту 2 м по дошці довжиною 6 м. Яка сила тяги потрібна?',kind:'num',a:60,unit:'Н',why:'F·6=180·2, тому F=60 Н.'},
  {q:'На іншому пандусі сила тяги 45 Н, довжина 8 м. Яка робота сили тяги?',kind:'num',a:360,unit:'Дж',why:'A=45·8=360 Дж. Це ньютон-метри, тобто джоулі.'}],
 blocks:[
  {q:'Ідеальний рухомий блок підтримують дві вітки каната. Вантаж важить 140 Н. Знайди силу тяги.',kind:'num',a:70,unit:'Н',why:'140/2=70 Н на кожну із двох віток.'},
  {q:'Вантаж підняли рухомим блоком на 3 м. Скільки метрів каната витягнули?',kind:'num',a:6,unit:'м',why:'Для виграшу в силі вдвічі каната потрібно вдвічі більше: 6 м.'}],
 work:[
  {q:'Спочатку ящик не рухався, а потім його пересунули на 5 м сталою силою 8 Н вздовж руху. Яка сумарна робота цієї сили?',kind:'num',a:40,unit:'Дж',why:'На нерухомому етапі 0 Дж; під час руху 8·5=40 Дж.'},
  {q:'Двигун виконав 150 Дж роботи на відстані 3 м за сталої сили вздовж руху. Знайди силу.',kind:'num',a:50,unit:'Н',why:'F=150/3=50 Н; Дж/м=Н.'}],
 power:[
  {q:'Один підйомник виконує 1200 Дж роботи за 4 с. Яка його потужність?',kind:'num',a:300,unit:'Вт',why:'1200/4=300 Вт.'},
  {q:'Пристрій із постійною потужністю 50 Вт працював 12 с. Яку роботу він виконав?',kind:'num',a:600,unit:'Дж',why:'A=Pt=50·12=600 Дж.'}],
 efficiency:[
  {q:'Із 900 Дж затраченої енергії корисною стала 630 Дж. Визнач ККД у відсотках.',kind:'num',a:70,unit:'%',why:'630/900·100%=70%.'},
  {q:'Для пристрою ККД дорівнює 80%, а затрачено 500 Дж. Скільки джоулів корисної роботи він виконав?',kind:'num',a:400,unit:'Дж',why:'80% від 500 Дж = 400 Дж.'}],
 energy:[
  {q:'Камінь масою 3 кг підняли на 2 м. Яка потенціальна енергія відносно підлоги? g=10 Н/кг.',kind:'num',a:60,unit:'Дж',why:'Ep=3·10·2=60 Дж.'},
  {q:'М’яч має 90 Дж повної механічної енергії, із них 35 Дж — потенціальна. Яка кінетична?',kind:'num',a:55,unit:'Дж',why:'За відсутності втрат Ek=90−35=55 Дж.'}]
};
function finalRecoveryKey(kind,key){return `${kind}:${key}`;}
function showRecovery(host,kind,key,lesson){
 const id=finalRecoveryKey(kind,key),rec=finalState.recovery[id]||{},tasks=RECOVERY[lesson]||RECOVERY.units;
 const zone=document.createElement('div');zone.className='recovery-box';
 zone.innerHTML='<h4>Закріпи після пояснення</h4><p class="tiny">Це нові задачі. Першу помилку не видаляємо і бал не підвищуємо. На кожну — одна спроба.</p>';
 for(let i=0;i<2;i++){
   const task=tasks[i],saved=rec[i];const wrapper=document.createElement('div');wrapper.className='recovery-item';
   wrapper.innerHTML=`<b>Нова задача ${i+1} з 2</b><p>${escapeHTML(task.q)}</p><div class="deep-numeric"><input type="text" inputmode="decimal" placeholder="Число" aria-label="Відповідь на задачу ${i+1}" ${saved?'disabled':''}><span>${escapeHTML(task.unit)}</span></div><div class="recovery-action"></div>`;
   const input=wrapper.querySelector('input');if(saved)input.value=saved.answer;
   const action=wrapper.querySelector('.recovery-action');
   if(saved){const msg=document.createElement('p');msg.className='tiny';msg.textContent=(saved.ok?'✓ Правильно. ':'Помилка. ')+task.why;action.append(msg)}
   else if(i===0||rec[0]){
     action.append(button('Зафіксувати',()=>{
       if(!input.value.trim()){alert('Введи число або обери «Не знаю».');return;}
       const ok=deepValid(task,input.value);const entry={answer:input.value,ok,at:new Date().toISOString()};
       finalState.recovery[id] ||= {}; finalState.recovery[id][i]=entry;finalSave();
       showRecoveryInPlace(zone,kind,key,lesson);
     },'primary'));
     action.append(button('Не знаю',()=>{
       finalState.recovery[id] ||= {};finalState.recovery[id][i]={answer:'Не знаю',ok:false,at:new Date().toISOString()};finalSave();showRecoveryInPlace(zone,kind,key,lesson);
     },'secondary'));
   }else action.innerHTML='<p class="tiny">Спочатку заверши попередню задачу.</p>';
   zone.append(wrapper);
 }
 if(rec[0]&&rec[1]){
   const finish=document.createElement('p');finish.className='note';finish.textContent=rec[0].ok&&rec[1].ok?'Обидві нові задачі виконано правильно. Навичку потрібно перевірити пізніше без підказок.':'Корекційні задачі завершено. Потрібно повторити пояснення й пізніше пройти нову перевірку. Першу оцінку не змінено.';zone.append(finish);
 }
 host.append(zone);
}
function showRecoveryInPlace(old,kind,key,lesson){const tmp=document.createElement('div');showRecovery(tmp,kind,key,lesson);old.replaceWith(tmp.firstChild);if(kind==='micro')renderStudy();if(kind==='challenge')renderDeepChallenges();}
// Keep all mini-tasks inside an article; show only the first unanswered one.
function finalInjectMicro(){
 if(state.sub!=='read')return;
 const lesson=lessons.find(l=>l.id===state.lesson),items=DEEP.micro[lesson.id]||[];
 const article=$('study-content').querySelector('article');if(!article)return;
 const h3=[...article.querySelectorAll('h3')],start=article.querySelector('.btnrow');
 for(let i=0;i<items.length;i++){
   const anchor=h3[i]?.nextElementSibling || start;
   const key=`${lesson.id}:${i}`,done=deepStore.micro[key];
   const previousUnfinished=items.slice(0,i).some((_,j)=>{const k=`${lesson.id}:${j}`,v=deepStore.micro[k];return !v||(!v.ok&&!finalState.recovery[`micro:${k}`]?.[1]);});
   if(previousUnfinished)break;
   const block=makeDeepBlock(items[i],key,'micro');
   (anchor||article.lastElementChild).after(block);
   if(!done || (!done.ok&&!finalState.recovery[`micro:${key}`]?.[1])){
      let next=block.nextElementSibling;while(next){next.hidden=true;next=next.nextElementSibling;}
      const why=document.createElement('p');why.className='note';why.textContent='Обов’язкове завдання. Після відповіді відкриється наступна частина статті.';block.before(why);break;
   }
 }
 if(start){const allDone=items.every((_,i)=>{const k=`${lesson.id}:${i}`,a=deepStore.micro[k];return !!a&&(a.ok||!!finalState.recovery[`micro:${k}`]?.[1]);});start.hidden=!allDone;}
}
injectMicro=finalInjectMicro;
const baseMakeDeepBlock=makeDeepBlock;
makeDeepBlock=function(item,key,kind){
 const block=baseMakeDeepBlock(item,key,kind);
 const store=(kind==='micro'?deepStore.micro:deepStore.challenge),entry=store[key];
 if(!entry){
   const btn=block.querySelector('.deep-check');if(btn){const original=btn.onclick;btn.onclick=()=>{
      const val=getDeepAnswer(block,item);if(val===null||String(val).trim()===''){alert('Спочатку введи відповідь або натисни «Не знаю».');return;}
      original();
      if(kind==='micro')renderStudy();else renderDeepChallenges();
   };const idk=button('Не знаю',()=>{store[key]={answer:'Не знаю',ok:false,at:new Date().toISOString()};deepSave();if(kind==='micro')renderStudy();else renderDeepChallenges();},'secondary');btn.after(idk);}
 }else if(!entry.ok){showRecovery(block,kind,key,kind==='micro'?key.split(':')[0]:item.lesson);}
 return block;
};
// Mandatory per-topic practice: no skipping and no chance to overwrite first attempt.
renderPractice=function(){
 const list=getPractice(),el=$('study-content');el.replaceChildren();if(!list.length)return;
 const first=list.findIndex(p=>!finalState.practice[p.index]);const index=first<0?list.length-1:first;state.pIdx=index;
 const p=list[index],entry=finalState.practice[p.index];
 const card=document.createElement('div');card.className='qcard';
 card.innerHTML=`<p class="tiny">Обов’язкова задача ${index+1} / ${list.length}. Підтвердження лише один раз.</p><h3>${escapeHTML(p.q)}</h3>`;
 if(p.choices){p.choices.forEach((x,i)=>{const label=document.createElement('label');label.className='choice';const input=document.createElement('input');input.type='radio';input.name='finalpractice';input.value=i;if(entry){input.disabled=true;input.checked=String(entry.answer)===String(i)}label.append(input,document.createTextNode(x));card.append(label)})}
 else{const input=document.createElement('input');input.type='text';input.inputMode='decimal';input.placeholder='Введи число';if(entry){input.disabled=true;input.value=entry.answer;}card.append(input,document.createTextNode(' '+(p.unit||'')))}
 const actions=document.createElement('div');actions.className='btnrow';
 if(!entry){const submit=(v)=>{if(v===null||String(v).trim()===''){alert('Введи відповідь або обери «Не знаю».');return;}finalState.practice[p.index]={answer:v,ok:v==='Не знаю'?false:isCorrect(p,v),at:new Date().toISOString()};finalSave();renderPractice();};
 actions.append(button('Зафіксувати відповідь',()=>{const sel=p.choices?card.querySelector('input[type=radio]:checked'):card.querySelector('input[type=text]');submit(sel?sel.value:null)},'primary'));
 actions.append(button('Не знаю',()=>submit('Не знаю'),'secondary'));
 }else{
 const f=document.createElement('div');f.className='feedback'+(entry.ok?'':' bad');f.innerHTML=`<b>${entry.ok?'Правильно.':'Перша відповідь була неправильною.'}</b><p>${escapeHTML(p.why)}</p><p class="tiny">Перший результат збережено без виправлень.</p>`;card.append(f);
 if(!entry.ok)showRecovery(card,'practice',String(p.index),p.lesson);
 const recovered=entry.ok||!!(finalState.recovery[`practice:${p.index}`]?.[1]);
 if(index<list.length-1){const next=button('Наступна обов’язкова задача →',()=>{renderPractice()},'primary');next.disabled=!recovered;actions.append(next)}
 else actions.append(button('Переглянути результат',()=>view('results'),'primary'));
 }
 card.append(actions);el.append(card);
};
// Challenge assessment: show only first unanswered item, with no forward jump.
renderDeepChallenges=function(){
 const root=$('challenges-content');root.replaceChildren();
 const title=document.createElement('div');title.className='challenge-intro';title.innerHTML='<h2>Контроль мислення</h2><p>Прочитай умову до кінця. У кожної задачі лише одна перша спроба; після помилки — дві нові задачі, а первинний бал незмінний. Пропусків немає: можна відповісти «Не знаю».</p>';
 root.append(title);
 const ix=DEEP.challenges.findIndex((q,i)=>{const k=String(i),a=deepStore.challenge[k];return !a||(!a.ok&&!finalState.recovery[`challenge:${k}`]?.[1]);});
 const position=ix===-1?DEEP.challenges.length-1:ix,item=DEEP.challenges[position];
 const info=document.createElement('p');info.className='note';info.textContent=`Обов’язкова задача ${position+1} з ${DEEP.challenges.length} · ${item.skill}`;root.append(info);
 root.append(makeDeepBlock(item,String(position),'challenge'));
 if(ix===-1){const done=document.createElement('p');done.className='note';done.textContent='Усі задачі виконано. Перші відповіді збережено. Переглянь звіт для батьків.';root.append(done);}
 deepStats();
};
// Stop diagnostics from moving forward without answering every item.
const existingRenderDiagnostic=renderDiagnostic;
renderDiagnostic=function(){existingRenderDiagnostic();if(!state.diag||state.dReview)return;
 const d=state.diag,item=d.items[state.dIdx],root=$('diag-run'),card=root.querySelector('.qcard');if(!card)return;
 const controls=card.querySelector('.btnrow');const next=controls?.querySelector('button:last-child');if(!next)return;
 next.onclick=()=>{
   const saved=state.dAnswers[item.n];let candidate=saved!==undefined?saved:state.dSelected;
   const valid=item.type==='multi'?Array.isArray(candidate)&&candidate.length===item.fields.length&&candidate.every(x=>String(x??'').trim()!==''):candidate!==null&&candidate!==undefined&&String(candidate).trim()!=='';
   if(!valid){alert('Це обов’язкове завдання. Заповни відповідь або натисни «Не знаю».');return;}
   if(saved===undefined){state.dAnswers[item.n]=candidate;progress.diagDraft[d.id]={...state.dAnswers};save();}
   if(state.dIdx===d.items.length-1){state.dReview=true;renderDiagnostic();}else{state.dIdx++;state.dSelected=null;renderDiagnostic();}
 };
 const idk=button('Не знаю',()=>{
   if(state.dAnswers[item.n]!==undefined)return;
   state.dAnswers[item.n]='Не знаю';progress.diagDraft[d.id]={...state.dAnswers};save();
   if(state.dIdx===d.items.length-1){state.dReview=true;renderDiagnostic();}else{state.dIdx++;state.dSelected=null;renderDiagnostic();}
 },'secondary');if(state.dAnswers[item.n]===undefined)controls.insertBefore(idk,next);
};
// Replace original grading: "Не знаю" must not be incorrectly interpreted as zero for numeric answers.
const previousDiagCheck=diagAnswerCorrect;
diagAnswerCorrect=function(item,val){if(val==='Не знаю'||val===undefined||val===null)return false;return previousDiagCheck(item,val)};
// Embed a formula exploration in the existing units tab, including limitations.
const renderStudyFinalBase=renderStudy;
renderStudy=function(){renderStudyFinalBase();if(state.sub!=='units')return;
 const root=$('study-content').querySelector('.article');if(!root)return;
 const panel=document.createElement('section');panel.className='unit-tree';panel.innerHTML='<h3>Розкрий фізичні зв’язки</h3><p>Формула — це не заклинання. Натисни на величину й простеж, звідки взялися її одиниці.</p><div class="unit-links"><button type="button" data-tree="work">Робота: A = F·s</button><button type="button" data-tree="force">Сила: F = ma</button><button type="button" data-tree="power">Потужність: P = A/t</button><button type="button" data-tree="speed">Шлях: s = vt</button></div><div class="unit-explain note" aria-live="polite"></div>';
 root.insertBefore(panel,root.firstChild);
 const display=panel.querySelector('.unit-explain');const explain={
 work:'A = F·s. Одиниці: Дж = Н·м. Якщо треба знайти силу, F = A/s; Дж/м = Н. Силу беремо вздовж переміщення.',
 force:'За другим законом Ньютона рівнодійна сила F = ma. Один ньютон — це кг·м/с². Для роботи рівнодійної сталої сили вздовж переміщення A = mas. Але не вся прикладена сила обов’язково є рівнодійною.',
 power:'P = A/t. Один ват = один джоуль за секунду. Якщо A = Fs і сила стала вздовж руху, для рівномірного руху можна записати P = Fv.',
 speed:'За рівномірного руху s = vt. Одиниці: (м/с)·с = м. Отже, A = Fvt лише за відповідних умов руху й сили.'};
 const set=v=>{display.textContent=explain[v];panel.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.tree===v))};panel.querySelectorAll('button').forEach(b=>b.onclick=()=>set(b.dataset.tree));set('work');
};
// Preserve original test scoring but extend the parent report with correction outcomes.
const oldFinalReport=renderDeepResults;
renderDeepResults=function(){oldFinalReport();const root=$('deep-parent-report');if(!root)return;
 const head=document.createElement('h3');head.textContent='Окремо: результати корекції';root.append(head);
 const stats=Object.entries(finalState.recovery).map(([id,items])=>({id,done:!!items[0]&&!!items[1],both:!!items[0]?.ok&&!!items[1]?.ok}));
 const attempts=Object.values(finalState.practice);const p=document.createElement('p');p.textContent=`Навчальні задачі (перша спроба): ${attempts.filter(x=>x.ok).length} правильних із ${attempts.length} завершених. Корекційні пари: ${stats.filter(x=>x.done).length} завершено, ${stats.filter(x=>x.both).length} пар вирішено без помилок. Ці результати не змінюють першої оцінки.`;root.append(p);
 const exportBtn=button('Завантажити повний звіт (JSON)',()=>{const payload={exported:new Date().toISOString(),firstMicro:deepStore.micro,firstChallenge:deepStore.challenge,firstPractice:finalState.practice,recovery:finalState.recovery,diagnostics:progress.diagnostics,disclaimer:'Локальний режим: результати браузера можуть бути стерті або змінені; це не захищений серверний журнал.'};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='fizikalab-full-report.json';a.click();URL.revokeObjectURL(url)},'secondary');root.append(exportBtn);
};
// Rebind tab navigation: reading mandatory tasks is required before entering the lesson quiz.
document.querySelectorAll('.subtab').forEach(btn=>btn.onclick=()=>{
 if(btn.dataset.sub==='quiz'){
  const tasks=DEEP.micro[state.lesson]||[];
  const missing=tasks.some((_,i)=>{const k=`${state.lesson}:${i}`,a=deepStore.micro[k];return !a||(!a.ok&&!finalState.recovery[`micro:${k}`]?.[1]);});
  if(missing){state.sub='read';renderLesson();alert('Спочатку виконай обов’язкові короткі задачі всередині статті.');return;}
 }
 state.sub=btn.dataset.sub;state.pIdx=0;state.pSelected=null;state.pChecked=false;renderLesson();
});
// Keep the first task visible on startup with mandatory gating.
renderLesson();

// The progress bar and overview now reflect one-time practice submissions rather than retryable legacy flags.
updateOverall=function(){const n=Object.values(finalState.practice).filter(x=>x.ok).length;$('overall-progress').textContent=n+' / '+practice.length;$('overall-bar').style.width=(100*n/practice.length)+'%';};
// Clearing local data is possible, but prominently confirmed (not a server-backed parent lock).
$('reset-data').onclick=()=>{if(!confirm('Видалити ВСІ локальні результати, включно з першими відповідями та діагностикою? Цю дію не можна скасувати.'))return;[memoryKey,DEEP_KEY,FINAL_KEY].forEach(k=>localStorage.removeItem(k));location.reload();};
updateOverall();
