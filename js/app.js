import {t,getLang,setLang} from "./i18n.js";
import {categories,categoryNames,teamNames} from "./data.js";
import {recommendedWords,buildTurnOrder,pickCard,markGuess,uniqueGuessed,allCardsExhausted} from "./game.js";
import {save,load,clear} from "./storage.js";

const app=document.querySelector("#app");
let S=load()||fresh();
let timer=null;

function fresh(){return {screen:"home",playersCount:4,teamCount:2,teams:[],selectedCats:categories.map(x=>x[0]),difficulty:"mixed",turnSeconds:45,turns:2,wordsCount:48,wordsManual:false,customWords:[],round:1,roundPool:[],guesses:{1:{},2:{},3:{}},turnOrder:[],turnIndex:0,currentCard:null,turnCorrect:0,turnSkipped:0,skippedThisTurn:[],gameWords:[]}}
function persist(){save(S)}
function shell(body,back=false){app.innerHTML=`<main class="shell"><div class="topbar"><div class="brand">🎩 ${t("app")}</div>${back?`<button class="icon-btn" id="back">←</button>`:`<button class="icon-btn" id="settings">⚙️</button>`}</div>${body}</main>`; if(back) $("#back").onclick=goBack; else $("#settings")?.addEventListener("click",openSettings)}
const $=q=>document.querySelector(q); const $$=q=>[...document.querySelectorAll(q)];
function go(screen){S.screen=screen;persist();render()}
function openSettings(){S.returnScreen=S.screen;S.screen="settings";persist();render()}
function goBack(){const map={players:"home",teams:"players",names:"teams",balance:"names",categories:"names",difficulty:"categories",gameSettings:"difficulty",custom:"gameSettings",ready:"custom",roundIntro:"ready"};go(map[S.screen]||"home")}
function render(){
  clearInterval(timer); timer=null;
  ({home,settings,players,teams,names,balance,categories:categoriesScreen,difficulty,gameSettings,custom,ready,roundIntro,preTurn,play,turnResult,roundResult,final}[S.screen]||home)();
}
function home(){
 const has=!!load()&&load().screen!=="home";
 shell(`<section class="hero"><div class="hat">🎩</div><h1>${t("app")}</h1><p class="muted">${t("tag")}</p></section>
 <button class="btn primary" id="new">${t("newGame")}</button>${has?`<button class="btn secondary" id="cont">${t("continueGame")}</button>`:""}`);
 $("#new").onclick=()=>{clear();S=fresh();go("players")}; $("#cont")?.addEventListener("click",()=>{S=load();render()});
}
function settings(){
 shell(`<h1>${t("settings")}</h1><div class="card"><h3>${t("language")}</h3><div class="pill-row">${[["ru","Русский"],["uk","Українська"],["en","English"]].map(([k,v])=>`<button class="pill ${getLang()==k?"selected":""}" data-l="${k}">${v}</button>`).join("")}</div></div><button class="btn secondary" id="done">${t("back")}</button>`,true);
 $$("[data-l]").forEach(b=>b.onclick=()=>{setLang(b.dataset.l);render()}); $("#done").onclick=()=>{const target=S.returnScreen||"home";delete S.returnScreen;go(target)};
}
function players(){
 shell(`<h1>${t("playersQ")}</h1><p class="muted">${t("minPlayers")}</p><div class="number"><button id="minus">−</button><strong>${S.playersCount}</strong><button id="plus">+</button></div><button class="btn primary" id="next">${t("next")}</button>`,true);
 $("#minus").onclick=()=>{S.playersCount=Math.max(4,S.playersCount-1);render()};$("#plus").onclick=()=>{S.playersCount=Math.min(20,S.playersCount+1);render()};$("#next").onclick=()=>go("teams");
}
function teamOptions(n){let out=[];for(let k=2;k<=Math.floor(n/2);k++){const base=Math.floor(n/k),rem=n%k;if(base>=2)out.push({k,sizes:Array.from({length:k},(_,i)=>base+(i<rem?1:0))})}return out}
function teams(){
 const opts=teamOptions(S.playersCount);
 shell(`<h1>${t("teamsQ")}</h1><p class="muted">${t("chooseTeams")}</p>${opts.map((o,i)=>`<button class="choice" data-i="${i}"><strong>${o.k} ${t("teams")}</strong><br>${o.sizes.join(" + ")}${new Set(o.sizes).size>1?`<div class="small muted">${t("uneven")}</div>`:""}</button>`).join("")}`,true);
 $$("[data-i]").forEach(b=>b.onclick=()=>{const o=opts[+b.dataset.i];S.teamCount=o.k;const names=teamNames(getLang(),o.k);S.teams=o.sizes.map((size,i)=>({id:i,name:names[i].name,emoji:names[i].emoji,score:0,roundScore:0,players:Array.from({length:size},(_,j)=>({id:`${i}-${j}-${Date.now()}`,name:"",guessOnly:false}))}));go("names")});
}
function names(){
 shell(`<h1>${t("enterNames")}</h1>${S.teams.map((team,ti)=>`<div class="card"><div class="team-title">${team.emoji} ${team.name}</div>${team.players.map((p,pi)=>`<div class="field"><label>${t("player")} ${pi+1}</label><input data-ti="${ti}" data-pi="${pi}" value="${p.name||""}" placeholder="${t("player")} ${pi+1}"></div>`).join("")}</div>`).join("")}<button class="btn primary" id="next">${t("next")}</button>`,true);
 $$("input").forEach(i=>i.oninput=()=>{S.teams[+i.dataset.ti].players[+i.dataset.pi].name=i.value;persist()});
 $("#next").onclick=()=>{if(S.teams.some(x=>x.players.some(p=>!p.name.trim()))){alert(t("enterNames"));return} const min=Math.min(...S.teams.map(x=>x.players.length)); if(S.teams.some(x=>x.players.length>min))go("balance");else go("categories")};
}
function balance(){
 const min=Math.min(...S.teams.map(x=>x.players.length));
 shell(`<h1>${t("balanceTitle")}</h1><p>${t("balanceText")}</p>${S.teams.filter(x=>x.players.length>min).map(team=>`<div class="card"><div class="team-title">${team.emoji} ${team.name}</div><p class="muted">${team.players.length-min} × ${t("guessOnly")}</p>${team.players.map(p=>`<button class="pill ${p.guessOnly?"selected":""}" data-team="${team.id}" data-p="${p.id}">${p.name}</button>`).join(" ")}</div>`).join("")}<button class="btn primary" id="next">${t("next")}</button>`,true);
 $$("[data-p]").forEach(b=>b.onclick=()=>{const team=S.teams.find(x=>x.id==b.dataset.team),p=team.players.find(x=>x.id==b.dataset.p),need=team.players.length-min,chosen=team.players.filter(x=>x.guessOnly).length;if(p.guessOnly)p.guessOnly=false;else if(chosen<need)p.guessOnly=true;render()});
 $("#next").onclick=()=>{if(S.teams.some(team=>team.players.filter(p=>p.guessOnly).length!==team.players.length-min)){alert(t("balanceText"));return}go("categories")};
}
function categoriesScreen(){
 const lang=getLang();
 shell(`<h1>${t("categories")}</h1><p class="muted">${t("catHint")}</p><button class="choice ${S.selectedCats.length===categories.length?"selected":""}" id="all">✓ ${t("allCats")}</button><div class="spacer"></div><div class="grid">${categories.map(([k,e])=>`<button class="choice ${S.selectedCats.includes(k)?"selected":""}" data-c="${k}">${e} ${categoryNames[lang][k]}</button>`).join("")}</div><button class="btn primary" id="next">${t("next")}</button>`,true);
 $("#all").onclick=()=>{S.selectedCats=S.selectedCats.length===categories.length?[]:categories.map(x=>x[0]);render()};$$("[data-c]").forEach(b=>b.onclick=()=>{const k=b.dataset.c;S.selectedCats=S.selectedCats.includes(k)?S.selectedCats.filter(x=>x!==k):[...S.selectedCats,k];render()});$("#next").onclick=()=>{if(!S.selectedCats.length)return alert(t("categories"));go("difficulty")};
}
function difficulty(){
 const opts=[["easy",t("easy")],["normal",t("normal")],["hard",t("hard")],["mixed","🎲 "+t("mixed")]];
 shell(`<h1>${t("difficulty")}</h1>${opts.map(([k,v])=>`<button class="choice ${S.difficulty===k?"selected":""}" data-d="${k}"><strong>${v}</strong></button>`).join("")}<button class="btn primary" id="next">${t("next")}</button>`,true);
 $$("[data-d]").forEach(b=>b.onclick=()=>{S.difficulty=b.dataset.d;render()});$("#next").onclick=()=>go("gameSettings");
}
function activeCount(){return S.teams.reduce((n,t)=>n+t.players.filter(p=>!p.guessOnly).length,0)}
function gameSettings(){
 const rec=recommendedWords(activeCount(),S.turns); if(!S.wordsManual)S.wordsCount=rec;
 shell(`<h1>${t("gameSettings")}</h1><div class="card"><h3>${t("words")}</h3><div class="number"><button id="wm">−</button><strong>${S.wordsCount}</strong><button id="wp">+</button></div><p class="muted center">${t("recommended")}: ${rec}</p></div>
 <div class="card"><h3>${t("turnTime")}</h3><div class="grid3">${[30,45,60].map(x=>`<button class="pill ${S.turnSeconds===x?"selected":""}" data-sec="${x}">${x}</button>`).join("")}</div></div>
 <div class="card"><h3>${t("turns")}</h3><div class="grid3">${[1,2,3].map(x=>`<button class="pill ${S.turns===x?"selected":""}" data-turn="${x}">${x}</button>`).join("")}</div></div><button class="btn primary" id="next">${t("next")}</button>`,true);
 $("#wm").onclick=()=>{S.wordsManual=true;S.wordsCount=Math.max(8,S.wordsCount-4);render()};$("#wp").onclick=()=>{S.wordsManual=true;S.wordsCount+=4;render()};$$("[data-sec]").forEach(b=>b.onclick=()=>{S.turnSeconds=+b.dataset.sec;render()});$$("[data-turn]").forEach(b=>b.onclick=()=>{S.turns=+b.dataset.turn;render()});$("#next").onclick=()=>go("custom");
}
function custom(){
 shell(`<h1>${t("customTitle")}</h1><p class="muted">${t("customHint")}</p><div class="field"><input id="cw"><button class="btn secondary" id="add">${t("add")}</button></div><div class="pill-row">${S.customWords.map((w,i)=>`<button class="pill" data-x="${i}">${w} ×</button>`).join("")}</div><button class="btn primary" id="next">${S.customWords.length?t("next"):t("skipSetup")}</button>`,true);
 $("#add").onclick=()=>{const v=$("#cw").value.trim();if(v){S.customWords.push(v);render()}};$$("[data-x]").forEach(b=>b.onclick=()=>{S.customWords.splice(+b.dataset.x,1);render()});$("#next").onclick=()=>go("ready");
}
function ready(){
 shell(`<div class="center"><h1>🎩 ${t("ready")}</h1></div>${S.teams.map(x=>`<div class="card center"><div class="team-title">${x.emoji} ${x.name}</div><p>${x.players.map(p=>p.name+(p.guessOnly?` (${t("guessOnly")})`:"")).join(" · ")}</p></div>`).join("")}<div class="card"><div class="summary"><span>${t("words")}</span><strong>${S.wordsCount}</strong></div><div class="summary"><span>${t("turnTime")}</span><strong>${S.turnSeconds}s</strong></div><div class="summary"><span>${t("turns")}</span><strong>${S.turns}</strong></div></div><button class="btn primary" id="start">${t("startGame")}</button>`,true);
 $("#start").onclick=startGame;
}
async function startGame(){
 try{
  const res=await fetch(`data/words-${getLang()}.json`);let words=await res.json();
  words=words.filter(w=>S.selectedCats.includes(w.category)&&(S.difficulty==="mixed"||w.difficulty===S.difficulty));
  const custom=S.customWords.map((word,i)=>({id:`custom-${i}`,word,category:"funny",difficulty:"normal"}));
  words=words.sort(()=>Math.random()-.5).slice(0,Math.max(0,S.wordsCount-custom.length));
  S.gameWords=[...custom,...words].slice(0,S.wordsCount);S.roundPool=[...S.gameWords];S.round=1;S.guesses={1:{},2:{},3:{}};S.teams.forEach(x=>{x.score=0;x.roundScore=0});S.screen="roundIntro";persist();render();
 }catch(e){alert("Не удалось загрузить словарь. Проверьте файлы data/words-*.json");}
}
function roundIntro(){
 const title=S.round===1?t("r1"):S.round===2?t("r2"):t("r3"), rules=S.round===1?t("r1rules"):S.round===2?t("r2rules"):t("r3rules");
 shell(`<div class="center"><p>${t("round")} ${S.round}</p><h1>${title}</h1><div class="card"><p>${rules}</p><strong>${t("eachPoint")}</strong></div><p class="muted">${S.roundPool.length} ${t("words").toLowerCase()}</p></div><button class="btn primary" id="start">${t("startRound")} ${S.round}</button>`);
 $("#start").onclick=()=>{S.teams.forEach(x=>x.roundScore=0);S.turnOrder=buildTurnOrder(S.teams,S.turns,(S.round-1)%S.teams.length);S.turnIndex=0;go("preTurn")};
}
function currentTurn(){return S.turnOrder[S.turnIndex]}
function preTurn(){
 if(allCardsExhausted(S))return endRound();
 if(S.turnIndex>=S.turnOrder.length)return endRound();
 const x=currentTurn(),team=S.teams[x.teamIndex];
 shell(`<div class="center"><div class="team-title">${team.emoji} ${team.name}</div><h1>${x.playerName}, ${t("yourTurn")}</h1><p>${t("passPhone")} <strong>${x.playerName}</strong>.</p><div class="card"><strong>${t("round")} ${S.round} · ${t("turn")} ${x.personalTurn} ${t("of")} ${S.turns}</strong><p>${S.turnSeconds} ${t("seconds")} · 2 Skip</p></div></div><button class="btn primary" id="start">${t("startTurn")}</button>`);
 $("#start").onclick=()=>beginTurn();
}
function beginTurn(){
 const x=currentTurn();S.turnCorrect=0;S.turnSkipped=0;S.skippedThisTurn=[];S.timeLeft=S.turnSeconds;S.currentCard=pickCard(S,x.teamIndex,[]);if(!S.currentCard){return emptyTurn()}S.screen="play";persist();render();
}
function play(){
 const x=currentTurn(),team=S.teams[x.teamIndex],lang=getLang(),c=S.currentCard;
 shell(`<div class="game-top"><strong>${team.emoji} ${team.name} · ${x.playerName}</strong><div class="small muted">${t("round")} ${S.round} ${t("of")} 3 · ${t("turn")} ${x.personalTurn} ${t("of")} ${S.turns}</div><div class="timer" id="timer">${fmt(S.timeLeft)}</div></div>
 <div class="word-card"><div class="category">${categoryNames[lang][c.category]||""}</div><div class="word">${c.word}</div></div>
 <div class="game-actions"><button class="btn correct" id="correct">${t("correct")}</button><button class="btn skip" id="skip" ${S.turnSkipped>=2?"disabled":""}>${t("skip")}<br><span class="small">${2-S.turnSkipped} ${t("left")}</span></button></div>`);
 $("#correct").onclick=()=>answer(true);$("#skip").onclick=()=>answer(false);
 timer=setInterval(()=>{S.timeLeft--;$("#timer").textContent=fmt(S.timeLeft);if(S.timeLeft<=0){clearInterval(timer);finishTurn()}},1000);
}
function fmt(n){return `0:${String(Math.max(0,n)).padStart(2,"0")}`}
function answer(ok){
 const x=currentTurn(),id=S.currentCard.id;$("#correct").disabled=true;$("#skip").disabled=true;
 if(ok){if(markGuess(S,id,x.teamIndex))S.turnCorrect++}else{S.turnSkipped++;S.skippedThisTurn.push(id)}
 S.currentCard=pickCard(S,x.teamIndex,S.skippedThisTurn);
 if(!S.currentCard){clearInterval(timer);return emptyTurn()}
 persist();setTimeout(render,180);
}
function emptyTurn(){S.emptyEnded=true;finishTurn()}
function finishTurn(){clearInterval(timer);S.currentCard=null;S.screen="turnResult";persist();render()}
function turnResult(){
 const x=currentTurn(),team=S.teams[x.teamIndex],last=S.turnIndex>=S.turnOrder.length-1||allCardsExhausted(S);
 shell(`<div class="center"><h1>${S.emptyEnded?t("emptyHat"):t("time")}</h1>${S.emptyEnded?`<p class="muted">${t("emptyText")}</p>`:""}<div class="team-title">${team.emoji} ${team.name}</div><p>${t("earned")}</p><div class="score-big">+${S.turnCorrect}</div><p>${t("guessed")}: ${S.turnCorrect} · ${t("skipped")}: ${S.turnSkipped}</p></div><div class="card">${S.teams.map(q=>`<div class="summary"><span>${q.emoji} ${q.name}</span><strong>${q.score}</strong></div>`).join("")}</div><button class="btn primary" id="next">${last?t("finishRound"):t("nextTurn")}</button>`);
 S.emptyEnded=false;$("#next").onclick=()=>{if(last)endRound();else{S.turnIndex++;go("preTurn")}};
}
function endRound(){
 const unique=uniqueGuessed(S);
 if(unique.length===0){alert(t("noWords"));S.screen="roundIntro";persist();return render()}
 S.lastUnique=unique.length;S.nextPool=[...unique];S.screen="roundResult";persist();render();
}
function roundResult(){
 shell(`<div class="center"><h1>${t("roundDone")}</h1><p>${t("round")} ${S.round}</p></div>${S.teams.map(q=>`<div class="card"><div class="team-title">${q.emoji} ${q.name}</div><div class="summary"><span>${t("round")} ${S.round}</span><strong>+${q.roundScore}</strong></div><div class="summary"><span>${t("score")}</span><strong>${q.score}</strong></div></div>`).join("")}<div class="notice"><strong>${t("unique")}: ${S.lastUnique} ${t("of")} ${S.roundPool.length}</strong>${S.round<3?`<br>${S.lastUnique} ${t("moveNext")}`:""}</div><button class="btn primary" id="next">${S.round===3?t("showResults"):t("continue")}</button>`);
 $("#next").onclick=()=>{if(S.round===3)return go("final");S.round++;S.roundPool=[...S.nextPool];go("roundIntro")};
}
function final(){
 const max=Math.max(...S.teams.map(x=>x.score)),wins=S.teams.filter(x=>x.score===max);
 shell(`<div class="center"><h1>🎉 ${t("gameOver")}</h1>${wins.length===1?`<p>${t("winner")}</p><div class="hat">${wins[0].emoji}</div><h2>${wins[0].name}</h2>`:`<h2>${t("tie")}</h2>`}</div><div class="card">${[...S.teams].sort((a,b)=>b.score-a.score).map(q=>`<div class="summary"><span>${q.emoji} ${q.name}</span><strong>${q.score}</strong></div>`).join("")}</div><button class="btn primary" id="new">${t("newAgain")}</button>`);
 $("#new").onclick=()=>{clear();S=fresh();render()};
}
render();
