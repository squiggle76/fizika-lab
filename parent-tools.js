"use strict";
(()=>{
 const b=document.getElementById('reset-all');if(!b)return;
 b.addEventListener('click',()=>{
   const yes=confirm('Очистити ВСІ локальні результати фізики й геометрії на цьому пристрої? Результати перших спроб також зникнуть.');
   if(!yes)return;
   const check=prompt('Для підтвердження введіть СКИНУТИ (великими літерами):');
   if(check!=='СКИНУТИ')return;
   try{
     const keys=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k && (k.startsWith('fizika-lab')||k.startsWith('fizikalab')))keys.push(k);}
     keys.forEach(k=>localStorage.removeItem(k));
     sessionStorage.removeItem('fizikalab-active-subject');
     location.reload();
   }catch(err){alert('Не вдалося очистити дані: '+String(err));}
 });
})();
