"use strict";
// Subject branches are separate teaching areas, not Git branches.
// The geometry course remains empty until the real source problems are provided.
(() => {
 const physics=document.getElementById('physics-root');
 const geometry=document.getElementById('geometry-root');
 const a=document.getElementById('subject-physics');
 const b=document.getElementById('subject-geometry');
 const choose=which=>{
   const isPhysics=which==='physics';
   physics.hidden=!isPhysics; geometry.hidden=isPhysics;
   a.classList.toggle('active',isPhysics);b.classList.toggle('active',!isPhysics);
   a.setAttribute('aria-pressed',String(isPhysics));b.setAttribute('aria-pressed',String(!isPhysics));
   document.title=(isPhysics?'Фізика':'Геометрія')+' — Лабораторія знань';
   try {sessionStorage.setItem('fizikalab-active-subject',which)} catch {}
 };
 a.addEventListener('click',()=>choose('physics'));
 b.addEventListener('click',()=>choose('geometry'));
 let initial='physics';try{initial=sessionStorage.getItem('fizikalab-active-subject')||'physics'}catch{}
 choose(initial==='geometry'?'geometry':'physics');
})();
