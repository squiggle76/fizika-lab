"use strict";
/* Euler nine-point circle: gated reasoning course. No dependencies / network. */
(() => {
const host=document.getElementById('euler-app'); if(!host)return;
const KEY='fizikalab-euler-course-20261121-v1'; // Keep same key so existing attempts are preserved.
const stages=[
{title:'Середина відрізка',story:'Якщо M — середина AB, то AM = MB. Це допоможе знайти точки кола Ейлера.',note:'Якщо M — середина AB, то AM = MB = AB : 2.',q:'У трикутнику сторона BC = 26 см, а точка M — її середина. Знайди відстань від B до M.',type:'num',correct:13,unit:'см',ex:'BM = BC : 2 = 26 : 2 = 13 см.',skill:'обчислення за серединою'},
{title:'Медіана: від вершини до середини',story:'Медіана веде від вершини до середини протилежної сторони. Не вчи визначення напам’ять — знайди довжину.',note:'AM — медіана, якщо M лежить на BC і BM = MC.',q:'У трикутнику ABC відомо, що AM — медіана, а BM = 7 см. Яка довжина BC?',type:'num',choices:['Відрізок від вершини до середини протилежної сторони','Відрізок від вершини під кутом 90° до сторони','Будь-який відрізок усередині трикутника','Промінь, що ділить кут навпіл','Відрізок між двома вершинами'],correct:14,ex:'Медіана йде до середини протилежної сторони: BM = MC = 7 см, тому BC = 14 см.',skill:'властивість медіани'},
{title:'Висота і прямий кут',story:'Висота перпендикулярна до прямої протилежної сторони. Отже, вона утворює кут 90°.',note:'Перпендикуляр означає 90°. Це дає нові прямокутні трикутники.',q:'У трикутнику ABC проведено висоту AD. Відомо, що кут BAD = 34°. Знайди кут ABD, якщо D лежить на стороні BC.',type:'num',correct:56,unit:'°',ex:'У трикутнику ABD кут ADB = 90°, тому кут ABD = 180° − 90° − 34° = 56°.',skill:'висота та кути'},
{title:'Паралельні прямі',story:'Якщо дві прямі паралельні, то пряма, перпендикулярна одній, перпендикулярна й другій.',note:'a ∥ b, c ⟂ a ⇒ c ⟂ b.',q:'Дві прямі a і b паралельні. Пряма c перпендикулярна до a. Який кут утворюють c і b?',type:'num',correct:90,unit:'°',ex:'Перпендикуляр до однієї з двох паралельних прямих перпендикулярний і до іншої.',skill:'паралельність і перпендикулярність'},
{title:'Прямокутний трикутник і гіпотенуза',story:'Середина гіпотенузи прямокутного трикутника однаково віддалена від трьох вершин. Відстань дорівнює половині гіпотенузи.',note:'Радіус описаного кола прямокутного трикутника дорівнює половині гіпотенузи.',q:'Прямокутний трикутник має гіпотенузу 18 см. Скільки сантиметрів від її середини до вершини прямого кута?',type:'num',correct:9,unit:'см',ex:'Середина гіпотенузи є центром описаного кола: радіус 18 : 2 = 9 см.',skill:'середина гіпотенузи'},
{title:'Теорема Фалеса: прямий кут бачить діаметр',story:'Теорема Фалеса: кут, який спирається на діаметр кола, дорівнює 90°. Зворотне твердження також правильне. Саме так ми доводитимемо, що нові точки лежать на одному колі.',note:'Якщо ∠ACB = 90°, то C лежить на колі з діаметром AB.',q:'У трикутнику ABC кут ACB прямий. Яка сторона є діаметром описаного навколо нього кола?',type:'choice',choices:['AB','AC','BC','AD','Неможливо визначити'],correct:0,ex:'Діаметр лежить навпроти прямого кута C, тобто це AB.',skill:'коло з діаметром'},
{title:'Середня лінія трикутника',story:'Познач середини M і N двох сторін трикутника та з’єднай їх. Отримаєш середню лінію (відрізок між серединами двох сторін). Вона паралельна третій стороні й удвічі коротша за неї. Це не просто зручний спосіб знаходити довжини: він дозволяє будувати паралельні відрізки, а отже — прямокутники та прямі кути.',note:'«Дві середини» → «паралельно третій стороні» і «половина її довжини».',q:'Середня лінія трикутника паралельна стороні завдовжки 14 см. Яка її довжина?',type:'num',correct:7,unit:'см',ex:'Середня лінія дорівнює половині паралельної їй сторони: 14 : 2 = 7 см.',skill:'середня лінія'},
{title:'Ортоцентр: місце зустрічі висот',story:'У кожному трикутнику всі три висоти (або їхні продовження) проходять через одну точку H. Її називають ортоцентром. В гострокутному трикутнику H лежить всередині; у прямокутному збігається з вершиною прямого кута; у тупокутному лежить за межами трикутника. Перемкни три форми ліворуч і знайди H. Наша окружність потім теж перебудується.',note:'Не треба шукати H на око: точку задає перетин висот.',q:'Де розташований ортоцентр прямокутного трикутника?',type:'choice',choices:['У вершині прямого кута','У середині гіпотенузи','У середині найдовшого катета','Завжди поза трикутником','Завжди в центрі вписаного кола'],correct:0,ex:'Катети прямокутного трикутника вже є двома висотами, вони перетинаються у вершині прямого кута.',skill:'ортоцентр'},
{title:'Шість точок: перший крок до кола Ейлера',story:'У трикутнику ABC позначимо три середини сторін Mₐ, Mᵦ, M𝒸. Тепер знайдемо ортоцентр H і середини відрізків AH, BH, CH — назвемо їх Pₐ, Pᵦ, P𝒸. Маємо шість точок. У присланому доведенні застосовують середні лінії, щоб отримати прямокутник із цих точок. Його діагоналі рівні, перетинаються навпіл, і всі його вершини однаково віддалені від центра. Ця ідея приводить нас до одного кола.',note:'Для доказу важливо не «усі точки виглядають круглими», а «ми знайшли спільний центр і однакові відстані».',q:'Позначено середини всіх трьох сторін і всіх трьох відрізків AH, BH, CH. Скільки середніх точок маємо, якщо жодні не збігаються?',type:'num',correct:6,unit:'точок',ex:'Три середини сторін + три середини відрізків AH, BH, CH = 6 точок.',skill:'шість середин'},
{title:'Прямокутник і коло',story:'Чотирикутник із чотирма прямими кутами — прямокутник. Його діагоналі (відрізки між протилежними вершинами) рівні та перетинаються навпіл. Точка перетину — центр кола, що проходить через усі чотири вершини. Для нашого доказу треба вміти впізнати прямокутник, навіть якщо він нахилений на рисунку.',note:'Повернутий прямокутник залишається прямокутником.',q:'Діагональ прямокутника — 18 см. Який радіус кола, що проходить через його чотири вершини?',type:'num',correct:9,unit:'см',ex:'Центр кола — середина діагоналі, а радіус — половина діагоналі: 18 : 2 = 9 см.',skill:'прямокутник і коло'},
{title:'Діаметр об’єднує шість середин',story:'У позначеннях вашого першого доведення виберемо B₁ — середину AC і B₀ — середину BH. Через середні лінії можна довести, що для інших чотирьох середин кут, який спирається на відрізок B₁B₀, дорівнює 90°. Тоді за теоремою Фалеса всі шість середин лежать на колі з діаметром B₁B₀. Це ще не вся теорема, але вже велика частина доказу.',note:'Мета — показати прямі кути; коло з діаметром після цього виникає логічно.',q:'Який кут повинна утворювати точка X з кінцями B₁ і B₀, щоб X лежала на колі з діаметром B₁B₀ (X не є кінцем діаметра)?',type:'num',correct:90,unit:'°',ex:'За теоремою Фалеса потрібний кут B₁XB₀ = 90°.',skill:'коло через шість точок'},
{title:'Основа висоти — сьома точка',story:'Тепер розглянемо основу висоти C₂, опущеної з вершини C на пряму AB. Потрібно довести, що кут B₁C₂B₀ прямий. У підручниковому доведенні це роблять через два прямокутні трикутники, середини гіпотенуз і суми кутів. Коли отримаємо 90°, теорема Фалеса покаже, що C₂ лежить на вже побудованому колі. Точно так само розглядають інші дві основи висот.',note:'Тут важливий не рисунок, а зв’язок «висота → прямий кут → точка на колі».',q:'Якщо ∠B₁C₂B₀ = 90°, який висновок можна зробити за теоремою Фалеса?',type:'choice',choices:['C₂ лежить на колі з діаметром B₁B₀','C₂ є серединою AB','B₁B₀ перпендикулярний AB','Трикутник ABC рівносторонній','H завжди лежить на колі'],correct:0,ex:'Прямий кут із вершиною C₂ і кінцями B₁ та B₀ означає, що C₂ лежить на колі з діаметром B₁B₀.',skill:'основа висоти на колі'},
{title:'Усі дев’ять точок',story:'Ми знайшли шість середин і додали три основи висот. За однаковим міркуванням з теоремою Фалеса усі ці точки належать одному колу — колу Ейлера. Це теорема для довільного невиродженого трикутника. У прямокутному трикутнику деякі з дев’яти названих точок збігаються, тому окремих видимих точок може бути менше.',note:'Доказ складається з двох частин: шість середин, потім три основи висот.',q:'Скільки точок перелічено в теоремі про коло Ейлера з урахуванням повторів у спеціальних трикутниках?',type:'num',correct:9,unit:'позначень',ex:'3 середини сторін + 3 середини відрізків до H + 3 основи висот = 9 позначених точок.',skill:'теорема дев’яти точок'},
{title:'Радіус: чому він удвічі менший?',story:'Коло Ейлера — образ описаного кола трикутника при гомотетії (це масштабне перетворення) з центром H і коефіцієнтом 1/2. Воно переводить вершини A, B, C у середини відрізків HA, HB, HC. Кожна відстань зменшується вдвічі; радіус нового кола також удвічі менший. Якщо поняття гомотетії ще незнайоме, достатньо уявити копію рисунка в масштабі 1:2 від точки H.',note:'Це додатковий наслідок; основне доведення кола може спиратися лише на середні лінії й прямі кути.',q:'Радіус описаного кола трикутника R = 20 см. Який радіус кола Ейлера?',type:'num',correct:10,unit:'см',ex:'r = R : 2 = 20 : 2 = 10 см.',skill:'радіус кола Ейлера'},
{title:'Особливий випадок: прямокутний трикутник',story:'Тепер обери зліва «Прямокутний». Ортоцентр H збігається з вершиною прямого кута. Дві основи висот також потрапляють у цю вершину; дві середини відрізків до H збігаються із серединами катетів. Отже, позначень залишається дев’ять, але різних геометричних точок — лише п’ять. Це корисна перевірка: теорема не зникає, просто деякі точки збігаються.',note:'У прямокутному трикутнику «дев’ять точок» не означає дев’ять різних місць.',q:'Скільки різних точок із дев’яти точок кола Ейлера має звичайний прямокутний трикутник?',type:'num',correct:5,unit:'точок',ex:'Різні точки: вершина прямого кута, середини двох катетів, середина гіпотенузи й основа висоти на гіпотенузу — разом 5.',skill:'прямокутний випадок'},
{title:'Побудуй власне доведення',story:'Тепер головне: не повторювати чужі речення напам’ять, а відтворити причинний ланцюг. Спочатку потрібно довести, що шість середин лежать на одному колі. Потім — що кожна основа висоти належить цьому самому колу. І нарешті — сформулювати наслідок про радіус. Нижче запиши власними словами, що саме доводиться на кожному кроці і чому. Повне доведення перевірить дорослий.',note:'Чесне «поки не можу пояснити» краще за переписаний текст: тоді відомо, що ще потренувати.',q:'Напиши 3–5 речень: чому шість середин лежать на одному колі, як додаємо основи висот і що означає r = R/2.',type:'proof',correct:null,ex:'Орієнтир для дорослого: середні лінії створюють прямі кути для шести середин; теорема Фалеса задає коло з діаметром B₁B₀; такий самий прямий кут доводять для основ висот; r = R/2 через масштаб 1:2.',skill:'самостійне доведення'}
];
const recoveryExamples=[
{q:'Відрізок має довжину 12 см. Скільки сантиметрів від початку до його середини?',a:'6',x:'12 : 2 = 6 см.'},{q:'Відрізок має довжину 24 см. Яка довжина кожної половини?',a:'12',x:'24 : 2 = 12 см.'},
{q:'У трикутнику AM — медіана, BC = 22 см. Скільки сантиметрів становить BM?',a:'11',x:'Медіана веде до середини: BM = 22 : 2 = 11 см.'},{q:'У трикутнику AM — медіана, BM = 9 см. Скільки сантиметрів становить BC?',a:'18',x:'BM = MC, тому BC = 2 · 9 = 18 см.'},
{q:'У трикутнику ADB кут D = 90°, кут A = 38°. Обчисли кут B.',a:'52',x:'У трикутнику 180°: 180 − 90 − 38 = 52°.'},{q:'Висота AD ділить кут при вершині A на 25° та 40°. Яка величина всього кута A?',a:'65',x:'Дві частини кута додаються: 25° + 40° = 65°.'},
{q:'Дві прямі паралельні. До однієї проведено перпендикуляр. Який кут він утворює з другою?',a:'90',x:'Перпендикуляр до однієї з паралельних прямих перпендикулярний і до другої.'},{q:'Скільки градусів утворює вертикальна лінія з горизонтальною?',a:'90',x:'Горизонталь і вертикаль перпендикулярні.'},
{q:'Гіпотенуза прямокутного трикутника — 10 см. Яка відстань від її середини до вершини прямого кута?',a:'5',x:'Це половина гіпотенузи: 10 : 2 = 5 см.'},{q:'Гіпотенуза — 18 см. Який радіус описаного кола?',a:'9',x:'18 : 2 = 9 см.'},
{q:'Точка лежить на колі з діаметром AB. Скільки градусів у куті ACB, якщо C не є A або B?',a:'90',x:'Вписаний кут, який спирається на діаметр, прямий.'},{q:'У куті ACB 90°. Який відрізок є гіпотенузою? Введи дві букви.',a:'ab',x:'Навпроти вершини C лежить AB.'},
{q:'Третя сторона трикутника 20 см. Яка довжина паралельної до неї середньої лінії?',a:'10',x:'20 : 2 = 10 см.'},{q:'Середня лінія — 6 см. Яка довжина третьої сторони?',a:'12',x:'6 · 2 = 12 см.'},
{q:'Де ортоцентр гострокутного трикутника? Одне слово: всередині чи зовні?',a:'всередині',x:'У гострокутному трикутнику H всередині.'},{q:'У якому місці ортоцентр прямокутного трикутника? Введи «вершина».',a:'вершина',x:'Вершина прямого кута — перетин двох висот.'},
{q:'Скільки середин мають три сторони трикутника разом?',a:'3',x:'На кожній стороні одна середина.'},{q:'Скільки середин мають відрізки AH, BH, CH разом?',a:'3',x:'Три відрізки — три середини.'},
{q:'Діагональ прямокутника 16 см. Радіус описаного кола?',a:'8',x:'16 : 2 = 8 см.'},{q:'Якщо радіус описаного кола прямокутника 6 см, яка його діагональ?',a:'12',x:'Діагональ дорівнює двом радіусам: 12 см.'},
{q:'Для кола з діаметром UV кут UXV має бути скільки градусів?',a:'90',x:'Вписаний кут на діаметр — прямий.'},{q:'Коло має діаметр B₁B₀. Який кут у точці X треба довести? Уведи число градусів.',a:'90',x:'Необхідно довести прямий кут B₁XB₀.'},
{q:'Основа висоти D на прямій BC. Який кут між AD і BC?',a:'90',x:'Висота AD перпендикулярна BC.'},{q:'Кут B₁DB₀ дорівнює 90°. На колі з яким діаметром лежить D? Уведи «B1B0».',a:'b1b0',x:'Точка D лежить на колі з діаметром B₁B₀.'},
{q:'Скільки основ висот є в трикутнику?',a:'3',x:'З кожної з трьох вершин можна опустити висоту.'},{q:'Три середини сторін плюс три основи висот — скільки позначень?',a:'6',x:'3 + 3 = 6.'},
{q:'Якщо R = 14 см, то r = R/2 дорівнює скільком сантиметрам?',a:'7',x:'14 : 2 = 7 см.'},{q:'Якщо r = 8 см, то R дорівнює скільком сантиметрам?',a:'16',x:'8 · 2 = 16 см.'},
{q:'У прямокутному трикутнику H збігається з вершиною якого кута? Уведи «прямого».',a:'прямого',x:'Ортоцентр знаходиться у вершині прямого кута.'},{q:'Якщо дві точки мають однакове положення, це дві різні точки чи одна? Уведи «одна».',a:'одна',x:'Різні назви можуть позначати одну геометричну точку.'}
];
const K=stages.length;
let state={at:0,records:{},geom:'acute',layer:'all'};
try{const old=JSON.parse(localStorage.getItem(KEY)||'null');if(old&&typeof old==='object')state={...state,...old};}catch{}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));}catch{}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const answerNorm=x=>String(x??'').trim().toLowerCase().replace(/[\s.,°]+/g,'').replaceAll('₁','1').replaceAll('₀','0').replaceAll('ё','е');
const pickAns=(q,v)=>q.type==='num'?Number(String(v).replace(',','.'))===q.correct:q.type==='choice'?Number(v)===q.correct:false;
const p=(x,y)=>({x,y}); const half=(a,b)=>p((a.x+b.x)/2,(a.y+b.y)/2);
const foot=(P,A,B)=>{let dx=B.x-A.x,dy=B.y-A.y,t=((P.x-A.x)*dx+(P.y-A.y)*dy)/(dx*dx+dy*dy);return p(A.x+t*dx,A.y+t*dy)};
const solve2=(a,b,c,d,e,f)=>{let det=a*d-b*c;return p((e*d-b*f)/det,(a*f-e*c)/det)};
const shapes={acute:[p(70,350),p(260,75),p(530,350)],right:[p(95,350),p(95,70),p(540,350)],obtuse:[p(70,350),p(160,275),p(535,350)]};
function diagram(){
 const [A,B,C]=shapes[state.geom];
 const U=p(C.x-B.x,C.y-B.y),V=p(C.x-A.x,C.y-A.y);
 const H=solve2(U.x,U.y,V.x,V.y,U.x*A.x+U.y*A.y,V.x*B.x+V.y*B.y);
 const E=p(B.x-A.x,B.y-A.y),G=p(C.x-A.x,C.y-A.y);
 const O=solve2(E.x,E.y,G.x,G.y,(B.x*B.x+B.y*B.y-A.x*A.x-A.y*A.y)/2,(C.x*C.x+C.y*C.y-A.x*A.x-A.y*A.y)/2);
 const N=half(O,H),R=Math.hypot(O.x-A.x,O.y-A.y)/2;
 const pts=[['Mₐ',half(B,C),'#00965c'],['Mᵦ',half(A,C),'#00965c'],['M𝒸',half(A,B),'#00965c'],['Pₐ',half(A,H),'#9958b0'],['Pᵦ',half(B,H),'#9958b0'],['P𝒸',half(C,H),'#9958b0'],['Dₐ',foot(A,B,C),'#d58a21'],['Dᵦ',foot(B,A,C),'#d58a21'],['D𝒸',foot(C,A,B),'#d58a21']];
 const isShow=i=>state.layer==='all'||(state.layer==='sides'&&i<3)||(state.layer==='halves'&&i>=3&&i<6)||(state.layer==='feet'&&i>=6);
 const bounds=[...shapes[state.geom],H,p(N.x-R,N.y-R),p(N.x+R,N.y+R)];const xmin=Math.min(...bounds.map(x=>x.x))-45,xmax=Math.max(...bounds.map(x=>x.x))+45,ymin=Math.min(...bounds.map(x=>x.y))-45,ymax=Math.max(...bounds.map(x=>x.y))+45;
 const scale=Math.min(530/(xmax-xmin),340/(ymax-ymin));const tx=30-xmin*scale+(530-(xmax-xmin)*scale)/2,ty=35-ymin*scale+(340-(ymax-ymin)*scale)/2;
 const X=t=>t.x.toFixed(2),Y=t=>t.y.toFixed(2);
 const line=(a,b,col='#74889a',dash='')=>`<line x1="${X(a)}" y1="${Y(a)}" x2="${X(b)}" y2="${Y(b)}" stroke="${col}" stroke-width="1.7" ${dash?'stroke-dasharray="5 5"':''}/>`;
 const dot=(q,text,col,r=5)=>`<circle cx="${X(q)}" cy="${Y(q)}" r="${r}" fill="${col}" stroke="#fff" stroke-width="1.3"/><text x="${(q.x+7).toFixed(2)}" y="${(q.y-8).toFixed(2)}" font-size="13" font-weight="600" fill="${col}">${text}</text>`;
 const [dA,dB,dC]=pts.slice(6).map(x=>x[1]);
 let svg=`<svg class="euler-svg" viewBox="0 0 600 420" role="img" aria-label="Трикутник ABC з висотами, ортоцентром H та колом дев’яти точок"><g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(4)})">`;
 svg+=`<circle cx="${X(N)}" cy="${Y(N)}" r="${R.toFixed(2)}" fill="none" stroke="#e34a58" stroke-width="2.3"/>`;
 svg+=line(A,B,'#263c4c')+line(B,C,'#263c4c')+line(C,A,'#263c4c');
 svg+=line(A,dA,'#94a1ba','yes')+line(B,dB,'#94a1ba','yes')+line(C,dC,'#94a1ba','yes');
 svg+=pts.filter((_,i)=>isShow(i)).map(item=>dot(item[1],item[0],item[2],4.8)).join('');
 svg+=dot(A,'A','#2032a0',5)+dot(B,'B','#2032a0',5)+dot(C,'C','#2032a0',5)+dot(H,'H','#a43150',5.5)+dot(N,'N','#006b95',4);
 svg+=`</g></svg>`;
 return svg;
}
function control(stage){const r=state.records[state.at]||{}; const answered=r.given!==undefined;const recovered=answered&&(!r.ok)&&stage.type!=='proof'&&!r.mastered&&!r.defer;
 let html=`<div class="euler-question"><h3>Обов'язковий крок · ${esc(stage.q)}</h3>`;
 if(stage.type==='choice')html+=`<div class="euler-answers">${stage.choices.map((t,i)=>`<label><input type="radio" name="euler-answer" value="${i}" ${answered?'disabled':''}><span>${esc(t)}</span></label>`).join('')}</div>`;
 else if(stage.type==='num')html+=`<label class="euler-small" for="euler-value">Уведи результат без варіантів — ${esc(stage.unit)}</label><input class="euler-textinput" id="euler-value" type="number" step="any" inputmode="decimal" ${answered?'disabled':''} placeholder="Число або «Не знаю» нижче"/>`;
 else html+=`<label class="euler-small" for="euler-proof">Напиши власні міркування (не переписуй текст уроку)</label><textarea class="euler-final-text" id="euler-proof" ${answered?'disabled':''} placeholder="Спочатку ..., тому що ..."></textarea><p class="euler-small">Текст буде збережено для перевірки дорослим; автоматична система не видає оцінку доказу.</p>`;
 if(!answered)html+=`<div class="euler-submit"><button class="primary" id="euler-submit">Підтвердити назавжди</button> <button type="button" class="secondary" id="euler-unknown">Не знаю (0 балів)</button></div><p class="euler-small">Немає пропуску. Відповідь фіксується з першої спроби.</p>`;
 if(answered){html+=`<div class="euler-feedback ${r.ok?'':'bad'}"><b>${stage.type==='proof'?'Доказ записаний. Потрібна перевірка дорослого.':r.ok?'Перший результат: правильно':'Перший результат: помилка або «Не знаю»'}</b><p>Твоя відповідь: ${esc(r.given)}</p><p>${esc(stage.ex)}</p><p class="euler-small">Перший результат залишиться в історії.</p></div>`;
 if(recovered&&stage.type!=='proof')html+=recoveryUI(r);
 if(r.defer&&!r.mastered)html+=`<div class="euler-softgate"><p>Цю навичку поки не підтверджено. Можна повернутися до нових вправ у будь-який час.</p><button class="secondary" id="euler-reopen">Повернутися до повторення</button></div>`;
 if(r.ok||r.mastered||r.defer||stage.type==='proof')html+=`<button class="primary euler-block" id="euler-next">${state.at===K-1?'Завершити маршрут':'До наступного обов’язкового кроку →'}</button>`;
 }
 return html+'</div>';
}
// Small, verified deterministic variants. No online AI generation or answer leakage.
// Numerical families have 24 or more parameter combinations, without blind guessing.
function extraBank(i){
 const result=[];
 const halfProblem=(n,label='відрізка')=>({q:`Довжина ${label} ${n} см. Знайди половину довжини (число в см).`,a:String(n/2),x:`Половина від ${n} см — ${n/2} см.`});
 for(let j=1;j<=24;j++){
  const n=2*(j+3),m=j+2;
  if([0,1,2,4,6,9,13].includes(i)){
   if(i===1)result.push({q:`Медіана AM проведена до BC = ${n} см. Знайди BM.`,a:String(n/2),x:`BM = MC = ${n}/2 = ${n/2} см.`});
   if(i===2)result.push({q:`Висота AD утворює кут 90° з BC. У трикутнику ABD кут A = ${20+j}°. Знайди кут B.`,a:String(70-j),x:`Кут B = 180° − 90° − ${20+j}° = ${70-j}°.`});
   if(i===0)result.push(halfProblem(n,'відрізка AB'));
   if(i===4)result.push({q:`Гіпотенуза прямокутного трикутника — ${n} см. Яка відстань від її середини до вершини прямого кута?`,a:String(n/2),x:`Середина гіпотенузи однаково віддалена від трьох вершин: ${n}/2 = ${n/2} см.`});
   if(i===6)result.push({q:j%2?`Сторона трикутника має ${n} см. Знайди довжину паралельної їй середньої лінії.`:`Середня лінія дорівнює ${m} см. Яка довжина паралельної їй сторони?`,a:String(j%2?n/2:2*m),x:j%2?'Середня лінія удвічі коротша за третю сторону.':'Третя сторона удвічі довша за середню лінію.'});
   if(i===9)result.push({q:j%2?`Діагональ прямокутника дорівнює ${n} см. Який радіус кола через його вершини?`:`Радіус описаного кола прямокутника дорівнює ${m} см. Чому дорівнює діагональ?`,a:String(j%2?n/2:2*m),x:'Діагональ прямокутника є діаметром описаного кола.'});
   if(i===13)result.push({q:j%2?`Радіус описаного кола трикутника — ${n} см. Який радіус кола Ейлера?`:`Радіус кола Ейлера дорівнює ${m} см. Знайди радіус описаного кола.`,a:String(j%2?n/2:2*m),x:'Радіус кола Ейлера вдвічі менший від радіуса описаного кола.'});
  }
 }
 return result;
}
function correctiveItem(index, attempt){
 const pool=recoveryExamples.slice(index*2,index*2+2).concat(extraBank(index));
 // Stable, varied ordering; do not repeat the previous failed problem until pool is exhausted.
 return pool[attempt%pool.length];
}
function recoveryUI(r){
 const past=r.corrections||[];
 const streak=(()=>{let n=0;for(let k=past.length-1;k>=0&&past[k].ok;k--)n++;return n;})();
 const item=correctiveItem(state.at,past.length);
 return `<div class="euler-recovery"><h4>Повертаємо розуміння · ${streak}/2 правильні поспіль</h4>
 <p>Твій перший результат уже збережений. Спробуй <b>нове</b> завдання: воно не виправляє попередню оцінку.</p>
 <p class="euler-prompt">${esc(item.q)}</p>
 <label for="euler-corrective" class="euler-small">Самостійна відповідь (без варіантів)</label>
 <input class="euler-textinput" type="text" id="euler-corrective" autocomplete="off" placeholder="Відповідь (число або короткий запис)"/>
 <button class="primary euler-block" id="euler-check-corrective">Перевірити відповідь</button>
 ${past.length?`<div class="euler-feedback ${past[past.length-1].ok?'':'bad'}"><b>Попередня корекційна спроба: ${past[past.length-1].ok?'правильно':'помилка'}</b><p>${esc(past[past.length-1].explain||'')}</p></div>`:''}
 ${past.length>=3?`<div class="euler-softgate"><p><b>Потрібна пауза?</b> Можна перейти до наступної частини з позначкою «Прогалина». Поточна тема не вважається засвоєною; вона лишиться у звіті й повернеться на повторення.</p><button id="euler-defer" class="secondary">Продовжити з прогалиною</button></div>`:''}
 <p class="euler-small">Нові варіанти підбираються із перевіреного банку. Початковий результат не змінюється.</p></div>`;
}
function report(){
 const rec=state.records||{}; const tested=stages.map((x,i)=>({stage:x,record:rec[i],i})).filter(x=>x.record&&x.stage.type!=='proof');
 const first=tested.filter(x=>x.record.ok).length;
 const corrected=tested.filter(x=>x.record.mastered).length;
 const gaps=tested.filter(x=>!x.record.ok&&!x.record.mastered);
 const writing=stages.map((s,i)=>({s,i,r:rec[i]})).filter(x=>x.r&&x.s.type==='proof');
 return `<div class="euler-report"><h3>Звіт для дорослого</h3>
 <div class="euler-reportgrid"><div><b>${first}/${tested.length}</b><small>Перша спроба (автоматичні)</small></div><div><b>${corrected}</b><small>Після додаткової практики</small></div><div><b>${gaps.length}</b><small>Незакриті прогалини</small></div></div>
 ${gaps.length?`<p><b>Потрібно повторити:</b> ${gaps.map(x=>esc(x.stage.skill)).join(', ')}.</p>`:'<p>Незакритих прогалин серед перевірених кроків немає.</p>'}
 ${writing.length?'<p>Письмовий доказ записано. <b>Потрібна перевірка дорослого</b>; система не оцінює правильність вільного доказу автоматично.</p>':''}
 <details><summary>Історія відповідей та письмовий доказ</summary>${stages.map((s,i)=>rec[i]?`<p><b>${i+1}. ${esc(s.title)}</b> — ${esc(rec[i].given)}; ${s.type==='proof'?'очікує перевірки':rec[i].ok?'перша спроба правильна':rec[i].mastered?'засвоєно після корекції':rec[i].defer?'прогалина — продовжено':'не освоєно'}${(rec[i].corrections||[]).length?`; додаткових спроб: ${rec[i].corrections.length}`:''}.</p>`:'').join('')}</details>
 <button class="secondary" id="euler-export">Завантажити звіт (JSON)</button><p class="euler-small">Результати є лише в цьому браузері. Це не захищений журнал: очищення браузера або інший пристрій не зберігає прогрес.</p></div>`;
}
function render(){const idx=Math.min(K-1,Math.max(0,Number(state.at)||0));state.at=idx;const s=stages[idx],r=state.records[idx];
 host.innerHTML=`<div class="euler-shell"><div class="euler-header"><span class="euler-points">Крок ${idx+1} з ${K} · <b>${esc(s.skill)}</b></span><div class="euler-meter"><div class="track"><i style="width:${((idx+(r&&(r.ok||r.mastered)?1:0))/K*100).toFixed(1)}%"></i></div></div></div><div class="euler-steps">${stages.map((x,i)=>`<button type="button" data-step="${i}" ${i>idx&&!state.records[i]?'disabled':''} class="${i===idx?'active':state.records[i]&&(state.records[i].ok||state.records[i].mastered||x.type==='proof')?'done':state.records[i]&&state.records[i].defer?'gap':''}" title="${esc(x.title)}">${i+1}</button>`).join('')}</div><div class="euler-layout"><div class="euler-left"><div class="euler-pane"><h2>Живе креслення</h2><p class="euler-small">Обери форму трикутника. Червоне коло перебудується разом з висотами й ортоцентром.</p><div class="euler-switch">${[['acute','Гострокутний'],['right','Прямокутний'],['obtuse','Тупокутний']].map(([id,v])=>`<button class="${state.geom===id?'active':''}" data-shape="${id}">${v}</button>`).join('')}</div>${diagram()}<p class="euler-caption">Синій — вершини; зелений — середини сторін; фіолетовий — середини до H; помаранчевий — основи висот; червоний — коло Ейлера.</p><div class="euler-switch euler-mini">${[['all','Усі'],['sides','Сторони'],['halves','До H'],['feet','Висоти']].map(([id,v])=>`<button class="${state.layer===id?'active':''}" data-layer="${id}">${v}</button>`).join('')}</div><details class="euler-detail"><summary>Пояснення позначень</summary><p>A, B, C — вершини; H — ортоцентр (перетин висот); N — центр кола Ейлера; M — середини сторін; P — середини відрізків до H; D — основи висот.</p></details></div><details class="euler-sources"><summary>Оригінальні рисунки й доведення (для звірки)</summary><p>Ці зображення подані для перегляду після самостійної роботи, а не як підказки до відповіді.</p>${[1,2,3,4].map(i=>`<details><summary>Джерело ${i}</summary><img loading="lazy" src="assets/euler-source-${i}.png" alt="Прислане доведення, сторінка ${i}"/></details>`).join('')}</details></div><div class="euler-right"><div class="euler-pane"><span class="eyebrow">КОРОТКО → ЗАВДАННЯ → ПОЯСНЕННЯ</span><h2>${esc(s.title)}</h2><p>${esc(s.story)}</p><div class="euler-story">${esc(s.note)}</div>${control(s)}</div></div></div>${report()}</div>`;
 host.querySelectorAll('[data-shape]').forEach(b=>b.addEventListener('click',()=>{state.geom=b.dataset.shape;save();render()}));
 host.querySelectorAll('[data-layer]').forEach(b=>b.addEventListener('click',()=>{state.layer=b.dataset.layer;save();render()}));
 host.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{const i=Number(b.dataset.step);if(i<=state.at||state.records[i]){state.at=i;save();render();}}));
 const reopen=host.querySelector('#euler-reopen');if(reopen)reopen.addEventListener('click',()=>{state.records[state.at].defer=false;save();render();});
 const submit=host.querySelector('#euler-submit');if(submit)submit.addEventListener('click',()=>send(false));
 const unknown=host.querySelector('#euler-unknown');if(unknown)unknown.addEventListener('click',()=>send(true));
 const corr=host.querySelector('#euler-check-corrective');if(corr)corr.addEventListener('click',()=>{
 const field=host.querySelector('#euler-corrective'),v=field?.value.trim();if(!v)return;
 const r=state.records[state.at],past=r.corrections||[],item=correctiveItem(state.at,past.length);
 const numeric=/^-?\d+(?:[.,]\d+)?$/.test(String(item.a));
 const ok=numeric?Number(v.replace(',','.'))===Number(item.a):answerNorm(v)===answerNorm(item.a);
 past.push({given:v,ok,at:new Date().toISOString(),prompt:item.q,explain:item.x});r.corrections=past;
 let streak=0;for(let k=past.length-1;k>=0&&past[k].ok;k--)streak++;
 if(streak>=2)r.mastered=true;
 save();render();
 });
 const defer=host.querySelector('#euler-defer');if(defer)defer.addEventListener('click',()=>{
 const r=state.records[state.at];if(!r||(r.corrections||[]).length<3)return;
 r.defer=true;save();render();
 });
 const exportBtn=host.querySelector('#euler-export');if(exportBtn)exportBtn.addEventListener('click',()=>{
 const blob=new Blob([JSON.stringify({subject:'Коло Ейлера',exportedAt:new Date().toISOString(),steps:stages.map((s,i)=>({title:s.title,skill:s.skill,attempt:state.records[i]||null}))},null,2)],{type:'application/json'});
 const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='euler-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);
 });
 const next=host.querySelector('#euler-next');if(next)next.addEventListener('click',()=>{if(state.at<K-1){state.at++;save();render();host.scrollIntoView({behavior:'smooth',block:'start'})}else{const msg=host.querySelector('.euler-report');if(msg)msg.scrollIntoView({behavior:'smooth'})}});
}
function send(unknown){const s=stages[state.at];if(state.records[state.at])return;let v,ok=false;
 if(unknown){v='Не знаю';}else if(s.type==='choice'){const selected=host.querySelector('input[name=euler-answer]:checked');if(!selected)return;v=s.choices[Number(selected.value)];ok=Number(selected.value)===s.correct;}
 else if(s.type==='num'){v=host.querySelector('#euler-value')?.value.trim();if(!v)return;ok=pickAns(s,v);}
 else {v=host.querySelector('#euler-proof')?.value.trim();if(!v||v.length<70){alert('Напиши не менше 70 символів: опиши власними словами основні кроки доведення.');return;}ok=false;}
 state.records[state.at]={given:v,ok:ok,at:new Date().toISOString(),corrections:[]};save();render();
}
render();
})();
